import { atom, selector } from 'recoil';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
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
    const totalDrinksByWeek = get(maxDrinksPerWeekSelector);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    console.log('totalDrinksByWeek', totalDrinksByWeek);
    console.log('daysWithGoalNoDrink', daysWithGoalNoDrink);
    console.log(Math.ceil(totalDrinksByWeek / (7 - daysWithGoalNoDrink.length)));
    return Math.ceil(totalDrinksByWeek / (7 - daysWithGoalNoDrink.length));
  },
});
export const maxDrinksPerWeekSelector = selector({
  key: 'maxDrinksPerWeekSelector',
  get: ({ get }) => {
    const drinksByWeek = get(drinksByWeekState);
    return drinksByWeek.reduce(
      (sum, drink) =>
        Math.ceil(
          sum + drink.quantity * drinksCatalog.find((drinkcatalog) => drinkcatalog.drinkKey === drink.drinkKey).doses
        ),
      0
    );
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
