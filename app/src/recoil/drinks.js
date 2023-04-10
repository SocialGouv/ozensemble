import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const drinkQuantitySelectedState = atom({
  key: 'drinkQuantitySelectedState',
  default: getInitValueFromStorage('@drinkQuantitySelectedState', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@drinkQuantitySelectedState', JSON.stringify(newValue));
      }),
  ],
});

export const allDrinksInputsSelected = atom({
  key: 'allDrinksInputsSelected',
  default: getInitValueFromStorage('@allDrinksInputsSelected', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@allDrinksInputsSelected', newValue))],
});
