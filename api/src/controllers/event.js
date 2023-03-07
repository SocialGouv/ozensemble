const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const newFeatures = require("../new-features");
const notifications = require("../notifications");

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

    // handle mail for old versions
    const sendNPSEvent = category === "NPS";
    const exportDataEvent = action === "EXPORT";
    if (req.headers.appversion < 99 && (exportDataEvent || sendNPSEvent)) {
      return res.status(200).send({
        ok: true,
        sendInApp: [
          "L'envoi d'email n'est plus disponible sur cette version d'application",
          "Mettez à jour votre application !",
          [
            {
              text: "Mettre à jour",
              link:
                req.headers.appdevice === "ios"
                  ? "https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1"
                  : "https://play.google.com/store/apps/details?id=com.addicto",
            },
            { text: "Plus tard", style: "cancel" },
          ],
          { cancelable: true },
        ],
      });
    }

    if (category === "APP" && action === "APP_OPEN") {
      if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
      const doses = req.body.doses;
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      const goalBadges = allBadges.filter((badge) => badge.category === "goals");
      // find user with matomoId
      let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
      // check if new badge or not

      // if badge 1 week is not present
      // handle 1 week
      if (!goalBadges.find((badge) => badge["stars"] === 2)) {
        const achievedGoal = await checkConsosGoal(user.id);
        if (achievedGoal) {
          await prisma.badge.create({
            data: {
              userId: user.id,
              category: "goals",
              stars: 2,
              showed: false,
            },
          });

          return res.status(200).send({
            ok: true,
            showNewBadge: {
              newBadge: grabBadgeFromCatalog("drinks", 2),
              allBadges,
              badgesCatalog,
            },
          });
        }
      }

      const checkConsosGoal = async (userId) => {
        const goal = await prisma.goal.findFirst({ where: { userId: userId, status: "ongoing" } });

        const lastMonday = dayjs(goal.date).startOf("week").format();
        const weekConsos = await prisma.consommation.aggregate({ _sum: doses, where: { userId: userId, date: { gte: lastMonday } } });
        await prisma.updateMany(
          {
            where: { userId: userId, status: "ongoing" },
          },
          {
            data: { status: "done" },
          }
        );
        console.log("goal ", goal);
        console.log("lastMonday ", lastMonday);
        console.log("weekConso ", weekConsos);
        if (weekConsos <= goal.doses) {
          await prisma.goal.updateMany({
            where: { userId: userId, status: "ongoing" },
            data: { status: "success" },
          });
          return true;
        }
        await prisma.goal.updateMany({
          where: { userId: userId, status: "ongoing" },
          data: { status: "fail" },
        });
        return false;
      };
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
    // save lastConsoAdded
    if (category === "APP" && (action === "CONSO_ADD" || action === "CONSO_DRINKLESS" || action === "NO_CONSO")) {
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
