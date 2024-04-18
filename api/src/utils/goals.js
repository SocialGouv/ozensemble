const prisma = require("../prisma");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const { grabBadgeFromCatalog, missedGoal } = require("../utils/badges");
const { GoalStatus } = require("@prisma/client");
const { checksConsecutiveDays } = require("./drinks");
dayjs.extend(isBetween);
dayjs.locale("fr");
dayjs.extend(weekday);

const syncBadgesWithGoals = async (matomoId, date) => {
  if (!matomoId) return null;
  const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user) return null;
  if (!user.goal_isSetup) return null;

  /* 1. get current goal if any */
  let currentGoal = await prisma.goal.findFirst({
    where: {
      userId: user.id,
      date: dayjs(date).startOf("week").format("YYYY-MM-DD"),
    },
  });
  if (!currentGoal) {
    currentGoal = await prisma.goal.create({
      data: {
        id: `${user.id}_${dayjs(date).startOf("week").format("YYYY-MM-DD")}`,
        userId: user.id,
        date: dayjs(date).startOf("week").format("YYYY-MM-DD"),
        daysWithGoalNoDrink: user.goal_daysWithGoalNoDrink,
        dosesByDrinkingDay: user.goal_dosesByDrinkingDay,
        dosesPerWeek: user.goal_dosesPerWeek,
        status: GoalStatus.InProgress,
      },
    });
  }

  /* 2. get all consos of the week */
  const weekConsos = await prisma.consommation.findMany({
    where: {
      userId: user.id,
      date: {
        gte: dayjs(date).utc().startOf("week").toDate(), // monday
        lte: dayjs(date).utc().endOf("week").toDate(), // sunday
      },
    },
    orderBy: { date: "desc" },
  });

  /* 3. check if goal is achieved */
  // we isolate this function to make it testable
  const goalCheck = await checkCurrentWeekGoal(currentGoal, weekConsos);

  if (!goalCheck.goalsAreSetup || !goalCheck.weekIsFilledWithConsos || !goalCheck.status) {
    return null;
  }
  await prisma.goal.update({
    where: { id: currentGoal.id },
    data: { status: goalCheck.status },
  });

  if (goalCheck.status === GoalStatus.Failure) {
    return missedGoal;
  }

  /* 4. check goal badges */
  // get the latest badge of the user
  const latestGoalBadge = await prisma.badge.findFirst({
    where: {
      userId: user.id,
      category: "goals",
    },
    orderBy: { stars: "desc" },
  });
  const goalsSuccessCount = await prisma.goal.count({
    where: { userId: user.id, status: GoalStatus.Success },
    orderBy: { date: "desc" },
  });

  // we isolate this function to make it testable
  const badgeToShow = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);

  if (badgeToShow) {
    await prisma.badge.create({
      data: {
        userId: user.id,
        category: "goals",
        date: dayjs().format("YYYY-MM-DD"),
        stars: badgeToShow.stars,
      },
    });
  }

  return badgeToShow;
};

const checkCurrentWeekGoal = async (currentGoal, weekConsos) => {
  if (!currentGoal) {
    return {
      goalsAreSetup: false,
      weekIsFilledWithConsos: false,
      status: null,
    };
  }
  const allDaysFilled = checksConsecutiveDays(7, weekConsos);
  if (!allDaysFilled) {
    return {
      goalsAreSetup: true,
      weekIsFilledWithConsos: false,
      status: null,
    };
  }
  const totalDoses = weekConsos
    .filter((drink) => drink.drinkKey !== "no-conso")
    .reduce((total, drink) => {
      return total + drink.doses * drink.quantity;
    }, 0);
  const totalDaysWithNoDrink = weekConsos.filter((drink) => drink.drinkKey === "no-conso").length;
  const goalAchieved = totalDoses <= currentGoal.dosesPerWeek && totalDaysWithNoDrink >= currentGoal.daysWithGoalNoDrink.length;

  return {
    goalsAreSetup: true,
    weekIsFilledWithConsos: true,
    status: goalAchieved ? GoalStatus.Success : GoalStatus.Failure,
  };
};

const getBadgeCorrespondingToGoalsSuccess = async (latestGoalBadge, goalsSuccessCount) => {
  if (!latestGoalBadge) return null;
  if (goalsSuccessCount >= 20) {
    if (latestGoalBadge.stars === 7) {
      return grabBadgeFromCatalog("goals", 8);
    }
  }
  if (goalsSuccessCount >= 10) {
    if (latestGoalBadge.stars === 6) {
      return grabBadgeFromCatalog("goals", 7);
    }
  }
  if (goalsSuccessCount >= 6) {
    if (latestGoalBadge.stars === 5) {
      return grabBadgeFromCatalog("goals", 6);
    }
  }
  if (goalsSuccessCount >= 4) {
    if (latestGoalBadge.stars === 4) {
      return grabBadgeFromCatalog("goals", 5);
    }
  }
  if (goalsSuccessCount >= 3) {
    if (latestGoalBadge.stars === 3) {
      return grabBadgeFromCatalog("goals", 4);
    }
  }
  if (goalsSuccessCount >= 2) {
    if (latestGoalBadge.stars === 2) {
      return grabBadgeFromCatalog("goals", 3);
    }
  }
  if (goalsSuccessCount >= 1) {
    // My last (and only) badge is the goal setup, with one star
    if (latestGoalBadge.stars === 1) {
      // => I just earned the first badge "One goal success", which is 2 stars's badge
      return grabBadgeFromCatalog("goals", 2);
    }
  }
  return null;
};

module.exports = {
  syncBadgesWithGoals,
  checkCurrentWeekGoal,
  getBadgeCorrespondingToGoalsSuccess,
};
