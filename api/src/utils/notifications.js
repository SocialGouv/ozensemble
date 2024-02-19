const prisma = require("../prisma");
const dayjs = require("dayjs");
const { sendPushNotification } = require("../services/push-notifications");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { capture } = require("../third-parties/sentry");
const { NOTIFICATIONS_TYPES } = require("./notifications-catalog");
dayjs.extend(utc);
dayjs.extend(timezone);

const updateLastConsoAdded = async (matomoId) => {
  try {
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        lastConsoAdded: dayjs().utc().toDate(),
        created_from: "UpdateLastConso",
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
    capture(e, { level: "error" });
  }
};
const getConsecutiveDaysConso = (conso) => {
  const days = conso.map((c) => dayjs(c.date).format("YYYY-MM-DD"));
  const daysSet = new Set(days);
  return daysSet.size;
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
  if (reminder?.type === "Weekdays") return;

  const utcHour = dayjs().utc().hour();
  const hourInParis = dayjs().tz("Europe/Paris").hour();
  const timeDifference = hourInParis - utcHour;
  const utcTimeHours = (!reminder?.disabled && reminder?.date?.utcTimeHours) || 20 - timeDifference;
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
const saveNotFilledWeek = async (userId) => {
  const type = "NOT_FILLED_WEEK";

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
  if (reminder?.type === "Daily") return;

  const utcHour = dayjs().utc().hour();
  const hourInParis = dayjs().tz("Europe/Paris").hour();
  const timeDifference = hourInParis - utcHour;
  const utcTimeHours = (!reminder?.disabled && reminder?.date?.utcTimeHours) || 18 - timeDifference;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.date?.utcTimeMinutes) || 0;

  await prisma.notification.create({
    data: {
      user: { connect: { id: userId } },
      type,
      date: dayjs().utc().add(14, "hour").startOf("minute").toDate(),
    },
  });
};

const scheduleNotificationsNotFilledWeekCronJob = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        lastConsoAdded: {
          gte: dayjs().utc().subtract(7, "day").startOf("day").toDate(),
          lte: dayjs().utc().subtract(7, "day").endOf("day").toDate(),
        },
      },
    });

    for (const { id } of users) {
      saveNotFilledWeek(id);
    }
  } catch (e) {
    capture(e, { level: "error" });
  }
};
const scheduleNotificationPlan = async (matomo_id = null) => {
  let users;
  if (matomo_id) {
    users = [await prisma.user.findUnique({ where: { matomo_id } })];
  } else {
    users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: dayjs().utc().subtract(1, "week").startOf("day").toDate(),
          lte: dayjs().utc().toDate(),
        },
      },
    });
  }
  for (const user of users) {
    const userCreatedAt = dayjs(user.createdAt).utc();
    const lastConsoAdded = dayjs(user.lastConsoAdded).utc();
    const consos = await prisma.consommation.findMany({
      where: {
        userId: user.id,
        date: {
          gte: userCreatedAt.startOf("day").toDate(),
          lte: dayjs().endOf("day").toDate(),
        },
      },
    });
    let type = null;
    const day = dayjs().utc();
    switch (day.diff(userCreatedAt, "day")) {
      case 0:
        type = consos.length ? "FIRST_DAY_COMPLETED" : "FIRST_DAY_NOT_COMPLETED_YET";
        break;
      case 1:
        if (consos.length && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else {
          type = consos.length ? "SECOND_DAY_NOT_COMPLETED_YET" : "SECOND_DAY_NOT_COMPLETED_IN_A_ROW";
        }
        break;
      case 2:
        if (consos.length && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else if (consos.length && day.diff(lastConsoAdded, "day") === 1) {
          type = "THIRD_DAY_NOT_COMPLETED_YET";
        } else if (consos.length) {
          type = "NOT_COMPLETED_DAY";
        } else {
          type = "THIRD_DAY_NOT_COMPLETED_IN_A_ROW";
        }
        break;
      case 3:
        if (consos.length && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else {
          type = "NOT_COMPLETED_DAY";
        }
        break;
      case 6:
        if (getConsecutiveDaysConso(consos) === 6) {
          type = "ONE_DAY_LEFT";
        }
        break;
    }
    if (type) {
      const notif = await prisma.notification.findFirst({
        where: {
          userId: user.id,
          type,
          status: "NotSent",
        },
      });
      if (notif) return;
      const reminder = await prisma.reminder.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (reminder) return;
      await prisma.notification.create({
        data: {
          user: { connect: { id: user.id } },
          type,
          date: dayjs().utc().add(2, "minute").startOf("minute").toDate(),
        },
      });
    }
  }
};
const scheduleNotificationsInactivity10DaysCronJob = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        lastConsoAdded: {
          gte: dayjs().utc().subtract(9, "day").startOf("day").toDate(),
          lte: dayjs().utc().subtract(9, "day").endOf("day").toDate(),
        },
        appVersion: {
          gte: "241",
        },
      },
    });

    for (const user of users) {
      const type = "INACTIVITY_10_DAYS";

      const notif = await prisma.notification.findFirst({
        where: {
          userId: user.id,
          type,
          status: "NotSent",
        },
      });
      if (notif) return;

      const reminder = await prisma.reminder.findUnique({
        where: {
          userId: user.id,
        },
      });

      const utcHour = dayjs().utc().hour();
      const hourInParis = dayjs().tz("Europe/Paris").hour();
      const timeDifference = hourInParis - utcHour;
      const utcTimeHours = (!reminder?.disabled && reminder?.date?.utcTimeHours) || 20 - timeDifference;
      const utcTimeMinutes = (!reminder?.disabled && reminder?.date?.utcTimeMinutes) || 0;

      await prisma.notification.create({
        data: {
          user: { connect: { id: user.id } },
          type,
          date: dayjs().utc().add(1, "day").set("hour", utcTimeHours).set("minute", utcTimeMinutes).startOf("minute").toDate(),
        },
      });
    }
  } catch (e) {
    capture(e, { level: "error" });
  }
};

