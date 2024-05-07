const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { getBadgeCatalog } = require("../utils/badges");
const { syncGoalsWithConsos, syncAllGoalsWithConsos } = require("../utils/goals");
const { checksConsecutiveDays, syncDrinkBadgesWithConsos } = require("../utils/drinks");

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

    if (!drinks.length) {
      await syncDrinkBadgesWithConsos(matomoId);

      await syncAllGoalsWithConsos(matomoId, true);

      // TODO: uncomment this line when the notifications for goals sync is sent
      // await syncBadgesWithGoals(matomoId, true);
      return res.status(200).json({ ok: true });
    }

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

    await syncDrinkBadgesWithConsos(matomoId);

    await syncAllGoalsWithConsos(matomoId, true);

    // TODO: uncomment this line when the notifications for goals sync is sent
    // await syncBadgesWithGoals(matomoId, true);

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    /* 1. save conso in DB */

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    const date = req.body.date;
    const conso_id = req.body.id; // setup in frontend
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
      console.log("conso upserted", consoDB._id);
    }

    /* 2. SIDE EFFECTS */

    // note: the `date` can be ANY date, not just today,
    // because the user can update a conso from any date
    await syncGoalsWithConsos(matomoId, date);

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

const NPSInAppMessage = {
  id: "@NPSDone",
  title: "5 sec pour nous aider à améliorer l'application\u00A0?",
  content: `Nous construisons l'application ensemble et __votre avis sera pris en compte dans les prochaines mises à jour.__ Merci d'avance\u00A0!`,
  CTATitle: "Je donne mon avis sur Oz",
  CTANavigation: ["NPS_SCREEN", { triggeredFrom: "5 seconds for NPS" }],
};

const checkNPSAvailability = async (user) => {
  const npsDone = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSDone` } });
  if (npsDone) return null;
  const npsAsked3 = await prisma.appMilestone.findUnique({ where: { id: `${user.id}_@NPSAsked3` } });
  if (npsAsked3) return null;
  const allConsos = await prisma.consommation.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { date: "desc" },
  });
  const enoughConsecutiveDays = checksConsecutiveDays(4, allConsos);
  if (!enoughConsecutiveDays) return null;

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
