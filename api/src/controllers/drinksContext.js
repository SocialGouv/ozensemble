const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/request",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const context = req.body.context;
    const category = req.body.category;
    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    if (!user) return res.status(400).json({ ok: false, error: "no user" });
    await prisma.drinksContextRequest.create({
      data: {
        userId: user.id,
        matomo_id: matomoId,
        context: context,
        category: category?.toLowerCase(),
      },
    });
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const id = req.body.id;
    const context = req.body.context;
    const date = req.body.date;
    const emotion = req.body.emotion;

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    await prisma.drinksContext.upsert({
      where: { id: id },
      update: {
        context: context,
        emotion: emotion,
        userId: user.id,
        date: dayjs(date).format(),
      },
      create: {
        context: context,
        emotion: emotion,
        userId: user.id,
        date: dayjs(date).format(),
        id: id,
      },
    });
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/sync",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const { drinksContexts } = req.body;

    if (!drinksContexts.length) return res.status(200).json({ ok: true });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        email: "yoan.roszak@selego.co",
        password: "password12@Abc",
        matomo_id: matomoId,
      },
      update: {},
    });

    const drinksContextsToSave = drinksContexts.map((drinksContext) => {
      return {
        id: drinksContext.id,
        context: drinksContext.drinksContex.context,
        emotion: drinksContext.drinksContex.emotion,
        date: dayjs(drinksContext.timestamp).format(),
        userId: user.id,
      };
    });

    await prisma.DrinksContext.createMany({
      data: drinksContextsToSave,
      skipDuplicates: true,
    });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
