import { capture } from '../../services/sentry';
// categories
export const PEOPLE = 'people';
export const PLACES = 'places';
export const EVENTS = 'events';
export const NEEDS = 'needs';

// context
export const NO_CONSO = 'no-conso';
export const ALONE = 'alone';
export const HOME = 'home';
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
    categoryKey: PLACES,
    contextKey: HOME,
    displayFeed: 'à la maison',

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
