import dayjs from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';
import * as Sentry from '@sentry/react-native';
import { differenceOfDays } from '../helpers/dateHelpers';
import { drinksCatalogObject, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

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
    const filteredDays = feedDays.filter((date) => date <= today && date >= firstDay);
    return filteredDays;
  },
});

export const dosesByPeriodSelector = selector({
  key: 'dosesByPeriodSelector',
  get: ({ get }) => {
    const consolidatedCatalogObject = get(consolidatedCatalogObjectSelector);
    // drinks are sorted by timestamps
    const drinks = get(drinksState);
    const drinksByDay = {};
    const dailyDoses = {};
    const weeklyDoses = {};
    const monthlyDoses = {};
    let drinkStartOfWeek = null;
    for (const drink of drinks) {
      const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
      if (!drinkStartOfWeek) drinkStartOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
      if (drinkStartOfWeek > day) drinkStartOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
      // daily drinks
      if (!drinksByDay[day]) drinksByDay[day] = [];
      drinksByDay[day].push(drink);
      // daily doses
      const dose = mapDrinkToDose(drink, consolidatedCatalogObject);
      if (!dailyDoses[day]) dailyDoses[day] = 0;
      dailyDoses[day] = dailyDoses[day] + dose;
      // weekly doses
      if (!weeklyDoses[drinkStartOfWeek]) weeklyDoses[drinkStartOfWeek] = 0;
      weeklyDoses[drinkStartOfWeek] = weeklyDoses[drinkStartOfWeek] + dose;
      // monthly doses
      const month = day.slice(0, 'YYYY-MM'.length);
      if (!monthlyDoses[month]) monthlyDoses[month] = 0;
      monthlyDoses[month] = monthlyDoses[month] + dose;
    }
    return { drinksByDay, dailyDoses, weeklyDoses, monthlyDoses };
  },
});
