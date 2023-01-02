const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const { capture } = require("../third-parties/sentry");
const router = express.Router();
const inappMessages = require("../in-app-messages");
const newFeatures = require("../new-features");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { body } = req;
    req.user = { userId: req.body.userId }; // for log in sentry

    if (body.event.category === "APP" && body.event.action === "APP_OPEN") {
      await new Promise((res) => setTimeout(res, 1000)); // maybe better for showing up on time
      return res.status(200).send({ ok: true, newFeatures: [newFeatures["new-defis"], newFeatures["new-articles"]] });
    }

    const sendNPSEvent = body.event?.category === "NPS";
    const exportDataEvent = body.event?.action === "EXPORT";
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

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
