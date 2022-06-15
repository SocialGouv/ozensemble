import { atom } from 'recoil';
import { getInitValueFromStorage } from './utils';
import { storage } from '../services/storage';

export const defi2OnBoardingDoneState = atom({
  key: 'defi2OnBoardingDoneState',
  default: getInitValueFromStorage('@Defi2OnBoardingDoneState', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi2OnBoardingDoneState', JSON.stringify(newValue)))],
});

export const defi2AnswersRiskSituationsState = atom({
  key: 'defi2AnswersRiskSituationsState',
  default: getInitValueFromStorage('@defi2AnswersRiskSituationsState', []),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@defi2AnswersRiskSituationsState', JSON.stringify(newValue))),
  ],
});

export const defi2EmotionState = atom({
  key: 'defi2EmotionState',
  default: getInitValueFromStorage('@defi2EmotionState', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@defi2EmotionState', JSON.stringify(newValue)))],
});
