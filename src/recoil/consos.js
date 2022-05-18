import dayjs from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';
import { differenceOfDays, today } from '../helpers/dateHelpers';
import { fakeConsoData } from '../reference/mocks/fakeConsoData';
import { drinksCatalog, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const followupNumberOfDays = 7;

export const drinksState = atom({
  key: 'drinksState',
  default: getInitValueFromStorage('@Drinks', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Drinks', JSON.stringify(newValue)))],
});

export const ownDrinksState = atom({
  key: 'ownDrinksState',
  default: getInitValueFromStorage('@OwnDrinks', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@OwnDrinks', newValue))],
});

export const startDateState = atom({
  key: 'startDateState',
  default: getInitValueFromStorage('@StartDate', today()),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@StartDate', JSON.stringify(newValue)))],
});

export const modalTimestampState = atom({
  key: 'modalTimestampState',
  default: today(),
});

// Selectors

const reduceDrinksToDailyDoses = (drinks, catalog) =>
  drinks.reduce((dailyDoses, drink) => {
    const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
    if (dailyDoses[day]) {
      return {
        ...dailyDoses,
        [day]: dailyDoses[day] + mapDrinkToDose(drink, catalog),
      };
    }
    return {
      ...dailyDoses,
      [day]: mapDrinkToDose(drink, catalog),
    };
  }, {});

export const consolidatedCatalogSelector = selector({
  key: 'consolidatedCatalogSelector',
  get: ({ get }) => {
    const ownDrinks = get(ownDrinksState);
    return [...ownDrinks, ...drinksCatalog];
  },
});

export const feedDaysSelector = selector({
  key: 'feedDaysSelector',
  get: ({ get }) => {
    const startDate = get(startDateState);
    const drinks = get(drinksState);
    const lastDayOfDrinks = Math.max(...drinks.map(({ timestamp }) => timestamp), Date.now());
    const days = [];
    const amplitudeOfRecords = differenceOfDays(startDate, lastDayOfDrinks);
    for (let i = 0; i < amplitudeOfRecords + 1; i++) {
      const day = dayjs(lastDayOfDrinks).add(-i, 'day');
      days.push(day.format('YYYY-MM-DD'));
    }
    return days.filter((date) => dayjs(date).isBefore(dayjs()));
  },
});

export const dailyDosesSelector = selectorFamily({
  key: 'dailyDosesSelector',
  get:
    ({ asPreview = false } = {}) =>
    ({ get }) => {
      const consolidatedCatalog = get(consolidatedCatalogSelector);
      const drinks = asPreview ? fakeConsoData.partial.drinks : get(drinksState);
      return reduceDrinksToDailyDoses(drinks, consolidatedCatalog);
    },
});
