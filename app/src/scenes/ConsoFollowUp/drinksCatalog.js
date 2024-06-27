import CocktailBottle from '../../components/illustrations/drinksAndFood/CocktailBottle';
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlass';
import HalfBeer from '../../components/illustrations/drinksAndFood/HalfBeer';
import Pint from '../../components/illustrations/drinksAndFood/Pint';
import WineBottle from '../../components/illustrations/drinksAndFood/WineBottle';
import WineGlass from '../../components/illustrations/drinksAndFood/WineGlass';
import PintCider from '../../components/illustrations/drinksAndFood/PintCider';
import HalfCider from '../../components/illustrations/drinksAndFood/HalfCider';
import Shoot from '../../components/illustrations/drinksAndFood/Shoot';
import Flasque from '../../components/illustrations/drinksAndFood/Flasque';
import ChampagneBottle from '../../components/illustrations/drinksAndFood/ChampagneBottle';
import ChampagneGlass from '../../components/illustrations/drinksAndFood/ChampagneGlass';
import AperitiveGlass from '../../components/illustrations/drinksAndFood/AperitiveGlass';
import AperitiveBottle from '../../components/illustrations/drinksAndFood/AperitiveBottle';
import SmallCan from '../../components/illustrations/drinksAndFood/SmallCan';
import Mojito from '../../components/illustrations/drinksAndFood/Mojito';
import DigestiveDrink from '../../components/illustrations/drinksAndFood/DigestiveDrink';
import SpiritsBottle from '../../components/illustrations/drinksAndFood/SpiritsBottle';
import OwnClGlass from '../../components/illustrations/drinksAndFood/OwnClGlass';
import { capture } from '../../services/sentry';
// categories
export const BEER = 'Bière (5%)';
export const WINE = 'Vin (12,5%)';
export const CHAMPAGNE = 'Champagne (12,5%)';
export const CIDER = 'Cidre (5%)';
export const APERITIVE = 'Apéritif (15 à 18%) : porto, vermouth...';
export const SPIRITS = 'Spiritueux (38% et +) : pastis, vodka, gin, whisky...';
// subCategories
export const NO_CONSO = 'no-conso';
export const BEER_HALF = 'beer-half';
export const BEER_PINT = 'beer-pint';
export const CIDER_HALF = 'cider-half';
export const CIDER_PINT = 'cider-pint';
export const WINE_GLASS = 'wine-glass';
export const WINE_BOTTLE = 'wine-bottle';
export const CHAMPAGNE_GLASS = 'champagne-glass';
export const CHAMPAGNE_BOTTLE = 'champagne-bottle';
export const HARD_COCKTAIL = 'hard-cocktail';
export const HARD_BOTTLE = 'hard-bottle';
export const HARD_SHOT = 'hard-shot';
export const HARD_FLASQUE = 'hard-flasque';
export const APERITIVE_GLASS = 'aperitive-glass';
export const APERITIVE_BOTTLE = 'aperitive-bottle';

export const getDrinkQuantityFromDrinks = (drinks, drinkKey) => {
  if (drinks === undefined) drinks = 'Cocktails et spiritueux';
  const drink = drinks.find((d) => d.drinkKey === drinkKey);
  if (drink !== undefined) return drink.quantity;
  return 0;
};

const getDoseOfDrink = (volume, degrees) => {
  /*
  http://www.ama.lu/alcool_2verres.php

  Méthode: 1 dose = 10g d'alcool
  Exemples pour 1 dose:
  25cl à 5deg
  10cl à 12deg
  3cl à 40deg
  7cl à 18deg
  DONC
  Volume x degrees / 12 ≈ 10 grammes = 1 dose
 */
  return Math.round((volume * degrees) / 12 / 10);
};

