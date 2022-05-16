import { atom, selector, selectorFamily } from 'recoil';
import { dateIsBeforeOrToday, dateWithoutTime, differenceOfDays, today } from '../helpers/dateHelpers';
import { fakeConsoData } from '../reference/mocks/fakeConsoData';
import { drinksCatalog, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const followupNumberOfDays = 15;

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
    const day = dateWithoutTime(drink.timestamp);
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

const getDays = (drinks, startDate) => {
  const lastDayOfDrinks = Math.max(...drinks.map(({ timestamp }) => timestamp));
  const days = [];
  const amplitudeOfRecords = differenceOfDays(startDate, lastDayOfDrinks);
  if (amplitudeOfRecords > followupNumberOfDays) {
    for (let i = 0; i < amplitudeOfRecords + 1; i++) {
      days.push(dateWithoutTime(lastDayOfDrinks, i - amplitudeOfRecords));
    }
    return days;
  }
  for (let i = 0; i < followupNumberOfDays; i++) {
    days.push(dateWithoutTime(startDate, i));
  }
  return days;
};

export const diagramDaysSelector = selectorFamily({
  key: 'diagramDaysSelector',
  get:
    ({ asPreview }) =>
    ({ get }) => {
      const startDate = asPreview ? fakeConsoData.partial.startDate : get(startDateState);
      const drinks = asPreview ? fakeConsoData.partial.drinks : get(drinksState);
      return getDays(drinks, startDate).filter((_, i, days) => i >= days.length - followupNumberOfDays);
    },
});

export const feedDaysSelector = selector({
  key: 'feedDaysSelector',
  get: ({ get }) => {
    const startDate = get(startDateState);
    const drinks = get(drinksState);
    return getDays(drinks, startDate)
      .filter((date) => dateIsBeforeOrToday(date))
      .reverse();
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
