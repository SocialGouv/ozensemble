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
    // Don't show badges that are not available in the app version
    let catalog = badgesCatalog;
    if (req.headers.appversion < 217) {
      catalog = badgesCatalog.filter((badge) => !["share"].includes(badge.category));
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
        // Dear lead dev who is watching this code,
        // maybe you wonder why we send back the catalog from the backend ?
        // this comes from my will to have as much control as possible from the backend
        // - advantages when we designed the system: full control (CRUD) of badges from the backend
        // - advantages in reality: we can only remove/edit badges from the backend
        // - sadness: but we can't add one because of the svg's that we don't send back
        // - cons: technical debt, double maintenance
        // Conclusion: not a big deal to remove it, not a big deal to keep it - your choice
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
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("share", shares), allBadges, badgesCatalog } });
    }

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
