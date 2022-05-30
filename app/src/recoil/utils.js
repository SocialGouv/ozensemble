import { storage } from '../services/storage';

export const getInitValueFromStorage = (key, defaultValue) => {
  try {
    const valueType = typeof defaultValue;
    if (valueType === 'number') {
      const foundValue = storage.getNumber(key);
      if (!foundValue) return defaultValue;
      return Number(foundValue);
    }
    if (valueType === 'boolean') {
      const foundValue = storage.getBoolean(key);
      if (!foundValue) return defaultValue;
      return foundValue;
    }
    const foundValue = storage.getString(key);
    if (!foundValue) return defaultValue;
    try {
      return JSON.parse(foundValue);
    } catch (e) {
      return foundValue;
    }
  } catch (e) {
    console.log('error recoil', e);
    const foundValue = storage.getString(key);
    console.log(foundValue, key, defaultValue);
  }
  return defaultValue;
};
