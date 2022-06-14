import { atom } from 'recoil';
import { getInitValueFromStorage } from './utils';
import { storage } from '../services/storage';

export const defi2OnBoardingDoneState = atom({
  key: 'defi2OnBoardingDoneState',
  default: getInitValueFromStorage('@Defi2OnBoardingDoneState', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2OnBoardingDoneState', JSON.stringify(newValue)))],
});
