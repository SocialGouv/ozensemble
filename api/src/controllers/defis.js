const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const stars = req.body?.stars;

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    await prisma.badge.create({
      data: {
        userId: user.id,
        category: "defis",
        stars: Number(stars),
      },
    });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
