const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");

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
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    console.log("user", user);
    let CTAContent;
    if (user) {
      CTAContent = "Voir mes badges";
    } else {
      CTAContent = null;
      user = await prisma.user.create({
        data: {
          matomo_id: matomoId,
        },
      });
    }
    // find badges of matomoId
    // const user = await prisma.user.upsert({
    //   where: { matomo_id: matomoId },
    //   create: {
    //     matomo_id: matomoId,
    //   },
    //   update: {},
    // });

    const badges = await prisma.badge.findMany({
      where: {
        userId: user.id,
      },
    });

    let announcementModal = null;
    if (!user.announcementModals.includes("@NewBadgesAnnouncementFeatures3")) {
      console.log(user);
      announcementModal = {
        id: "@NewBadgesAnnouncementFeatures3",
        badgesCategories: ["drinks", "goals"], // "defis", "articles"
        title: "Nouveau\u00A0: les badges arrivent dans l'application\u00A0!",
        description:
          "Gagnez des badges symboliques en ajoutant vos consommations tous les jours ou en atteignant votre objectif de la semaine\u00A0!",
        CTAButton: CTAContent,
        CTANavigation: ["BADGES_LIST"],
      };
      await prisma.user.update({
        where: { id: user.id },
        data: {
          announcementModals: {
            set: [...user.announcementModals, "@NewBadgesAnnouncementFeatures3"],
          },
        },
      });
    }

    return res.status(200).send({
      ok: true,
      data: {
        badges,
        badgesCatalog,
        announcementModal,
      },
    });
  })
);

module.exports = router;
