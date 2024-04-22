const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const dayjs = require("dayjs");
const prisma = require("../prisma");
const { grabBadgeFromCatalog, getBadgeCatalog } = require("../utils/badges");
const { GoalStatus } = require("@prisma/client");
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, daysWithGoalNoDrink, dosesByDrinkingDay, dosesPerWeek, noDisplayBadge, forceDate } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    /* 1. update user settings */
    /* 2. update current goal if any */
    /* 3. send badge if not yet sent */

    /* 1. update user settings */
    let user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "Goal",
        goal_isSetup: true,
        goal_daysWithGoalNoDrink: daysWithGoalNoDrink,
        goal_dosesByDrinkingDay: dosesByDrinkingDay,
        goal_dosesPerWeek: dosesPerWeek,
      },
      update: {
        goal_isSetup: true,
        goal_daysWithGoalNoDrink: daysWithGoalNoDrink,
        goal_dosesByDrinkingDay: dosesByDrinkingDay,
        goal_dosesPerWeek: dosesPerWeek,
      },
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
    if (thisWeekGoal && thisWeekGoal.status === "InProgress") {
      await prisma.goal.update({
        where: { id: thisWeekGoal.id },
        data: {
          daysWithGoalNoDrink,
          dosesByDrinkingDay,
          dosesPerWeek,
        },
      });
    } else {
      await prisma.goal.create({
        data: {
          id: `${user.id}_${dayjs(date).add(1, "week").startOf("week").format("YYYY-MM-DD")}`,
          userId: user.id,
          date: dayjs(date).add(1, "week").startOf("week").format("YYYY-MM-DD"),
          daysWithGoalNoDrink: user.goal_daysWithGoalNoDrink,
          dosesByDrinkingDay: user.goal_dosesByDrinkingDay,
          dosesPerWeek: user.goal_dosesPerWeek,
          status: GoalStatus.InProgress,
        },
      });
    }
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    if (!!noDisplayBadge) {
      return res.status(200).send({ ok: true, data: goals });
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
        data: goals,
        showNewBadge: { newBadge: grabBadgeFromCatalog("goals", 1), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
      });
    }

    return res.status(200).send({ ok: true, data: goals });
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
