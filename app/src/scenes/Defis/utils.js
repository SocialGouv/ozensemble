import matomo from '../../services/matomo';
import { storage } from '../../services/storage';

export const setValidatedDays = async (day, defiStorageKey) => {
  await new Promise((res) => setTimeout(res, 1000)); // better UX
  storage.set(`${defiStorageKey}_ValidatedDays`, day);
  const lastUpdate = new Date().toISOString().split('T')[0];
  storage.set(`${defiStorageKey}_LastUpdate`, lastUpdate);
  matomo.logDefi1ValidateDay(day);
};
