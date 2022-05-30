import { atom, selector } from 'recoil';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const daysWithGoalNoDrinkState = atom({
  key: 'daysWithGoalNoDrinkState',
  default: getInitValueFromStorage('@DaysWithGoalNoDrink', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DaysWithGoalNoDrink', JSON.stringify(newValue)))],
});

export const drinksByDrinkingDayState = atom({
  key: 'drinksByDrinkingDayState',
  default: getInitValueFromStorage('@StoredDetailedDrinksByDrinkingDay', []),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@StoredDetailedDrinksByDrinkingDay', JSON.stringify(newValue))),
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
    const drinksByDrinkingDay = get(drinksByDrinkingDayState);
    return drinksByDrinkingDay.reduce(
      (sum, drink) =>
        sum + drink.quantity * drinksCatalog.find((drinkcatalog) => drinkcatalog.drinkKey === drink.drinkKey).doses,
      0
    );
  },
});
export const maxDrinksPerWeekSelector = selector({
  key: 'maxDrinksPerWeekSelector',
  get: ({ get }) => {
    const totalDrinksByDrinkingDay = get(totalDrinksByDrinkingDaySelector);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    return (7 - daysWithGoalNoDrink.length) * totalDrinksByDrinkingDay;
  },
});
