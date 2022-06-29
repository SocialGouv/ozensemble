import dayjs from 'dayjs';
import { atom } from 'recoil';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';

/* CONSOS */

// export const reminderConsos = atom({
//   key: 'reminderConsos',
//   default: getInitValueFromStorage('@ConsosReminder', ''),
//   effects: [({ onSet }) => onSet((newValue) => storage.set('@ConsosReminder', JSON.stringify(newValue)))],
// });

// export const reminderConsosMode = atom({
//   key: 'reminderConsosMode',
//   default: getInitValueFromStorage('@ConsosReminder-mode', 'day'),
//   effects: [({ onSet }) => onSet((newValue) => storage.set('@ConsosReminder-mode',  JSON.stringify(newValue)))],
// });

// export const reminderConsosWeekDay = atom({
//   key: 'reminderConsosWeekDay',
//   default: getInitValueFromStorage('@ConsosReminder-weekDay', 0),
//   effects: [({ onSet }) => onSet((newValue) => storage.set('@ConsosReminder-weekDay', newValue ? newValue : 0))],
// });

/* DEFIS */

export const reminderDefis = atom({
  key: 'reminderDefis',
  default: getInitValueFromStorage('@DefisReminder', dayjs().set('hours', 20).set('minutes', 0).toISOString()),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DefisReminder', JSON.stringify(newValue)))],
});

export const reminderDefisMode = atom({
  key: 'reminderDefisMode',
  default: getInitValueFromStorage('@DefisReminder-mode', 'day'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DefisReminder-mode', JSON.stringify(newValue)))],
});

export const reminderDefisWeekDay = atom({
  key: 'reminderDefisWeekDay',
  default: getInitValueFromStorage('@DefisReminder-weekDay', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@DefisReminder-weekDay', newValue ? newValue : 0))],
});

/* GAINS */

export const reminderGain = atom({
  key: 'reminderGain',
  default: getInitValueFromStorage('@GainsReminder', dayjs().set('hours', 20).set('minutes', 0).toISOString()),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@GainsReminder', JSON.stringify(newValue)))],
});

export const reminderGainMode = atom({
  key: 'reminderGainMode',
  default: getInitValueFromStorage('@GainsReminder-mode', 'day'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@GainsReminder-mode', JSON.stringify(newValue)))],
});

export const reminderGainWeekDay = atom({
  key: 'reminderGainWeekDay',
  default: getInitValueFromStorage('@GainsReminder-weekDay', 0),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@GainsReminder-weekDay', newValue || 0))],
});