export const mapDrinkToDose = ({ drinkKey, quantity }, catalogObject) => {
  if (drinkKey === NO_CONSO) return 0;
  const drink = catalogObject[drinkKey];
  if (!drink) {
    // When a user update is own conso this will generate a sentry log because we update first the catalog which
    // make this function run before we update the consos so there is a mismatch
    // but when the consos are updated everything is back fine and is smooth for the user
    capture(new Error('drink not found'), {
      extra: { drinkKey, catalogObject, function: 'mapDrinkToDose' },
      tags: { drinkKey },
    });
    return 0;
  }
  if (drink) return drink.doses * quantity;
  return 0;
};

export const mapDrinkToKcals = ({ drinkKey, quantity }, catalogObject) => {
  // When a user update is own conso this will generate a sentry log because we update first the catalog which
  // make this function run before we update the consos so there is a mismatch
  // but when the consos are updated everything is back fine and is smooth for the user
  if (drinkKey === NO_CONSO) return 0;
  const drink = catalogObject[drinkKey];
  if (!drink) {
    capture(new Error('drink not found'), {
      extra: { drinkKey, catalogObject, function: 'mapDrinkToKcals' },
      tags: { drinkKey },
    });
    return 0;
  }
  if (drink) return drink.kcal * quantity;
  return 0;
};

export const mapDrinkToPrice = ({ drinkKey, quantity }, catalogObject) => {
  // When a user update is own conso this will generate a sentry log because we update first the catalog which
  // make this function run before we update the consos so there is a mismatch
  // but when the consos are updated everything is back fine and is smooth for the user
  if (drinkKey === NO_CONSO) return 0;
  const drink = catalogObject[drinkKey];
  if (!drink) {
    capture(new Error('drink not found'), {
      extra: { drinkKey, catalogObject, function: 'mapDrinkToPrice' },
      tags: { drinkKey },
    });
    return 0;
  }
  if (drink) return drink.price * quantity;
  return 0;
};

export const getDisplayName = (drinkKey, quantity, catalogObject) => {
  try {
    const drink = catalogObject[drinkKey];
    if (!drink) {
      capture(new Error('drink not found'), {
        extra: { drinkKey, catalogObject, function: 'getDisplayName' },
        tags: { drinkKey },
      });
      return '';
    }
    return drink.custom ? drink.displayFeed : drink.displayFeed?.(quantity);
  } catch (e) {
    capture(e, {
      extra: { drinkKey, quantity, catalogObject, function: 'getDisplayName' },
      tags: { drinkKey },
    });
    return '';
  }
};

export const getDisplayDrinksModalName = (drinkKey, catalogObject, quantity = 1) => {
  try {
    const drink = catalogObject[drinkKey];
    if (!drink) {
      capture(new Error('drink not found'), {
        extra: { drinkKey, catalogObject, function: 'getDisplayDrinksModalName' },
        tags: { drinkKey },
      });
      return '';
    }
    const formatedDisplay = quantity > 1 ? drink.displayDrinkModal + 's' : drink.displayDrinkModal;
    return formatedDisplay;
  } catch (e) {
    capture(e, {
      extra: { drinkKey, quantity, catalogObject, function: 'getDisplayDrinksModalName' },
      tags: { drinkKey },
    });
    return '';
  }
};

export const getVolume = (drinkKey, catalogObject) => {
  try {
    const drink = catalogObject[drinkKey];
    if (!drink) {
      capture(new Error('drink not found'), {
        extra: { drinkKey, catalogObject, function: 'getVolume' },
        tags: { drinkKey },
      });
      return '0 cl';
    }
    return drink.volume;
  } catch (e) {
    capture(e, { extra: { drinkKey, catalogObject, function: 'getVolume' } });
    return '0 cl';
  }
};

export const getDoses = (drinkKey, catalogObject) => {
  try {
    const drink = catalogObject[drinkKey];
    if (!drink) {
      capture(new Error('drink not found'), {
        extra: { drinkKey, catalogObject, function: 'getDoses' },
        tags: { drinkKey },
      });
      return 0;
    }
    return drink.doses;
  } catch (e) {
    capture(e, {
      extra: { drinkKey, catalogObject, function: 'getDoses' },
      tags: { drinkKey },
    });
    return 0;
  }
};

