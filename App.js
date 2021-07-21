import './src/services/polyfills';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Router from './src/Router/Router';

import * as Sentry from '@sentry/react-native';
import { ToastProvider } from './src/services/toast';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://46a05ff121824832a53b8539e63b4eb2@o548798.ingest.sentry.io/5874545',
  });
}

const App = () => {
  return (
    <ToastProvider backgroundColor="#4030a5">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
