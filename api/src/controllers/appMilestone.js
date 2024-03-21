const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const dayjs = require("dayjs");
const { superUser30DaysInAppModal, superUser90DaysInAppModal } = require("../utils/super-user-modals");

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
    const { matomoId, isRegistered } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "AppMilestoneInit",
      },
      update: {},
    });

    if (req.headers.appversion < 205) return res.status(200).send({ ok: true });
    if (req.headers.appversion >= 247) {
      const TestimoniesFeature = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@TestimoniesFeature` },
      });
      if (!TestimoniesFeature) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@TestimoniesFeature`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@TestimoniesFeature",
            title: "Découvrez notre page de témoignages !",
            content:
              "Consultez dès maintenant les premiers témoignages sur Oz ! \n Et vous aussi, participez à faire grandir la communauté en nous envoyant dès maintenant vos témoignages que nous publieront anonyment sur l’application.",
            CTATitle: "Voir les témoignages",
            CTANavigation: ["HEALTH", { screen: "TESTIMONIES" }],
            CTAEvent: {
              category: "TESTIMONIES",
              action: "PRESSED_FROM_NEW_FEATURE_MODAL",
              name: "FROM_NEW_FEATURE",
            },
          },
        });
      }
    }
    if (req.headers.appversion >= 245) {
      const NewLongTermBadgesFeature = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@NewLongTermBadgesFeature` },
      });
      if (!NewLongTermBadgesFeature) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@NewLongTermBadgesFeature`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@NewLongTermBadgesFeature",
            title: "De nouveaux badges sont arrivés !",
            content: "Gagnez de nouveaux badges jours et objectifs en ajoutant vos consommations ou en atteignant votre objectif de la semaine !",
            CTATitle: "Voir mes badges",
            CTANavigation: ["BADGES_LIST"],
            CTAEvent: {
              category: "BADGES",
              action: "PRESSED_FROM_NEW_FEATURE_MODAL",
              name: "FROM_NEW_FEATURE",
            },
          },
        });
      }
    }
    const allowNotification = await prisma.appMilestone.findUnique({
      where: { id: `${user.id}_@AllowNotification` },
    });

    if (
      (!allowNotification && req.headers.appversion >= 243 && !isRegistered.granted && user.lastConsoAdded) ||
      (allowNotification &&
        req.headers.appversion >= 243 &&
        !isRegistered.granted &&
        dayjs(allowNotification.createdAt).isBefore(dayjs().subtract(7, "day")))
    ) {
      const milestoneId = allowNotification ? "@AllowNotificationSecondTime" : "@AllowNotification";
      const title = "Activer les notifications ?";
      const onPress = isRegistered.canAsk ? "allowNotification" : "openSettings";
      const allowNotificationSecondTime = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@AllowNotificationSecondTime` },
      });
      if (!allowNotificationSecondTime) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_${milestoneId}`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });

        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: milestoneId,
            title: title,
            content: "Activez les notifications vous aidera à vous rappeler d’ajouter vos consommations tous les jours ou chaque semaine",
            CTATitle: isRegistered.canAsk ? "Activer les notifications ?" : "Aller dans les réglages",
            secondaryButtonTitle: "non merci",
            CTAEvent: {
              category: "ALLOW_NOTIFICATION" + (allowNotification ? "_SECOND_TIME" : ""),
              action: "PRESSED_FROM_NEW_FEATURE_MODAL",
              name: "FROM_NEW_FEATURE",
            },
            CTAOnPress: onPress,
          },
        });
      }
    }
    // USER SURVEY:
    if (req.headers.appversion >= 239 && user.createdAt && dayjs(user.createdAt).isBefore(dayjs().subtract(90, "day"))) {
      const super90UserFeature = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@Super90UserFeature` },
      });
      if (!super90UserFeature) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@Super90UserFeature`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: superUser90DaysInAppModal,
        });
      }
    }
    if (req.headers.appversion >= 239 && user.createdAt && dayjs(user.createdAt).isBefore(dayjs().subtract(30, "day"))) {
      // if the user skipped the 30 days, he will have got the 90 days - if he got the 90 days, we don't show him the 30 days
      const super90UserFeature = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@Super90UserFeature` },
      });
      if (!super90UserFeature) {
        const super30UserFeature = await prisma.appMilestone.findUnique({
          where: { id: `${user.id}_@Super30UserFeature` },
        });
        if (!super30UserFeature) {
          await prisma.appMilestone.create({
            data: {
              id: `${user.id}_@Super30UserFeature`,
              userId: user.id,
              date: dayjs().format("YYYY-MM-DD"),
            },
          });
          return res.status(200).send({
            ok: true,
            showInAppModal: superUser30DaysInAppModal,
          });
        }
      }
    }
    if (req.headers.appversion >= 230) {
      const newUserAbstinenceFeature = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@NewUserAbstinenceFeature` },
      });
      if (!newUserAbstinenceFeature) {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@NewUserAbstinenceFeature`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        return res.status(200).send({
          ok: true,
          showInAppModal: {
            id: "@NewUserAbstinenceFeature",
            title: "Nouveau : le compteur d'abstinence est arrivé !",
            content:
              "Si vous avez choisi d'être abstinent, vous pouvez désormais voir votre nombre de jours consécutifs sans avoir consommé d'alcool. Rendez-vous dans l'onglet calendrier !",
            CTATitle: "Découvrir",
            CTANavigation: ["ABSTINENCE_SELECTION"],
            CTAEvent: {
              category: "ABSTINENCE_SELECTION",
              action: "PRESSED_FROM_NEW_FEATURE_MODAL",
              name: "FROM_NEW_FEATURE",
            },
          },
        });
      }
    }

    // officialAppAnnouncementModal
    if (req.headers.appversion >= 206) {
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

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
