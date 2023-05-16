import dayjs from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';
import { differenceOfDays } from '../helpers/dateHelpers';
import { drinksCatalog, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const followupNumberOfDays = 7;

export const drinksState = atom({
  key: 'drinksState',
  default: getInitValueFromStorage('@Drinks', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Drinks', JSON.stringify(newValue)))],
});

export const ownDrinksCatalogState = atom({
  key: 'ownDrinksCatalogState',
  default: getInitValueFromStorage('@OwnDrinks', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@OwnDrinks', JSON.stringify(newValue)))],
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
    const ownDrinks = get(ownDrinksCatalogState);
    return [...ownDrinks, ...drinksCatalog];
  },
});

export const feedDaysSelector = selector({
  key: 'feedDaysSelector',
  get: ({ get }) => {
    const allDrinks = get(drinksState);
    const fiveMonthsAgo = dayjs().add(-4, 'month');
    const drinks = allDrinks.filter(({ timestamp }) => dayjs(timestamp).isAfter(fiveMonthsAgo));
    const timestamps = drinks.map(({ timestamp }) => timestamp);
    const lastDayOfDrinks = Math.max(...timestamps, Date.now());
    const firstDayOfDrinks = Math.min(...timestamps, Date.now());
    const days = [];
    const amplitudeOfRecords = differenceOfDays(firstDayOfDrinks, lastDayOfDrinks);
    for (let i = 0; i < amplitudeOfRecords + 1; i++) {
      const day = dayjs(lastDayOfDrinks).add(-i, 'day');
      days.push(day.format('YYYY-MM-DD'));
    }
    return days.filter((date) => dayjs(date).isBefore(dayjs()));
  },
});

export const dailyDosesSelector = selector({
  key: 'dailyDosesSelector',
  get: ({ get }) => {
    const consolidatedCatalog = get(consolidatedCatalogSelector);
    const drinks = get(drinksState);
    return reduceDrinksToDailyDoses(drinks, consolidatedCatalog);
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
