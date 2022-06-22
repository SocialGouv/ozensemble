import { logEvent } from '../../services/logEventsWithMatomo';
import { storage } from '../../services/storage';

export const setValidatedDays = async (day, defiStorageKey) => {
  await new Promise((res) => setTimeout(res, 1000)); // better UX
  const prevDay = Number(storage.getNumber(`${defiStorageKey}_ValidatedDays`) || 0);
  if (day > prevDay) {
    storage.set(`${defiStorageKey}_ValidatedDays`, day);
    const lastUpdate = new Date().toISOString().split('T')[0];
    storage.set(`${defiStorageKey}_LastUpdate`, lastUpdate);
    logEvent({
      category: 'DEFI1',
      action: 'DEFI1_VALIDATE_DAY',
      name: 'day',
      value: day,
    });
  }
};
