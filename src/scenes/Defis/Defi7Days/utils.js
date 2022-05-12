import matomo from '../../../services/matomo';
import { storage } from '../../../services/storage';

export const setValidatedDays = async (day) => {
  await new Promise((res) => setTimeout(res, 1000)); // better UX
  storage.set('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
  const lastUpdate = new Date().toISOString().split('T')[0];
  storage.set('DEFI_7_JOURS_LAST_UPDATE', lastUpdate);
  matomo.logValidateDayInDefi7Days(day);
};
