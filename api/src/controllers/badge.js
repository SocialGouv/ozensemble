const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog, missedGoal } = require("../badges");

router.get(
  "/test",
  catchErrors(async (req, res) => {
    const { category, stars } = req.query;

    const newBadge = category === "missed-goal" ? missedGoal : grabBadgeFromCatalog(category, stars);
    return res.status(200).send({ ok: true, showNewBadge: { newBadge } });
  })
);

router.get(
  "/:matomoId",
  catchErrors(async (req, res) => {
    const { matomoId } = req.params;
    // If app version is not up to date, don't show defis and articles badges
    let catalog = badgesCatalog;
    if (req.headers.appversion < 151) {
      catalog = badgesCatalog.filter((badge) => !["defis", "articles"].includes(badge.category));
    }
    if (!matomoId) return res.status(200).send({ ok: true, data: [] });

    // find badges of matomoId
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "GetBadges",
      },
      update: {},
    });

    const badges = await prisma.badge.findMany({
      where: {
        userId: user.id,
      },
    });
    return res.status(200).send({
      ok: true,
      data: {
        badges,
        badgesCatalog,
      },
    });
  })
);
router.post(
  "/shares",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "GetBadges",
      },
      update: {},
    });
    const share_badges = await prisma.badge.findMany({
      where: { userId: user.id, category: "share" },
    });
    const shares = share_badges.length + 1;
    const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
    if (shares <= 5) {
      await prisma.badge.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          category: "share",
          stars: shares,
          shown: false,
        },
      });

      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("share", shares), allBadges, badgesCatalog } });
    }

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
