import { atom } from 'recoil';
import { getInitValueFromStorage } from './utils';
import { storage } from '../services/storage';

export const defi2OnBoardingDoneState = atom({
  key: 'defi2OnBoardingDoneState',
  default: getInitValueFromStorage('@Defi2_OnBoardingDoneState', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2_OnBoardingDoneState', JSON.stringify(newValue)))],
});

export const defi2EmotionState = atom({
  key: 'defi2EmotionState',
  default: null,
  // default: getInitValueFromStorage('@Defi2_EmotionState', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2_EmotionState', JSON.stringify(newValue)))],
});
