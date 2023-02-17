const prisma = require("../prisma");
const dayjs = require("dayjs");
const { sendPushNotification } = require("../services/push-notifications");
const utc = require("dayjs/plugin/utc");
const { capture } = require("../third-parties/sentry");
dayjs.extend(utc);

const updateLastConsoAdded = async (matomoId) => {
  try {
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        lastConsoAdded: dayjs().utc().toDate(),
      },
      update: { lastConsoAdded: dayjs().utc().toDate() },
    });

    await prisma.notification.updateMany({
      where: {
        userId: user.id,
        type: "INACTIVITY_5_DAYS",
        status: "NotSent",
      },
      data: {
        status: "Canceled",
      },
    });
  } catch (e) {
    capture(e, { level: "error", extra: { name } });
  }
};

const saveInactivity5Days = async (userId) => {
  const type = "INACTIVITY_5_DAYS";

  const notif = await prisma.notification.findFirst({
    where: {
      userId,
      type,
      status: "NotSent",
    },
  });
  if (notif) return;

  const reminder = await prisma.reminder.findUnique({
    where: {
      userId,
    },
  });

  const utcTimeHours = (!reminder?.disabled && reminder?.date?.utcTimeHours) || 20;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.date?.utcTimeMinutes) || 0;

  await prisma.notification.create({
    data: {
      user: { connect: { id: userId } },
      type,
      date: dayjs().utc().add(1, "day").set("hour", utcTimeHours).set("minute", utcTimeMinutes).startOf("minute").toDate(),
    },
  });
};

const scheduleNotificationsInactivity5DaysCronJob = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        lastConsoAdded: {
          gte: dayjs().utc().subtract(4, "day").startOf("day").toDate(),
          lte: dayjs().utc().subtract(4, "day").endOf("day").toDate(),
        },
      },
    });

    for (const { id } of users) {
      saveInactivity5Days(id);
    }
  } catch (e) {
    capture(e, { level: "error" });
  }
};

const scheduleDefi1Day1 = async (matomoId) => {
  const type = "DEFI1_DAY1";
  const user = await prisma.user.upsert({
    where: { matomo_id: matomoId },
    create: { matomo_id: matomoId },
    update: {},
  });

  const reminder = await prisma.reminder.findUnique({
    where: {
      userId: user.id,
    },
  });

  const notif = await prisma.notification.findFirst({
    where: {
      userId: user.id,
      type,
      status: "NotSent",
    },
  });
  if (notif) return;

  const utcTimeHours = (!reminder?.disabled && reminder?.utcTimeHours) || 20;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.utcTimeMinutes) || 0;

  await prisma.notification.create({
    data: {
      user: { connect: { id: user.id } },
      type,
      date: dayjs().utc().add(1, "day").set("hour", utcTimeHours).set("minute", utcTimeMinutes).startOf("minute").toDate(),
    },
  });
};

const cancelNotif = async (matomoId, type) => {
  const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user) return;

  await prisma.notification.updateMany({
    where: {
      userId: user.id,
      type,
      status: "NotSent",
    },
    data: {
      status: "Canceled",
    },
  });
};

const notificationsCronJob = async () => {
  const now = dayjs().utc();

  const notifs = await prisma.notification.findMany({
    where: {
      status: "NotSent",
      date: {
        gte: now.startOf("minute").toDate(),
        lte: now.endOf("minute").toDate(),
      },
    },
    include: {
      user: true,
    },
  });

  const sentNotifications = [];
  for (const notif of notifs) {
    if (!notif?.user?.push_notif_token) continue;

    sendPushNotification({
      matomoId: notif.user.matomo_id,
      pushNotifToken: notif.user.push_notif_token,
      channelId: "unique_reminder",
      ...NOTIFICATIONS_TYPES[notif.type],
    });
    sentNotifications.push(notif.id);
  }

  if (sentNotifications.length === 0) return;
  await prisma.notification.updateMany({
    where: {
      id: {
        in: sentNotifications,
      },
    },
    data: {
      status: "Sent",
    },
  });
};

const NOTIFICATIONS_TYPES = {
  DEFI1_DAY1: {
    title: "C'est l'heure du 2ème jour !",
    body: "Evaluez votre niveau de risque alcool de manière plus fine.",
    link: "oz://DEFI1",
  },
  INACTIVITY_5_DAYS: {
    title: "Vous nous manquez",
    body: "Mettez toutes les chances de votre côté en remplissant vos consommations régulièrement 😊",
    link: "oz://ADD_DRINK",
  },
};

module.exports = {
  NOTIFICATIONS_TYPES,
  cancelNotif,
  notificationsCronJob,
  scheduleDefi1Day1,
  updateLastConsoAdded,
  scheduleNotificationsInactivity5DaysCronJob,
};
