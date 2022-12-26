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

router.put(
  "/",
  catchErrors(async (req, res) => {
    console.log("notification api: put");
    const { type, pushNotifToken, date, link, matomoId } = req.body || {};

    if (!pushNotifToken) return res.status(400).json({ ok: false, error: "no push token" });
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    if (!date) {
      capture("notification api: wrong date", { extra: req.body, user: { matomoId } });
      return res.status(400).json({ ok: false, error: "wrong date" });
    }

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

    let existingNotification = await prisma.notification.findFirst({ where: { user, type } });
    if (existingNotification) {
      if (existingNotification.date !== date) {
        existingNotification = await prisma.notification.update({
          where: { id: existingNotification.id },
          data: {
            date,
          },
        });
      }
      return res.status(200).send({ ok: true, existingNotification });
    }

    notification = await prisma.notification.create({
      data: {
        user: { connect: { id: user.id } },
        type,
        date,
      },
    });

    return res.status(200).send({ ok: true, notification });
  })
);

const notificationCronJob = async (req, res) => {
  const sentNotifications = [];
  const now = nowUtc();

  const notificationsForNow = await prisma.notification.findMany({
    where: {
      date: { lte: now }, // lower or equal to now
    },
    include: {
      user: true,
    },
  });

  for (const notification of notificationsForNow) {
    if (!notification?.user?.push_notif_token) continue;
    sendPushNotification({
      matomoId: notification.user.matomo_id,
      pushNotifToken: notification.user.push_notif_token,
      title: notificationTypes[notification.type].title,
      body: notificationTypes[notification.type].message,
      link: notificationTypes[notification.type].link, // TODO: DEEP LINK NOT WORKING
      channelId: "PUSH-NOTIFICATIONS",
    });
    sentNotifications.push(notification.id);
  }

  if (notificationsForNow.length === 0) return;
  const deleteSentNotifications = await prisma.notification.deleteMany({
    where: {
      id: {
        in: sentNotifications,
      },
    },
  });
};

module.exports = { router, notificationCronJob };

const notificationTypes = {
  0: {
    title: "C’est l’heure du 2ème jour",
    message: "Ce message pour vous motiver à réaliser le 2ème jour du défi ! Nous croyons en vous 💙",
    link: "oz://TABS/CONSO_FOLLOW_UP_NAVIGATOR/CONSO_FOLLOW_UP",
  },
};
