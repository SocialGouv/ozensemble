import { atom, selector } from 'recoil';
import { storage } from '../services/storage';
import { badgesState } from './badges';
import { getInitValueFromStorage } from './utils';
import { getMaxDrinksPerWeek, getTotalDrinksByDrinkingDay } from '../helpers/gainsHelpers';

export const daysWithGoalNoDrinkState = atom({
  key: 'daysWithGoalNoDrinkState',
  default: getInitValueFromStorage('@DaysWithGoalNoDrink', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DaysWithGoalNoDrink', JSON.stringify(newValue)))],
});

export const drinksByWeekState = atom({
  key: 'drinksByWeekState',
  default: getInitValueFromStorage('@StoredDetaileddrinksByWeekState', []),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@StoredDetaileddrinksByWeekState', JSON.stringify(newValue))),
  ],
});

export const previousDrinksPerWeekState = atom({
  key: 'previousDrinksPerWeekState',
  default: getInitValueFromStorage('@GainPreviousDrinksPerWeek', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@GainPreviousDrinksPerWeek', JSON.stringify(newValue)))],
});

export const maxDrinksPerWeekSelector = selector({
  key: 'maxDrinksPerWeekSelector',
  get: ({ get }) => {
    const drinksByWeek = get(drinksByWeekState);
    return getMaxDrinksPerWeek(drinksByWeek);
  },
});

export const totalDrinksByDrinkingDaySelector = selector({
  key: 'totalDrinksByDrinkingDaySelector',
  get: ({ get }) => {
    const maxDrinksByWeek = get(maxDrinksPerWeekSelector);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    return getTotalDrinksByDrinkingDay(maxDrinksByWeek, daysWithGoalNoDrink);
  },
});

export const isOnboardedSelector = selector({
  key: 'isOnboardedSelector',
  get: ({ get }) => {
    const badges = get(badgesState);
    const firstBadge = badges?.find((badge) => badge.category === 'goals' && badge.stars === 1);
    return firstBadge ? true : false;
  },
});

export const goalsState = atom({
  key: 'goalsState',
  default: getInitValueFromStorage('goalsState', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('goalsState', JSON.stringify(newValue)))],
  /*
  array of
      {
        id: `${user.id}_${date}`,
        userId: user.id,
        date,
        daysWithGoalNoDrink,
        dosesByDrinkingDay,
        dosesPerWeek,
        status: "InProgress",
      }
   */
});

export const goalsByWeekSelector = selector({
  key: 'goalsByWeekSelector',
  get: ({ get }) => {
    const goals = get(goalsState);
    const goalsByWeek = {};
    for (const goal of goals) {
      const startOfWeek = goal.date;
      goalsByWeek[startOfWeek] = goal;
    }
    return goalsByWeek;
  },
});

export const myMotivationState = atom({
  key: 'myMotivationState',
  default: getInitValueFromStorage('myMotivationState', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('myMotivationState', JSON.stringify(newValue)))],
});

// export const goalSuccessSelector = selectorFamily({
