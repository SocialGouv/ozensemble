import { atom, selector } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const badgesState = atom({
  key: 'badgesState',
  default: getInitValueFromStorage('@Badges', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        console.log({ newValue });
        storage.set('@Badges', JSON.stringify(newValue));
      }),
  ],
});
