import { atom, selector } from 'recoil';
import { storage } from '../services/storage';

const getInitValueFromStorage = (key, defaultValue) => {
  const valueType = typeof defaultValue;
  if (valueType === 'number') {
    const foundValue = storage.getNumber(key);
    if (!foundValue) return defaultValue;
    return Number(foundValue);
  }
  if (valueType === 'boolean') {
    const foundValue = storage.getBoolean(key);
    if (!foundValue) return defaultValue;
    return foundValue;
  }
  const foundValue = storage.getString(key);
  if (!foundValue) return defaultValue;
  return JSON.parse(foundValue);
};

export const daysWithGoalNoDrinkState = atom({
  key: 'daysWithGoalNoDrinkState',
  default: getInitValueFromStorage('@DaysWithGoalNoDrink', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DaysWithGoalNoDrink', JSON.stringify(newValue)))],
});

export const drinksByDrinkingDayState = atom({
  key: 'drinksByDrinkingDayState',
  default: getInitValueFromStorage('@StoredDrinksByDrinkingDay', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@StoredDrinksByDrinkingDay', newValue))],
});

export const previousDrinksPerWeekState = atom({
  key: 'previousDrinksPerWeekState',
  default: getInitValueFromStorage('@GainPreviousDrinksPerWeek', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@GainPreviousDrinksPerWeek', JSON.stringify(newValue)))],
});

export const maxDrinksPerWeekSelector = selector({
  key: 'maxDrinksPerWeekSelector',
  get: ({ get }) => {
    const drinksByDrinkingDay = get(drinksByDrinkingDayState);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    return (7 - daysWithGoalNoDrink.length) * drinksByDrinkingDay;
  },
});
