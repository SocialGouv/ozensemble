const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const { capture } = require("../third-parties/sentry");
const router = express.Router();
const inappMessages = require("../in-app-messages");
const newFeatures = require("../new-features");
const { sendPushNotification } = require("../services/push-notifications");
const prisma = require("../prisma");

router.put(
  "/",
  catchErrors(async (req, res) => {
    // const { body } = req;
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const result = await sendPushNotification([{ pushTokens: [body.pushToken] }], { title: "Test OZ", body: "Test notifications push" });
    // console.log({ ok: true, data: result });
    // return res.status(200).send({ ok: true, data: JSON.stringify(result, null, 2) });
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const newUser = await prisma.user.create({
      data: {
        matomo_id: "12345",
      },
    });
    return res.status(200).send({ ok: true, data: newUser });
  })
);

module.exports = router;
