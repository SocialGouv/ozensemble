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
    // If not up app up to date check for add own drink announcement
    if (req.headers.appversion >= 158) {
      const newBadgeAnnouncementAddOwnDrink = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@newBadgeAnnouncementAddOwnDrink` },
      });
      if (!newBadgeAnnouncementAddOwnDrink) {
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
              "Vous ne trouvez pas votre boisson dans la liste ? Aucun problème, vous pouvez désormais la créer en ajoutant son propre __degrés__ d'alcool et son propre __prix__.",
            CTATitle: "J'ai compris",
          },
        });
      } else {
        return res.status(200).send({ ok: true });
      }
    } else {
      const newCalendarAnnouncementModal = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@NewCalendarAnnouncement` },
      });
      // If app up to date => check for new calendar announcement
      if (!newCalendarAnnouncementModal) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@NewCalendarAnnouncement`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            iid: "@NewCalendarAnnouncement",
            title: "Nouveau\u00A0: le calendrier a été mis à jour avec votre objectif\u00A0!",
            content:
              "Chaque jour est affiché d'une couleur différente en fonction de votre consommation du jour.\nEt chaque semaine, vous pouvez suivre si vous avez tenu ou non votre objectif\u00A0!",
            CTATitle: "J'ai compris",
          },
        });
      } else {
        return res.status(200).send({ ok: true });
      }
    }
  })
);
module.exports = router;
