const dayjs = require("dayjs");
require("dayjs/locale/fr");
const isBetween = require("dayjs/plugin/isBetween");
const weekday = require("dayjs/plugin/weekday");
const utc = require("dayjs/plugin/utc");
const prisma = require("../prisma");
const { grabBadgeFromCatalog } = require("../utils/badges");
const { capture } = require("../third-parties/sentry");
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.locale("fr");
dayjs.extend(weekday);

async function syncDrinkBadgesWithConsos(matomoId) {
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
  if (latestDrinksBadge && latestDrinksBadge?.stars === 8) {
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
    if (latestDrinksBadge?.stars === 7) {
      return grabBadgeFromCatalog("drinks", 8);
    }
  }
  if (drinksConsecutiveDays >= 90) {
    if (latestDrinksBadge?.stars === 6) {
      return grabBadgeFromCatalog("drinks", 7);
    }
  }
  if (drinksConsecutiveDays >= 60) {
    if (latestDrinksBadge?.stars === 5) {
      return grabBadgeFromCatalog("drinks", 6);
    }
  }
  if (drinksConsecutiveDays >= 28) {
    if (latestDrinksBadge?.stars === 4) {
      return grabBadgeFromCatalog("drinks", 5);
    }
  }
  if (drinksConsecutiveDays >= 14) {
    if (latestDrinksBadge?.stars === 3) {
      return grabBadgeFromCatalog("drinks", 4);
    }
  }
  if (drinksConsecutiveDays >= 7) {
    if (latestDrinksBadge?.stars === 2) {
      return grabBadgeFromCatalog("drinks", 3);
    }
  }
  if (drinksConsecutiveDays >= 3) {
    if (latestDrinksBadge?.stars === 1) {
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

function getStarsCorrespondingToConsecutiveDays(drinksConsecutiveDays) {
  if (!drinksConsecutiveDays) return null;
  if (drinksConsecutiveDays >= 180) return 8;
  if (drinksConsecutiveDays >= 90) return 7;
  if (drinksConsecutiveDays >= 60) return 6;
  if (drinksConsecutiveDays >= 28) return 5;
  if (drinksConsecutiveDays >= 14) return 4;
  if (drinksConsecutiveDays >= 7) return 3;
  if (drinksConsecutiveDays >= 3) return 2;
  if (drinksConsecutiveDays >= 1) return 1;
  return null;
}

function countConsecutiveDays(allConsos) {
  if (!allConsos.length) return 0;
  let consecutiveDays = 1;
  // date is 2023-10-10 00:00:00 and is at time of the device
  // we just take the date without the time
  let currentConsoDate = dayjs(allConsos[0].date).toISOString().split("T")[0];
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date).toISOString().split("T")[0];
    differenceDate = dayjs(currentConsoDate).diff(dayjs(consoDate), "day");
    if (differenceDate < 0) {
      capture(new Error("Conso dates are not ordered"), {
        extra: {
          allConsos,
        },
      });
    }

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
  // date is 2023-10-10 00:00:00 and is at time of the device
  // we just take the date without the time
  let currentConsoDate = dayjs(allConsos[0].date).toISOString().split("T")[0];
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date).toISOString().split("T")[0];
    differenceDate = dayjs(currentConsoDate).diff(dayjs(consoDate), "day");
    // if (debug) {
    //   console.log("------------------------------------------------------------");
    //   console.log("allConsos[0].date", allConsos[0].date);
    //   console.log("currentConsoDate", currentConsoDate);
    //   console.log("conso.date", conso.date);
    //   console.log("consoDate", consoDate);
    //   console.log("differenceDate", differenceDate);
    // }
    if (differenceDate < 0) {
      capture(new Error("Conso dates are not ordered"), {
        extra: {
          allConsos,
        },
      });
    }
    // if (conso.userId === "000b83f0-6c52-4dce-999c-e22bf7800c3e") {
    //   console.log("------------------------------------------------------------");
    //   console.log("currentConsoDate", currentConsoDate.format("YYYY-MM-DD"));
    //   console.log("consoDate", consoDate.format("YYYY-MM-DD"));
    //   console.log("differenceDate", differenceDate);
    // }
    if (differenceDate === 0) {
      continue;
    }
    if (differenceDate > 1) {
      consecutiveDays = 1;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    // if (debug) {
    //   console.log("consecutiveDays", consecutiveDays);
    // }
    // differenceDate === 1;
    if (consecutiveDays >= consecutiveDaysGoal) {
      return true;
    }
    currentConsoDate = consoDate;
  }
  return false;
}

function countMaxConsecutiveDays(allConsos) {
  if (!allConsos.length) return 0;
  let consecutiveDays = 1;
  // date is 2023-10-10 00:00:00 and is at time of the device
  // we just take the date without the time
  let currentConsoDate = dayjs(allConsos[0].date).toISOString().split("T")[0];
  let differenceDate;
  let consoDate;
  let maxConsecutiveDays = 1;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date).toISOString().split("T")[0];
    differenceDate = dayjs(currentConsoDate).diff(dayjs(consoDate), "day");
    if (differenceDate < 0) {
      capture(new Error("Conso dates are not ordered"), {
        extra: {
          allConsos,
        },
      });
    }
    if (differenceDate === 0) {
      continue;
    }
    if (differenceDate > 1) {
      consecutiveDays = 1;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    if (consecutiveDays > maxConsecutiveDays) {
      maxConsecutiveDays = consecutiveDays;
    }
    currentConsoDate = consoDate;
  }
  return maxConsecutiveDays;
}

module.exports = {
  syncDrinkBadgesWithConsos,
  getBadgeCorrespondingToConsecutiveDays,
  getStarsCorrespondingToConsecutiveDays,
  countConsecutiveDays,
  checksConsecutiveDays,
  countMaxConsecutiveDays,
};
