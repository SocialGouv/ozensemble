import { capture } from '../../services/sentry';

export const getDisplayName = (contextKey, catalogObject) => {
  try {
    const context = catalogObject[contextKey];
    if (!context) {
      capture(new Error('context not found'), { extra: { contextKey, catalogObject, function: 'getDisplayName' } });
      return '';
    }
    return context.displayFeed;
  } catch (e) {
    capture(e, { extra: { contextKey, catalogObject, function: 'getDisplayName' } });
    return '';
  }
};

export const getStyle = (contextKey, catalogObject) => {
  try {
    const context = catalogObject[contextKey];
    if (!context) {
      capture(new Error('context not found'), {
        extra: { contextKey, catalogObject, function: 'getStyle' },
      });
      return {};
    }
    return context.style || {};
  } catch (e) {
    capture(e, { extra: { contextKey, catalogObject, function: 'getStyle' } });
    return {};
  }
};

export const formatNewcontext = (name, contextKey) => ({
  categoryKey: `${name}`,
  contextKey: `${contextKey}`,
  displayFeed: name,
  custom: true,
  active: true,
});

export const contextsCatalog = [
  // People
  {
    categoryKey: 'people',
    contextKey: 'alone',
    displayFeed: 'seul',
  },
  {
    categoryKey: 'people',
    contextKey: 'withcloseones',
    displayFeed: 'avec des proches',
  },
  {
    categoryKey: 'people',
    contextKey: 'withcolleagues',
    displayFeed: 'avec des collègues',
  },
  {
    categoryKey: 'people',
    contextKey: 'withdrinkingbuddy',
    displayFeed: 'avec des personnes avec qui je bois',
  },
  {
    categoryKey: 'people',
    contextKey: 'other',
    displayFeed: 'autre',
  },

  // Places
  {
    categoryKey: 'places',
    contextKey: 'home',
    displayFeed: 'à la maison',
  },
  {
    categoryKey: 'places',
    contextKey: 'bar',
    displayFeed: 'au bar',
  },
  {
    categoryKey: 'places',
    contextKey: 'work',
    displayFeed: 'au travail',
  },
  {
    categoryKey: 'places',
    contextKey: 'out',
    displayFeed: 'en extérieur',
  },
  {
    categoryKey: 'places',
    contextKey: 'atfriends',
    displayFeed: 'chez des amis',
  },
  {
    categoryKey: 'places',
    contextKey: 'atfamily',
    displayFeed: 'chez de la famille',
  },
  {
    categoryKey: 'places',
    contextKey: 'other',
    displayFeed: 'autre',
  },

  // Events
  {
    categoryKey: 'events',
    contextKey: 'casualevent',
    displayFeed: 'évènement occasionnel',
  },
  {
    categoryKey: 'events',
    contextKey: 'communevent',
    displayFeed: 'évènement habituel',
  },
  {
    categoryKey: 'events',
    contextKey: 'inthemorning',
    displayFeed: 'dès le matin',
  },
  {
    categoryKey: 'events',
    contextKey: 'duringmeal',
    displayFeed: 'pendant les repas',
  },
  {
    categoryKey: 'events',
    contextKey: 'afterwork',
    displayFeed: 'après le travail',
  },
  {
    categoryKey: 'events',
    contextKey: 'aperitif',
    displayFeed: 'apéritif',
  },
  {
    categoryKey: 'events',
    contextKey: 'party',
    displayFeed: 'fête',
  },
  {
    categoryKey: 'events',
    contextKey: 'other',
    displayFeed: 'autre',
  },

  // Needs
  {
    categoryKey: 'needs',
    contextKey: 'torelax',
    displayFeed: 'me détendre',
  },
  {
    categoryKey: 'needs',
    contextKey: 'toforget',
    displayFeed: 'oublier mes soucis',
  },
  {
    categoryKey: 'needs',
    contextKey: 'toreassure',
    displayFeed: 'me rassurer',
  },
  {
    categoryKey: 'needs',
    contextKey: 'antidepressant',
    displayFeed: 'antidépresseur',
  },
  {
    categoryKey: 'needs',
    contextKey: 'anxiolytic',
    displayFeed: 'anxiolytique',
  },
  {
    categoryKey: 'needs',
    contextKey: 'tofeelbetter',
    displayFeed: 'aller moins mal',
  },
  {
    categoryKey: 'needs',
    contextKey: 'toreducepain',
    displayFeed: 'avoir moins mal',
  },
  {
    categoryKey: 'needs',
    contextKey: 'forfun',
    displayFeed: "m'amuser",
  },
  {
    categoryKey: 'needs',
    contextKey: 'reward',
    displayFeed: 'me récompenser',
  },
  {
    categoryKey: 'needs',
    contextKey: 'confidence',
    displayFeed: "m'affirmer",
  },
  {
    categoryKey: 'needs',
    contextKey: 'disinhibit',
    displayFeed: 'me désinhiber',
  },
  {
    categoryKey: 'needs',
    contextKey: 'losecontrol',
    displayFeed: 'perdre le contrôle',
  },
  {
    categoryKey: 'needs',
    contextKey: 'sociabilise',
    displayFeed: 'sociabiliser',
  },
  {
    categoryKey: 'needs',
    contextKey: 'passtime',
    displayFeed: 'passer le temps',
  },
  {
    categoryKey: 'needs',
    contextKey: 'sleep',
    displayFeed: 'dormir',
  },
  {
    categoryKey: 'needs',
    contextKey: 'taste',
    displayFeed: 'le plaisir du goût',
  },
  {
    categoryKey: 'needs',
    contextKey: 'other',
    displayFeed: 'autre',
  },
];

export const contextsCatalogObject = contextsCatalog.reduce((acc, context) => {
  acc[context.contextKey] = context;
  return acc;
}, {});

// [PEOPLE, PLACES ...]
export const contextsCategories = [...new Set(contextsCatalog.map(({ categoryKey }) => categoryKey))];

export const contextKeysByCategory = contextsCategories.reduce((acc, categoryKey) => {
  acc[categoryKey] = contextsCatalog
    .filter((context) => context.categoryKey === categoryKey)
    .map(({ contextKey }) => contextKey);
  return acc;
}, {});
