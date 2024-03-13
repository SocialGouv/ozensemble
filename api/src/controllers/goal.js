const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const dayjs = require("dayjs");
const prisma = require("../prisma");
const { grabBadgeFromCatalog, getBadgeCatalog } = require("../utils/badges");
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, daysWithGoalNoDrink, dosesByDrinkingDay, dosesPerWeek, noDisplayBadge, calculateBadges, forceDate } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    let user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "Goal",
      },
      update: {},
    });
    let date = dayjs().startOf("week").format("YYYY-MM-DD");
    const thisWeekGoal = await prisma.goal.findFirst({
      where: { userId: user.id, date },
    });
    if (forceDate) {
      date = forceDate;
      await prisma.goal.update({ where: { id: thisWeekGoal.id }, data: { status: "Failure" } });
    }

    // we want to know if the goal of this week is already proceded. If it is, we want to create/modify the one for next week
    // if it is not, we want to update the current one with the new values
    if (thisWeekGoal?.status !== "InProgress") date = dayjs(date).add(1, "week").startOf("week").format("YYYY-MM-DD");

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
        status: "InProgress",
      },
    });

    if (!!noDisplayBadge) {
      return res.status(200).send({ ok: true });
    }

    const firstBagde = await prisma.badge.findFirst({ where: { userId: user.id, stars: 1, category: "goals" } });
    if (!firstBagde) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "goals",
          stars: 1,
          shown: true,
          date: date,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({
        ok: true,
        showNewBadge: { newBadge: grabBadgeFromCatalog("goals", 1), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
      });
    }

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/list",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query;
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "GetGoal",
      },
      update: {},
    });
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });
    return res.status(200).send({ ok: true, data: goals });
  })
);

module.exports = router;
