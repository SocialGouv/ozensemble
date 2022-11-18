import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { MMKV } from 'react-native-mmkv';
import API from './api';
import NotificationService from './notifications';
import { capture } from './sentry';

export const storage = new MMKV();
(() => {
  //   AsyncStorage.clear();
  //   storage.clearAll();
})();

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
// export const hasMigratedFromAsyncStorage = false;
export const hasMigratedFromAsyncStorage = storage.getBoolean('hasMigratedFromAsyncStorage');

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
export async function migrateFromAsyncStorage() {
  if (hasMigratedFromAsyncStorage) return;
  const start = global.performance.now();

  const keys = await AsyncStorage.getAllKeys();

  for (const key of keys) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value != null) {
        if (['true', 'false'].includes(value)) {
          storage.set(key, value === 'true');
        } else {
          storage.set(key, value); // because persist:addicto is stringified twice
        }

        AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Failed to migrate key "${key}" from AsyncStorage to MMKV!`, error);
      throw error;
    }
  }

  storage.set('hasMigratedFromAsyncStorage', true);

  const end = global.performance.now();
  console.log(`Migrated from AsyncStorage -> MMKV in ${end - start}ms!`);
}

export const hasMigratedFromReduxToRecoil = storage.getBoolean('hasMigratedFromReduxToRecoil');

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
export async function migrateFromReduxToRecoil() {
  if (hasMigratedFromReduxToRecoil) return;
  const start = global.performance.now();

  let reduxStore = storage.getString('persist:addicto');
  if (reduxStore && reduxStore.length > 5) {
    // so we do have a store
    reduxStore = JSON.parse(JSON.parse(reduxStore).conso);
    const drinksState = reduxStore.drinks;
    const ownDrinksState = reduxStore.ownDrinks;
    storage.set('@Drinks', JSON.stringify(drinksState));
    storage.set('@OwnDrinks', JSON.stringify(ownDrinksState));
  }

  storage.set('hasMigratedFromReduxToRecoil', true);
  storage.delete('persist:addicto');

  const end = global.performance.now();
  console.log(`Migrated from Redux -> Recoil in ${end - start}ms!`);
}

export const hasMigratedGenderAndAge = storage.getBoolean('hasMigratedGenderAndAge');
// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
export async function migrateGenderAndAge() {
  if (hasMigratedGenderAndAge) return;
  const storedAnswers = storage.getString('@Quizz_answers');
  const gender = typeof storedAnswers === 'string' ? JSON.parse(storedAnswers)?.gender : null;
  if (gender) storage.set('@Gender', gender);
  storage.set('hasMigratedGenderAndAge', true);
}

export const hasMigratedDefi1Stored = storage.getBoolean('hasMigratedDefi1');

export async function migratedDefi7Jours() {
  if (hasMigratedDefi1Stored) return;
  if (storage.getString('DEFI_7_JOURS_LAST_UPDATE')?.length) {
    storage.set('@Defi1_LastUpdate', storage.getString('DEFI_7_JOURS_LAST_UPDATE'));
  }
  if (storage.getString('DEFI_7_JOURS_VALIDATED_DAYS')?.length) {
    storage.set('@Defi1_ValidatedDays', Number(storage.getString('DEFI_7_JOURS_VALIDATED_DAYS')));
  }
  if (storage.getString('DEFI_7_JOURS_STARTED_AT')?.length) {
    storage.set('@Defi1_StartedAt', storage.getString('DEFI_7_JOURS_STARTED_AT'));
  }
  if (storage.getString('@QuizzMotivations_answers')?.length) {
    try {
      const answersKeysObject = JSON.parse(storage.getString('@QuizzMotivations_answers') || '');
      const answersKeysArray = Object.keys(answersKeysObject).reduce((onlyTrue, answerKey) => {
        if (answersKeysObject[answerKey]) onlyTrue.push(answerKey);
        return onlyTrue;
      }, []);
      storage.set('@QuizzMotivations_answers', JSON.stringify(answersKeysArray));
    } catch (e) {}
  }
  storage.set('hasMigratedDefi1', true);
}

export const hasMigratedRemindersStored = storage.getBoolean('hasMigratedReminders');

export async function migrateReminders() {
  if (hasMigratedRemindersStored) return;
  if (storage.getString('@DefisReminder')?.length) {
    storage.set('@DefisReminder-setup', true);
  }
  if (storage.getString('@GainsReminder')?.length) {
    storage.set('@GainsReminder-setup', true);
  }
  storage.set('hasMigratedReminders', true);
}

export const hasMigratedRemindersToPushToken = storage.getBoolean('hasMigratedRemindersToPushToken');

export async function migrateRemindersToPushToken() {
  try {
    if (hasMigratedRemindersToPushToken) return;
    const existingId = storage.getString('STORAGE_KEY_REMINDER_ID');

    if (existingId) {
      storage.set('hasMigratedRemindersToPushToken', true);
      return;
    }
    const reminderDefis = JSON.parse(storage.getString('@DefisReminder') || '""'); // ISODate - string
    const reminderDefisMode = JSON.parse(storage.getString('@DefisReminder-mode') || '""'); // day/week
    const reminderDefisWeekDay = JSON.parse(storage.getString('@DefisReminder-weekDay') || '""'); // 0-6

    const reminderGain = JSON.parse(storage.getString('@GainsReminder') || '""'); // ISODate
    const reminderGainMode = JSON.parse(storage.getString('@GainsReminder-mode') || '""'); // day/week
    const reminderGainWeekDay = JSON.parse(storage.getString('@GainsReminder-weekDay') || '""'); // 0-6

    if (!reminderDefis && !reminderGain) {
      storage.set('hasMigratedRemindersToPushToken', true);
      return;
    }

    const reminder = reminderGain ? reminderGain : reminderDefis;
    const mode = reminderGain ? reminderGainMode : reminderDefisMode;
    const weekDay = reminderGain ? reminderGainWeekDay : reminderDefisWeekDay;

    const pushNotifToken = storage.getString('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN');

    if (!pushNotifToken) return;

    const weekDayName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][weekDay];

    const matomoId = storage.getString('@UserIdv2');

    const res = await API.put({
      path: '/reminder',
      body: {
        pushNotifToken,
        type: mode === 'day' ? 'Daily' : mode === 'week' ? 'Weekdays' : 'Daily',
        timezone: RNLocalize.getTimeZone(),
        timeHours: reminder.getHours(),
        timeMinutes: reminder.getMinutes(),
        daysOfWeek:
          mode === 'week'
            ? {
                [weekDayName]: true,
              }
            : undefined,
        id: existingId ?? undefined,
        matomoId,
      },
    });

    if (!res?.ok) return false;

    if (res?.ok && res?.reminder?.id) storage.set('STORAGE_KEY_REMINDER_ID', res.reminder.id);

    NotificationService.cancelAll();

    storage.set('hasMigratedRemindersToPushToken', true);
  } catch (e) {
    capture(e);
  }
}
