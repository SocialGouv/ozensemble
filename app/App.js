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
import appInfos from './app.json';
import { SENTRY_XXX } from './src/config';
import ToastProvider from './src/services/toast';
import './src/styles/theme';
import {
  hasCleanConsoAndCatalog,
  sendPreviousDrinksToDB,
  hasSentPreviousDrinksToDB,
  cleanConsosAndCatalog,
  hasMigrateFromDailyGoalToWeekly,
  migrateFromDailyGoalToWeekly,
} from './src/services/storage';
import { getBundleId } from 'react-native-device-info';

dayjs.locale('fr');
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_XXX,
    release: getBundleId() + '@' + appInfos.version.buildName + '+' + appInfos.version.buildNumber, // ex : com.addicto.v1@1.18.0+198
  });
}

const sendDrinksToBd = async () => {
  await sendPreviousDrinksToDB();
};

const App = () => {
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [_hasMigrateFromDailyGoalToWeekly, sethasMigrateFromDailyGoalToWeekly] = useState(
    hasMigrateFromDailyGoalToWeekly
  );

  useEffect(() => {
    if (!_hasCleanConsoAndCatalog) {
      cleanConsosAndCatalog();
      setHasCleanConsoAndCatalog(true);
    }
    if (!_hasSentPreviousDrinksToDB) {
      sendDrinksToBd();
      setHasSentPreviousDrinksToDB(true);
    }
    if (!_hasMigrateFromDailyGoalToWeekly) {
      migrateFromDailyGoalToWeekly();
      sethasMigrateFromDailyGoalToWeekly(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!_hasSentPreviousDrinksToDB || !_hasCleanConsoAndCatalog || !_hasMigrateFromDailyGoalToWeekly) {
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
