const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "Shares",
      },
      update: {},
    });
    let shares = 1;
    const existingShareEntry = await prisma.share.findUnique({
      where: { userId: user.id },
    });
    if (!existingShareEntry) {
      await prisma.share.create({
        data: {
          shares: 1,
          userId: user.id,
        },
      });
    } else {
      await prisma.share.update({
        where: { id: existingShareEntry.id },
        data: {
          shares: existingShareEntry.shares + 1,
        },
      });
      shares = existingShareEntry.shares + 1;
    }
    const share_badges = await prisma.badge.findMany({
      where: { userId: user.id, category: "share" },
    });
    const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
    for (let stars = 1; stars <= 5; stars++) {
      if (shares === stars && !share_badges.find((badge) => badge.stars === stars)) {
        await prisma.badge.create({
          data: { userId: user.id, category: "share", stars, shown: false },
        });

        return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("share", stars), allBadges, badgesCatalog } });
      }
    }
  })
);

module.exports = router;
