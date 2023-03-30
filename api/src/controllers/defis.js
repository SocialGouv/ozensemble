const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const { defis } = require("../new-features");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const daysValidated = Number(req.body?.daysValidated);
    const autoEvaluationDone = req.body?.autoEvaluationDone;

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    if (autoEvaluationDone) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 1,
        },
      });
    }
    if (daysValidated >= 1) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 2,
        },
      });
    }
    if (daysValidated >= 2) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 3,
        },
      });
    }

    if (daysValidated >= 3) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 4,
        },
      });
    }
    if (daysValidated >= 7) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 5,
        },
      });
    }

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const completedDays = Number(req.body?.daysValidated);
    const autoEvaluationDone = req.body?.autoEvaluationDone;
    console.log("here");
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    const defis_badges = await prisma.badge.findMany({
      where: { userId: user.id, category: "defis" },
    });

    if (autoEvaluationDone && !defis_badges.find((badge) => badge.stars === 1)) {
      console.log("no 1st badge");
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 1,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 1), allBadges, badgesCatalog } });
    }

    if (completedDays === 1 && !defis_badges.find((badge) => badge.stars === 2)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 2,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 2), allBadges, badgesCatalog } });
    }
    if (completedDays === 2 && !defis_badges.find((badge) => badge.stars === 3)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 3,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 3), allBadges, badgesCatalog } });
    }
    if (completedDays === 3 && !defis_badges.find((badge) => badge.stars === 4)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 4,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 4), allBadges, badgesCatalog } });
    }
    if (completedDays === 7 && !defis_badges.find((badge) => badge.stars === 5)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 5,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 5), allBadges, badgesCatalog } });
    }

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
