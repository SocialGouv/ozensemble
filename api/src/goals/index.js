const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const dayjs = require("dayjs");
const { badgesCatalog, grabBadgeFromCatalog, missedGoal } = require("../badges");
dayjs.extend(isBetween);
dayjs.locale("fr");
dayjs.extend(weekday);

const checkIfLastWeekGoalAchieved = async (matomoId) => {
  try {
    if (!matomoId) return null;
    const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    if (!user) return null;
    const goalBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "goals" }, orderBy: { createdAt: "desc" } });
    // check if goal is achieved
    if (!!goalBadges.length) {
      const lastBadge = goalBadges[0];
      if (lastBadge && lastBadge.stars === 5) return null;
      if (dayjs(lastBadge.date).isBetween(dayjs().startOf("week"), dayjs().endOf("week"), "day", "[]")) {
        return null;
      }
    }

    const lastGoal = await prisma.goal.findFirst({
      where: { userId: user.id, status: "InProgress", date: { lt: dayjs().startOf("week").format("YYYY-MM-DD") } },
    });
    if (!lastGoal) return null;
    const lastMonday = dayjs().add(-1, "week").startOf("week").toDate();
    const lastSunday = dayjs().add(-1, "week").endOf("week").toDate();
    const weekConsos = await prisma.consommation.findMany({
      where: { userId: user.id, date: { gte: lastMonday, lte: lastSunday } },
      orderBy: { date: "desc" },
    });
    const allDaysFilled = checksConsecutiveDays(weekConsos);
    if (!allDaysFilled) return null;
    const totalDoses = weekConsos.filter((drink) => drink.drinkKey !== "no-conso").reduce((total, drink) => total + drink.doses * drink.quantity, 0);
    const totalDaysWithNoDrink = weekConsos.filter((drink) => drink.drinkKey === "no-conso").length;
    const goalAchieved = totalDoses <= lastGoal.dosesPerWeek && totalDaysWithNoDrink >= lastGoal.daysWithGoalNoDrink.length;

    const nextGoalStartDate = dayjs().startOf("week").format("YYYY-MM-DD");
    await prisma.goal.upsert({
      where: { id: `${user.id}_${nextGoalStartDate}` },
      create: {
        id: `${user.id}_${nextGoalStartDate}`,
        userId: user.id,
        date: nextGoalStartDate,
        daysWithGoalNoDrink: lastGoal.daysWithGoalNoDrink,
        dosesByDrinkingDay: lastGoal.dosesByDrinkingDay,
        dosesPerWeek: lastGoal.dosesPerWeek,
        status: "InProgress",
      },
      update: {},
    });

    if (!goalAchieved) {
      await prisma.goal.update({
        where: { id: lastGoal.id },
        data: { status: "Failure" },
      });
      return { newBadge: missedGoal };
    }
    if (goalAchieved) {
      await prisma.goal.update({
        where: { id: lastGoal.id },
        data: { status: "Success" },
      });
      const lastBadge = goalBadges[0];
      const newBadge = await prisma.badge.create({
        data: {
          userId: user.id,
          category: "goals",
          stars: lastBadge ? lastBadge.stars + 1 : 1,
        },
      });
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      return { newBadge: grabBadgeFromCatalog("goals", newBadge.stars), allBadges, badgesCatalog };
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
  checkIfLastWeekGoalAchieved,
};
