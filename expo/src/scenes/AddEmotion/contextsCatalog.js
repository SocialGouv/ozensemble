import { capture } from "../../services/sentry";
import DepressedEmotion from "../../components/illustrations/emotion/DepressedEmotion";
import EcstaticEmotion from "../../components/illustrations/emotion/EcstaticEmotion";
import FineEmotion from "../../components/illustrations/emotion/FineEmotion";
import NeutralEmotion from "../../components/illustrations/emotion/NeutralEmotion";
import SadEmotion from "../../components/illustrations/emotion/SadEmotion";

export const emotionIcon = {
  depressed: DepressedEmotion,
  sad: SadEmotion,
  neutral: NeutralEmotion,
  fine: FineEmotion,
  ecstatic: EcstaticEmotion,
};
export const getDisplayName = (contextKey, catalogObject) => {
  try {
    const context = catalogObject[contextKey];
    if (!context) {
      capture(new Error("context not found"), {
        extra: { contextKey, catalogObject, function: "getDisplayName" },
      });
      return "";
    }
    return context.displayFeed;
  } catch (e) {
    capture(e, { extra: { contextKey, catalogObject, function: "getDisplayName" } });
    return "";
  }
};

export const contextsCatalog = [
  // People
  {
    categoryKey: "people",
    contextKey: "alone",
    displayFeed: "seul",
  },
  {
    categoryKey: "people",
    contextKey: "withcloseones",
    displayFeed: "avec des proches",
  },
  {
    categoryKey: "people",
    contextKey: "withcolleagues",
    displayFeed: "avec des collègues",
  },
  {
    categoryKey: "people",
    contextKey: "withdrinkingbuddy",
    displayFeed: "avec des personnes avec qui je bois",
  },

  // Places
  {
    categoryKey: "places",
    contextKey: "home",
    displayFeed: "à la maison",
  },
  {
    categoryKey: "places",
    contextKey: "bar",
    displayFeed: "au bar",
  },
  {
    categoryKey: "places",
    contextKey: "work",
    displayFeed: "au travail",
  },
  {
    categoryKey: "places",
    contextKey: "out",
    displayFeed: "en extérieur",
  },
  {
    categoryKey: "places",
    contextKey: "atfriends",
    displayFeed: "chez des amis",
  },
  {
    categoryKey: "places",
    contextKey: "atfamily",
    displayFeed: "chez de la famille",
  },

  // Events
  {
    categoryKey: "events",
    contextKey: "casualevent",
    displayFeed: "évènement occasionnel",
  },
  {
    categoryKey: "events",
    contextKey: "communevent",
    displayFeed: "évènement habituel",
  },
  {
    categoryKey: "events",
    contextKey: "inthemorning",
    displayFeed: "dès le matin",
  },
  {
    categoryKey: "events",
    contextKey: "duringmeal",
    displayFeed: "pendant les repas",
  },
  {
    categoryKey: "events",
    contextKey: "afterwork",
    displayFeed: "après le travail",
  },
  {
    categoryKey: "events",
    contextKey: "aperitif",
    displayFeed: "apéritif",
  },
  {
    categoryKey: "events",
    contextKey: "party",
    displayFeed: "fête",
  },

  // Needs
  {
    categoryKey: "needs",
    contextKey: "torelax",
    displayFeed: "me détendre",
  },
  {
    categoryKey: "needs",
    contextKey: "toforget",
    displayFeed: "oublier mes soucis",
  },
  {
    categoryKey: "needs",
    contextKey: "toreassure",
    displayFeed: "me rassurer",
  },
  {
    categoryKey: "needs",
    contextKey: "antidepressant",
    displayFeed: "antidépresseur",
  },
  {
    categoryKey: "needs",
    contextKey: "anxiolytic",
    displayFeed: "anxiolytique",
  },
  {
    categoryKey: "needs",
    contextKey: "tofeelbetter",
    displayFeed: "aller moins mal",
  },
  {
    categoryKey: "needs",
    contextKey: "toreducepain",
    displayFeed: "avoir moins mal",
  },
  {
    categoryKey: "needs",
    contextKey: "forfun",
    displayFeed: "m'amuser",
  },
  {
    categoryKey: "needs",
    contextKey: "reward",
    displayFeed: "me récompenser",
  },
  {
    categoryKey: "needs",
    contextKey: "confidence",
    displayFeed: "m'affirmer",
  },
  {
    categoryKey: "needs",
    contextKey: "disinhibit",
    displayFeed: "me désinhiber",
  },
  {
    categoryKey: "needs",
    contextKey: "losecontrol",
    displayFeed: "perdre le contrôle",
  },
  {
    categoryKey: "needs",
    contextKey: "sociabilise",
    displayFeed: "sociabiliser",
  },
  {
    categoryKey: "needs",
    contextKey: "passtime",
    displayFeed: "passer le temps",
  },
  {
    categoryKey: "needs",
    contextKey: "sleep",
    displayFeed: "dormir",
  },
  {
    categoryKey: "needs",
    contextKey: "taste",
    displayFeed: "le plaisir du goût",
  },
];

export const contextsCatalogObject = contextsCatalog.reduce((_contextsCatalogObject, context) => {
  _contextsCatalogObject[context.contextKey] = context;
  return _contextsCatalogObject;
}, {});

// [PEOPLE, PLACES ...]
const contextsCategories = [...new Set(contextsCatalog.map(({ categoryKey }) => categoryKey))];

export const contextKeysByCategory = contextsCategories.reduce((acc, categoryKey) => {
  acc[categoryKey] = contextsCatalog
    .filter((context) => context.categoryKey === categoryKey)
    .map(({ contextKey }) => contextKey);
  return acc;
}, {});
