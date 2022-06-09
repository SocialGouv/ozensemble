import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import { InteractionManager } from 'react-native';
import 'dayjs/locale/fr';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Router from './src/Router';
import './src/services/polyfills';

import { SENTRY_XXX } from './src/config';
import ToastProvider from './src/services/toast';
import './src/styles/theme';
import {
  hasMigratedFromAsyncStorage,
  hasMigratedFromReduxToRecoil,
  migrateFromAsyncStorage,
  migrateFromReduxToRecoil,
  hasMigratedGenderAndAge,
  migrateGenderAndAge,
  hasMigratedDefi7JoursStored,
  migratedDefi7Jours,
} from './src/services/storage';

dayjs.extend(isSameOrAfter);
dayjs.locale('fr');

if (!__DEV__) {
  Sentry.init({ dsn: SENTRY_XXX });
}

const App = () => {
  // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);
  const [hasMigratedToRecoil, setHasMigratedToRecoil] = useState(hasMigratedFromReduxToRecoil);
  const [hasGenderAndAge, setHasGenderAndAge] = useState(hasMigratedGenderAndAge);
  const [hasMigratedDefi7Jours, setHasMigratedDefi7Jours] = useState(hasMigratedDefi7JoursStored);

  useEffect(() => {
    if (!hasMigratedFromAsyncStorage || !hasMigratedToRecoil || !hasGenderAndAge) {
      InteractionManager.runAfterInteractions(async () => {
        try {
          await migrateFromAsyncStorage();
          setHasMigrated(true);
          await migrateFromReduxToRecoil();
          setHasMigratedToRecoil(true);
          await migrateGenderAndAge();
          setHasGenderAndAge(true);
        } catch (e) {
          console.log('error migrating', e);
          // TODO: fall back to AsyncStorage? Wipe storage clean and use MMKV? Crash app?
        }
      });
    }
    if (!hasMigratedDefi7Jours) {
      migratedDefi7Jours();
      setHasMigratedDefi7Jours(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMigrated || !hasMigratedToRecoil || !hasGenderAndAge) return null;

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
