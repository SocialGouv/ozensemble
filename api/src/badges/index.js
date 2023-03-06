const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");

const checkNewBadge = async (body) => {
  try {
    const action = body.event?.action;
    const category = body.event?.category;
    const name = body.event?.name;
    const value = body.event?.value;
    const matomoId = body.userId;

    if (category === "CONSO" && (action === "CONSO_ADD" || action === "CONSO_DRINKLESS" || action === "NO_CONSO")) {
      return {
        title: "Objectif fixé",
        content: "Bravo vous venez de fixer votre premier objectif, c'est une étape essentielle pour commencer à modifier vos habitudes.",
        stars: 1,
        buttonTitle: "Voir mes badges",
        category: "GOALS",
        CTATitle: "Voir mes badges",
        secondaryButtonLink: "",
        secondaryButtonTitle: "",
      };
    }
  } catch (e) {
    capture(e, { level: "error" });
  }
  return null;
};

const badgesCatalog = [
  {
    category: "drinks",
    titleForList: "Badges jours",
    titleForStatus: "Jours complétés",
    description:
      "Gagnez ces badges en ajoutant votre consommation d'alcool tous les jours, en effet connaître sa consommation permet déjà de la maitriser\u00A0!",
    bgColor: "#FBD361",
    badges: [
      {
        title: "1er jour complété",
        reduced_title: "1 jour",
        content: "Super vous avez complété votre 1er jour\u00A0! Revenez demain pour ajouter le second\u00A0!",
        stars: 1,
        category: "drinks",
        CTATitle: "Voir mes badges",
        secondaryButtonTitle: "",
        secondaryButtonLink: "",
      },
      {
        title: "3 jours complétés de suite",
        reduced_title: "3 jours",
        content: "Félicitations\u00A0! C'est en comptant régulièrement que l'on se rend compte de sa consommation réelle, continuez comme ça\u00A0!",
        stars: 2,
        category: "drinks",
        CTATitle: "Voir mes badges",
        secondaryButtonTitle: "",
        secondaryButtonLink: "",
      },
      {
        title: "7 jours complétés de suite",
        reduced_title: "7 jours",
        content:
          "Toutes nos félicitations pour votre régularité\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
        stars: 3,
        category: "drinks",
        CTATitle: "Donner mon avis",
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonLink: "",
      },
      {
        title: "14 jours complétés de suite",
        reduced_title: "14 jours",
        content:
          "Toutes nos félicitations pour votre régularité\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
        stars: 4,
        category: "drinks",
        CTATitle: "Partager l'application",
        secondaryButtonTitle: "Non merci",
        secondaryButtonLink: "",
      },
      {
        title: "28 jours complétés de suite",
        reduced_title: "28 jours",
        content: "Bravo, déjà 4 semaines complétées\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.",
        stars: 5,
        category: "drinks",
        CTATitle: "Noter l'application",
        secondaryButtonTitle: "Non merci",
        secondaryButtonLink: "",
      },
    ],
  },
  {
    category: "goals",
    titleForList: "Badges objectifs",
    titleForStatus: "Objectifs atteints",
    description:
      "Gagnez ces badges en vous fixant votre objectif, puis d'une semaine à l'autre quand votre consommation d'alcool est inférieure à votre objectif\u00A0!",
    bgColor: "#81DBD3",
    badges: [
      {
        title: "Objectif fixé",
        content: "Bravo, vous venez de fixer votre premier objectif, c'est une étape essentielle pour commencer à modifier vos habitudes.",
        stars: 1,
        category: "GOALS",
        CTATitle: "Voir mes badges",
        secondaryButtonTitle: "",
        secondaryButtonLink: "",
      },
      {
        title: "1 semaine réussie",
        content: "Bien joué, votre consommation de la semaine dernière est inférieure ou égale à votre objectif, continuez comme ça\u00A0!",
        stars: 2,
        category: "GOALS",
        CTATitle: "Voir mes badges",
        secondaryButtonTitle: "",
        secondaryButtonLink: "",
      },
      {
        title: "2 semaines réussies",
        content: "Objectif atteint une 2ème fois, félicitations\u00A0! Partagez l'application à vos proches afin d'atteindre vos objectifs ensemble.",
        stars: 3,
        category: "GOALS",
        CTATitle: "Partager l'application",
        secondaryButtonTitle: "Non merci",
        secondaryButtonLink: "",
      },
      {
        title: "3 semaines réussies",
        content:
          "Objectif atteint une 3ème semaine, bravo\u00A0! Donnez-nous votre avis sur Oz pour améliorer l'application ensemble, nous lisons tous vos messages.",
        stars: 4,
        category: "GOALS",
        CTATitle: "Donner mon avis",
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonLink: "",
      },
      {
        title: "4 semaines réussies",
        content:
          "Toutes nos félicitations pour ce nouvel objectif atteint\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.",
        stars: 5,
        category: "GOALS",
        CTATitle: "Noter l'application",
        secondaryButtonTitle: "Non merci",
        secondaryButtonLink: "",
      },
    ],
  },
  // {
  //   category: "defis",
  //   badges: [],
  // },
  // {
  //   category: "articles",
  //   badges: [],
  // },
];

module.exports = {
  checkNewBadge,
  badgesCatalog,
};
