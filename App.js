import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { PersistGate } from 'redux-persist/integration/react';
import { InteractionManager } from 'react-native';
import { persistor, store } from './src/redux/store';
import Router from './src/Router';
import './src/services/polyfills';

import { SENTRY_XXX } from './src/config';
import { ToastProvider } from './src/services/toast';
import './src/styles/theme';
import { hasMigratedFromAsyncStorage, migrateFromAsyncStorage } from './src/services/storage';

dayjs.extend(isSameOrAfter);
dayjs.locale('fr');

if (!__DEV__) {
  Sentry.init({ dsn: SENTRY_XXX });
}

const App = () => {
  // TODO: Remove `hasMigratedFromAsyncStorage` after a while (when everyone has migrated)
  const [hasMigrated, setHasMigrated] = useState(hasMigratedFromAsyncStorage);

  useEffect(() => {
    if (!hasMigratedFromAsyncStorage) {
      InteractionManager.runAfterInteractions(async () => {
        try {
          await migrateFromAsyncStorage();
          setHasMigrated(true);
        } catch (e) {
          // TODO: fall back to AsyncStorage? Wipe storage clean and use MMKV? Crash app?
        }
      });
    }
  }, []);

  if (!hasMigrated) return null;

  return (
    <RecoilRoot>
      <ToastProvider backgroundColor="#4030a5">
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <SafeAreaProvider>
              <Router />
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default App;
