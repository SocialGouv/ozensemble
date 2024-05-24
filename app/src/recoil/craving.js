import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const defineStrategyState = atom({
  key: 'defineStrategyState',
  default: getInitValueFromStorage('@define-strategy', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@define-strategy', JSON.stringify(newValue));
      }),
  ],
});

export const currentStrategyState = atom({
  key: 'currentStrategyState',
  default: getInitValueFromStorage('@current-strategy', 0),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@current-strategy', newValue);
      }),
  ],
});

export const leavingCravingKeyState = atom({
  key: 'leavingCravingKeyState',
  default: storage.getNumber('@leftCraving') || 0,
  effects: [({ onSet }) => onSet((newValue) => storage.set('@leftCraving', newValue))],
});

export const isInCravingKeyState = atom({
  key: 'isInCravingKeyState',
  default: false,
});

export const leavingCravingNextTabState = atom({
  key: 'leavingCravingNextTabState',
  default: '',
});
