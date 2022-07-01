const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const { capture } = require("../third-parties/sentry");
const router = express.Router();
const inappMessages = require("../in-app-messages");
const newFeatures = require("../new-features");
const { sendPushNotification } = require("../services/push-notifications");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { body } = req;
    if (body.pushToken && req.headers.appdevice === "ios") capture("push token coming", { extra: body });
    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
