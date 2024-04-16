const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const prisma = require("../prisma");
const { grabBadgeFromCatalog } = require("../utils/badges");
dayjs.extend(isBetween);
dayjs.locale("fr");
dayjs.extend(weekday);

async function syncBadgesWithConsos(matomoId) {
  if (!matomoId) return null;
  const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
  if (!user) return null;

  const latestDrinksBadge = await prisma.badge.findFirst({
    where: {
      userId: user.id,
      category: "drinks",
    },
    orderBy: { stars: "desc" },
  });
  if (latestDrinksBadge && latestDrinksBadge.stars === 8) {
    return null;
  }

  const allConsos = await prisma.consommation.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { date: "desc" },
  });

  const drinksConsecutiveDays = countConsecutiveDays(allConsos);

  // we isolate this function to make it testable
  const badgeToShow = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);

  if (badgeToShow) {
    await prisma.badge.create({
      data: {
        userId: user.id,
        category: "drinks",
        date: dayjs().format("YYYY-MM-DD"),
        stars: badgeToShow.stars,
      },
    });
  }

  return badgeToShow;
}

async function getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays) {
  if (!drinksConsecutiveDays) return null;
  if (drinksConsecutiveDays >= 180) {
    if (latestDrinksBadge.stars === 7) {
      return grabBadgeFromCatalog("drinks", 8);
    }
  }
  if (drinksConsecutiveDays >= 90) {
    if (latestDrinksBadge.stars === 6) {
      return grabBadgeFromCatalog("drinks", 7);
    }
  }
  if (drinksConsecutiveDays >= 60) {
    if (latestDrinksBadge.stars === 5) {
      return grabBadgeFromCatalog("drinks", 6);
    }
  }
  if (drinksConsecutiveDays >= 28) {
    if (latestDrinksBadge.stars === 4) {
      return grabBadgeFromCatalog("drinks", 5);
    }
  }
  if (drinksConsecutiveDays >= 14) {
    if (latestDrinksBadge.stars === 3) {
      return grabBadgeFromCatalog("drinks", 4);
    }
  }
  if (drinksConsecutiveDays >= 7) {
    if (latestDrinksBadge.stars === 2) {
      return grabBadgeFromCatalog("drinks", 3);
    }
  }
  if (drinksConsecutiveDays >= 3) {
    if (latestDrinksBadge.stars === 1) {
      return grabBadgeFromCatalog("drinks", 2);
    }
  }
  if (drinksConsecutiveDays >= 1) {
    if (!latestDrinksBadge) {
      return grabBadgeFromCatalog("drinks", 1);
    }
  }
  return null;
}

function countConsecutiveDays(allConsos) {
  if (!allConsos.length) return 0;
  let consecutiveDays = 1;
  let currentConsoDate = dayjs(allConsos[0].date).startOf("day");
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date).startOf("day");
    differenceDate = currentConsoDate.diff(consoDate, "day");
    if (differenceDate === 0) {
      continue;
    }
    if (differenceDate > 1) {
      return consecutiveDays;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    currentConsoDate = consoDate;
  }
  return consecutiveDays;
}

function checksConsecutiveDays(consecutiveDaysGoal, allConsos) {
  if (!allConsos.length) return false;
  let consecutiveDays = 1;
  let currentConsoDate = dayjs(allConsos[0].date).startOf("day");
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date).startOf("day");
    differenceDate = currentConsoDate.diff(consoDate, "day");
    if (differenceDate === 0) {
      continue;
    }
    if (differenceDate > 1) {
      consecutiveDays = 1;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    // differenceDate === 1;
    if (consecutiveDays >= consecutiveDaysGoal) {
      return true;
    }
    currentConsoDate = consoDate;
  }
  return false;
}

module.exports = {
  getBadgeCorrespondingToConsecutiveDays,
  countConsecutiveDays,
  checksConsecutiveDays,
  syncBadgesWithConsos,
};
