import CocktailBottle from '../components/Illustrations/CocktailBottle';
import CocktailGlass from '../components/Illustrations/CocktailGlass';
import HalfBeer from '../components/Illustrations/HalfBeer';
import Pint from '../components/Illustrations/Pint';
import WineBottle from '../components/Illustrations/WineBottle';
import WineGlass from '../components/Illustrations/WineGlass';

// categories
export const BEER = 'Bières';
export const WINE = 'Vins';
export const HARD = 'Cocktails et spiritueux';

// subCategories
export const BEER_HALF = 'beer-half';
export const BEER_PINT = 'beer-pint';
export const WINE_GLASS = 'wine-glass';
export const WINE_BOTTLE = 'wine-bottle';
export const HARD_SHOT = 'hard-shot';
export const HARD_BOTTLE = 'hard-bottle';

export const drinksCatalog = [
  {
    categoryKey: BEER,
    drinkKey: BEER_HALF,
    displayFeed: q => (q > 1 ? 'bières' : 'bière'),
    displayDrinkModal: 'demi',
    volume: '25 cl - 4˚',
    doses: 1,
    icon: HalfBeer,
  },
  {
    categoryKey: BEER,
    drinkKey: BEER_PINT,
    displayFeed: q => (q > 1 ? 'bières' : 'bière'),
    displayDrinkModal: 'pinte',
    volume: '50 cl - 4˚',
    doses: 2,
    icon: Pint,
  },
  {
    categoryKey: WINE,
    drinkKey: WINE_GLASS,
    displayFeed: q => (q > 1 ? 'verres de vin' : 'verre de vin'),
    displayDrinkModal: 'verre',
    volume: '12 cl - 12˚',
    doses: 1,
    icon: WineGlass,
  },
  {
    categoryKey: WINE,
    drinkKey: WINE_BOTTLE,
    displayFeed: q => (q > 1 ? 'bouteilles de vin' : 'bouteille de vin'),
    displayDrinkModal: 'bouteille',
    volume: '75 cl - 12˚',
    doses: 8,
    icon: WineBottle,
  },
  {
    categoryKey: HARD,
    drinkKey: HARD_SHOT,
    displayFeed: q => (q > 1 ? 'cocktails ou shots' : 'cocktail ou shot'),
    displayDrinkModal: 'cocktail ou shot',
    volume: '5 cl - 40˚',
    doses: 1,
    icon: CocktailGlass,
  },
  {
    categoryKey: HARD,
    drinkKey: HARD_BOTTLE,
    displayFeed: q => (q > 1 ? 'bouteilles de spiritueux' : 'bouteille de spiritueux'),
    displayDrinkModal: 'bouteille',
    volume: '75 cl - 40˚',
    doses: 22,
    icon: CocktailBottle,
  },
];
