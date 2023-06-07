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
  test('Case old drink catalog from 2020', () => {
    const oldDrink = {
      drinkKey: 'Coupe de champagne -12-12',
      categoryKey: 'Coupe de champagne -12-12',
      active: true,
      custom: true,
      displayDrinkModal: 'Coupe de champagne ',
      displayFeed: 'Coupe de champagne ',
      doses: 1,
      iconOf: 'wine-glass',
      volume: '12 cl - 12˚',
    };
    const newDrink = {
      drinkKey: 'Coupe de champagne -12-12',
      categoryKey: 'ownDrink',
      icon: 'WineGlass',
      isDeleted: false,
      volume: '12 cl',
      kcal: 81,
      price: 5,
      alcoolPercentage: 12,

      custom: oldDrink.custom,
      displayDrinkModal: oldDrink.displayDrinkModal,
      displayFeed: oldDrink.displayFeed,
      doses: oldDrink.doses,
    };
    expect(cleanCatalog([oldDrink])).toEqual([newDrink]);
  });

  // test drinks with , instead of . for price and volume
  test('Remove NaN values from using comas intead of points', () => {
    const oldDrink = {
      drinkKey: 'Vin Rouge',
      categoryKey: 'ownDrink',
      isDeleted: false,
      custom: true,
      displayFeed: 'Vin Rouge',
      displayDrinkModal: 'Vin Rouge',
      icon: 'WineGlass',
      volume: '10 cl',
      kcal: NaN,
      doses: NaN,
      alcoolPercentage: NaN,
      price: NaN,
    };
    const newDrink = {
      drinkKey: oldDrink.drinkKey,
      categoryKey: oldDrink.categoryKey,
      isDeleted: oldDrink.isDeleted,
      custom: oldDrink.custom,
      displayFeed: oldDrink.displayFeed,
      displayDrinkModal: oldDrink.displayDrinkModal,
      icon: oldDrink.icon,
      volume: oldDrink.volume,
      kcal: 28,
      doses: 0.4,
      alcoolPercentage: 5,
      price: 5,
    };
    expect(cleanCatalog([oldDrink])).toEqual([newDrink]);
  });

  // test bug of first migration when we forgot ownCocktail
  test('Bug of first migration when we forgot ownCocktail', () => {
    const oldDrink = {
      drinkKey: 'ownCocktail',
      icon: 'WineGlass',
      categoryKey: 'ownCocktail',
      custom: true,
      isDeleted: false,
      displayFeed: 'Cocktail Spritz',
      displayDrinkModal: 'Cocktail Spritz',
      volume: '10 cl',
      kcal: NaN,
      doses: NaN,
      alcoolPercentage: NaN,
      price: NaN,
    };
    const newDrink = {
      drinkKey: 'Cocktail Spritz',
      categoryKey: oldDrink.categoryKey,
      isDeleted: oldDrink.isDeleted,
      custom: oldDrink.custom,
      displayFeed: oldDrink.displayFeed,
      displayDrinkModal: oldDrink.displayDrinkModal,
      icon: oldDrink.icon,
      volume: oldDrink.volume,
      kcal: 28,
      doses: 0.4,
      alcoolPercentage: 5,
      price: 5,
    };
    expect(cleanCatalog([oldDrink])).toEqual([newDrink]);
  });

  test('Correct cocktail', () => {
    const oldDrink = {
      categoryKey: 'ownCocktail',
      drinkKey: 'Cocktail Spritz',
      custom: true,
      isDeleted: false,
      icon: 'CocktailGlass',
      displayFeed: 'Cocktail Spritz',
      displayDrinkModal: 'Cocktail Spritz',
      volume: '10 cl',
      doses: 0.9,
      price: 5,
      kcal: 120,
      alcoolPercentage: 5,
    };
    expect(cleanCatalog([oldDrink])).toEqual([oldDrink]);
  });

  // test no custom drinks
  test('No custom drinks', () => {
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

  test('Correct custom drink', () => {
    const oldDrink = {
      drinkKey: 'Vin Rouge',
      icon: 'WineGlass',
      categoryKey: 'ownDrink',
      volume: '10 cl',
      isDeleted: false,
      kcal: 19,
      doses: 0.3,
      displayFeed: 'Vin Rouge',
      displayDrinkModal: 'Vin Rouge',
      custom: true,
      alcoolPercentage: 3.4,
      price: 2.3,
    };
    expect(cleanCatalog([oldDrink])).toEqual([oldDrink]);
  });
});
