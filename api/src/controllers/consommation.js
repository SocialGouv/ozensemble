const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");
const { checkIfLastWeekGoalAchieved } = require("../goals");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const { drinks, drinksCatalog } = req.body;

    if (!drinks.length) return res.status(200).json({ ok: true });

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

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
        quantity: Number(drink.quantity),
        date: dayjs(drink.timestamp).format(),
        userId: user.id,
        doses: drinkFromCatalog.doses,
        kcal: drinkFromCatalog.kcal,
        price: drinkFromCatalog.price,
        volume: drinkFromCatalog.volume,
      };
    });

    await prisma.consommation.createMany({
      data: drinksToSave,
      skipDuplicates: true, // Skip 'Bobo'
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
      const enoughConsecutiveDays = await checksConsecutiveDays(3, user.id);
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
      const enoughConsecutiveDays = await checksConsecutiveDays(7, user.id);
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
      const enoughConsecutiveDays = await checksConsecutiveDays(14, user.id);

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
      const enoughConsecutiveDays = await checksConsecutiveDays(28, user.id);
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

    const showGoalNewBadge = await checkIfLastWeekGoalAchieved(matomoId);
    console.log("showGoalNewBadge", showGoalNewBadge);

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

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("drinks", 1), allBadges, badgesCatalog } });
    }

    // if badge 3 day is not present
    // handle 3 days
    if (!drinksBadges.find((badge) => badge.stars === 2)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(3, user.id);
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
          showNewBadge: {
            newBadge: showGoalNewBadge?.newBadge || grabBadgeFromCatalog("drinks", 2),
            allBadges,
            badgesCatalog,
          },
        });
      }
    }

    // if badge 7 day is not present
    // handle 7 days
    if (!drinksBadges.find((badge) => badge.stars === 3)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(7, user.id);
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
          showNewBadge: {
            newBadge: showGoalNewBadge?.newBadge || grabBadgeFromCatalog("drinks", 3),
            allBadges,
            badgesCatalog,
          },
        });
      }
    }
    // if badge 14 day is not present
    // handle 14 days
    if (!drinksBadges.find((badge) => badge.stars === 4)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(14, user.id);

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
          showNewBadge: {
            newBadge: showGoalNewBadge?.newBadge || grabBadgeFromCatalog("drinks", 4),
            allBadges,
            badgesCatalog,
          },
        });
      }
    }

    // if badge 28 day is not present
    // handle 28 days
    if (!drinksBadges.find((badge) => badge.stars === 5)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(28, user.id);
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
          showNewBadge: {
            newBadge: showGoalNewBadge?.newBadge || grabBadgeFromCatalog("drinks", 5),
            allBadges,
            badgesCatalog,
          },
        });
      }
    }

    if (showGoalNewBadge?.newBadge) return res.status(200).send({ ok: true, showNewBadge: showGoalNewBadge });
    return res.status(200).send({ ok: true });
  })
);

router.delete(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const conso_id = req.body.id;
    // create / update conso
    await prisma.consommation.delete({
      where: { id: conso_id },
    });
  })
);

const checksConsecutiveDays = async (consecutiveDaysGoal, userId) => {
  let consecutiveDays = 1;
  let currentConsoDate = dayjs();
  const allConsos = await prisma.consommation.findMany({
    where: { userId: userId },
    orderBy: { date: "desc" },
  });
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date);
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

module.exports = router;
