const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const updateObj = {};

    if (req.body.hasOwnProperty("pushNotifToken")) updateObj.push_notif_token = pushNotifToken;

    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: updateObj,
      create: {
        matomo_id: matomoId,
        created_from: "User",
        ...updateObj,
      },
    });

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
