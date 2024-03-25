const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { getBadgeCatalog, grabBadgeFromCatalog } = require("../utils/badges");
const { checkIfThisWeekGoalAchieved, checkGoalState } = require("../utils/goals");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    // kept for retrocompatilibity
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/sync",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const { drinks, drinksCatalog } = req.body;

    if (!drinks.length) return res.status(200).json({ ok: true });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    const drinksToSave = drinks.map((drink) => {
      if (drink.drinkKey === "no-conso") {
        return {
          id: drink.id,
          drinkKey: drink.drinkKey,
          name: drink.drinkKey,
          quantity: Number(drink.quantity),
          date: dayjs(drink.timestamp).format(),
          userId: user.id,
          doses: 0,
          kcal: 0,
          price: 0,
          volume: "",
        };
      }
      const drinkFromCatalog = drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey);
      return {
        id: drink.id,
        drinkKey: drink.drinkKey,
        name: drinkFromCatalog.displayDrinkModal,
        quantity: drink.quantity,
        date: dayjs(drink.timestamp).format(),
        userId: user.id,
        doses: Number(drinkFromCatalog.doses),
        kcal: Number(drinkFromCatalog.kcal),
        price: Number(drinkFromCatalog.price),
        volume: drinkFromCatalog.volume,
      };
    });

    await prisma.consommation.createMany({
      data: drinksToSave,
      skipDuplicates: true,
    });

    const allDrinks = await prisma.consommation.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    // check if new badge or not
    // check if all badges
    // get all the consos ordered by dates, check consecutive days, check if enough for to get a new badge
    const drinksBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "drinks" } });
    // if badge 1 day is not present
    // handle 1 day

    if (!drinksBadges.find((badge) => badge.stars === 1)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "drinks",
          stars: 1,
        },
      });
    }

    // if badge 3 day is not present
    // handle 3 days
    if (!drinksBadges.find((badge) => badge.stars === 2)) {
      const enoughConsecutiveDays = checksConsecutiveDays(3, allDrinks);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 2,
          },
        });
      }
    }

    // if badge 7 day is not present
    // handle 7 days
    if (!drinksBadges.find((badge) => badge.stars === 3)) {
      const enoughConsecutiveDays = checksConsecutiveDays(7, allDrinks);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 3,
          },
        });
      }
    }
    // if badge 14 day is not present
    // handle 14 days
    if (!drinksBadges.find((badge) => badge.stars === 4)) {
      const enoughConsecutiveDays = checksConsecutiveDays(14, allDrinks);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 4,
          },
        });
      }
    }

    // if badge 28 day is not present
    // handle 28 days
    if (!drinksBadges.find((badge) => badge.stars === 5)) {
      const enoughConsecutiveDays = checksConsecutiveDays(28, allDrinks);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 5,
          },
        });
      }
    }

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const name = req.body.name;
    const drinkKey = req.body.drinkKey;
    const quantity = req.body.quantity;
    const date = req.body.date;
    const doses = req.body.doses;
    const kcal = req.body.kcal;
    const price = req.body.price;
    const volume = req.body.volume;
    const conso_id = req.body.id;
    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    //check if it should be deleted
    if (quantity === 0) {
      const conso = await prisma.consommation.findFirst({ where: { id: conso_id } });
      if (conso) {
        await prisma.consommation.delete({ where: { id: conso_id } });
      }
    } else {
      // create / update conso
      await prisma.consommation.upsert({
        where: { id: conso_id },
        update: {
          name: name,
          drinkKey: drinkKey,
          quantity: quantity,
          userId: user.id,
          doses: doses,
          kcal: kcal,
          price: price,
          volume: volume,
          date: dayjs(date).format(),
        },
        create: {
          name: name,
          drinkKey: drinkKey,
          quantity: quantity,
          userId: user.id,
          doses: doses,
          kcal: kcal,
          price: price,
          volume: volume,
          date: dayjs(date).format(),
          id: conso_id,
        },
      });
    }

    await checkGoalState(matomoId, date);
    const showGoalNewBadge = await checkIfThisWeekGoalAchieved(matomoId, req.headers.appversion);

    const drinksBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "drinks" } });

    if (!drinksBadges.find((badge) => badge.stars === 1)) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "drinks",
          stars: 1,
        },
      });

      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

      return res.status(200).send({
        ok: true,
        showNewBadge: showGoalNewBadge
          ? showGoalNewBadge
          : { newBadge: grabBadgeFromCatalog("drinks", 1), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
      });
    }

    // if badge 3 day is not present
    // handle 3 days
    if (!drinksBadges.find((badge) => badge.stars === 2)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(3, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 2,
          },
        });

        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 2), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }

    // if badge 7 day is not present
    // handle 7 days
    if (!drinksBadges.find((badge) => badge.stars === 3)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(7, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 3,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 3), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    // if badge 14 day is not present
    // handle 14 days
    if (!drinksBadges.find((badge) => badge.stars === 4)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(14, allConsos);

      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 4,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 4), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    // if badge 28 day is not present
    // handle 28 days
    if (!drinksBadges.find((badge) => badge.stars === 5)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(28, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 5,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 5), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    if (!drinksBadges.find((badge) => badge.stars === 6)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(60, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 6,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 6), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    if (!drinksBadges.find((badge) => badge.stars === 7)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(90, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 7,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 7), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    if (!drinksBadges.find((badge) => badge.stars === 8)) {
      const allConsos = await prisma.consommation.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
      });
      const enoughConsecutiveDays = checksConsecutiveDays(180, allConsos);
      if (enoughConsecutiveDays) {
        await prisma.badge.create({
          data: {
            userId: user.id,
            category: "drinks",
            stars: 8,
          },
        });
        const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });

        return res.status(200).send({
          ok: true,
          showNewBadge: showGoalNewBadge
            ? showGoalNewBadge
            : { newBadge: grabBadgeFromCatalog("drinks", 8), allBadges, badgesCatalog: getBadgeCatalog(req.headers.appversion) },
        });
      }
      const inAppModal = await checkNPSAvailability(user, allConsos);
      return res.status(200).send({ ok: true, showInAppModal: inAppModal });
    }
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/fix-missing-key",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const drinkKey = req.body.drinkKey;
    const conso_id = req.body.id;
    // find user with matomoId

    await prisma.consommation.update({
      where: { id: conso_id },
      data: {
        drinkKey: drinkKey,
      },
    });
    return res.status(200).send({ ok: true });
  })
);

