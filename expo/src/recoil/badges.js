import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';
import { defaultBackupBadgeCatalog } from '../scenes/Badges/badgesCatalog';

export const badgesCatalogState = atom({
  key: 'badgesCatalogState',
  default: getInitValueFromStorage('@BadgesCatalog', defaultBackupBadgeCatalog),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@BadgesCatalog', JSON.stringify(newValue));
      }),
  ],
});

export const badgesState = atom({
  key: 'badgesState',
  default: getInitValueFromStorage('@Badges', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Badges', JSON.stringify(newValue));
      }),
  ],
});