export const getStyle = (drinkKey, catalogObject) => {
  try {
    const drink = catalogObject[drinkKey];
    if (!drink) {
      capture(new Error('drink not found'), {
        extra: { drinkKey, catalogObject, function: 'getStyle' },
        tags: { drinkKey },
      });
      return {};
    }
    return drink.style || {};
  } catch (e) {
    capture(e, {
      extra: { drinkKey, catalogObject, function: 'getStyle' },
      tags: { drinkKey },
    });
    return {};
  }
};

export const getIcon = (iconName) => {
  const icon = mapIconNameToIcon[iconName];
  if (!icon) {
    capture(new Error('icon not found'), { extra: { iconName, function: 'getIcon' } });
    return HalfBeer;
  }
  return icon;
};

export const formatNewDrink = (name, quantity, degrees, drinkKey) => ({
  categoryKey: `${name}-${quantity}-${degrees}`,
  drinkKey: `${name}-${quantity}-${degrees}`,
  displayFeed: name,
  displayDrinkModal: name,
  volume: `${quantity} cl - ${degrees}˚`,
  doses: getDoseOfDrink(quantity, degrees),
  custom: true,
  active: true,
  iconOf: drinkKey,
  price: 0,
  kcal: 0,
});

export const mapIconNameToIcon = {
  HalfBeer: HalfBeer,
  Pint: Pint,
  HalfCider: HalfCider,
  PintCider: PintCider,
  CocktailBottle: CocktailBottle,
  CocktailGlass: CocktailGlass,
  WineGlass: WineGlass,
  WineBottle: WineBottle,
  AperitiveGlass: AperitiveGlass,
  AperitiveBottle: AperitiveBottle,
  Shoot: Shoot,
  Flasque: Flasque,
  SmallCan: SmallCan,
  ChampagneBottle: ChampagneBottle,
  ChampagneGlass: ChampagneGlass,
  Mojito: Mojito,
  DigestiveDrink: DigestiveDrink,
  SpiritsBottle: SpiritsBottle,
  OwnClGlass: OwnClGlass,
};

