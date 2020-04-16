import './src/reference/polyfills';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Theme from './src/styles/theme';
import { store, persistor } from './src/redux/store';
import Router from './src/Router/Router';

import * as Sentry from '@sentry/react-native';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://b43d73353b7b48b8857deb69bca98da2@sentry.io/2213011',
  });
}

const App = () => {
  return (
    <Provider store={store}>
      <Theme>
        <PersistGate persistor={persistor} loading={null}>
          <Router />
        </PersistGate>
      </Theme>
    </Provider>
  );
};

export default App;
