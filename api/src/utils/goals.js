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

const syncGoalsWithConsos = async (user, date) => {
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
        shown: false,
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

function getStarsCorrespondingToGoalsSuccess(goalsSuccessCount) {
  if (!goalsSuccessCount) return null;
  if (goalsSuccessCount >= 20) return 8;
  if (goalsSuccessCount >= 10) return 7;
  if (goalsSuccessCount >= 6) return 6;
  if (goalsSuccessCount >= 4) return 5;
  if (goalsSuccessCount >= 3) return 4;
  if (goalsSuccessCount >= 2) return 3;
  if (goalsSuccessCount >= 1) return 2;
  return 1;
}

async function syncAllGoalsWithConsos(userId, fixGoals = false, debug = false) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      consommations: {
        orderBy: { date: "desc" },
      },
      goals: {
        orderBy: { date: "desc" },
      },
    },
  });

  if (!user) return;
  if (!user.goal_isSetup) return;
  // 2. check if goals are existing
  const startOfWeeksForDrinks = {};
  for (const conso of user.consommations) {
    const startOfWeek = dayjs(conso.date).utc().startOf("week").format("YYYY-MM-DD");
    startOfWeeksForDrinks[startOfWeek] = startOfWeeksForDrinks[startOfWeek] || [];
    startOfWeeksForDrinks[startOfWeek].push(conso);
  }
  // NOTE: if the user setup the goals, it doesn'tmean he setup for the previous drinks
  // so we don't need to check if the goals are existing for all the drinks
  // (also we don'tknow when the user setup the goals, so we can't know when to start checking the goals)
  // the best we can do is to check the oldest goal,
  // and see if since then there is a goal for every week the user drank
  const startOfWeeksForGoals = {};
  let oldestGoalDate = null;
  let latestGoal = null;
  for (const goal of user.goals) {
    startOfWeeksForGoals[goal.date] = goal;
    if (!oldestGoalDate || goal.date < oldestGoalDate) {
      oldestGoalDate = goal.date;
      if (!latestGoal) {
        latestGoal = goal;
      }
    } else {
      latestGoal = goal;
    }
  }
  for (const [startOfWeek, weekConsos] of Object.entries(startOfWeeksForDrinks)) {
    // if (debug) console.log("CHECKING GOAL", user.id, startOfWeek, oldestGoalDate);
    if (oldestGoalDate && startOfWeek < oldestGoalDate) {
      continue;
    }
    let goal = startOfWeeksForGoals[startOfWeek];
    let goalIsNew = false;
    if (!goal) {
      if (debug) console.log("NO GOAL", user.id, startOfWeek);
      if (!latestGoal) {
        if (debug) console.log("NO LATEST GOAL", user.id, startOfWeek, oldestGoalDate, startOfWeeksForGoals);
        goal = {
          id: `${user.id}_${startOfWeek}`,
          userId: user.id,
          date: startOfWeek,
          daysWithGoalNoDrink: user.goal_daysWithGoalNoDrink,
          dosesByDrinkingDay: user.goal_dosesByDrinkingDay,
          dosesPerWeek: user.goal_dosesPerWeek,
        };
      } else {
        goal = {
          id: `${user.id}_${startOfWeek}`,
          userId: user.id,
          date: startOfWeek,
          daysWithGoalNoDrink: latestGoal.daysWithGoalNoDrink,
          dosesByDrinkingDay: latestGoal.dosesByDrinkingDay,
          dosesPerWeek: latestGoal.dosesPerWeek,
        };
      }
      goalIsNew = true;
    } else {
      latestGoal = goal;
    }
    /* 3. check if goal is achieved */
    // we isolate this function to make it testable
    const goalCheck = await checkCurrentWeekGoal(goal, weekConsos);

    if (goal.status === "InProgress" && goalCheck.status === null && !goalCheck.weekIsFilledWithConsos) {
      // if (debug) console.log("GOAL IN PROGRESS", user.id, startOfWeek);
      continue;
    }
    if (goal.status === "Failure" && goalCheck.status === "Failure") {
      // if (debug) console.log("GOAL FAILURE", user.id, startOfWeek);
      continue;
    }
    if (goal.status === "Success" && goalCheck.status === "Success") {
      // if (debug) console.log("GOAL SUCCESS", user.id, startOfWeek);
      continue;
    }
    if (goalIsNew) {
      if (debug) console.log("GOAL NEW", user.id, startOfWeek);
      goal.status = goalCheck.status ?? "InProgress";
      if (fixGoals) {
        await prisma.goal.create({
          data: goal,
        });
      }
      continue;
    }
    // now, there is a problem, let's do something about it
    // case 1: because we didn't set `utc`, and because sometimes the `no-conso` date is at 00:00:00,
    // the check for consecutive days is sometimes wrong
    // example: 2021-09-27 00:00:00 is considered to be  2021-09-26, whereas it should stay 2021-09-27
    // because of that, the goal is considered to be failed whereas it should stay in progress
    if (goalCheck.status === null && !goalCheck.weekIsFilledWithConsos && goal.status === "Failure") {
      if (debug) console.log("GOAL FAILURE MISMATCH TO FIX IN PROGRESS", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "InProgress" },
        });
      }
      continue;
    }
    // because of that, the goal is considered to be in progress whereas it should be failed/success
    if (goalCheck.status === "Failure" && goal.status === "InProgress") {
      if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX FAILURE", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "Failure" },
        });
      }
      continue;
    }
    if (goalCheck.status === "Success" && goal.status === "InProgress") {
      if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX SUCCESS", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "Success" },
        });
      }
      continue;
    }
    // case 2: because there was a bug somehow, sometimes the goal has a wrong status
    if (goalCheck.status === "Failure" && goal.status === "Success") {
      if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX FAILURE", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "Failure" },
        });
      }
      continue;
    }
    if (goalCheck.status === "Success" && goal.status === "Failure") {
      if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX SUCCESS", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "Success" },
        });
      }
      continue;
    }
    if (goalCheck.status === null && goal.status === "Success") {
      if (debug) console.log("GOAL SUCCESS MISMATCH TO FIX IN PROGRESS", user.id, startOfWeek);
      if (fixGoals) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { status: "InProgress" },
        });
      }
      continue;
    }
    console.log("GOAL MISMATCH", JSON.stringify({ goal, goalCheck }, null, 2));
  }
}

async function syncBadgesWithGoals(userId, fixBadges = false) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      badges: {
        orderBy: { stars: "desc" },
      },
      goals: {
        where: {
          status: "Success",
        },
      },
    },
  });

  const numberOfStarsForThoseGoals = getStarsCorrespondingToGoalsSuccess(user.goals.length);
  const biggestDrinksBadge = user.badges.find((b) => b.category === "goals")?.stars;
  if (numberOfStarsForThoseGoals > biggestDrinksBadge) {
    if (fixBadges) {
      for (let i = biggestDrinksBadge + 1; i <= numberOfStarsForThoseGoals; i++) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "goals",
            date: dayjs().format("YYYY-MM-DD"),
            stars: i,
            shown: true,
          },
        });
      }
    }
  }
}

module.exports = {
  syncGoalsWithConsos,
  checkCurrentWeekGoal,
  getBadgeCorrespondingToGoalsSuccess,
  getStarsCorrespondingToGoalsSuccess,
  syncAllGoalsWithConsos,
  syncBadgesWithGoals,
};
