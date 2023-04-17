import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import { InteractionManager } from 'react-native';
import 'dayjs/locale/fr';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekday from 'dayjs/plugin/weekday';
import Router from './src/Router';
import './src/services/polyfills';

import { SENTRY_XXX } from './src/config';
import ToastProvider from './src/services/toast';
import './src/styles/theme';
import {
  hasMigratedFromAsyncStorage,
  migrateFromAsyncStorage,
  hasMigratedGenderAndAge,
  migrateGenderAndAge,
  migratedDefi7Jours,
  hasMigratedDefi1Stored,
  hasMigratedRemindersStored,
  migrateReminders,
  hasMigratedRemindersToPushToken,
  migrateRemindersToPushToken,
  hasSentPreviousDrinksToDB,
  sendPreviousDrinksToDB,
  hasSentObjectifToDB,
  sendObjectifToDB,
  hasSentNPSDoneToDB,
  sendNPSDoneToDB,
  hasCreateBadgeForDoneDefis,
  createBadgesForDoneDefis,
  storage,
} from './src/services/storage';
import API from './src/services/api';

dayjs.locale('fr');
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_XXX,
    beforeSend(event) {
      if (event.contexts?.device?.name) {
        // Don't send user's device name
        delete event.contexts.device.name;
      }
      return event;
    },
  });
}

const App = () => {
  // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);
  const [hasGenderAndAge, setHasGenderAndAge] = useState(hasMigratedGenderAndAge);
  const [hasMigratedDefi1, setHasMigratedDefi1] = useState(hasMigratedDefi1Stored);
  const [hasMigratedReminders, setHasMigratedReminders] = useState(hasMigratedRemindersStored);
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasSentObjectifToDB, setHasSentObjectifToDB] = useState(hasSentObjectifToDB);
  const [_hasSentNPSDoneToDB, setHasSentNPSDoneToDB] = useState(hasSentNPSDoneToDB);
  const [_hasMigratedRemindersToPushToken, setHasMigratedRemindersToPushToken] = useState(
    hasMigratedRemindersToPushToken
  );
  const [_hasCreateBadgeForDoneDefis, setHasCreateBadgeForDoneDefis] = useState(hasCreateBadgeForDoneDefis);

  const checkNewFeatureModal = async () => {
    const matomoId = storage.getString('@UserIdv2');
    console.log('poost');
    await API.post({
      path: '/appMilestone/init',
      body: {
        matomoId,
      },
    });
  };
  useEffect(() => {
    if (!hasMigratedFromAsyncStorage || !hasGenderAndAge) {
      InteractionManager.runAfterInteractions(async () => {
        try {
          await migrateFromAsyncStorage();
          setHasMigrated(true);
          await migrateGenderAndAge();
          setHasGenderAndAge(true);
        } catch (e) {
          console.log('error migrating', e);
          // TODO: fall back to AsyncStorage? Wipe storage clean and use MMKV? Crash app?
        }
      });
    }
    if (!hasMigratedDefi1) {
      migratedDefi7Jours();
      setHasMigratedDefi1(true);
    }
    if (!hasMigratedReminders) {
      migrateReminders();
      setHasMigratedReminders(true);
    }
    if (!_hasMigratedRemindersToPushToken) {
      migrateRemindersToPushToken();
      setHasMigratedRemindersToPushToken(true);
    }
    if (!_hasSentPreviousDrinksToDB) {
      sendPreviousDrinksToDB();
      setHasSentPreviousDrinksToDB(true);
    }
    if (!_hasSentObjectifToDB) {
      sendObjectifToDB();
      setHasSentObjectifToDB(true);
    }
    if (!_hasSentNPSDoneToDB) {
      sendNPSDoneToDB();
      setHasSentNPSDoneToDB(true);
    }
    if (!_hasCreateBadgeForDoneDefis) {
      createBadgesForDoneDefis();
      setHasCreateBadgeForDoneDefis(true);
    }
    checkNewFeatureModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !hasMigrated ||
    !hasGenderAndAge ||
    !hasMigratedDefi1 ||
    !_hasMigratedRemindersToPushToken ||
    !hasMigratedReminders ||
    !_hasSentPreviousDrinksToDB ||
    !_hasSentObjectifToDB ||
    !_hasSentNPSDoneToDB
  ) {
    return null;
  }

  return (
    <RecoilRoot>
      <ToastProvider>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default Sentry.wrap(App);
