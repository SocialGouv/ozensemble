const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog } = require("../badges");

router.get(
  "/:matomoId",
  catchErrors(async (req, res) => {
    const { matomoId } = req.params;

    if (!matomoId) return res.status(200).send({ ok: true, data: [] });
    // find badges of matomoId
    const user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });

    if (!user) return res.status(200).send({ ok: true, data: { badges: [], badgesCatalog } });
    const badges = await prisma.badge.findMany({
      where: {
        userId: user.id,
      },
    });
    return res.status(200).send({ ok: true, data: { badges, badgesCatalog } });
  })
);

module.exports = router;
