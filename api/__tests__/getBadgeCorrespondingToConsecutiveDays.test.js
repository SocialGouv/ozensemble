const { getBadgeCorrespondingToConsecutiveDays } = require("../src/utils/drinks");

describe("getBadgeCorrespondingToConsecutiveDays", () => {
  test("should return null if drinksConsecutiveDays is null", async () => {
    const latestDrinksBadge = { stars: 7 };
    const drinksConsecutiveDays = null;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return null if drinksConsecutiveDays >= 180 and latestGoalBadge.stars === 8", async () => {
    const latestDrinksBadge = { stars: 8 };
    const drinksConsecutiveDays = 180;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 8 if drinksConsecutiveDays >= 180 and latestGoalBadge.stars === 7", async () => {
    const latestDrinksBadge = { stars: 7 };
    const drinksConsecutiveDays = 180;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "6 mois complétés de suite",
      reduced_title: "6 mois",
      content: "Bravo pour votre régularité ! Partagez l’application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
      stars: 8,
      category: "drinks",
      CTATitle: "Partager l'application",
      CTAEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_180_DAYS_CONSO_BADGE",
      },
      CTAShare: true,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });
  test("should return null if drinksConsecutiveDays >= 90 and latestGoalBadge.stars === 7", async () => {
    const latestDrinksBadge = { stars: 7 };
    const drinksConsecutiveDays = 90;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 7 if drinksConsecutiveDays >= 90 and latestGoalBadge.stars === 6", async () => {
    const latestDrinksBadge = { stars: 6 };
    const drinksConsecutiveDays = 90;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "90 jours complétés de suite",
      reduced_title: "90 jours",
      content: "Bravo pour votre régularité ! Partagez l’application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
      stars: 7,
      category: "drinks",
      CTATitle: "Partager l'application",
      CTAEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_90_DAYS_CONSO_BADGE",
      },
      CTAShare: true,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 60 and latestGoalBadge.stars === 6", async () => {
    const latestDrinksBadge = { stars: 6 };
    const drinksConsecutiveDays = 60;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 6 if drinksConsecutiveDays >= 60 and latestGoalBadge.stars === 5", async () => {
    const latestDrinksBadge = { stars: 5 };
    const drinksConsecutiveDays = 60;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "60 jours complétés de suite",
      reduced_title: "60 jours",
      content: "Bravo pour votre régularité ! Partagez l’application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
      stars: 6,
      category: "drinks",
      CTATitle: "Partager l'application",
      CTAEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_60_DAYS_CONSO_BADGE",
      },
      CTAShare: true,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 28 and latestGoalBadge.stars === 5", async () => {
    const latestDrinksBadge = { stars: 5 };
    const drinksConsecutiveDays = 28;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 5 if drinksConsecutiveDays >= 28 and latestGoalBadge.stars === 4", async () => {
    const latestDrinksBadge = { stars: 4 };
    const drinksConsecutiveDays = 28;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "28 jours complétés de suite",
      reduced_title: "28 jours",
      content: "Bravo, déjà 4 semaines complétées\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.",
      stars: 5,
      category: "drinks",
      CTATitle: "Noter l'application",
      CTARate: true,
      CTAEvent: {
        category: "RATE_APP",
        action: "OPEN_FROM_MODAL",
        name: "FROM_28_DAYS_CONSO_BADGE",
      },
      CTAShare: null,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 14 and latestGoalBadge.stars === 4", async () => {
    const latestDrinksBadge = { stars: 4 };
    const drinksConsecutiveDays = 14;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 4 if drinksConsecutiveDays >= 14 and latestGoalBadge.stars === 3", async () => {
    const latestDrinksBadge = { stars: 3 };
    const drinksConsecutiveDays = 14;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "14 jours complétés de suite",
      reduced_title: "14 jours",
      content:
        "Toutes nos félicitations pour votre régularité\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
      stars: 4,
      category: "drinks",
      CTATitle: "Partager l'application",
      CTAEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_14_DAYS_CONSO_BADGE",
      },
      CTAShare: true,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: null,
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 7 and latestGoalBadge.stars === 3", async () => {
    const latestDrinksBadge = { stars: 3 };
    const drinksConsecutiveDays = 7;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 3 if drinksConsecutiveDays >= 7 and latestGoalBadge.stars === 2", async () => {
    const latestDrinksBadge = { stars: 2 };
    const drinksConsecutiveDays = 7;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      title: "7 jours complétés de suite",
      reduced_title: "7 jours",
      content:
        "Bravo de prendre soin de vous\u00A0! Vous allez pouvoir commencer à comparer d’une semaine à l’autre. Donnez-nous votre avis sur Oz Ensemble, nous lisons tous vos messages.",
      stars: 3,
      category: "drinks",
      CTATitle: "Donner mon avis",
      CTANavigation: ["NPS_SCREEN", { triggeredFrom: "After 7 days conso badge" }],
      CTAEvent: {
        category: "NPS",
        action: "NPS_OPEN_FROM_MODAL",
        name: "FROM_7_DAYS_CONSO_BADGE",
      },
      CTAShare: null,
      secondaryButtonTitle: "Partager l'application",
      secondaryButtonEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_7_DAYS_CONSO_BADGE",
      },
      secondaryButtonLink: null,
      secondaryButtonShare: true,
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 3 and latestGoalBadge.stars === 2", async () => {
    const latestDrinksBadge = { stars: 2 };
    const drinksConsecutiveDays = 3;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return badge 2 if drinksConsecutiveDays >= 3 and latestGoalBadge.stars === 1", async () => {
    const latestDrinksBadge = { stars: 1 };
    const drinksConsecutiveDays = 3;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      category: "drinks",
      title: "3 jours complétés de suite",
      reduced_title: "3 jours",
      content: "Félicitations\u00A0! C'est en comptant régulièrement que l'on se rend compte de sa consommation réelle, continuez comme ça\u00A0!",
      stars: 2,
      CTATitle: "Voir mes badges",
      CTANavigation: ["BADGES_LIST"],
      CTALink: null,
      secondaryButtonTitle: null,
      secondaryButtonNavigation: null,
      secondaryButtonLink: null,
      showConfettis: true,
    });
  });

  test("should return null if drinksConsecutiveDays >= 1 and latestGoalBadge.stars === 1", async () => {
    const latestDrinksBadge = { stars: 1 };
    const drinksConsecutiveDays = 1;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toBeNull();
  });

  test("should return null if drinksConsecutiveDays >= 1 and no latestGoalBadge", async () => {
    const latestDrinksBadge = null;
    const drinksConsecutiveDays = 1;
    const result = await getBadgeCorrespondingToConsecutiveDays(latestDrinksBadge, drinksConsecutiveDays);
    expect(result).toEqual({
      category: "drinks",
      title: "1er jour complété",
      reduced_title: "1 jour",
      content: "Super vous avez complété votre 1er jour\u00A0! Revenez demain pour ajouter le second\u00A0!",
      stars: 1,
      CTATitle: "Voir mes badges",
      CTANavigation: ["BADGES_LIST"],
      CTALink: null,
      secondaryButtonTitle: null,
      secondaryButtonNavigation: null,
      secondaryButtonLink: null,
      showConfettis: true,
    });
  });
});
