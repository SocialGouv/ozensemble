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

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
