import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, selector } from 'recoil';

const getInitValueFromStorage = async (key, defaultValue) =>
  new Promise(async (resolve) => {
    const valueType = typeof defaultValue;
    const foundValue = await AsyncStorage.getItem(key);
    if (!foundValue) return resolve(defaultValue);
    if (valueType === 'number') return resolve(Number(foundValue));
    if (valueType === 'boolean') return resolve(foundValue === 'true' ? true : false);
    return resolve(JSON.parse(foundValue));
  });

export const daysWithGoalNoDrinkState = atom({
  key: 'daysWithGoalNoDrinkState',
  default: getInitValueFromStorage('@DaysWithGoalNoDrink', []),
  effects: [({ onSet }) => onSet((newValue) => AsyncStorage.setItem('@DaysWithGoalNoDrink', JSON.stringify(newValue)))],
});

export const drinksByDrinkingDayState = atom({
  key: 'drinksByDrinkingDayState',
  default: getInitValueFromStorage('@StoredDrinksByDrinkingDay', 0),
  effects: [({ onSet }) => onSet((newValue) => AsyncStorage.setItem('@StoredDrinksByDrinkingDay', newValue))],
});

export const estimationDrinksPerWeekState = atom({
  key: 'estimationDrinksPerWeekState',
  default: getInitValueFromStorage('@GainEstimationDrinksPerWeek', []),
  effects: [({ onSet }) => onSet((newValue) => AsyncStorage.setItem('@GainEstimationDrinksPerWeek', newValue))],
});

export const drinksByWeekState = selector({
  key: 'drinksByWeekState',
  get: ({ get }) => {
    const drinksByDrinkingDay = get(drinksByDrinkingDayState);
    const daysWithGoalNoDrink = get(daysWithGoalNoDrinkState);
    return (7 - daysWithGoalNoDrink.length) * drinksByDrinkingDay;
  },
});
