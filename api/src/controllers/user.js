const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const geoip = require("geoip-lite");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const updateObj = {};

    let created_from = "User";
    if (req.body.hasOwnProperty("pushNotifToken")) {
      updateObj.push_notif_token = req.body.pushNotifToken ?? "";
      created_from = "User-PushNotif";
    }

    // TODO: fix concurrency issue Unique constraint failed on the fields: (`matomo_id`)
    // using a "version" field ? https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#optimistic-concurrency-control
    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: updateObj,
      create: {
        matomo_id: matomoId,
        created_from,
        ...updateObj,
      },
    });

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/allData",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    if (!user) return res.status(404).json({ ok: false, error: "user not found" });
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
    });
    const reminders = await prisma.reminder.findMany({
      where: { userId: user.id },
    });
    const badges = await prisma.badge.findMany({
      where: { userId: user.id },
    });
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
    });
    const appMilestone = await prisma.appMilestone.findMany({
      where: { userId: user.id },
    });
    const articles = await prisma.article.findMany({
      where: { userId: user.id },
    });
    const data = {
      user,
      notifications,
      reminders,
      badges,
      goals,
      appMilestone,
      articles,
    };
    return res.status(200).send({ ok: true, data });
  })
);

router.post(
  "/allData",
  catchErrors(async (req, res) => {
    const { matomoId, data } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    if (!data) return res.status(400).json({ ok: false, error: "no data" });

    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    if (!user) return res.status(404).json({ ok: false, error: "user not found" });

    const userIdLength = user.id.length;
    const { notifications, reminders, badges, goals, appMilestone, articles } = data;

    try {
      await prisma.$transaction(async (prisma) => {
        if (notifications) {
          await prisma.notification.deleteMany({
            where: { userId: user.id },
          });
          await prisma.notification.createMany({
            data: notifications.map((n) => ({ ...n, userId: user.id, id: undefined })),
          });
        }
        if (reminders) {
          await prisma.reminder.deleteMany({
            where: { userId: user.id },
          });
          await prisma.reminder.createMany({
            data: reminders.map((r) => ({ ...r, userId: user.id, id: undefined })),
          });
        }
        if (badges) {
          await prisma.badge.deleteMany({
            where: { userId: user.id },
          });
          await prisma.badge.createMany({
            data: badges.map((b) => ({ ...b, userId: user.id, id: undefined })),
          });
        }
        if (goals) {
          await prisma.goal.deleteMany({
            where: { userId: user.id },
          });
          await prisma.goal.createMany({
            data: goals.map((g) => ({ ...g, userId: user.id, id: `${user.id}_${g.date}` })),
          });
        }
        if (appMilestone) {
          await prisma.appMilestone.deleteMany({
            where: { userId: user.id },
          });
          await prisma.appMilestone.createMany({
            data: appMilestone.map((a) => ({ ...a, userId: user.id, id: `${user.id}_${a.id.substring(userIdLength)}` })),
          });
        }
        if (articles) {
          await prisma.article.deleteMany({
            where: { userId: user.id },
          });
          await prisma.article.createMany({
            data: articles.map((a) => ({ ...a, userId: user.id, id: `${user.id}_${a.id.substring(userIdLength)}` })),
          });
        }
      });

      return res.status(200).send({ ok: true });
    } catch (error) {
      return res.status(500).json({ ok: false, error: "Transaction failed" });
    }
  })
);
router.get(
  "/location",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query || {};
    let isWellLocated = false;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    if (!user) return res.status(404).json({ ok: false, error: "user not found" });

    const xforwarded = req.headers["x-forwarded-for"];
    const location = geoip.lookup(xforwarded);
    if (location) {
      const { region } = location;
      isWellLocated = region === "IDF";
    }

    return res.status(200).send({ ok: true, isWellLocated });
  })
);

module.exports = router;
