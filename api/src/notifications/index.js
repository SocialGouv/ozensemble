const prisma = require("../prisma");
const dayjs = require("dayjs");
const { sendPushNotification } = require("../services/push-notifications");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const scheduleDefi1Day1 = async (matomoId) => {
  const type = "DEFI1_DAY1";
  let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user) {
    user = await prisma.user.create({ data: { matomo_id: matomoId } });
  }

  const reminder = await prisma.reminder.findUnique({
    where: {
      userId: user.id,
    },
  });

  const utcTimeHours = (!reminder?.disabled && reminder?.date?.utcTimeHours) || 20;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.date?.utcTimeMinutes) || 0;

  const notif = await prisma.notification.findFirst({
    where: {
      userId: user.id,
      type,
      status: "NotSent",
    },
  });
  if (notif) return;

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
  CONSO_FOLLOW_UP_NAVIGATOR: {
    title: "Vous nous manquez...",
    body: "Remplir votre agenda Oz",
    link: "oz://CONSO_FOLLOW_UP_NAVIGATOR",
  },
};

module.exports = { NOTIFICATIONS_TYPES, cancelNotif, notificationsCronJob, scheduleDefi1Day1 };
