import AsyncStorage from '@react-native-async-storage/async-storage';
import matomo from '../../../services/matomo';

export const setValidatedDays = async (day) => {
  await new Promise((res) => setTimeout(res, 1000)); // better UX
  await AsyncStorage.setItem('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
  const lastUpdate = new Date().toISOString().split('T')[0];
  await AsyncStorage.setItem('DEFI_7_JOURS_LAST_UPDATE', lastUpdate);
  matomo.logValidateDayInDefi7Days(day);
};
