const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.get(
  "/",
  catchErrors(async (req, res) => {
    // test prisma db connection
    const conso = await prisma.consommation.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (conso) {
      return res.send({ ok: true, data: conso?.id });
    }
    return res.send({ ok: false });
  })
);

router.post(
  "/init",
  catchErrors(async (req, res) => {
    console.log("init");
    const modale = req.body?.modale;
    // USER SURVEY:
    if (modale === "super90") {
      console.log("ici");
      return res.status(200).send({
        ok: true,
        showInAppModal: {
          id: "@Super90UserFeature",
          title: "Merci d'être avec nous",
          content:
            "Bravo, vous ête sur Oz depuis quelques mois et votre expérience nous est précieuse. Nous serions ravis de recueillir vos recommandations pour continuer à améliorer l'application :)",
          CTATitle: "Donner mon avis",
          CTANavigation: ["SUPER_NPS_SCREEN", { days: "90" }],
          secondaryButtonTitle: "Plus tard",
          CTAEvent: {
            category: "SUPER_90_NPS",
            action: "PRESSED_FROM_NEW_FEATURE_MODAL",
            name: "FROM_NEW_FEATURE",
          },
        },
      });
    }
    if (modale === "super30") {
      // if the user skipped the 30 days, he will have got the 90 days - if he got the 90 days, we don't show him the 30 days
      return res.status(200).send({
        ok: true,
        showInAppModal: {
          id: "@Super30UserFeature",
          title: "Merci d'être avec nous",
          content:
            "Bravo, vous ête sur Oz depuis plus d'un mois et votre expérience nous est précieuse. Nous serions ravis de recueillir vos recommandations pour continuer à améliorer l'application :)",
          CTATitle: "Donner mon avis",
          CTANavigation: ["SUPER_NPS_SCREEN", { days: "30" }],
          secondaryButtonTitle: "Plus tard",
          CTAEvent: {
            category: "SUPER_30_NPS",
            action: "PRESSED_FROM_NEW_FEATURE_MODAL",
            name: "FROM_NEW_FEATURE",
          },
        },
      });
    }
    return res.status(200).send({ ok: true });
  })
);
module.exports = router;
