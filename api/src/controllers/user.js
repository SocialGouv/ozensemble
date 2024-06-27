const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const geoip = require("geoip-lite");
const { capture } = require("../third-parties/sentry");
const fetch = require("node-fetch");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const updateObj = {};

    let created_from = "User";
    if (req.body.hasOwnProperty("pushNotifToken")) {
      updateObj.push_notif_token = req.body.pushNotifToken;
      created_from = "User-PushNotif";
    }

    // TODO: fix concurrency issue Unique constraint failed on the fields: (`matomo_id`)
    // using a "version" field ? https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#optimistic-concurrency-control
    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: updateObj,
      create: {
        matomo_id: matomoId,
        created_from,
        ...updateObj,
      },
    });

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/location",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query || {};
    let isWellLocated = false;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const ip = req.connection.remoteAddress; // private ip when dev mode, should be public ip in prod (https://stackoverflow.com/a/58441273/5225096)
    const geo = geoip.lookup(ip);
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    console.log({ data });
    capture("test location", { extra: { geo, data } });
    if (geo?.region === "IDF") isWellLocated = true;
    return res.status(200).send({ ok: true, isWellLocated });
  })
);

module.exports = router;
