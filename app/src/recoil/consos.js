import dayjs from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';
import * as Sentry from '@sentry/react-native';
import { differenceOfDays } from '../helpers/dateHelpers';
import { drinksCatalogObject, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const followupNumberOfDays = 7;

export const drinksState = atom({
  key: 'drinksState',
  default: getInitValueFromStorage('@Drinks', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Drinks', JSON.stringify(newValue));
        Sentry.setExtra('drinks', newValue.slice(0, 50));
      }),
  ],
});

export const ownDrinksCatalogState = atom({
  key: 'ownDrinksCatalogState',
  default: getInitValueFromStorage('@OwnDrinks', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@OwnDrinks', JSON.stringify(newValue));
        Sentry.setExtra('ownDrinksCatalog', newValue);
      }),
  ],
});

export const ownDrinksCatalogObjectSelector = selector({
  key: 'ownDrinksCatalogObjectSelector',
  get: ({ get }) => {
    const ownDrinks = get(ownDrinksCatalogState);
    const ownDrinksCatalogObject = {};
    for (const drink of ownDrinks) {
      ownDrinksCatalogObject[drink.drinkKey] = drink;
    }
    return ownDrinksCatalogObject;
  },
});

// Selectors

export const consolidatedCatalogObjectSelector = selector({
  key: 'consolidatedCatalogObjectSelector',
  get: ({ get }) => {
    const ownDrinksObject = get(ownDrinksCatalogObjectSelector);
    return { ...ownDrinksObject, ...drinksCatalogObject };
  },
});

// dayjs is slow to do .add(-5, 'month') or .add(-i, 'day')
// the function below takes +/- 500ms if 5 months amplitude
// so we calculate only once per day
const getAllDatesBetweenNowAndFiveMonthsAgo = (amplitudeOfRecords = null) => {
  const now = Date.now();
  // timestamp five month ago in ms
  const fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
  const numberOfDays = amplitudeOfRecords ?? differenceOfDays(fiveMonthsAgo, now);
  const days = [];
  for (let i = 0; i <= numberOfDays; i++) {
    const day = dayjs(now).add(-i, 'day');
    days.push(day.format('YYYY-MM-DD'));
  }
  return days;
};
let fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
let feedDays = getAllDatesBetweenNowAndFiveMonthsAgo();

export const feedDaysSelector = selector({
  key: 'feedDaysSelector',
  get: ({ get }) => {
    const today = dayjs().format('YYYY-MM-DD');
    if (feedDays[0] !== today) {
      fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
    }
    const allDrinks = get(drinksState);
    const drinks = allDrinks.filter(({ timestamp }) => timestamp > fiveMonthsAgo);
    const timestamps = drinks.map(({ timestamp }) => timestamp);
    const lastDayOfDrinks = Math.max(...timestamps, Date.now());
    const firstDayOfDrinks = Math.min(...timestamps, Date.now());
    const amplitudeOfRecords = differenceOfDays(firstDayOfDrinks, lastDayOfDrinks);
    const firstDay = dayjs(firstDayOfDrinks).format('YYYY-MM-DD');
    if (feedDays[0] !== today) {
      feedDays = getAllDatesBetweenNowAndFiveMonthsAgo(amplitudeOfRecords);
    }
    return feedDays.filter((date) => date <= today && date >= firstDay);
  },
});

export const drinksByDaySelector = selector({
  key: 'drinksByDaySelector',
  get: ({ get }) => {
    const drinks = get(drinksState);
    const drinksByDay = {};
    for (const drink of drinks) {
      const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
      if (drinksByDay[day]) {
        drinksByDay[day].push(drink);
      } else {
        drinksByDay[day] = [drink];
      }
    }
    return drinksByDay;
  },
});

export const dailyDosesSelector = selector({
  key: 'dailyDosesSelector',
  get: ({ get }) => {
    const consolidatedCatalogObject = get(consolidatedCatalogObjectSelector);
    const drinks = get(drinksState);
    const dailyDoses = {};
    for (const drink of drinks) {
      const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
      if (dailyDoses[day]) {
        dailyDoses[day] = dailyDoses[day] + mapDrinkToDose(drink, consolidatedCatalogObject);
      } else {
        dailyDoses[day] = mapDrinkToDose(drink, consolidatedCatalogObject);
      }
    }
    return dailyDoses;
  },
});

export const diffWithPreviousWeekSelector = selectorFamily({
  key: 'diffWithPreviousWeekSelector',
  get:
    ({} = {}) =>
    ({ get }) => {
      const dailyDoses = get(dailyDosesSelector);
      const firstDayLastWeek = dayjs(dayjs().startOf('week')).add(-1, 'week');
      const daysOfLastWeek = [];
      for (let i = 0; i <= 6; i++) {
        const nextDay = dayjs(firstDayLastWeek).add(i, 'day').format('YYYY-MM-DD');
        daysOfLastWeek.push(nextDay);
      }
      const firstDayThisWeek = dayjs(dayjs().startOf('week'));
      const daysOfThisWeek = [];
      for (let i = 0; i <= 6; i++) {
        const nextDay = dayjs(firstDayThisWeek).add(i, 'day').format('YYYY-MM-DD');
        daysOfThisWeek.push(nextDay);
      }
      const lastWeekNumberOfDrinks = daysOfLastWeek
        .map((day) => dailyDoses[day])
        .reduce((sum, dailyDose) => sum + (dailyDose ? dailyDose : 0), 0);
      const thisWeekNumberOfDrinks = daysOfThisWeek
        .map((day) => dailyDoses[day])
        .reduce((sum, dailyDose) => sum + (dailyDose ? dailyDose : 0), 0);

      const diff = lastWeekNumberOfDrinks - thisWeekNumberOfDrinks;
      const decrease = diff > 0;
      const pourcentageOfDecrease = Math.round((diff / (lastWeekNumberOfDrinks || 1)) * 100);
      return [diff, decrease, pourcentageOfDecrease];
    },
});
