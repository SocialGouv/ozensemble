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

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
