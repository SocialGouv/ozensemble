/**
 * @format
 */

import NotificationService from './src/services/notifications';

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

NotificationService.init();

AppRegistry.registerComponent(appName, () => {
  LogBox.ignoreAllLogs(true);
  return App;
});
