import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const defineStrategyState = atom({
  key: 'defineStrategyState',
  default: getInitValueFromStorage('@define-strategy', {}),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@define-strategy', JSON.stringify(newValue));
      }),
  ],
});
