import './src/services/polyfills';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Router from './src/Router';

import * as Sentry from '@sentry/react-native';
import { ToastProvider } from './src/services/toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/styles/theme';
import { SENTRY_DSN } from './src/config';

if (!__DEV__) {
  Sentry.init({ dsn: SENTRY_DSN });
}

const App = () => {
  return (
    <ToastProvider backgroundColor="#4030a5">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider>
            <Router />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
