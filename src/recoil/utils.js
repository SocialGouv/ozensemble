import { storage } from '../services/storage';

export const getInitValueFromStorage = (key, defaultValue) => {
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
  return JSON.parse(foundValue);
};
