import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
// fucking compatibility with redux-persis
export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

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
          if (key === 'persist:addicto' && value.length > 5) {
            const alreadyHere = storage.getString('persist:addicto');
            storage.set(key, value); // because persist:addicto is stringified twice
          } else {
            storage.set(key, value);
          }
        }

        if (key !== 'persist:addicto') AsyncStorage.removeItem(key);
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
