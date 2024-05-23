const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.get(
  "/list",
  catchErrors(async (req, res) => {
    const matomoId = req.query?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    let strategies = await prisma.strategy.findMany({ where: { userId: user.id } });

    return res.status(200).send({ ok: true, strategies: strategies });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const strategyIndex = req.body.strategyIndex;
    const feelings = req.body.feelings;
    const trigger = req.body.trigger;
    const intensity = req.body.intensity;
    const actionPlan = req.body.actionPlan;
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;
    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    await prisma.strategy.upsert({
      where: { id: `${user.id}_${strategyIndex}` },
      update: {
        feelings: feelings,
        trigger: trigger,
        intensity: intensity,
        actionPlan: actionPlan,
        userId: user.id,
        updatedAt: updatedAt,
      },
      create: {
        id: `${user.id}_${strategyIndex}`,
        index: strategyIndex,
        feelings: feelings,
        trigger: trigger,
        intensity: intensity,
        actionPlan: actionPlan,
        userId: user.id,
        createdAt: createdAt,
      },
    });
    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
