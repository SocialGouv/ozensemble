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
        created_from: "AppMilestonePost",
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
        created_from: "AppMilestoneInit",
      },
      update: {},
    });

    // If not up app up to date check for add own drink announcement
    if (req.headers.appversion <= 164) {
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
            id: "@newBadgeAnnouncementAddOwnDrink",
            title: "Nouveau\u00A0: Ajoutez vos propres boissons personnalisées\u00A0!",
            content:
              "Vous ne trouvez pas votre boisson dans la liste ? Aucun problème, vous pouvez désormais la créer en ajoutant son propre __degrés__ d'alcool et son propre __prix__.",
            CTATitle: "J'ai compris",
          },
        });
      }
      return res.status(200).send({ ok: true });
    }

    // USER SURVEY:
    if (req.headers.appversion >= 205) {
      const newUserSurveyAnnouncementModal = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@NewUserSurveyAnnouncement` },
      });
      if (!newUserSurveyAnnouncementModal) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@NewUserSurveyAnnouncement`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@NewUserSurveyAnnouncement",
            title: "1 min pour améliorer Oz\u00A0?",
            content: "Répondez à 6 questions de manière anonyme pour nous aider à améliorer l’application\u00A0!",
            CTATitle: "Répondre au sondage",
            secondaryButtonTitle: "Plus tard",
            CTANavigation: ["USER_SURVEY"],
          },
        });
      }

      // officialAppAnnouncementModal
      const userSurveyFinished = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@userSurveyFinished` },
      });
      const officialAppAnnouncementModal = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@OfficialAppAnnouncement` },
      });
      if (!officialAppAnnouncementModal && !!userSurveyFinished && dayjs(userSurveyFinished?.updatedAt)?.isBefore(dayjs().subtract(1, "day"))) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@OfficialAppAnnouncement`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@OfficialAppAnnouncement",
            title: "Oz Ensemble, l’application des Ministères Sociaux",
            content:
              "Nous prenons en compte vos avis et nous avons décidé de vous parler un peu plus de nous, Oz est un service publique numérique anonyme et gratuit, développé par les Ministères Sociaux.",
            CTATitle: "En savoir plus",
            CTANavigation: ["OFFICIAL"],
          },
        });
      }
    }

    // if user is created after today, skip
    const userCreatedAt = dayjs(user.createdAt);
    const now = dayjs("2023-08-27");
    if (userCreatedAt.isAfter(now)) {
      return res.status(200).send({ ok: true });
    }

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
      const existingGoal = await prisma.goal.findFirst({ where: { userId: user.id } });
      if (existingGoal) {
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@NewCalendarAnnouncement",
            title: "Nouveau\u00A0: le calendrier a été mis à jour avec votre objectif\u00A0!",
            content:
              "Chaque jour est affiché d'une couleur différente en fonction de votre consommation du jour.\nEt chaque semaine, vous pouvez suivre si vous avez tenu ou non votre objectif\u00A0!",
            CTATitle: "Découvrir",
            CTANavigation: ["CONSO_FOLLOW_UP_NAVIGATOR"],
          },
        });
      } else {
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@NewCalendarAnnouncement",
            title: "Nouveau\u00A0: le calendrier a été mis à jour avec votre objectif\u00A0!",
            content:
              "Chaque jour est affiché d'une couleur différente en fonction de votre consommation du jour.\nEt chaque semaine, vous pouvez suivre si vous avez tenu ou non votre objectif\u00A0!",
            CTATitle: "Se fixer un objectif",
            CTANavigation: ["GAINS_ESTIMATE_PREVIOUS_CONSUMPTION"],
          },
        });
      }
    } else {
      return res.status(200).send({ ok: true });
    }
  })
);
module.exports = router;
