const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { cocktailsCatalog } = require("../cocktails");

router.get(
  "/cocktails",
  catchErrors(async (req, res) => {
    return res.status(200).send({ ok: true, data: cocktailsCatalog });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const name = req.body?.drinkName;
    const volume = req.body?.volume;
    const alcoolPercentage = req.body?.alcoolPercentage;
    const price = req.body?.price;
    const oldName = req.body?.oldName;

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    if (oldName) {
      const drink = await prisma.drink.findFirst({
        where: { userId: user.id, name: oldName },
      });
      await prisma.drink.update({
        where: { id: drink.id },
        data: { name: name, volume: volume, alcoolPercentage: alcoolPercentage, price: price },
      });
    } else {
      await prisma.drink.create({
        data: { name: name, volume: volume, alcoolPercentage: alcoolPercentage, price: price },
      });
    }

    return res.status(200).send({ ok: true });
  })
);
module.exports = router;
