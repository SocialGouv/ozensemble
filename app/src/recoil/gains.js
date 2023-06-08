import { atom, selector } from 'recoil';
import { drinksCatalogObject, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { badgesState } from './badges';
import { getInitValueFromStorage } from './utils';

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
export const totalDrinksByDrinkingDaySelector = selector({
  key: 'totalDrinksByDrinkingDaySelector',
  get: ({ get }) => {
    const now = Date.now();
    console.log('totalDrinksByDrinkingDaySelector start');
    const totalDrinksByWeek = get(maxDrinksPerWeekSelector);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    const totalDrinksByDrinkingDay = Math.ceil(totalDrinksByWeek / (7 - daysWithGoalNoDrink.length));
    console.log('totalDrinksByDrinkingDaySelector end', Date.now() - now);
    return totalDrinksByDrinkingDay;
  },
});
export const maxDrinksPerWeekSelector = selector({
  key: 'maxDrinksPerWeekSelector',
  get: ({ get }) => {
    const drinksByWeek = get(drinksByWeekState);
    return drinksByWeek.reduce((sum, drink) => {
      const dose = mapDrinkToDose(drink, drinksCatalogObject);
      return Math.ceil(sum + dose);
    }, 0);
  },
});

export const isOnboardedSelector = selector({
  key: 'isOnboardedSelector',
  get: ({ get }) => {
    const badges = get(badgesState);
    console.log({ badges });
    const firstBadge = badges?.find((badge) => badge.category === 'goals' && badge.stars === 1);
    return firstBadge ? true : false;
  },
});
