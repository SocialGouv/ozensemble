const express = require("express");
const fetch = require("node-fetch");
const { TIPIMAIL_API_USER, TIPIMAIL_API_KEY, TIPIMAIL_EMAIL_TO, TIPIMAIL_EMAIL_FROM } = require("../config");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const { capture } = require("../third-parties/sentry");
const dayjs = require("dayjs");

router.post(
  "/",
  catchErrors(async (req, res) => {
    let { to, replyTo, replyToName, subject, text, html, consosToExport, catalog } = req.body || {};
    if (!subject || (!text && !html)) return res.status(400).json({ ok: false, error: "wrong parameters" });

    if (!to) {
      to = TIPIMAIL_EMAIL_TO;
    }

    if (!replyTo) {
      replyTo = undefined;
      replyToName = undefined;
    }
    const file = {
      filename: "MesConsommationOz.csv",
      content: `Date,Consommation,Unité(s),Quantité,Volume,Calories,Prix (Euros)\n`,
    };

    if (consosToExport) {
      consosToExport.forEach((conso) => {
        const drinkFromCatalog = catalog[conso.drinkKey];
        const displayName = drinkFromCatalog.categoryKey.includes("own")
          ? drinkFromCatalog.displayFeed + ` (${drinkFromCatalog.alcoolPercentage}%)`
          : drinkFromCatalog.categoryKey.split(":")[0].replace(",", ".");
        file.content += `${dayjs(conso.date).format("DD/MM/YYYY")},${displayName},${conso.doses},${conso.quantity},${conso.volume},${Math.round(
          conso.kcal
        )},${conso.price} \n`;
      });
    }
    const content = Buffer.from(file.content, "binary").toString("base64");
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
          attachments: [
            {
              contentType: "text/csv",
              filename: file.filename,
              content: content,
            },
          ],
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
