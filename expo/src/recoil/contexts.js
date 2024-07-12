import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const drinksContextsState = atom({
  key: 'drinksContextsState',
  default: getInitValueFromStorage('@Drinks-contexts', {}),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Drinks-contexts', JSON.stringify(newValue));
      }),
  ],
});
