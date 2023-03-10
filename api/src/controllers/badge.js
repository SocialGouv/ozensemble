const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");
const dayjs = require("dayjs");

router.get(
  "/test",
  catchErrors(async (req, res) => {
    const { category, stars } = req.query;

    return res.status(200).send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog(category, stars) } });
  })
);

router.get(
  "/:matomoId",
  catchErrors(async (req, res) => {
    const { matomoId } = req.params;

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

    const newBadgeAnnouncementFeatures = await prisma.appUserMilestone.findUnique({
      where: { id: `${user.id}_@NewBadgesAnnouncementFeatures2` },
    });

    if (!!newBadgeAnnouncementFeatures) {
      return res.status(200).send({
        ok: true,
        data: {
          badges,
          badgesCatalog,
        },
      });
    }

    await prisma.appUserMilestone.create({
      data: {
        id: `${user.id}_@NewBadgesAnnouncementFeatures2`,
        userId: user.id,
        date: dayjs().format("YYYY-MM-DD"),
      },
    });

    return res.status(200).send({
      ok: true,
      data: {
        badges,
        badgesCatalog,
      },
      showInAppModal: {
        id: "@NewBadgesAnnouncementFeatures2",
        badgesCategories: ["drinks", "goals"], // "defis", "articles"
        title: "Nouveau\u00A0: les badges arrivent dans l'application\u00A0!",
        content: "Gagnez des badges symboliques en ajoutant vos consommations tous les jours ou en atteignant votre objectif de la semaine\u00A0!",
        CTAButton: badges.length ? "Voir mes badges" : null,
        CTANavigation: ["BADGES_LIST"],
      },
    });
  })
);

module.exports = router;
