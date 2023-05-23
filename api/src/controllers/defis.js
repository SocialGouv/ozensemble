const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const completedDays = Number(req.body?.daysValidated);
    const autoEvaluationDone = req.body?.autoEvaluationDone;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "Defis",
      },
      update: {},
    });

    const defis_badges = await prisma.badge.findMany({
      where: { userId: user.id, category: "defis" },
    });

    if (autoEvaluationDone && !defis_badges.find((badge) => badge.stars === 1)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 1,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true });
    }

    if (completedDays === 1 && !defis_badges.find((badge) => badge.stars === 2)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 2,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true });
    }
    if (completedDays === 2 && !defis_badges.find((badge) => badge.stars === 3)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 3,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true });
    }
    if (completedDays === 3 && !defis_badges.find((badge) => badge.stars === 4)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 4,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true });
    }
    if (completedDays === 7 && !defis_badges.find((badge) => badge.stars === 5)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 5,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true });
    }

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/display",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};
    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    const badge_defis_to_show = await prisma.badge.findFirst({
      where: { userId: user.id, category: "defis", shown: false },
    });

    if (badge_defis_to_show) {
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      await prisma.badge.update({
        where: { id: badge_defis_to_show.id },
        data: { shown: true },
      });
      return res
        .status(200)
        .send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("defis", badge_defis_to_show.stars), allBadges, badgesCatalog } });
    }
    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
