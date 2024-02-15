const prisma = require("../prisma");
const dayjs = require("dayjs");
const { sendPushNotification } = require("../services/push-notifications");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { capture } = require("../third-parties/sentry");
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
const scheduleNotificationPlan = async () => {
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: dayjs().utc().subtract(1, "week").startOf("day").toDate(),
        lte: dayjs().utc().toDate(),
      },
    },
  });
  for (const user of users) {
    // switch user.createdAt today then yesterday then the day before, until a whole week is covered
    const createdAt = dayjs(user.createdAt).utc();
    const lastConsoAdded = dayjs(user.lastConsoAdded).utc();
    const consos = await prisma.consommation.findMany({
      where: {
        userId: user.id,
        date: {
          gte: createdAt.toDate(),
          lte: createdAt.endOf("day").toDate(),
        },
      },
    });
    let type = null;
    const day = dayjs().utc();
    switch (day.diff(createdAt, "day")) {
      case 0:
        type = lastConsoAdded ? "FIRST_DAY_COMPLETED" : "FIRST_DAY_NOT_COMPLETED_YET";
        break;
      case 1:
        if (lastConsoAdded && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else {
          type = lastConsoAdded ? "SECOND_DAY_NOT_COMPLETED_IN_A_ROW" : "SECOND_DAY_NOT_COMPLETED_YET";
        }
        break;
      case 2:
        if (lastConsoAdded && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else if (lastConsoAdded && day.diff(lastConsoAdded, "day")) {
          type = "THIRD_DAY_NOT_COMPLETED_YET";
        } else if (lastConsoAdded) {
          type = "NOT_COMPLETED_DAY";
        } else {
          type = "THIRD_DAY_NOT_COMPLETED_IN_A_ROW";
        }
        break;
      case 3:
        if (lastConsoAdded && !day.diff(lastConsoAdded, "day")) {
          let itIsACatchUp = consos.every((conso) => day.diff(dayjs(conso.createdAt), "day") === 0);
          type = itIsACatchUp ? "CATCH_UP" : null;
        } else {
          type = "NOT_COMPLETED_DAY";
        }
        break;
      case 6:
        const weekCompleted = await prisma.consommation.checksConsecutiveDays(7, consos);
        if (!weekCompleted) {
          const weekAlmostCompleted = await prisma.consommation.checksConsecutiveDays(6, consos);
          if (weekAlmostCompleted) {
            type = "ONE_DAY_LEFT";
          }
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
          date: dayjs().utc().add(1, "minute").toDate(),
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

const NOTIFICATIONS_TYPES = {
  DEFI1_DAY1: {
    type: "DEFI1_DAY1",
    title: "C'est l'heure du 2ème jour !",
    body: "Evaluez votre niveau de risque alcool de manière plus fine.",
    link: "oz://APP/TABS/DEFI/DEFI1",
  },
  INACTIVITY_5_DAYS: {
    type: "INACTIVITY_5_DAYS",
    title: "Vous nous manquez",
    body: "Mettez toutes les chances de votre côté en remplissant vos consommations régulièrement 😊",
    link: "oz://APP/ADD_DRINK",
  },
  INACTIVITY_10_DAYS: {
    type: "INACTIVITY_10_DAYS",
    title: "5 sec pour un dernier retour ?",
    body: "Dites nous pourquoi vous êtes partis, ça nous aidera à améliorer l’application",
    link: "oz://INACTIVITY_NPS_SCREEN",
  },
  USER_SURVEY: {
    type: "USER_SURVEY",
    title: "1 min pour améliorer Oz ?",
    body: "Répondez à 6 questions pour nous aider à améliorer l’application ensemble !",
    link: "oz://USER_SURVEY_NOTIF",
  },
  NOT_FILLED_WEEK: {
    type: "NOT_FILLED_WEEK",
    title: "Semaine dernière à compléter",
    body: "N'oubliez pas de remplir tous vos jours pour pouvoir suivre votre objectif hebdo",
    link: "oz://APP/TABS/GAINS_NAVIGATOR/GAINS_MAIN_VIEW",
  },
  FIRST_DAY_COMPLETED: {
    type: "FIRST_DAY_COMPLETED",
    title: "Bravo pour ce 1er jour !",
    body: "Avez-vous d’autres consommations à compléter pour cette journée ?",
    link: "oz://APP/ADD_DRINK",
  },
  FIRST_DAY_NOT_COMPLETED_YET: {
    type: "FIRST_DAY_NOT_COMPLETED_YET",
    title: "C’est l’heure du 1er jour !",
    body: "Ajoutez votre 1er jour pour vous aider à prendre conscience de votre conso",
    link: "oz://APP/ADD_DRINK",
  },
  SECOND_DAY_NOT_COMPLETED_IN_A_ROW: {
    type: "SECOND_DAY_NOT_COMPLETED_IN_A_ROW",
    title: "5 sec pour ajouter votre consommation",
    body: "C’est super rapide et ça vous aidera à vous rendre compte de votre conso !",
    link: "oz://APP/ADD_DRINK",
  },
  THIRD_DAY_NOT_COMPLETED_IN_A_ROW: {
    type: "THIRD_NOT_COMPLETED_IN_A_ROW",
    title: "N’oubliez pas de compléter votre agenda",
    body: "Si vous n’avez rien consommé, vous pouvez l’indiquer",
    link: "oz://APP/ADD_DRINK",
  },
  NOT_COMPLETED_DAY: {
    type: "NOT_COMPLETED_DAY",
    title: "C'est l'heure de votre suivi !",
    body: "N’oubliez pas de remplir votre agenda Oz",
    link: "oz://APP/ADD_DRINK",
  },
  ONE_DAY_LEFT: {
    type: "ONE_DAY_LEFT",
    title: "C’est l’heure du 7ème jour",
    body: "Dernier jour à compléter et vous aurez réussi votre première semaine !",
    link: "oz://APP/ADD_DRINK",
  },
  SECOND_DAY_NOT_COMPLETED_YET: {
    type: "SECOND_DAY_NOT_COMPLETED_YET",
    title: "C’est l’heure du 2ème jour !",
    body: "Félicitations pour hier, ajoutez vos consommations pour cette 2ème journée",
    link: "oz://APP/ADD_DRINK",
  },
  THIRD_DAY_NOT_COMPLETED_YET: {
    type: "THIRD_DAY_NOT_COMPLETED_YET",
    title: "Toc toc toc c’est le 3ème jour",
    body: "Bravo, c’est en comptant tous les jours que l’on se rend compte de sa consommation",
    link: "oz://APP/ADD_DRINK",
  },
  CATCH_UP: {
    type: "CATCH_UP",
    title: "Félicitation pour hier",
    body: "Gardez le rythme et ajoutez vos consommations d’aujourd’hui",
    link: "oz://APP/ADD_DRINK",
  },
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
  NOTIFICATIONS_TYPES,
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