router.delete(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const user = await prisma.user.findFirst({ where: { matomo_id: matomoId } });
    const conso_id = req.body.id;
    const consommation = await prisma.consommation.findFirst({
      where: { id: conso_id },
    });
    if (!consommation) {
      return res.status(200).send({ ok: true });
    }
    await prisma.consommation.deleteMany({
      where: { userId: user.id, date: consommation.date },
    });
    return res.status(200).send({ ok: true });
  })
);

const checksConsecutiveDays = (consecutiveDaysGoal, allConsos) => {
  let consecutiveDays = 1;

  if (!allConsos.length) {
    return false;
  }
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
};

const NPSInAppMessage = {
  id: "@NPSDone",
  title: "5 sec pour nous aider à améliorer l'application\u00A0?",
  content: `Nous construisons l'application ensemble et __votre avis sera pris en compte dans les prochaines mises à jour.__ Merci d'avance\u00A0!`,
  CTATitle: "Je donne mon avis sur Oz",
  CTANavigation: ["NPS_SCREEN", { triggeredFrom: "5 seconds for NPS" }],
};

const checkNPSAvailability = async (user, drinks) => {
  const npsDone = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSDone` } });
  if (npsDone) return null;
  const enoughConsecutiveDays = checksConsecutiveDays(4, drinks);
  if (!enoughConsecutiveDays) return null;
  const npsAsked3 = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSAsked3` } });
  if (npsAsked3) return null;

  const npsAsked2 = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSAsked2` } });

  const now = dayjs();

  if (npsAsked2) {
    if (dayjs(npsAsked2.date).diff(now, "day") < 7) {
      return null;
    }
    await prisma.appMilestone.create({
      data: {
        id: `${user.id}_@NPSAsked3`,
        date: now.format("YYYY-MM-DD"),
        userId: user.id,
      },
    });
    return NPSInAppMessage;
  }

  const npsAsked1 = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSAsked1` } });
  if (npsAsked1) {
    if (dayjs(npsAsked1.date).diff(now, "day") < 7) {
      return null;
    }
    await prisma.appMilestone.create({
      data: {
        id: `${user.id}_@NPSAsked2`,
        date: now.format("YYYY-MM-DD"),
        userId: user.id,
      },
    });
    return NPSInAppMessage;
  }
  await prisma.appMilestone.create({
    data: {
      id: `${user.id}_@NPSAsked1`,
      date: now.format("YYYY-MM-DD"),
      userId: user.id,
    },
  });
  return NPSInAppMessage;
};

router.post(
  "/update-own-conso",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const oldDrinkKey = req.body?.oldDrinkKey;
    const drinkKey = req.body?.drinkKey;
    const doses = req.body?.doses;
    const kcal = req.body?.kcal;
    const price = req.body?.price;
    const volume = req.body?.volume;

    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    await prisma.consommation.updateMany({
      where: { userId: user.id, drinkKey: oldDrinkKey },
      data: {
        drinkKey: drinkKey,
        doses: doses,
        kcal: kcal,
        price,
        volume: volume,
      },
    });

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/get-all-consos",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    const consos = await prisma.consommation.findMany({
      where: { userId: user.id },
      orderBy: {
        date: "asc",
      },
    });

    return res.status(200).send({ ok: true, data: consos });
  })
);

module.exports = router;
