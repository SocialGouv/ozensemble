const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const newFeatures = require("../utils/new-features-popups");
const notifications = require("../utils/notifications");
const prisma = require("../prisma");
const dayjs = require("dayjs");
const { capture } = require("../third-parties/sentry");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { body } = req;
    req.user = { userId: req.body.userId }; // for log in sentry

    const action = body.event?.action;
    const category = body.event?.category;
    const name = body.event?.name;
    const value = body.event?.value;
    const matomoId = body.userId;
    const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    if (user && action === "APP_OPEN") {
      const appVersion = req.headers.appversion;
      await prisma.user.update({
        where: { matomo_id: matomoId },
        data: {
          appVersion: appVersion,
        },
      });
    }
    // handle User Survey
    const userSurveyAnnounced = category === "NAVIGATION" && (action === "USER_SURVEY_START" || action === "USER_SURVEY_NOTIF");
    if (userSurveyAnnounced) {
      const user = await prisma.user.upsert({
        where: { matomo_id: matomoId },
        create: {
          matomo_id: matomoId,
          created_from: "EventUserSurveyStarted",
        },
        update: {},
      });
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
      }
    }

    const userSurveySkippedInAppModal =
      category === "USER_SURVEY" && (action === "USER_SURVEY_IN_APP_SKIP" || action == "USER_SURVEY_IN_APP_CLOSE_BUTTON");
    const userSurveySkipped =
      category === "QUIZZ_USER_SURVEY" &&
      (action === "USER_SURVEY_START_SKIP" || action === "USER_SURVEY_NOTIF_SKIP" || action === "QUIZZ_CLOSE_BUTTON");
    if (userSurveySkipped || userSurveySkippedInAppModal) {
      notifications.scheduleUserSurvey(matomoId);
    }

    const userSurveyFinished = category === "QUIZZ_USER_SURVEY" && action === "QUIZZ_FINISH";
    if (userSurveyFinished) {
      notifications.cancelNotif(matomoId, "USER_SURVEY");

      const user = await prisma.user.upsert({
        where: { matomo_id: matomoId },
        create: {
          matomo_id: matomoId,
          created_from: "EventUserSurveyFinished",
        },
        update: {},
      });
      const userSurveyFinishedMilestone = await prisma.appMilestone.findUnique({
        where: { id: `${user.id}_@userSurveyFinished` },
      });
      if (userSurveyFinishedMilestone) {
        capture("userSurveyFinishedMilestone already exists", { extra: { matomoId } });
      } else {
        await prisma.appMilestone.create({
          data: {
            id: `${user.id}_@userSurveyFinished`,
            userId: user.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
      }
    }

    // if (req.headers.appversion < 128) {
    //   // build 128 = currently in tests
    //   return res.status(200).send({ ok: true, newFeatures: [newFeatures.gains] });
    // }

    // handle Defi 1 notifications
    const DEFI1_VALIDATE_DAY = category === "DEFI1" && action === "DEFI1_VALIDATE_DAY" && name === "day";
    if (DEFI1_VALIDATE_DAY && value === 1) {
      notifications.scheduleDefi1Day1(matomoId);
    }
    if (DEFI1_VALIDATE_DAY && value === 2) {
      notifications.cancelNotif(matomoId, "DEFI1_DAY1");
    }

    // save lastConsoAdded
    if (category === "CONSO" && (action === "CONSO_ADD" || action === "CONSO_DRINKLESS" || action === "NO_CONSO")) {
      notifications.updateLastConsoAdded(matomoId); // update User & cancel inactivity notification if exists
    }

    // handle newFeatures
    if (category === "NAVIGATION" && action === "GAINS_MAIN_VIEW") return res.status(200).send({ ok: true, newFeatures: [newFeatures.gains] });
    if (category === "APP" && action === "APP_OPEN_IN_GAIN_VIEW") return res.status(200).send({ ok: true, newFeatures: [newFeatures.gains] });
    if (category === "NAVIGATION" && action === "DEFIS_MENU") return res.status(200).send({ ok: true, newFeatures: [newFeatures.defis] });
    if (category === "NAVIGATION" && action === "CONSO_FOLLOW_UP") return res.status(200).send({ ok: true, newFeatures: [newFeatures.suivi] });
    if (category === "NAVIGATION" && action === "HEALTH") return res.status(200).send({ ok: true, newFeatures: [newFeatures.articles] });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
