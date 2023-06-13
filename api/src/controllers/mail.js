const express = require("express");
const fetch = require("node-fetch");
const { TIPIMAIL_API_USER, TIPIMAIL_API_KEY, TIPIMAIL_EMAIL_TO, TIPIMAIL_EMAIL_FROM } = require("../config");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const { capture } = require("../third-parties/sentry");
const fs = require("fs");
const csv = require("csv-stringify");
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
      content: `Date,Consommation,Unité(s),Quantité,Volume,Calories,Prix \u20ac\n`,
    };

    const encodeContent = (content) => {
      try {
        const purifiedContent = content
          .replace(/[\u007F-\uFFFF]/g, (chr) => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))
          .replace(/\//g, "\\/");
        const base64PurifiedContent = Buffer.from(purifiedContent, "binary").toString("base64");
        return base64PurifiedContent;
      } catch (e) {
        console.log("error purifying content", e);
        throw e;
      }
    };

    if (consosToExport) {
      consosToExport.forEach((conso) => {
        const drinkFromCatalog = catalog.find((drink) => drink.drinkKey === conso.drinkKey);
        const displayName = drinkFromCatalog.categoryKey.includes("own")
          ? drinkFromCatalog.displayFeed + ` (${drinkFromCatalog.alcoolPercentage}%)`
          : drinkFromCatalog.categoryKey;
        file.content += `${dayjs(conso.date).format("DD/MM/YYYY")},${displayName},${conso.doses},${conso.quantity},${conso.volume},${Math.round(
          conso.kcal
        )},${conso.price}\n`;
      });
    }
    const content = encodeContent(file.content);
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
              filename: "myfile.csv",
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
