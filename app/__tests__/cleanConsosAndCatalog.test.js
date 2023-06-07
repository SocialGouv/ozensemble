import { cleanCatalog } from '../src/services/storage';
jest.mock('@react-native-community/netinfo', () => ({
  fetch: () => Promise.resolve({ isConnected: true }),
}));
jest.mock('react-native-device-info', () => ({
  getBuildNumber: () => '1',
}));
jest.mock('react-native-config', () => ({}));
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getBoolean: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
  })),
}));
jest.mock('../src/services/api.js', () => ({}));

describe('cleanCatalog', () => {
  test('case old drink catalog from 2020', () => {
    const catalog = [
      {
        active: true,
        categoryKey: 'Coupe de champagne -12-12',
        custom: true,
        displayDrinkModal: 'Coupe de champagne ',
        displayFeed: 'Coupe de champagne ',
        doses: 1,
        drinkKey: 'Coupe de champagne -12-12',
        iconOf: 'wine-glass',
        volume: '12 cl - 12˚',
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        categoryKey: 'ownDrink',
        custom: true,
        displayDrinkModal: 'Coupe de champagne ',
        drinkKey: 'Coupe de champagne -12-12',
        icon: 'WineGlass',
        isDeleted: false,
        kcal: Math.round(((12 * 0.8 * 12) / 10) * 7),
        price: 5,
        volume: '12 cl',
        alcoolPercentage: 12,
        doses: 1,
        displayFeed: 'Coupe de champagne ',
      },
    ]);
  });

  // test drinks with , instead of . for price and volume
  test(', instead of . for price and volume', () => {
    const catalog = [
      {
        drinkKey: 'Non',
        icon: 'WineGlass',
        categoryKey: 'ownDrink',
        volume: '10 cl',
        isDeleted: false,
        kcal: NaN,
        doses: NaN,
        displayFeed: 'Non',
        displayDrinkModal: 'Non',
        custom: true,
        alcoolPercentage: NaN,
        price: NaN,
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        categoryKey: 'ownDrink',
        custom: true,
        displayDrinkModal: 'Non',
        drinkKey: 'Non',
        icon: 'WineGlass',
        isDeleted: false,
        kcal: Math.round(((5 * 0.8 * 10) / 10) * 7),
        price: 5,
        volume: '10 cl',
        alcoolPercentage: 5,
        doses: Math.round((5 * 0.8 * 10) / 10) / 10,
        displayFeed: 'Non',
      },
    ]);
  });

  // test bug of first migration when we forgot ownCocktail

  test('bug of first migration when we forgot ownCocktail', () => {
    const catalog = [
      {
        drinkKey: 'ownCocktail',
        icon: 'WineGlass',
        categoryKey: 'ownCocktail',
        volume: '10 cl',
        isDeleted: false,
        kcal: NaN,
        doses: NaN,
        displayFeed: 'Non',
        displayDrinkModal: 'Non',
        custom: true,
        alcoolPercentage: NaN,
        price: NaN,
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        categoryKey: 'ownCocktail',
        custom: true,
        displayDrinkModal: 'Non',
        drinkKey: 'Non',
        icon: 'WineGlass',
        isDeleted: false,
        kcal: Math.round(((5 * 0.8 * 10) / 10) * 7),
        price: 5,
        volume: '10 cl',
        alcoolPercentage: 5,
        doses: Math.round((5 * 0.8 * 10) / 10) / 10,
        displayFeed: 'Non',
      },
    ]);
  });

  test('correct cocktail', () => {
    const catalog = [
      {
        categoryKey: 'ownCocktail',
        drinkKey: 'Cocktail Spritz',
        displayFeed: 'Cocktail Spritz',
        displayDrinkModal: 'Cocktail Spritz',
        volume: '10 cl',
        doses: 0.9,
        icon: 'CocktailGlass',
        price: 5,
        kcal: 120,
        custom: true,
        isDeleted: false,
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        categoryKey: 'ownCocktail',
        drinkKey: 'Cocktail Spritz',
        displayFeed: 'Cocktail Spritz',
        displayDrinkModal: 'Cocktail Spritz',
        volume: '10 cl',
        doses: 0.9,
        icon: 'CocktailGlass',
        alcoolPercentage: 5,
        price: 5,
        kcal: 120,
        custom: true,
        isDeleted: false,
      },
    ]);
  });

  // test no custom drinks
  test('no custom drinks', () => {
    const catalog = [
      {
        categoryKey: 'Bière (5%)',
        drinkKey: 'beer-pint',
        displayDrinkModal: 'pinte',
        volume: '50 cl',
        doses: 2,
        icon: 'Pint',
        price: 7,
        kcal: 140,
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([]);
  });

  test('Good custom drink', () => {
    const catalog = [
      {
        drinkKey: 'Non',
        icon: 'WineGlass',
        categoryKey: 'ownDrink',
        volume: '10 cl',
        isDeleted: false,
        kcal: 19,
        doses: 0.3,
        displayFeed: 'Non',
        displayDrinkModal: 'Non',
        custom: true,
        alcoolPercentage: 3.4,
        price: 2.3,
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        drinkKey: 'Non',
        icon: 'WineGlass',
        categoryKey: 'ownDrink',
        volume: '10 cl',
        isDeleted: false,
        kcal: 19,
        doses: 0.3,
        displayFeed: 'Non',
        displayDrinkModal: 'Non',
        custom: true,
        alcoolPercentage: 3.4,
        price: 2.3,
      },
    ]);
  });
});
