import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
// export const hasMigratedFromAsyncStorage = false;
export const hasMigratedFromAsyncStorage = storage.getBoolean('hasMigratedFromAsyncStorage');

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
export async function migrateFromAsyncStorage() {
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

        // if (key !== 'persist:addicto') AsyncStorage.removeItem(key);
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

export const hasMigratedFromReduxToRecoil = false;
// export const hasMigratedFromReduxToRecoil = storage.getBoolean('hasMigratedFromReduxToRecoil');

// TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
export async function migrateFromReduxToRecoil() {
  const start = global.performance.now();

  let reduxStore = storage.getString('persist:addicto');
  if (reduxStore && reduxStore.length > 5) {
    // so we do have a store
    reduxStore = JSON.parse(JSON.parse(reduxStore).conso);
    const drinksState = reduxStore.drinks;
    const ownDrinksState = reduxStore.ownDrinks;
    const startDateState = reduxStore.startDate;
    storage.set('@Drinks', JSON.stringify(drinksState));
    storage.set('@OwnDrinks', JSON.stringify(ownDrinksState));
    storage.set('@StartDate', JSON.stringify(startDateState));
  }

  storage.set('hasMigratedFromReduxToRecoil', true);

  const end = global.performance.now();
  console.log(`Migrated from Redux -> Recoil in ${end - start}ms!`);
}
