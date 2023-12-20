const express = require("express");
const fetch = require("node-fetch");
const { TIPIMAIL_API_USER, TIPIMAIL_API_KEY, TIPIMAIL_EMAIL_TO, TIPIMAIL_EMAIL_FROM } = require("../config");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");

router.post(
  "/",
  catchErrors(async (req, res) => {
    let { matomoId, to, replyTo, replyToName, subject, text, html, attachments } = req.body || {};
    if (!matomoId && req.headers.appversion > 225) {
      return res.status(200).json({ ok: true });
    }
    if (!subject || (!text && !html)) return res.status(400).json({ ok: false, error: "wrong parameters" });

    if (subject === "Context suggestion") {
      // why this piece of shitty code is located here and not in its controller ?
      // because of retro-compatibility with old app versions
      // can be removed when min app version is > 226
      const textAndValues = text
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split(":"));
      const matomoId = textAndValues[0][1].trim();
      const requestContext = textAndValues[4][1].trim().toLowerCase();
      const requestCategory = textAndValues[4][0].split(" ").at(-1).replace(":", "").trim();
      const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
      if (!user) return res.status(400).json({ ok: false, error: "no matomo id" });
      await prisma.drinksContextRequest.create({
        data: {
          userId: user.id,
          matomo_id: matomoId,
          context: requestContext,
          category: requestCategory,
        },
      });
      return res.status(200).json({ ok: true });
    }

    if (!to) {
      to = TIPIMAIL_EMAIL_TO;
    }

    if (!replyTo) {
      replyTo = undefined;
      replyToName = undefined;
    }

    const from = TIPIMAIL_EMAIL_FROM;
    const fromName = "Oz Ensemble";
    const apiRes = await fetch("https://api.tipimail.com/v1/messages/send", {
      method: "POST",
      headers: {
        "X-Tipimail-ApiUser": TIPIMAIL_API_USER,
        "X-Tipimail-ApiKey": TIPIMAIL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [
          {
            address: to,
          },
        ],
        msg: {
          from: {
            address: from,
            personalName: fromName,
          },
          replyTo: replyTo && {
            address: replyTo,
            personalName: replyToName,
          },
          subject,
          text,
          html,
          attachments,
        },
      }),
    }).catch((err) => capture(err, { extra: { route: "POST /mail", body: req.body } }));

    if (apiRes?.ok) {
      return res.status(200).json({ ok: true });
    }

    return res.status(500).json({ ok: false, error: "error while sending email" });
  })
);

module.exports = { router };
