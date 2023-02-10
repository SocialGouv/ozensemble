const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, pushNotifToken } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    if (!user) {
      await prisma.user.create({
        data: {
          matomo_id: matomoId,
        },
      });
    }

    if (pushNotifToken) {
      await prisma.user.update({
        where: { matomo_id: matomoId },
        data: {
          push_notif_token: pushNotifToken,
        },
      });
    }

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
