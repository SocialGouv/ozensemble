const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/init",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    const daysValidated = Number(req.body?.daysValidated);
    const autoEvaluationDone = req.body?.autoEvaluationDone;

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    if (autoEvaluationDone) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 1,
        },
      });
    }
    if (daysValidated >= 1) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 2,
        },
      });
    }
    if (daysValidated >= 2) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 3,
        },
      });
    }

    if (daysValidated >= 3) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 4,
        },
      });
    }
    if (daysValidated >= 7) {
      await prisma.badge.create({
        data: {
          userId: user.id,
          category: "defis",
          stars: 5,
        },
      });
    }

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