export const drinksCatalog = [
  {
    categoryKey: BEER,
    drinkKey: BEER_HALF,
    displayFeed: (q) => (q > 1 ? 'bières' : 'bière'),
    displayDrinkModal: 'demi',
    volume: '25 cl',
    doses: 1,
    icon: 'HalfBeer',
    price: 3.5,
    kcal: 70,
  },
  {
    categoryKey: BEER,
    drinkKey: BEER_PINT,
    displayFeed: (q) => (q > 1 ? 'bières' : 'bière'),
    displayDrinkModal: 'pinte',
    volume: '50 cl',
    doses: 2,
    icon: 'Pint',
    price: 7,
    kcal: 140,
  },

  {
    categoryKey: CIDER,
    drinkKey: CIDER_HALF,
    displayFeed: (q) => (q > 1 ? 'cidres' : 'cidre'),
    displayDrinkModal: 'demi',
    volume: '25 cl',
    doses: 1,
    icon: 'HalfCider',
    price: 2,
    kcal: 70,
  },
  {
    categoryKey: CIDER,
    drinkKey: CIDER_PINT,
    displayFeed: (q) => (q > 1 ? 'cidres' : 'cidre'),
    displayDrinkModal: 'pinte',
    volume: '50 cl',
    doses: 2,
    icon: 'PintCider',
    price: 4,
    kcal: 140,
    style: { marginBottom: 10 },
  },
  {
    categoryKey: WINE,
    drinkKey: WINE_GLASS,
    displayFeed: (q) => (q > 1 ? 'verres de vin' : 'verre de vin'),
    displayDrinkModal: 'verre',
    volume: '10 cl',
    doses: 1,
    icon: 'WineGlass',
    price: 4,
    kcal: 70,
  },
  {
    categoryKey: WINE,
    drinkKey: WINE_BOTTLE,
    displayFeed: (q) => (q > 1 ? 'bouteilles de vin' : 'bouteille de vin'),
    displayDrinkModal: 'bouteille',
    volume: '75 cl',
    doses: 7.5,
    icon: 'WineBottle',
    price: 10,
    kcal: 525,
    style: { marginBottom: 20, transform: [{ scale: 1.2 }] },
  },
  {
    categoryKey: CHAMPAGNE,
    drinkKey: CHAMPAGNE_GLASS,
    displayFeed: (q) => (q > 1 ? 'verres de champagne' : 'verre de champagne'),
    displayDrinkModal: 'coupe',
    volume: '10 cl',
    doses: 1,
    icon: 'ChampagneGlass',
    price: 5,
    kcal: 70,
  },
  {
    categoryKey: CHAMPAGNE,
    drinkKey: CHAMPAGNE_BOTTLE,
    displayFeed: (q) => (q > 1 ? 'bouteilles de champagnes' : 'bouteille de champagne'),
    displayDrinkModal: 'bouteille',
    volume: '75 cl',
    doses: 7.5,
    icon: 'ChampagneBottle',
    price: 20,
    kcal: 525,
    style: { marginBottom: 20 },
  },
  {
    categoryKey: APERITIVE,
    drinkKey: APERITIVE_GLASS,
    displayFeed: (q) => (q > 1 ? "verres d'apéritif" : "verre d'apéritif"),
    displayDrinkModal: 'verre',
    volume: '7 cl',
    doses: 1,
    icon: 'AperitiveGlass',
    price: 4,
    kcal: 71,
  },
  {
    categoryKey: APERITIVE,
    drinkKey: APERITIVE_BOTTLE,
    displayFeed: (q) => (q > 1 ? "bouteilles d'apéritif" : "bouteille d'apéritif"),
    displayDrinkModal: 'bouteille',
    volume: '75 cl',
    doses: 10.8,
    icon: 'AperitiveBottle',
    price: 10,
    kcal: 756,
    style: { marginBottom: 20 },
  },
  {
    categoryKey: SPIRITS,
    drinkKey: HARD_SHOT,
    displayFeed: (q) => (q > 1 ? 'shots' : 'shot'),
    displayDrinkModal: 'shot',
    volume: '3 cl',
    doses: 1,
    icon: 'Shoot',
    price: 2,
    kcal: 67,
  },
  {
    categoryKey: SPIRITS,
    drinkKey: HARD_COCKTAIL,
    displayFeed: (q) => (q > 1 ? 'verres de spiritueux' : 'verre de spiritueux'),
    displayDrinkModal: 'verre',
    volume: '5 cl + diluant',
    doses: 1.6,
    icon: 'CocktailGlass',
    price: 8,
    kcal: 133,
  },
  {
    categoryKey: SPIRITS,
    drinkKey: HARD_FLASQUE,
    displayFeed: (q) => (q > 1 ? 'flasques' : 'flasque'),
    displayDrinkModal: 'flasque',
    volume: '20 cl',
    doses: 6.4,
    icon: 'Flasque',
    price: 4,
    kcal: 750,
  },
  {
    categoryKey: SPIRITS,
    drinkKey: HARD_BOTTLE,
    displayFeed: (q) => (q > 1 ? 'bouteilles de spiritueux' : 'bouteille de spiritueux'),
    displayDrinkModal: 'bouteille',
    volume: '75 cl',
    doses: 24,
    icon: 'CocktailBottle',
    price: 15,
    kcal: 1680,
  },
];

export const drinksCatalogObject = {};
for (const drink of drinksCatalog) {
  drinksCatalogObject[drink.drinkKey] = drink;
}

// [BEER, CIDER, WINE, CHAMPAGNE, APERITIVE, SPIRITS]
export const drinksCategories = drinksCatalog
  .map(({ categoryKey }) => categoryKey)
  .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index);

export const drinkKeysByCategory = {};
for (const categoryKey of drinksCategories) {
  drinkKeysByCategory[categoryKey] = drinksCatalog
    .filter((drink) => drink.categoryKey === categoryKey)
    .map(({ drinkKey }) => drinkKey);
}
