const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const { capture } = require("../third-parties/sentry");
const router = express.Router();
// const inappMessages = require("../in-app-messages");
const newFeatures = require("../new-features");
const notifications = require("../notifications");
const { checkNewBadge } = require("../badges");
const prisma = require("../prisma");
const { extractExceptionKeysForMessage } = require("@sentry/utils");

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
    const extra = body?.extra;

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
            },
            { text: "Plus tard", style: "cancel" },
          ],
          { cancelable: true },
        ],
      });
    }

    // handle newFeatures
    if (category === "NAVIGATION" && action === "GAINS_MAIN_VIEW") return res.status(200).send({ ok: true, newFeatures: [newFeatures.gains] });
    if (category === "NAVIGATION" && action === "DEFIS_MENU") return res.status(200).send({ ok: true, newFeatures: [newFeatures.defis] });
    if (category === "NAVIGATION" && action === "CONSO_FOLLOW_UP") return res.status(200).send({ ok: true, newFeatures: [newFeatures.suivi] });
    if (category === "NAVIGATION" && action === "HEALTH") return res.status(200).send({ ok: true, newFeatures: [newFeatures.articles] });

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

    // default : show newFeatures new-gains (default page on startup)
    return res.status(200).send({ ok: true, newFeatures: [newFeatures.gains] });
  })
);

module.exports = router;
