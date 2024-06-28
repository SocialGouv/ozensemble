const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const geoip = require("geoip-lite");

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

    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    if (!user) return res.status(404).json({ ok: false, error: "user not found" });

    const xforwarded = req.headers["x-forwarded-for"];
    const location = geoip.lookup(xforwarded);
    if (location) {
      const { region } = location;
      isWellLocated = region === "IDF";
    }

    return res.status(200).send({ ok: true, isWellLocated });
  })
);

module.exports = router;
