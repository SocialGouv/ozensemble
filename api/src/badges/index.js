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

module.exports = {
  checkNewBadge,
};
