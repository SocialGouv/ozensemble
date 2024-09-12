const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { authenticateToken } = require("../middlewares/tokenAuth");

router.post(
  "/request",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;

    const context = req.body.context;
    const category = req.body.category;
    // find user with matomoId

    await prisma.drinksContextRequest.create({
      data: {
        userId: user.id,
        context: context,
        category: category?.toLowerCase(),
      },
    });
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;
    const id = req.body.id;
    const context = req.body.context;
    const date = req.body.date;
    const emotion = req.body.emotion;

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
  authenticateToken,
  catchErrors(async (req, res) => {
    const { drinksContexts } = req.body;

    if (!drinksContexts.length) return res.status(200).json({ ok: true });

    const user = req.user;

    const drinksContextsToSave = drinksContexts.map((drinksContext) => {
      return {
        id: drinksContext.id,
        context: drinksContext.drinksContex.context,
        emotion: drinksContext.drinksContex.emotion,
        date: dayjs(drinksContext.timestamp).format(),
        userId: user.id,
      };
    });

    await prisma.drinksContext.createMany({
      data: drinksContextsToSave,
      skipDuplicates: true,
    });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
