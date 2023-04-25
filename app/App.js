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
  hasSentObjectifToDB,
  sendObjectifToDB,
  hasSentNPSDoneToDB,
  sendNPSDoneToDB,
  hasMigrateOwnDrinksCatalog,
  migrateOwnDrinksCatalog,
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

const App = () => {
  // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  const [_hasSentObjectifToDB, setHasSentObjectifToDB] = useState(hasSentObjectifToDB);
  const [_hasSentNPSDoneToDB, setHasSentNPSDoneToDB] = useState(hasSentNPSDoneToDB);
  const [_hasMigratedOwnDrinksCatalog, setHasMigratedOwnDrinksCatalog] = useState(hasMigrateOwnDrinksCatalog);

  useEffect(() => {
    if (!_hasSentObjectifToDB) {
      sendObjectifToDB();
      setHasSentObjectifToDB(true);
    }
    if (!_hasSentNPSDoneToDB) {
      sendNPSDoneToDB();
      setHasSentNPSDoneToDB(true);
    }
    if (!hasMigrateOwnDrinksCatalog) {
      migrateOwnDrinksCatalog();
      setHasMigratedOwnDrinksCatalog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!_hasSentObjectifToDB || !_hasSentNPSDoneToDB) {
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
