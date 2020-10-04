import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import Matomo from './lib';
import CONSTANTS from '../../reference/constants';
import { getGenderFromLocalStorage, mapResultToMatomoProfile } from '../../Quizz/utils';

const initMatomo = async () => {
  let userId = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_USER_ID);
  if (!userId) {
    userId = Matomo.makeid();
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_USER_ID, userId);
  }

  const prevVisits = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_NUMBER_OF_VISITS);
  const newVisits = prevVisits ? Number(prevVisits) + 1 : 1;
  await AsyncStorage.setItem(CONSTANTS.STORE_KEY_NUMBER_OF_VISITS, `${newVisits}`);

  Matomo.init({
    baseUrl: 'https://matomo.fabrique.social.gouv.fr/piwik.php',
    idsite: 22,
    userId,
    _idvc: newVisits,
  });

  Matomo.init2({
    baseUrl: 'https://stats.incubateur.net/matomo.php',
    idsite: 2,
  });

  const resultKey = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_RESULT);
  const gender = await getGenderFromLocalStorage();
  Matomo.setUserProperties({
    version: DeviceInfo.getVersion(),
    system: Platform.OS,
    profile: mapResultToMatomoProfile(resultKey),
    gender,
  });
};

const checkNetwork = async () => {
  const networkState = await NetInfo.fetch();
  if (!networkState.isConnected) return false;
  return true;
};

const logEvent = async ({ category, action, name, value }) => {
  try {
    const canSend = await checkNetwork();
    if (!canSend) throw new Error('no network');
    Matomo.logEvent({ category, action, name, value });
  } catch (e) {
    console.log('logEvent error', e);
    console.log('logEvent error', { category, action, name, value });
  }
};

const getUserId = () => Matomo.userId;

/*
APP VISIT

*/

const APP = 'APP';
const APP_OPEN = 'APP_OPEN';
const APP_CLOSE = 'APP_CLOSE';
const ORIGIN = 'origin';

const logAppVisit = async (from = null) => {
  await logEvent({
    category: APP,
    action: APP_OPEN,
  });
};

const logAppClose = async () => {
  await logEvent({
    category: APP,
    action: APP_CLOSE,
  });
};

const logOpenPage = async (category, value) => {
  await logEvent({ category, action: `${category}_OPEN`, name: ORIGIN, value });
};

/*
QUIZZ

*/

const QUIZZ = CONSTANTS.VIEW_QUIZZ;
const QUIZZ_OPEN = 'QUIZZ_OPEN';
const QUIZZ_ANSWER = 'QUIZZ_ANSWER';
const QUIZZ_START = 'QUIZZ_START';
const QUIZZ_FINISH = 'QUIZZ_FINISH';

const logQuizzOpen = async (value) => {
  await logEvent({
    category: QUIZZ,
    action: QUIZZ_OPEN,
    name: ORIGIN,
    value,
  });
};

const logQuizzStart = async () => {
  await logEvent({
    category: QUIZZ,
    action: QUIZZ_START,
  });
};

const logQuizzFinish = async () => {
  await logEvent({
    category: QUIZZ,
    action: QUIZZ_FINISH,
  });
};

const logQuizzAnswer = async ({ questionKey, answerKey, score }) => {
  const category = QUIZZ;
  const action = QUIZZ_ANSWER;
  const name = questionKey;
  const value = score;
  if (questionKey === CONSTANTS.GENDER) {
    Matomo.setUserProperties({ gender: answerKey });
  }
  await logEvent({ category, action, name, value });
};

const logAddictionResult = (resultKey) => {
  const profile = mapResultToMatomoProfile(resultKey);
  Matomo.setUserProperties({ profile });
};

/*
CONSO

*/
const CONSO = CONSTANTS.VIEW_CONSO;
const CONSO_OPEN = 'CONSO_OPEN';
const CONSO_OPEN_CONSO_ADDSCREEN = 'CONSO_OPEN_CONSO_ADDSCREEN';
const CONSO_CLOSE_CONSO_ADDSCREEN = 'CONSO_CLOSE_CONSO_ADDSCREEN';
const CONSO_UPDATE = 'CONSO_UPDATE';
const CONSO_ADD = 'CONSO_ADD';
const CONSO_DELETE = 'CONSO_DELETE';
const CONSO_OPEN_HELP = 'CONSO_OPEN_HELP';
const CONSO_SCAN_OWN_OPEN = 'CONSO_SCAN_OWN_OPEN';
const CONSO_SCAN_OWN = 'CONSO_SCAN_OWN';
const CONSO_ADD_OWN_MANUALLY_OPEN = 'CONSO_ADD_OWN_MANUALLY_OPEN';
const CONSO_ADD_OWN_MANUALLY = 'CONSO_ADD_OWN_MANUALLY';

