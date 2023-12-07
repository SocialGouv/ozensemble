const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const { cocktailsCatalog } = require("../cocktails");
const { TIPIMAIL_API_USER, TIPIMAIL_API_KEY, TIPIMAIL_EMAIL_TO, TIPIMAIL_EMAIL_FROM } = require("../config");
const fetch = require("node-fetch");

router.get(
  "/cocktails",
  catchErrors(async (req, res) => {
    return res.status(200).send({ ok: true, data: cocktailsCatalog });
  })
);

router.post(
  "/new-cocktail-request",
  catchErrors(async (req, res) => {
    const { cocktailName } = req.body || {};

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
            address: "ozensemble@fabrique.social.gouv.fr",
          },
        ],
        msg: {
          from: {
            address: from,
            personalName: fromName,
          },
          subject: "Demande d'ajout de cocktail",
          text: "Nom du cocktail: " + cocktailName,
        },
      }),
    }).catch((err) => capture(err, { extra: { route: "POST /mail", body: req.body } }));

    if (apiRes?.ok) {
      return res.status(200).json({ ok: true });
    }

    return res.status(500).json({ ok: false, error: "error while sending email" });
  })
);

module.exports = router;
