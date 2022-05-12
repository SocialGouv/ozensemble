import React from 'react';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Router from './src/Router';
import './src/services/polyfills';

import { SENTRY_XXX } from './src/config';
import { ToastProvider } from './src/services/toast';
import './src/styles/theme';
import { RecoilRoot } from 'recoil';

if (!__DEV__) {
  Sentry.init({ dsn: SENTRY_XXX });
}

const App = () => {
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
