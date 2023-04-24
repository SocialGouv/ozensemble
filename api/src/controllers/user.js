const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, pushNotifToken } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const updateObj = {};

    if (req.body.hasOwnProperty("pushNotifToken")) updateObj.push_notif_token = pushNotifToken;

    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: {
        push_notif_token: pushNotifToken,
      },
      create: {
        push_notif_token: pushNotifToken,
        matomo_id: matomoId,
        created_from: "user",
      },
    });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
