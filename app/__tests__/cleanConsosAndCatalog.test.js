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
        categoryKey: 'ownDrink -70-40',
        custom: true,
        displayDrinkModal: 'Bière',
        drinkKey: 'ownDrink -70-40',
        icon: 'beer',
        iconOf: undefined,
        isDeleted: false,
        kcal: 224,
        price: 5,
        volume: '25 cl',
        alcoolPercentage: 5,
        doses: 0.1,
        displayFeed: 'Bière',
      },
    ];
    expect(cleanCatalog(catalog)).toEqual([
      {
        categoryKey: 'ownDrink',
        custom: true,
        displayDrinkModal: 'Bière',
        drinkKey: 'ownDrink',
        icon: 'beer',
        iconOf: undefined,
        isDeleted: false,
        kcal: 224,
        price: 5,
        volume: '25 cl',
        alcoolPercentage: 5,
        doses: 0.1,
        displayFeed: 'Bière',
      },
    ]);
  });
  // test drinks with , instead of . for price and volume
  // test bug of first migration when we forgot ownCocktail
  // test cocktails
  // test no custom drinks
});
