const prisma = require("../prisma");
const dayjs = require("dayjs");
const { sendPushNotification } = require("../services/push-notifications");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const scheduleDefi1Day1 = async (matomoId) => {
  const type = "DEFI1_DAY1";
  const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user || !user.push_notif_token) return;

  const notif = await prisma.notification.findFirst({
    where: {
      userId: user.id,
      type,
    },
  });
  if (notif) return;

await prisma.notification.create({
    data: {
      user: { connect: { id: user.id } },
      type,
      date: dayjs().utc().startOf("day").add(1, "day").toDate(),
    },
  });
};

const removeNotif = async (matomoId, type) => {
  const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user) return;

  await prisma.notification.deleteMany({
    where: {
      userId: user.id,
      type,
    },
  });
};

const notificationsCronJob = async () => {
  const now = dayjs().utc();

  const reminders = await prisma.reminder.findMany({
    where: {
      disabled: false,
      utcTimeHours: now.hour(),
      utcTimeMinutes: now.minute(),
    },
    include: {
      user: true,
      utcDaysOfWeek: true,
    },
  });

  const sentNotifications = [];
  for (const reminder of reminders) {
    if (!reminder?.user?.push_notif_token) continue;

    const notif = await prisma.notification.findFirst({
      where: {
        userId: reminder.user.id,
        date: {
          lte: now.endOf("day").toDate(),
          gte: now.startOf("day").toDate(),
        },
      },
    });

    if (reminder.type === "Weekdays" && !notif && !reminder.utcDaysOfWeek[now.format("dddd").toLowerCase()]) continue;

    sendPushNotification({
      matomoId: reminder.user.matomo_id,
      pushNotifToken: reminder.user.push_notif_token,
      channelId: "unique_reminder",
      ...NOTIFICATIONS_TYPES[notif ? notif.type : "REMINDER"],
    });
    if (notif?.id) sentNotifications.push(notif.id);
  }

  if (sentNotifications.length === 0) return;
  await prisma.notification.deleteMany({
    where: {
      id: {
        in: sentNotifications,
      },
    },
  });
};

const NOTIFICATIONS_TYPES = {
  REMINDER: {
    title: "C'est l'heure de votre suivi !",
    body: "N'oubliez pas de remplir votre agenda Oz",
    link: "oz://CONSO_FOLLOW_UP_NAVIGATOR",
  },
  DEFI1_DAY1: {
    title: "C'est l'heure du 2ème jour !",
    body: "Evaluez votre niveau de risque alcool de manière plus fine.",
    link: "oz://DEFI1",
  },
};

module.exports = { NOTIFICATIONS_TYPES, removeNotif, notificationsCronJob, scheduleDefi1Day1 };
