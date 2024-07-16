import 'react-native-get-random-values';
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

import { getBundleId } from 'react-native-device-info';
import { initMatomo } from './src/services/logEventsWithMatomo';
import {
  cleanConsosAndCatalog,
  hasCleanConsoAndCatalog,
  hasMigrateFromDailyGoalToWeekly,
  hasMigrateMissingDrinkKey,
  hasSentPreviousDrinksToDB,
  migrateFromDailyGoalToWeekly,
  migrateMissingDrinkKey,
  sendPreviousDrinksToDB,
} from './src/migrations';
import { reconciliateDrinksToDB, reconciliateGoalToDB } from './src/reconciliations';

dayjs.locale('fr');
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_XXX,
    release: getBundleId() + '@' + appInfos.version.buildName + '+' + appInfos.version.buildNumber, // ex : com.addicto.v1@1.18.0+198
    attachViewHierarchy: true,
  });
}

initMatomo();

const App = () => {
  // sync everytime we open the app
  const [reconciliatedDrinksToDB, setReconciliatedDrinksToDB] = useState(false);
  const [reconciliatedGoalsToDB, setReconciliatedGoalsToDB] = useState(false);

  // migrate only once if not yet done
  // TODO: clean migrations when it's time
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [_hasMigrateMissingDrinkKey, sethasMigrateMissingDrinkKey] = useState(hasMigrateMissingDrinkKey);
  const [_hasMigrateFromDailyGoalToWeekly, sethasMigrateFromDailyGoalToWeekly] = useState(
    hasMigrateFromDailyGoalToWeekly
  );

  useEffect(() => {
    (async () => {
      if (!reconciliatedDrinksToDB) {
        await reconciliateDrinksToDB();
        setReconciliatedDrinksToDB(true);
      }
      if (!reconciliatedGoalsToDB) {
        await reconciliateGoalToDB();
        setReconciliatedGoalsToDB(true);
      }
      if (!_hasCleanConsoAndCatalog) {
        await cleanConsosAndCatalog();
        setHasCleanConsoAndCatalog(true);
      }
      if (!_hasSentPreviousDrinksToDB) {
        await sendPreviousDrinksToDB();
        setHasSentPreviousDrinksToDB(true);
      }
      if (!_hasMigrateFromDailyGoalToWeekly) {
        await migrateFromDailyGoalToWeekly();
        sethasMigrateFromDailyGoalToWeekly(true);
      }
      if (!_hasMigrateMissingDrinkKey) {
        migrateMissingDrinkKey();
        sethasMigrateMissingDrinkKey(true);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !reconciliatedDrinksToDB ||
    !reconciliatedGoalsToDB ||
    !_hasSentPreviousDrinksToDB ||
    !_hasCleanConsoAndCatalog ||
    !_hasMigrateFromDailyGoalToWeekly ||
    !_hasMigrateMissingDrinkKey
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
