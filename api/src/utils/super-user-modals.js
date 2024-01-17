const superUser90DaysInAppModal = {
  id: "@Super90UserFeature",
  title: "Merci d'être avec nous",
  content:
    "Bravo, vous êtes sur Oz depuis quelques mois et votre expérience nous est précieuse. Nous serions ravis de recueillir vos recommandations pour continuer à améliorer l'application :)",
  CTATitle: "Donner mon avis",
  CTANavigation: ["SUPER_NPS_SCREEN", { days: "90" }],
  secondaryButtonTitle: "Plus tard",
  CTAEvent: {
    category: "SUPER_90_NPS",
    action: "PRESSED_FROM_NEW_FEATURE_MODAL",
    name: "FROM_NEW_FEATURE",
  },
};
const superUser30DaysInAppModal = {
  id: "@Super30UserFeature",
  title: "Merci d'être avec nous",
  content:
    "Bravo, vous êtes sur Oz depuis plus d'un mois et votre expérience nous est précieuse. Nous serions ravis de recueillir vos recommandations pour continuer à améliorer l'application :)",
  CTATitle: "Donner mon avis",
  CTANavigation: ["SUPER_NPS_SCREEN", { days: "30" }],
  secondaryButtonTitle: "Plus tard",
  CTAEvent: {
    category: "SUPER_30_NPS",
    action: "PRESSED_FROM_NEW_FEATURE_MODAL",
    name: "FROM_NEW_FEATURE",
  },
};

module.exports = {
  superUser90DaysInAppModal,
  superUser30DaysInAppModal,
};