const scheduleDefi1Day1 = async (matomoId) => {
  const type = "DEFI1_DAY1";
  const user = await prisma.user.upsert({
    where: { matomo_id: matomoId },
    create: { matomo_id: matomoId, created_from: "SheduleDefiDay1" },
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

  const utcHour = dayjs().utc().hour();
  const hourInParis = dayjs().tz("Europe/Paris").hour();
  const timeDifference = hourInParis - utcHour;
  const utcTimeHours = (!reminder?.disabled && reminder?.utcTimeHours) || 20 - timeDifference;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.utcTimeMinutes) || 0;

  await prisma.notification.create({
    data: {
      user: { connect: { id: user.id } },
      type,
      date: dayjs().utc().add(1, "day").set("hour", utcTimeHours).set("minute", utcTimeMinutes).startOf("minute").toDate(),
    },
  });
};

const scheduleUserSurvey = async (matomoId) => {
  const type = "USER_SURVEY";
  const user = await prisma.user.upsert({
    where: { matomo_id: matomoId },
    create: { matomo_id: matomoId, created_from: "UserSurvey" },
    update: {},
  });

  const notif = await prisma.notification.findFirst({
    where: {
      userId: user.id,
      type,
      status: "NotSent",
    },
  });
  if (notif) return;

  // if 3 notifications where already sent, don't schedule
  const alreadySentNotifs = await prisma.notification.findMany({
    where: {
      userId: user.id,
      type,
    },
  });
  if (alreadySentNotifs.length >= 3) return;

  const reminder = await prisma.reminder.findUnique({
    where: {
      userId: user.id,
    },
  });

  const utcHour = dayjs().utc().hour();
  const hourInParis = dayjs().tz("Europe/Paris").hour();
  const timeDifference = hourInParis - utcHour;
  const utcTimeHours = (!reminder?.disabled && reminder?.utcTimeHours) || 20 - timeDifference;
  const utcTimeMinutes = (!reminder?.disabled && reminder?.utcTimeMinutes) || 0;

  await prisma.notification.create({
    data: {
      user: { connect: { id: user.id } },
      type,
      date: dayjs().utc().add(7, "day").set("hour", utcTimeHours).set("minute", utcTimeMinutes).startOf("minute").toDate(),
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

module.exports = {
  cancelNotif,
  notificationsCronJob,
  scheduleDefi1Day1,
  updateLastConsoAdded,
  scheduleNotificationsInactivity5DaysCronJob,
  scheduleNotificationsInactivity10DaysCronJob,
  scheduleUserSurvey,
  scheduleNotificationsNotFilledWeekCronJob,
  scheduleNotificationPlan,
};
