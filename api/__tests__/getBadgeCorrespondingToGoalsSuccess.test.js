const { getBadgeCorrespondingToGoalsSuccess } = require("../src/utils/goals");

describe("getBadgeCorrespondingToGoalsSuccess", () => {
  test("should return null if latestGoalBadge is null", async () => {
    const latestGoalBadge = null;
    const goalsSuccessCount = 0;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 8 if goalsSuccessCount >= 20 and latestGoalBadge.stars === 7", async () => {
    const latestGoalBadge = { stars: 7 };
    const goalsSuccessCount = 20;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "20 semaines réussies",
      content: "Objectif atteint une 20ème fois, félicitations !Partagez l’application à vos proches afin d’atteindre vos objectifs ensemble.",
      stars: 8,
      category: "goals",
      CTATitle: "Partager l'application",
      CTAShare: true,
      CTAEvent: {
        category: "SHARE_APP",
        action: "OPEN_FROM_MODAL",
        name: "FROM_20_WEEKS_GOAL_BADGE",
      },
      CTALink: null,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 10 and latestGoalBadge.stars === 7", async () => {
    const latestGoalBadge = { stars: 7 };
    const goalsSuccessCount = 15;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 7 if goalsSuccessCount >= 10 and latestGoalBadge.stars === 6", async () => {
    const latestGoalBadge = { stars: 6 };
    const goalsSuccessCount = 10;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "10 semaines réussies",
      content: "Objectif atteint une 10ème fois, félicitations !Partagez l’application à vos proches afin d’atteindre vos objectifs ensemble.",
      stars: 7,
      category: "goals",
      CTATitle: "Partager l'application",
      CTAShare: true,
      CTAEvent: {
        category: "SHARE_APP",
        action: "OPEN_FROM_MODAL",
        name: "FROM_10_WEEKS_GOAL_BADGE",
      },
      CTALink: null,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 6 and latestGoalBadge.stars === 6", async () => {
    const latestGoalBadge = { stars: 6 };
    const goalsSuccessCount = 8;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 6 if goalsSuccessCount >= 6 and latestGoalBadge.stars === 5", async () => {
    const latestGoalBadge = { stars: 5 };
    const goalsSuccessCount = 6;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "6 semaines réussies",
      content: "Objectif atteint une 6ème fois, félicitations !Partagez l’application à vos proches afin d’atteindre vos objectifs ensemble.",
      stars: 6,
      category: "goals",
      CTATitle: "Partager l'application",
      CTAShare: true,
      CTAEvent: {
        category: "SHARE_APP",
        action: "OPEN_FROM_MODAL",
        name: "FROM_6_WEEKS_GOAL_BADGE",
      },
      CTALink: null,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 4 and latestGoalBadge.stars === 5", async () => {
    const latestGoalBadge = { stars: 5 };
    const goalsSuccessCount = 5;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 5 if goalsSuccessCount >= 4 and latestGoalBadge.stars === 4", async () => {
    const latestGoalBadge = { stars: 4 };
    const goalsSuccessCount = 4;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "4 semaines réussies",
      content:
        "Toutes nos félicitations pour ce nouvel objectif atteint\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.",
      stars: 5,
      category: "goals",
      CTATitle: "Noter l'application",
      CTARate: true,
      CTAEvent: {
        category: "RATE_APP",
        action: "OPEN_FROM_MODAL",
        name: "FROM_4_WEEKS_GOAL_BADGE",
      },
      CTALink: null,
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 3 and latestGoalBadge.stars === 4", async () => {
    const latestGoalBadge = { stars: 4 };
    const goalsSuccessCount = 3;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 3 if goalsSuccessCount >= 3 and latestGoalBadge.stars === 3", async () => {
    const latestGoalBadge = { stars: 3 };
    const goalsSuccessCount = 3;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "3 semaines réussies",
      content:
        "Objectif atteint une 3ème semaine, bravo\u00A0! Donnez-nous votre avis sur Oz pour améliorer l'application ensemble, nous lisons tous vos messages.",
      stars: 4,
      category: "goals",
      CTATitle: "Donner mon avis",
      CTANavigation: ["NPS_SCREEN", { triggeredFrom: "After 3 weeks goal badge" }],
      CTAEvent: {
        category: "NPS",
        action: "NPS_OPEN_FROM_MODAL",
        name: "FROM_3_WEEKS_GOAL_BADGE",
      },
      CTALink: null,
      secondaryButtonTitle: "Partager l'application",
      secondaryButtonEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_3_WEEKS_GOAL_BADGE",
      },
      secondaryButtonLink: "",
      secondaryButtonNavigation: null,
      secondaryButtonShare: true,
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 2 and latestGoalBadge.stars === 3", async () => {
    const latestGoalBadge = { stars: 3 };
    const goalsSuccessCount = 2;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 2 if goalsSuccessCount >= 2 and latestGoalBadge.stars === 2", async () => {
    const latestGoalBadge = { stars: 2 };
    const goalsSuccessCount = 2;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "2 semaines réussies",
      content: "Objectif atteint une 2ème fois, félicitations\u00A0! Partagez l'application à vos proches afin d'atteindre vos objectifs ensemble.",
      stars: 3,
      category: "goals",
      CTATitle: "Partager l'application",
      CTAShare: true,
      CTAEvent: {
        category: "SHARE_APP",
        action: "PRESSED_FROM_MODAL",
        name: "FROM_2_WEEKS_GOAL_BADGE",
      },
      secondaryButtonTitle: "Non merci",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 1 and latestGoalBadge.stars === 2", async () => {
    const latestGoalBadge = { stars: 2 };
    const goalsSuccessCount = 1;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });

  test("should return badge 1 if goalsSuccessCount >= 1 and latestGoalBadge.stars === 1", async () => {
    const latestGoalBadge = { stars: 1 };
    const goalsSuccessCount = 1;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toEqual({
      title: "1 semaine réussie",
      content: "Bien joué, votre consommation de la semaine dernière est inférieure ou égale à votre objectif, continuez comme ça\u00A0!",
      stars: 2,
      category: "goals",
      CTATitle: "Voir mes badges",
      CTANavigation: ["BADGES_LIST"],
      CTALink: null,
      secondaryButtonTitle: "",
      secondaryButtonNavigation: null,
      secondaryButtonLink: "",
      showConfettis: true,
    });
  });

  test("should return null if goalsSuccessCount >= 1 and latestGoalBadge.stars === 1", async () => {
    const latestGoalBadge = { stars: 1 };
    const goalsSuccessCount = 0;
    const result = await getBadgeCorrespondingToGoalsSuccess(latestGoalBadge, goalsSuccessCount);
    expect(result).toBeNull();
  });
});
