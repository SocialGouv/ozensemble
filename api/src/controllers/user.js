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
    await new Promise((res) => setTimeout(res, 3000));
    const result = await sendPushNotification([{ pushTokens: [body.pushToken] }], { title: "Test OZ", body: "Test notifications push" });
    console.log({ ok: true, data: result });
    return res.status(200).send({ ok: true, data: JSON.stringify(result, null, 2) });
  })
);

module.exports = router;
