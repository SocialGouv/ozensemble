const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog, missedGoal } = require("../badges");
const dayjs = require("dayjs");

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
      catalog = badgesCatalog.filter((badge) => {
        return (
          badge.category !== "defis" && badge.category !== "locked_defis" && badge.category !== "articles" && badge.category !== "locked_articles"
        );
      });
    }

    if (!matomoId) return res.status(200).send({ ok: true, data: [] });

    // find badges of matomoId
    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
      },
      update: {},
    });

    const badges = await prisma.badge.findMany({
      where: {
        userId: user.id,
      },
    });

    const newBadgeAnnouncementFeatures = await prisma.appMilestone.findUnique({
      where: { id: `${user.id}_@NewBadgesAnnouncementFeatures` },
    });

    if (!!newBadgeAnnouncementFeatures) {
      return res.status(200).send({
        ok: true,
        data: {
          badges,
          badgesCatalog: catalog,
        },
      });
    }

    await prisma.appMilestone.create({
      data: {
        id: `${user.id}_@NewBadgesAnnouncementFeatures`,
        userId: user.id,
        date: dayjs().format("YYYY-MM-DD"),
      },
    });

    return res.status(200).send({
      ok: true,
      data: {
        badges,
        badgesCatalog: catalog,
      },
      showInAppModal: {
        id: "@NewBadgesAnnouncementFeatures",
        badgesCategories: ["drinks", "goals"], // "defis", "articles"
        title: "Nouveau\u00A0: les badges arrivent dans l'application\u00A0!",
        content: "Gagnez des badges symboliques en ajoutant vos consommations tous les jours ou en atteignant votre objectif de la semaine\u00A0!",
        CTATitle: badges.length ? "Voir mes badges" : null,
        CTANavigation: ["BADGES_LIST"],
      },
    });
  })
);

module.exports = router;
