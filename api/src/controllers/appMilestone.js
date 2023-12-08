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

    // USER SURVEY:
    if (req.headers.appversion < 205) return res.status(200).send({ ok: true });

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
