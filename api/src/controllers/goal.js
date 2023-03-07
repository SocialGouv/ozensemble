const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const dayjs = require("dayjs");
const prisma = require("../prisma");
const { grabBadgeFromCatalog, badgesCatalog } = require("../badges");
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, daysWithGoalNoDrink, dosesByDrinkingDay, dosesPerWeek } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    if (!user) {
      await prisma.user.create({
        data: {
          matomo_id: matomoId,
        },
      });
    }

    const date = dayjs().startOf("week").format("YYYY-MM-DD");
    await prisma.goal.upsert({
      where: { id: `${user.id}_${date}` },
      create: {
        id: `${user.id}_${date}`,
        userId: user.id,
        date,
        daysWithGoalNoDrink,
        dosesByDrinkingDay,
        dosesPerWeek,
        status: "InProgress",
      },
      update: {
        daysWithGoalNoDrink,
        dosesByDrinkingDay,
        dosesPerWeek,
      },
    });

    const firstBagde = await prisma.badge.findFirst({ where: { userId: user.id, stars: 1, category: "goals" } });
    if (!firstBagde) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "goals",
          stars: 1,
          shown: true,
        },
      });

      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("goals", 1), allBadges, badgesCatalog } });
    }
  })
);

module.exports = router;
