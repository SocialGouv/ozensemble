const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const dayjs = require("dayjs");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, appMilestone } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    await prisma.appMilestone.upsert({
      where: { id: `${user.id}_${appMilestone}` },
      update: {
        userId: user.id,
        date: dayjs().format("YYYY-MM-DD"),
      },
      create: {
        id: `${user.id}_${appMilestone}`,
        userId: user.id,
        date: dayjs().format("YYYY-MM-DD"),
      },
    });

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/init",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });
    // If app not up to date => check if first badges milestone already exists
    const newBadgeAnnouncementAddOwnDrink = await prisma.appMilestone.findUnique({
      where: { id: `${user.id}_@newBadgeAnnouncementAddOwnDrink` },
    });
    console.log(newBadgeAnnouncementAddOwnDrink);
    // If app not up to date => create first badges milestone
    if (req.headers.appversion >= 145 && !newBadgeAnnouncementAddOwnDrink) {
      await prisma.appMilestone.create({
        data: {
          id: `${user.id}_@newBadgeAnnouncementAddOwnDrink`,
          userId: user.id,
          date: dayjs().format("YYYY-MM-DD"),
        },
      });
      return res.status(200).send({
        ok: true,
        showInAppModal: {
          iid: "@newBadgeAnnouncementAddOwnDrink",
          title: "Nouveau\u00A0: Ajoutez vos propres boissons personnalisées\u00A0!",
          content:
            "Vous ne trouvez pas votre boisson dans la liste ? Aucun problème, vous pouvez désormais la créer en ajoutant son propre _degrés d'alcool et son propre _prix.",
          CTATitle: "J'ai compris",
          CTANavigation: ["WELCOME"],
        },
      });
    } else {
      return res.status(200).send({ ok: true });
    }
  })
);
module.exports = router;
