import { atom } from 'recoil';
import { getInitValueFromStorage } from './utils';
import { storage } from '../services/storage';

export const defi2OnBoardingDoneState = atom({
  key: 'defi2OnBoardingDoneState',
  default: getInitValueFromStorage('@Defi2_OnBoardingDoneState', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2_OnBoardingDoneState', newValue))],
});

export const defi3OnBoardingDoneState = atom({
  key: 'defi3OnBoardingDoneState',
  default: getInitValueFromStorage('@Defi3_OnBoardingDoneState', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi3_OnBoardingDoneState', newValue))],
});

export const defi2EmotionState = atom({
  key: 'defi2EmotionState',
  default: getInitValueFromStorage('@Defi2_EmotionState', 0),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        storage.set('@Defi2_EmotionState', newValue);
      });
    },
  ],
});
