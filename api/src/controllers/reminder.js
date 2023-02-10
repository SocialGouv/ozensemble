const express = require("express");
const { setDay, setHours, setMinutes } = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");
const { catchErrors } = require("../middlewares/errors");
const prisma = require("../prisma");
const { capture } = require("../third-parties/sentry");
const { sendPushNotification } = require("../services/push-notifications");
const router = express.Router();

const DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const nowUtc = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
};

const toUtcData = ({ timeHours, timeMinutes, daysOfWeek, timezone }) => {
  let time = nowUtc();
  time = setHours(time, timeHours);
  time = setMinutes(time, timeMinutes);
  const utcTime = zonedTimeToUtc(time, timezone);
  const utcTimeHours = utcTime.getUTCHours();
  const utcTimeMinutes = utcTime.getUTCMinutes();

  let utcDaysOfWeek = {};
  for (const dayOfWeek of DAYS_OF_WEEK) utcDaysOfWeek[dayOfWeek] = false;
  if (daysOfWeek) {
    for (const dayOfWeek of DAYS_OF_WEEK) {
      const dayOfWeekIndex = DAYS_OF_WEEK.indexOf(dayOfWeek);
      let date = nowUtc();
      date = setHours(date, timeHours);
      date = setMinutes(date, timeMinutes);
      date = setDay(date, dayOfWeekIndex);
      const utcDate = zonedTimeToUtc(date, timezone);
      const utcDayOfWeekIndex = utcDate.getDay();
      if (utcDayOfWeekIndex === dayOfWeekIndex) {
        utcDaysOfWeek = {
          ...utcDaysOfWeek,
          ...daysOfWeek,
        };
        break;
      } else {
        const utcDayOfWeek = DAYS_OF_WEEK[utcDayOfWeekIndex];
        utcDaysOfWeek[utcDayOfWeek] = daysOfWeek[dayOfWeek] || false;
      }
    }
  }

  return {
    utcTimeHours,
    utcTimeMinutes,
    utcDaysOfWeek,
  };
};

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, pushNotifToken, type, timeHours, timeMinutes, id, daysOfWeek, timezone, disabled } = req.body || {};

    if (!pushNotifToken) return res.status(400).json({ ok: false, error: "no push token" });
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    if (type !== "Daily" && type !== "Weekdays") {
      capture("reminder api: wrong type", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong type" });
    }
    if (!timezone) {
      capture("reminder api: wrong timezone", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong timezone" });
    }
    if (isNaN(timeHours)) {
      capture("reminder api: wrong timeHours", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong timeHours" });
    }
    if (isNaN(timeMinutes)) {
      capture("reminder api: wrong timeMinutes", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong timeMinutes" });
    }
    if (type === "Weekdays" && !daysOfWeek) {
      capture("reminder api: wrong daysOfWeek", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong daysOfWeek" });
    }

    const { utcTimeHours, utcTimeMinutes, utcDaysOfWeek } = toUtcData({ timeHours, timeMinutes, daysOfWeek, timezone });

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          push_notif_token: pushNotifToken,
          matomo_id: matomoId,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { matomo_id: matomoId },
        data: {
          push_notif_token: pushNotifToken,
        },
      });
    }

    const reminderUpdatedData = (createOrUpdate) => ({
      utcTimeHours,
      utcTimeMinutes,
      utcDaysOfWeek: utcDaysOfWeek
        ? createOrUpdate === "create"
          ? { create: utcDaysOfWeek }
          : { upsert: { create: utcDaysOfWeek, update: utcDaysOfWeek } }
        : undefined,
      type,
      disabled,
    });
    let reminder = await prisma.reminder.findFirst({
      where: {
        userId: user.id,
        //type,
        id,
      },
    });
    if (!reminder) {
      reminder = await prisma.reminder.create({
        data: {
          user: { connect: { id: user.id } },
          ...reminderUpdatedData("create"),
        },
        include: {
          utcDaysOfWeek: true,
        },
      });
    } else {
      reminder = await prisma.reminder.update({
        where: { id: reminder.id },
        data: reminderUpdatedData("update"),
        include: {
          utcDaysOfWeek: true,
        },
      });
    }

    return res.status(200).send({ ok: true, reminder });
  })
);

const reminderCronJob = async (req, res) => {
  const now = nowUtc();
  const utcTimeHours = now.getHours();
  const utcTimeMinutes = now.getMinutes();
  const utcDayOfWeek = DAYS_OF_WEEK[now.getDay()];

  const dailyReminders = await prisma.reminder.findMany({
    where: {
      type: "Daily",
      disabled: false,
      utcTimeHours,
      utcTimeMinutes,
    },
    include: {
      user: true,
    },
  });
  for (const reminder of dailyReminders) {
    if (!reminder?.user?.push_notif_token) continue;

    const notif = await prisma.notification.findFirst({
      where: {
        userId: reminder.user?.id,
        status: { in: ["NotSent", "Sent"] },
        date: {
          gte: now.startOf("day").toDate(),
          lte: now.endOf("day").toDate(),
        },
      },
    });
    if (!!notif) continue;

    sendPushNotification({
      matomoId: reminder.user.matomo_id,
      pushNotifToken: reminder.user.push_notif_token,
      channelId: "unique_reminder",
      ...REMINDER_DATA,
    });
  }

  const weeklyReminders = await prisma.reminderUtcDaysOfWeek.findMany({
    where: {
      [utcDayOfWeek]: true,
      reminder: {
        type: "Weekdays",
        disabled: false,
        utcTimeHours,
        utcTimeMinutes,
      },
    },
    include: {
      reminder: {
        include: {
          user: true,
        },
      },
    },
  });
  for (const { reminder } of weeklyReminders) {
    if (!reminder?.user?.push_notif_token) continue;

    const notif = await prisma.notification.findFirst({
      where: {
        userId: reminder.user?.id,
        status: { in: ["NotSent", "Sent"] },
        date: {
          gte: now.startOf("day").toDate(),
          lte: now.endOf("day").toDate(),
        },
      },
    });
    if (!!notif) continue;

    sendPushNotification({
      matomoId: reminder.user.matomo_id,
      pushNotifToken: reminder.user.push_notif_token,
      channelId: "unique_reminder",
      ...REMINDER_DATA,
    });
  }
};

const REMINDER_DATA = {
  title: "C'est l'heure de votre suivi !",
  body: "N'oubliez pas de remplir votre agenda Oz",
  link: "oz://CONSO_FOLLOW_UP_NAVIGATOR",
};

module.exports = { router, reminderCronJob };