const logConsoOpen = async (value) => {
  await logEvent({
    category: CONSO,
    action: CONSO_OPEN,
    name: ORIGIN,
    value,
  });
};

const logConsoOpenAddScreen = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_OPEN_CONSO_ADDSCREEN,
  });
};

const logConsoCloseAddScreen = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_CLOSE_CONSO_ADDSCREEN,
  });
};

const logConsoAdd = async ({ drinkKey, quantity }) => {
  await logEvent({
    category: CONSO,
    action: CONSO_ADD,
    name: drinkKey,
    value: Number(quantity),
  });
};

const logConsoUpdate = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_UPDATE,
  });
};

const logConsoDelete = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_DELETE,
  });
};

const logConsoScanOwnOpen = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_SCAN_OWN_OPEN,
  });
};

const logConsoScanOwn = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_SCAN_OWN,
  });
};

const logConsoAddOwnManuallyOpen = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_ADD_OWN_MANUALLY_OPEN,
  });
};

const logConsoAddOwnManually = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_ADD_OWN_MANUALLY,
  });
};

const logConsoDiagramHelp = async () => {
  await logEvent({
    category: CONSO,
    action: CONSO_OPEN_HELP,
  });
};

/*
REMINDER

*/

const REMINDER = CONSTANTS.VIEW_REMINDER;
const REMINDER_OPEN = 'REMINDER_OPEN';
const REMINDER_SET = 'REMINDER_SET';
const REMINDER_DELETE = 'REMINDER_DELETE';

const logReminderOpen = async (value) => {
  await logEvent({
    category: REMINDER,
    action: REMINDER_OPEN,
    name: ORIGIN,
    value,
  });
};
const logReminderSet = async (timestamp) => {
  await logEvent({
    category: REMINDER,
    action: REMINDER_SET,
    name: 'timestamp',
    value: timestamp,
  });
};

const logReminderDelete = async () => {
  await logEvent({
    category: REMINDER,
    action: REMINDER_DELETE,
  });
};

/*
CONTACT

*/

const CONTACT = CONSTANTS.VIEW_CONTACT;
const CONTACT_OPEN = 'CONTACT_OPEN';
const CONTACT_CALL = 'CONTACT_CALL';
const CONTACT_WEBSITE_OPEN = 'CONTACT_WEBSITE_OPEN';
const CONTACT_ASKCALL = 'CONTACT_ASKCALL';
const CONTACT_RDV = 'CONTACT_RDV';

const logContactOpen = async (value) => {
  await logEvent({
    category: CONTACT,
    action: CONTACT_OPEN,
    name: ORIGIN,
    value,
  });
};

const logContactNumberCalled = async () => {
  await logEvent({
    category: CONTACT,
    action: CONTACT_CALL,
  });
};

const logContactWebsiteOpened = async () => {
  await logEvent({
    category: CONTACT,
    action: CONTACT_WEBSITE_OPEN,
  });
};

const logContactAskForBeingCalled = async () => {
  await logEvent({
    category: CONTACT,
    action: CONTACT_ASKCALL,
  });
};

const logContactTakeRDV = async () => {
  await logEvent({
    category: CONTACT,
    action: CONTACT_RDV,
  });
};

const logNPSOpen = async () => {
  await logEvent({
    category: 'NPS',
    action: 'NPS_OPEN',
  });
};

const logNPSSend = async (useful, reco) => {
  await logEvent({
    category: 'NPS',
    action: 'NPS_SEND',
    name: 'notes',
    value: `${useful}-${reco}`,
  });
};

export default {
  initMatomo,
  logAppVisit,
  logAppClose,
  logOpenPage,
  logQuizzOpen,
  logQuizzStart,
  logQuizzFinish,
  logQuizzAnswer,
  logAddictionResult,
  logConsoOpen,
  logConsoOpenAddScreen,
  logConsoCloseAddScreen,
  logConsoScanOwnOpen,
  logConsoAddOwnManuallyOpen,
  logConsoUpdate,
  logConsoAdd,
  logConsoDelete,
  logConsoDiagramHelp,
  logConsoScanOwn,
  logConsoAddOwnManually,
  logReminderOpen,
  logReminderSet,
  logReminderDelete,
  logContactOpen,
  logContactNumberCalled,
  logContactWebsiteOpened,
  logContactAskForBeingCalled,
  logContactTakeRDV,
  logNPSOpen,
  logNPSSend,
  getUserId,
};
