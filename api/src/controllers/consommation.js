const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { getBadgeCatalog } = require("../utils/badges");
const { syncGoalsWithConsos, syncAllGoalsWithConsos } = require("../utils/goals");
const { checksConsecutiveDays, syncDrinkBadgesWithConsos } = require("../utils/drinks");
const { authenticateToken } = require("../middlewares/tokenAuth");

router.post(
  "/init",
  authenticateToken, // Add authentication middleware
  catchErrors(async (req, res) => {
    // kept for retrocompatilibity
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/sync",
  authenticateToken, // Add authentication middleware
  catchErrors(async (req, res) => {
    const { drinks, drinksCatalog } = req.body;
    const user = req.user;

    if (!drinks.length) {
      await syncDrinkBadgesWithConsos(user.id);
      await syncAllGoalsWithConsos(user.id, true);
      return res.status(200).json({ ok: true });
    }

    for (const drink of drinks) {
      if (drink.drinkKey === "no-conso") {
        const drinkToSave = {
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
        return await prisma.consommation.upsert({
          where: { id: drink.id },
          update: drinkToSave,
          create: drinkToSave,
        });
      }
      const drinkFromCatalog = drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey);
      const drinkToSave = {
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
      await prisma.consommation.upsert({
        where: { id: drink.id },
        update: drinkToSave,
        create: drinkToSave,
      });
    }

    await syncDrinkBadgesWithConsos(user.id);
    await syncAllGoalsWithConsos(user.id, true);

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  authenticateToken,
  catchErrors(async (req, res) => {
    let user = req.user;

    const date = req.body.date;
    const conso_id = req.body.id;
    const conso = {
      name: req.body.name,
      drinkKey: req.body.drinkKey,
      quantity: req.body.quantity,
      doses: req.body.doses,
      kcal: req.body.kcal,
      price: req.body.price,
      volume: req.body.volume,
      date: dayjs(date).format(),
      userId: user.id,
    };

    if (conso.quantity === 0) {
      const consoDB = await prisma.consommation.findFirst({ where: { id: conso_id } });
      if (consoDB) {
        await prisma.consommation.delete({ where: { id: conso_id } });
      }
    } else {
      const consoDB = await prisma.consommation.upsert({
        where: { id: conso_id },
        update: conso,
        create: { ...conso, id: conso_id },
      });
    }

    await syncGoalsWithConsos(user, date);

    const drinksBadgeToShow = await syncDrinkBadgesWithConsos(matomoId);

    if (drinksBadgeToShow) {
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      return res.status(200).send({
        ok: true,
        showNewBadge: {
          newBadge: drinksBadgeToShow,
          allBadges,
          badgesCatalog: getBadgeCatalog(req.headers.appversion),
        },
      });
    }

    const inAppModal = await checkNPSAvailability(user);
    return res.status(200).send({ ok: true, showInAppModal: inAppModal });
  })
);

router.post(
  "/fix-missing-key",
  authenticateToken,
  catchErrors(async (req, res) => {
    const drinkKey = req.body.drinkKey;
    const conso_id = req.body.id;

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
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;
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

router.post(
  "/update-own-conso",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;
    const oldDrinkKey = req.body?.oldDrinkKey;
    const drinkKey = req.body?.drinkKey;
    const doses = req.body?.doses;
    const kcal = req.body?.kcal;
    const price = req.body?.price;
    const volume = req.body?.volume;

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
  authenticateToken, // Add authentication middleware
  catchErrors(async (req, res) => {
    const user = req.user;

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
