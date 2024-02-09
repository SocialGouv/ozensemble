const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const dayjs = require("dayjs");
const { grabBadgeFromCatalog, missedGoal, getBadgeCatalog } = require("../utils/badges");
dayjs.extend(isBetween);
dayjs.locale("fr");
dayjs.extend(weekday);

const checkIfThisWeekGoalAchieved = async (matomoId, appversion) => {
  try {
    if (!matomoId) return null;
    const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    if (!user) return null;
    const goalBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "goals" }, orderBy: { createdAt: "desc" } });
    // check if goal is achieved
    if (!!goalBadges.length) {
      const lastBadge = goalBadges[0];
      if (lastBadge && lastBadge.stars === 5) return null;
      if (lastBadge.stars !== 1 && dayjs(lastBadge.date).isBetween(dayjs().startOf("week"), dayjs().endOf("week"), "day", "[]")) {
        return null;
      }
    }

    const thisGoal = await prisma.goal.findFirst({
      where: { userId: user.id, status: "InProgress" },
    });
    if (!thisGoal) return null;
    const thisMonday = dayjs(thisGoal.date).startOf("week").toDate();
    const thisSunday = dayjs(thisGoal.date).endOf("week").toDate();
    const weekConsos = await prisma.consommation.findMany({
      where: { userId: user.id, date: { gte: thisMonday, lte: thisSunday } },
      orderBy: { date: "desc" },
    });
    const allDaysFilled = checksConsecutiveDays(weekConsos);
    const nextGoalStartDate = dayjs().add(1, "week").startOf("week").format("YYYY-MM-DD");
    if (!allDaysFilled && dayjs() > dayjs(thisGoal.date).add(1, "week").endOf("week")) {
      await prisma.goal.upsert({
        where: { id: `${user.id}_${nextGoalStartDate}` },
        create: {
          id: `${user.id}_${nextGoalStartDate}`,
          userId: user.id,
          date: nextGoalStartDate,
          daysWithGoalNoDrink: thisGoal.daysWithGoalNoDrink,
          dosesByDrinkingDay: thisGoal.dosesByDrinkingDay,
          dosesPerWeek: thisGoal.dosesPerWeek,
          status: "InProgress",
        },
        update: {},
      });
      await prisma.goal.update({
        where: { id: thisGoal.id },
        data: { status: "Failure" },
      });

      return { newBadge: missedGoal };
    }
    if (!allDaysFilled) return null;
    const totalDoses = weekConsos
      .filter((drink) => drink.drinkKey !== "no-conso")
      .reduce((total, drink) => {
        return total + drink.doses * drink.quantity;
      }, 0);
    const totalDaysWithNoDrink = weekConsos.filter((drink) => drink.drinkKey === "no-conso").length;
    const goalAchieved = totalDoses <= thisGoal.dosesPerWeek && totalDaysWithNoDrink >= thisGoal.daysWithGoalNoDrink.length;

    await prisma.goal.upsert({
      where: { id: `${user.id}_${nextGoalStartDate}` },
      create: {
        id: `${user.id}_${nextGoalStartDate}`,
        userId: user.id,
        date: nextGoalStartDate,
        daysWithGoalNoDrink: thisGoal.daysWithGoalNoDrink,
        dosesByDrinkingDay: thisGoal.dosesByDrinkingDay,
        dosesPerWeek: thisGoal.dosesPerWeek,
        status: "InProgress",
      },
      update: {},
    });
    if (!goalAchieved) {
      await prisma.goal.update({
        where: { id: thisGoal.id },
        data: { status: "Failure" },
      });
      return { newBadge: missedGoal };
    }
    if (goalAchieved) {
      await prisma.goal.update({
        where: { id: thisGoal.id },
        data: { status: "Success" },
      });
      const lastBadge = goalBadges[0];
      const newBadge = await prisma.badge.create({
        data: {
          userId: user.id,
          category: "goals",
          date: dayjs().format("YYYY-MM-DD"),
          stars: lastBadge ? lastBadge.stars + 1 : 1,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
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
