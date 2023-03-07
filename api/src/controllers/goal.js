const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const dayjs = require("dayjs");
const prisma = require("../prisma");
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, daysWithGoalNoDrink, dosesByDrinkingDay } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    if (!user) {
      await prisma.user.create({
        data: {
          matomo_id: matomoId,
        },
      });
    }

    const date = dayjs().startOf("week").format("YYYY-MM-DD");
    console.log("daysWithGoalNoDrink", daysWithGoalNoDrink);
    console.log("dosesByDrinkingDay", dosesByDrinkingDay);
    await prisma.goal.upsert({
      where: { id: `${user.id}_${date}` },
      create: {
        id: `${user.id}_${date}`,
        userId: user.id,
        date,
        daysWithGoalNoDrink,
        dosesByDrinkingDay,
      },
      update: {
        daysWithGoalNoDrink,
        dosesByDrinkingDay,
      },
    });
    const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
    const goalBadges = allBadges.filter((badge) => badge.category === "goals");
    const firstBagde = goalBadges.find((badge) => badge.stars === 1);
    console.log(firstBagde);
    // if badge 1 is not present : handle badge 1
    if (!firstBagde) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "goals",
          stars: 1,
          shown: false,
        },
      });
      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("goals", 1), allBadges, badgesCatalog } });
    }
  })
);

module.exports = router;

// router.post(
//   //save goal data in BD and check for 1st badge
//   "/",
//   catchErrors(async (req, res) => {
//     const matomoId = req.body?.matomoId;
//     if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
//     const doses = req.body.doses;
//     const date = dayjs().format();
//     // find user with matomoId
//     let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
//     // create / update goal
//     await prisma.goal.create({
//       data: {
//         doses: doses,
//         userId: user.id,
//         date: dayjs(date).format(),
//         status: "ongoing",
//       },
//     });

//     return res.status(200).send({ ok: true });
//   })
// );
