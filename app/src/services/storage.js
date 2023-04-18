import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { MMKV } from 'react-native-mmkv';
import API from './api';
import NotificationService from './notifications';
import { capture } from './sentry';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { useRecoilState } from 'recoil';
import { ownDrinksCatalogState } from '../recoil/consos';
import CocktailGlass from '../components/illustrations/drinksAndFood/CocktailGlass';

export const storage = new MMKV();
if (__DEV__) {
  (() => {
    // AsyncStorage.clear();
    // storage.clearAll();
  })();
}

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

    try {
      const res = await API.put({
        path: '/reminder',
        body: {
          pushNotifToken,
          type: mode === 'day' ? 'Daily' : mode === 'week' ? 'Weekdays' : 'Daily',
          timezone: RNLocalize.getTimeZone(),
          timeHours: new Date(reminder).getHours(),
          timeMinutes: new Date(reminder).getMinutes(),
          calledFrom: 'hasMigratedRemindersToPushToken',
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

      NotificationService.cancelAll();

      if (!res?.ok) {
        capture(new Error('Reminder migration failed'), {
          extra: {
            data: {
              reminder,
              mode,
              weekDay,
              existingId,
              reminderDefis,
              reminderDefisMode,
              reminderDefisWeekDay,
              reminderGain,
              reminderGainMode,
              reminderGainWeekDay,
            },
            request: {
              path: '/reminder',
              body: {
                pushNotifToken,
                type: mode === 'day' ? 'Daily' : mode === 'week' ? 'Weekdays' : 'Daily',
                timezone: RNLocalize.getTimeZone(),
                timeHours: new Date(reminder).getHours(),
                timeMinutes: new Date(reminder).getMinutes(),
                calledFrom: 'hasMigratedRemindersToPushToken',
                daysOfWeek:
                  mode === 'week'
                    ? {
                        [weekDayName]: true,
                      }
                    : undefined,
                id: existingId ?? undefined,
                matomoId,
              },
            },
            response: res,
          },
        });
        return false;
      }

      if (res?.ok && res?.reminder?.id) storage.set('STORAGE_KEY_REMINDER_ID', res.reminder.id);
    } catch (e) {
      capture(e, {
        extra: {
          reminder,
          mode,
          weekDay,
          existingId,
          reminderDefis,
          reminderDefisMode,
          reminderDefisWeekDay,
          reminderGain,
          reminderGainMode,
          reminderGainWeekDay,
        },
      });
    }

    storage.set('hasMigratedRemindersToPushToken', true);
  } catch (e) {
    capture(e);
  }
}

export const hasSentPreviousDrinksToDB = storage.getBoolean('hasSentPreviousDrinksToDB');

export async function sendPreviousDrinksToDB() {
  if (hasSentPreviousDrinksToDB) return;
  const matomoId = storage.getString('@UserIdv2');
  if (!matomoId?.length) {
    // new user - no drinks to send
    storage.set('hasSentPreviousDrinksToDB', true);
    return;
  }
  // @Drinks
  const drinks = JSON.parse(storage.getString('@Drinks') || '[]');
  const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks') || '[]');

  if (drinks.length) {
    API.post({
      path: '/consommation/init',
      body: {
        matomoId,
        drinks,
        drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
      },
    });
  }
  storage.set('hasSentPreviousDrinksToDB', true);
}

export const hasSentObjectifToDB = storage.getBoolean('hasSentObjectifToDB');

export async function sendObjectifToDB() {
  if (hasSentObjectifToDB) return;
  const matomoId = storage.getString('@UserIdv2');
  if (!matomoId?.length) {
    // new user - no drinks to send
    storage.set('hasSentObjectifToDB', true);
    return;
  }
  // @Drinks
  const daysWithGoalNoDrinkJSON = storage.getString('@DaysWithGoalNoDrink');
  const drinksByDrinkingDayJSON = storage.getString('@StoredDetailedDrinksByDrinkingDay');

  if (!daysWithGoalNoDrinkJSON || !drinksByDrinkingDayJSON) {
    storage.set('hasSentObjectifToDB', true);
    return;
  }

  const daysWithGoalNoDrink = JSON.parse(daysWithGoalNoDrinkJSON);
  const drinksByDrinkingDay = JSON.parse(drinksByDrinkingDayJSON);

  const dosesByDrinkingDay = drinksByDrinkingDay.reduce(
    (sum, drink) =>
      sum + drink.quantity * drinksCatalog.find((drinkcatalog) => drinkcatalog.drinkKey === drink.drinkKey).doses,
    0
  );
  const dosesPerWeek = (7 - daysWithGoalNoDrink.length) * dosesByDrinkingDay;

  API.post({
    path: '/goal',
    body: {
      matomoId: matomoId,
      daysWithGoalNoDrink,
      drinksByDrinkingDay,
      dosesByDrinkingDay,
      dosesPerWeek,
      noDisplayBadge: true,
      calculateBadges: true,
    },
  });
  storage.set('hasSentObjectifToDB', true);
}

export const hasSentNPSDoneToDB = storage.getBoolean('hasSentNPSDoneToDB');

export async function sendNPSDoneToDB() {
  if (hasSentNPSDoneToDB) return;
  const matomoId = storage.getString('@UserIdv2');
  if (!matomoId?.length) {
    // new user - no drinks to send
    storage.set('hasSentNPSDoneToDB', true);
    return;
  }

  const NPSDone = storage.getString('@NPSDone');
  if (!NPSDone) {
    storage.set('hasSentNPSDoneToDB', true);
    return;
  }

  API.post({
    path: '/appUserMilestone',
    body: {
      matomoId,
      appUserMilestone: '@NPSDone',
    },
  });
  storage.set('hasSentNPSDoneToDB', true);
}

export const hasCreateBadgeForDoneDefis = storage.getBoolean('hasCreateBadgeaForDoneDefis');

export async function createBadgesForDoneDefis() {
  if (hasCreateBadgeForDoneDefis) {
    return;
  }
  const matomoId = storage.getString('@UserIdv2');
  const autoEvaluationDone = storage.getBoolean('@Quizz_answers');
  const daysValidated = Number(storage.getNumber('@Defi1_ValidatedDays'));

  API.post({
    path: '/defis/init',
    body: {
      matomoId,
      autoEvaluationDone,
      daysValidated,
    },
  });
  storage.set('hasCreateBadgeaForDoneDefis', true);
}

export async function migrationOwnCatalog() {
  const drinksCatalog = [
    {
      active: true,
      categoryKey: 'Coupe de champagne -12-12',
      custom: true,
      displayDrinkModal: 'Coupe de champagne ',
      displayFeed: 'Coupe de champagne ',
      doses: 1,
      drinkKey: 'Coupe de champagne -12-12',
      iconOf: 'wine-glass',
      volume: '12 cl - 12˚',
    },
    {
      active: true,
      categoryKey: 'Rhum-4-35',
      custom: true,
      displayDrinkModal: 'Rhum',
      displayFeed: 'Rhum',
      doses: 1,
      drinkKey: 'Rhum-4-35',
      iconOf: 'hard-shot',
      volume: '4 cl - 35˚',
    },
    {
      categoryKey: 'Bières',
      displayDrinkModal: 'demi',
      doses: 1,
      drinkKey: 'beer-half',
      kcal: 105,
      price: 3.5,
      volume: '25 cl',
    },
    {
      categoryKey: 'Bières',
      displayDrinkModal: 'pinte',
      doses: 2,
      drinkKey: 'beer-pint',
      kcal: 210,
      price: 7,
      volume: '50 cl',
    },
    {
      categoryKey: 'Cidre',
      displayDrinkModal: 'demi',
      doses: 1,
      drinkKey: 'cider-half',
      kcal: 102,
      price: 2,
      volume: '25 cl',
    },
    {
      categoryKey: 'Cidre',
      displayDrinkModal: 'pinte',
      doses: 2,
      drinkKey: 'cider-pint',
      kcal: 204,
      price: 4,
      style: {
        marginBottom: 10,
      },
      volume: '50 cl',
    },
    {
      categoryKey: 'Vins',
      displayDrinkModal: 'verre',
      doses: 1,
      drinkKey: 'wine-glass',
      kcal: 100,
      price: 4,
      volume: '12 cl',
    },
    {
      categoryKey: 'Vins',
      displayDrinkModal: 'bouteille',
      doses: 8,
      drinkKey: 'wine-bottle',
      kcal: 600,
      price: 10,
      style: {
        marginBottom: 20,
      },
      volume: '75 cl',
    },
    {
      categoryKey: 'Champagne',
      displayDrinkModal: 'coupe',
      doses: 1,
      drinkKey: 'champagne-glass',
      kcal: 90,
      price: 5,
      volume: '12cl',
    },
    {
      categoryKey: 'Champagne',
      displayDrinkModal: 'bouteille',
      doses: 8,
      drinkKey: 'champagne-bottle',
      kcal: 622,
      price: 20,
      style: {
        marginBottom: 20,
      },
      volume: '75cl',
    },
    {
      categoryKey: 'Shot et Cocktail',
      displayDrinkModal: 'shot',
      doses: 1,
      drinkKey: 'hard-shot',
      kcal: 100,
      price: 2,
      volume: '3 cl',
    },
    {
      categoryKey: 'Shot et Cocktail',
      displayDrinkModal: 'cocktail',
      doses: 1,
      drinkKey: 'hard-cocktail',
      kcal: 133,
      price: 8,
      volume: '5 cl',
    },
    {
      categoryKey: 'Spiritueux',
      displayDrinkModal: 'flasque',
      doses: 7,
      drinkKey: 'hard-flasque',
      kcal: 750,
      price: 4,
      volume: '20 cl',
    },
    {
      categoryKey: 'Spiritueux',
      displayDrinkModal: 'bouteille',
      doses: 22,
      drinkKey: 'hard-bottle',
      kcal: 1875,
      price: 15,
      volume: '75 cl',
    },
  ];
  let newOwnDrinksCatalog = [];
  drinksCatalog.map((oldDrink) => {
    if (oldDrink.custom === true) {
      const icon = mapIconOfToIconName(oldDrink.iconOf);
      const categoryKey = 'ownDrink';
      const volume = Number(oldDrink.categoryKey.split('-')[1]);
      const isDeleted = false;
      const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2]);
      const kcal = Math.round((alcoolPercentage * 0.8 * volume) / 10) / 10;

      newOwnDrinksCatalog = [
        ...newOwnDrinksCatalog,
        {
          drinkKey: oldDrink.categoryKey,
          icon: icon,
          categoryKey: categoryKey,
          volume: volume + ' cl',
          isDeleted: isDeleted,
          kcal: kcal,
          doses: oldDrink.doses,
          displayFeed: oldDrink.displayFeed,
          displayDrinkModal: oldDrink.displayDrinkModal,
          custom: true,
        },
      ];
    }
  });
  console.log(newOwnDrinksCatalog);

  return newOwnDrinksCatalog;
}

const mapIconOfToIconName = (iconOf) => {
  switch (iconOf) {
    case 'beer-pint':
      return 'Pint';
    case 'beer-half':
      return 'HalfBeer';
    case 'hard-shoot':
      return 'Shoot';
    case 'hard-bottle':
      return 'Flasque';
    case 'wine-glass':
      return 'WineGlass';
    case 'wine-bottle':
      return 'WineBottle';
    case 'champagne-glass':
      return 'ChampagneGlass';
    case 'champagne-glass':
      return 'ChampagneBottle';
    case 'cocktail-glass':
      return 'CocktailGlass';
    case 'cockatil-bottle':
      return 'CocktailBotte';
    case 'cider-half':
      return 'CiderHalf';
    case 'cider-pint':
      return 'CiderPint';
  }
};
