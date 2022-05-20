import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

export const reminderWeeklyDay = atom({
  key: 'reminderWeeklyDay',
  default: getInitValueFromStorage('@ReminderWeeklyDay', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@ReminderWeeklyDay', newValue))],
});
