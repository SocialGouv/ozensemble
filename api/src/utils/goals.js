const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const dayjs = require("dayjs");
const { grabBadgeFromCatalog, missedGoal, getBadgeCatalog } = require("../utils/badges");
const { GoalStatus } = require("@prisma/client");
dayjs.extend(isBetween);
dayjs.locale("fr");
dayjs.extend(weekday);

const checkIfThisWeekGoalAchieved = async (matomoId, appversion) => {
  /*
  HOW IT WORKS RIGHT NOW
  1. we need to be able to change the goal without changing the previous goals
      example: my goal was 10 beers a week, but now I'm very strong I drink only 5 beers a week
      so I want to change my goal to 5 beers a week, but I want that my previous goals are still Success
  2. we need to give Badges when objective is Success -
      we decided that the backend was the brain to DISTRIBUTE THE BADGE based on goal's success - or not
      whereas we decided that the frontend was the brain to DISPLAY THE SUCCESS of the goal
      => we have two brains in the app, which is dangerous: if one braine is misfunctioning, the user is lost
      example: the frontend shows a goal SUCCESS but the user didn't receive a badge

  TODO:
  a. move the brain in the frontend only ? it means the frontend decides also to distribute the badge
    POTENTIAL PROBLEM: all the other badges are controlled from the backend, will it clash ? probably
  b. move the brain in the backend only ? it means we remove the "feature" of the app being able to work offline
    BUT
    if offline, badges doesn't exist
    when online, all consos are sync with the backend, so if we missed someting regarding the goal, we can catch up



   */
  try {
    if (!matomoId) return null;
    const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    if (!user) return null;
    const goalBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "goals" }, orderBy: { createdAt: "desc" } });
    // check if goal is achieved
    if (!!goalBadges.length) {
      const lastBadge = goalBadges[0];
      if (lastBadge) {
        const allBadgesAreGivenAlready = lastBadge.stars === 5;
        if (allBadgesAreGivenAlready) {
          // the user has all the badges already, nothing to do
          return null;
        }
        const goalIsSetupAlready = lastBadge.stars > 1;
        const badgeOfCurrentWeekAlreadyGiven = dayjs(lastBadge.date).isBetween(dayjs().startOf("week"), dayjs().endOf("week"), "day", "[]");
        if (goalIsSetupAlready && badgeOfCurrentWeekAlreadyGiven) {
          return null;
        }
      }
    }

    const currentGoalInProgress = await prisma.goal.findFirst({
      where: { userId: user.id, status: GoalStatus.InProgress },
    });
    if (!currentGoalInProgress) return null;
    const weekConsos = await prisma.consommation.findMany({
      where: {
        userId: user.id,
        date: {
          gte: dayjs(currentGoalInProgress.date).startOf("week").toDate(), // monday
          lte: dayjs(currentGoalInProgress.date).endOf("week").toDate(), // sunday
        },
      },
      orderBy: { date: "desc" },
    });
    const allDaysFilled = checksConsecutiveDays(weekConsos);
    const nextWeekGoalStartDate = dayjs().add(1, "week").startOf("week").format("YYYY-MM-DD");
    const createNextWeekGoal = prisma.goal.upsert({
      where: { id: `${user.id}_${nextWeekGoalStartDate}` },
      create: {
        id: `${user.id}_${nextWeekGoalStartDate}`,
        userId: user.id,
        date: nextWeekGoalStartDate,
        daysWithGoalNoDrink: currentGoalInProgress.daysWithGoalNoDrink,
        dosesByDrinkingDay: currentGoalInProgress.dosesByDrinkingDay,
        dosesPerWeek: currentGoalInProgress.dosesPerWeek,
        status: GoalStatus.InProgress,
      },
      update: {},
    });
    const currentGoalWasTwoWeeksAgo = dayjs() > dayjs(currentGoalInProgress.date).add(1, "week").endOf("week"); // we check if the user took too much time to fill up the goal. If so, we consider it as a failure
    if (!allDaysFilled && currentGoalWasTwoWeeksAgo) {
      await prisma.$transaction([
        prisma.goal.update({
          where: { id: currentGoalInProgress.id },
          data: { status: GoalStatus.Failure },
        }),
        createNextWeekGoal,
      ]);
      return { newBadge: missedGoal };
    }
    if (!allDaysFilled) {
      // nothing to do when consos are not all filled - we wait for the user to fill up everything
      return null;
    }
    //  it's time to check if the goal is a success or not - so the `InProgress` wil change to either `Failure`or `Success`
    const totalDoses = weekConsos
      .filter((drink) => drink.drinkKey !== "no-conso")
      .reduce((total, drink) => {
        return total + drink.doses * drink.quantity;
      }, 0);
    const totalDaysWithNoDrink = weekConsos.filter((drink) => drink.drinkKey === "no-conso").length;
    const goalAchieved = totalDoses <= currentGoalInProgress.dosesPerWeek && totalDaysWithNoDrink >= currentGoalInProgress.daysWithGoalNoDrink.length;

    if (!goalAchieved) {
      await prisma.$transaction([
        prisma.goal.update({
          where: { id: currentGoalInProgress.id },
          data: { status: GoalStatus.Failure },
        }),
        createNextWeekGoal,
      ]);
      return { newBadge: missedGoal };
    }
    if (goalAchieved) {
      const lastBadge = goalBadges[0];
      const [newBadge, allBadges] = await prisma.$transaction([
        prisma.badge.create({
          data: {
            userId: user.id,
            category: "goals",
            date: dayjs().format("YYYY-MM-DD"),
            stars: lastBadge ? lastBadge.stars + 1 : 1,
          },
        }),
        prisma.badge.findMany({ where: { userId: user.id } }),
        prisma.goal.update({
          where: { id: currentGoalInProgress.id },
          data: { status: GoalStatus.Success },
        }),
        createNextWeekGoal,
      ]);

      return { newBadge: grabBadgeFromCatalog("goals", newBadge.stars), allBadges, badgesCatalog: getBadgeCatalog(appversion) };
    }
  } catch (error) {
    capture(error, { user: { matomoId } });
  }
};

const checksConsecutiveDays = (consos, consecutiveDaysGoal = 7) => {
  if (!consos.length) return false;
  let consecutiveDays = 1;
  let currentConsoDate = dayjs(consos[0].date).startOf("day");
  let differenceDate;
  let consoDate;
  for (const conso of consos) {
    consoDate = dayjs(conso.date).startOf("day");
    differenceDate = dayjs(currentConsoDate).diff(dayjs(consoDate), "day");
    if (differenceDate === 0) {
      continue;
    }
    if (differenceDate > 1) {
      return false;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    if (consecutiveDays >= consecutiveDaysGoal) {
      return true;
    }
    currentConsoDate = consoDate;
  }
  return false;
};

module.exports = {
  checkIfThisWeekGoalAchieved,
};
