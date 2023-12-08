const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const id = req.body.id;
    const note = req.body.note;
    const context = req.body.context;
    const date = req.body.date;
    const emotion = req.body.emotion;
    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    //check if it should be deleted
    await prisma.DrinksContext.upsert({
      where: { id: id },
      update: {
        note: note,
        context: context,
        emotion: emotion,
        userId: user.id,
        date: dayjs(date).format(),
      },
      create: {
        note: note,
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
        matomo_id: matomoId,
      },
      update: {},
    });

    const drinksContextsToSave = drinksContexts.map((drinksContext) => {
      return {
        id: drinksContext.id,
        note: drinksContext.drinksContex.note,
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
