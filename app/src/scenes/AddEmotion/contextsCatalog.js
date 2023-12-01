import { capture } from '../../services/sentry';

// categories
export const PEOPLE = 'people';
export const PLACES = 'places';
export const EVENTS = 'events';
export const NEEDS = 'needs';

// context
export const ALONE = 'alone';
export const WITHCLOSEONES = 'withcloseones';
export const WITHCOLLEGUES = 'withcollegues';
export const WITHDRINKINGBUDY = 'withdrinkingbudy';
export const OTHER = 'other';
export const HOME = 'home';
export const BAR = 'bar';
export const WORK = 'WORK';
export const OUT = 'out';
export const ATFRIENDS = 'atfriends';
export const ATFAMILYS = 'atfamilys';
export const PARTY = 'party';
export const TASTE = 'taste';

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
  {
    categoryKey: PEOPLE,
    contextKey: ALONE,
    displayFeed: 'seul',
  },
  {
    categoryKey: PEOPLE,
    contextKey: WITHCLOSEONES,
    displayFeed: 'avec des proches',
  },
  {
    categoryKey: PEOPLE,
    contextKey: WITHCOLLEGUES,
    displayFeed: 'avec des collègues',
  },
  {
    categoryKey: PEOPLE,
    contextKey: WITHDRINKINGBUDY,
    displayFeed: 'avec des personnes avec qui je bois',
  },
  {
    categoryKey: PEOPLE,
    contextKey: OTHER,
    displayFeed: 'autre',
  },
  {
    categoryKey: PLACES,
    contextKey: HOME,
    displayFeed: 'à la maison',
  },
  {
    categoryKey: PLACES,
    contextKey: BAR,
    displayFeed: 'au bar',
  },
  {
    categoryKey: PLACES,
    contextKey: WORK,
    displayFeed: 'au travail',
  },
  {
    categoryKey: PLACES,
    contextKey: OUT,
    displayFeed: 'en extérieur',
  },
  {
    categoryKey: PLACES,
    contextKey: ATFRIENDS,
    displayFeed: 'chez des amis',
  },
  {
    categoryKey: PLACES,
    contextKey: ATFAMILYS,
    displayFeed: 'chez de la famille',
  },
  {
    categoryKey: PLACES,
    contextKey: OTHER,
    displayFeed: 'autre',
  },
  {
    categoryKey: EVENTS,
    contextKey: PARTY,
    displayFeed: 'fête',
  },
  {
    categoryKey: NEEDS,
    contextKey: TASTE,
    displayFeed: 'le plaisir du goût',
  },
];

export const contextsCatalogObject = {};
for (const context of contextsCatalog) {
  contextsCatalogObject[context.contextKey] = context;
}

// [BEER, CIDER, WINE, CHAMPAGNE, APERITIVE, SPIRITS]
export const contextsCategories = contextsCatalog
  .map(({ categoryKey }) => categoryKey)
  .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index);

export const contextKeysByCategory = {};
for (const categoryKey of contextsCategories) {
  contextKeysByCategory[categoryKey] = contextsCatalog
    .filter((context) => context.categoryKey === categoryKey)
    .map(({ contextKey }) => contextKey);
}
