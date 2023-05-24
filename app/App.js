import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekday from 'dayjs/plugin/weekday';
import Router from './src/Router';
import './src/services/polyfills';

import { SENTRY_XXX } from './src/config';
import ToastProvider from './src/services/toast';
import './src/styles/theme';
import {
  hasCleanConsoAndCatalog,
  sendPreviousDrinksToDB,
  hasSentPreviousDrinksToDB,
  cleanConsosAndCatalog,
  hasCheckedForOnboarding,
  checkForOnboarding,
} from './src/services/storage';

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

const sendDrinksToBd = async () => {
  await sendPreviousDrinksToDB();
};

const App = () => {
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [_hasCheckedForOnboarding, setHasCheckedForOnboarding] = useState(hasCheckedForOnboarding);
  useEffect(() => {
    if (!_hasCleanConsoAndCatalog) {
      cleanConsosAndCatalog();
      setHasCleanConsoAndCatalog(true);
    }
    if (!_hasSentPreviousDrinksToDB) {
      sendDrinksToBd();
      setHasSentPreviousDrinksToDB(true);
    }
    console.log(_hasCheckedForOnboarding);
    if (!_hasCheckedForOnboarding) {
      console.log('checkForOnboarding');
      checkForOnboarding();
      setHasCheckedForOnboarding(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!_hasSentPreviousDrinksToDB || !_hasCleanConsoAndCatalog) {
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
