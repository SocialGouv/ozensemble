import { atom } from 'recoil';
import { getInitValueFromStorage } from './utils';
import { storage } from '../services/storage';

export const defi2OnBoardingDone = atom({
  key: 'defi2OnBoardingDone',
  default: getInitValueFromStorage('@Defi2OnBoardingDone', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2OnBoardingDone', JSON.stringify(newValue)))],
});
