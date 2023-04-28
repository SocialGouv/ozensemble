const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const dayjs = require("dayjs");
const prisma = require("../prisma");
const { grabBadgeFromCatalog, badgesCatalog } = require("../badges");
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
      },
      update: {},
    });
    let date;
    if (forceDate) {
      date = forceDate;
      const inprogressGoal = await prisma.goal.findFirst({ where: { userId: user.id, status: "InProgress" } });
      if (inprogressGoal) {
        await prisma.goal.update({ where: { id: inprogressGoal.id }, data: { status: "Failure" } });
      }
    } else {
      date = dayjs().startOf("week").format("YYYY-MM-DD");
    }

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

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("goals", 1), allBadges, badgesCatalog } });
    }

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/list",
  catchErrors(async (req, res) => {
    const { matomoId, firstDay, lastDay } = req.query;
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
    });
    let listGoal = [];
    if (goals) {
      goals.map((goal) => {
        console.log(dayjs(goal.date).format("YYYY-MM-DD"), dayjs(firstDay).format("YYYY-MM-DD"), dayjs(lastDay).format("YYYY-MM-DD"));
        if (dayjs(goal.date).diff(lastDay, "day") <= 0 && dayjs(goal.date).diff(firstDay, "day") >= 0) {
          listGoal = [...listGoal, goal];
        }
      });
    }
    console.log(listGoal);
    return res.status(200).send({ ok: true, data: listGoal });
  })
);

module.exports = router;
