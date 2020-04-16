/* eslint-disable quotes */
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import CONSTANTS from '../reference/constants';
import matomo from '../matomo';

// https://dev.to/edmondso006/react-native-local-ios-and-android-notifications-2c58

export default class NotificationService {
  constructor(canConfigure, setView) {
    if (canConfigure) this.configure(setView);
  }

  handleNotification = notification => {
    if (notification.foreground && !this.notifHandled) {
      this.notifHandled = true;
      this.localNotification();
    } else {
      this.setView(CONSTANTS.VIEW_CONSO);
      matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
    }
  };

  async configure(setView) {
    this.setView = setView;
    PushNotification.configure({
      onNotification: this.handleNotification,
      onRegister: () => null,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
    this.isConfigured = true;
  }

  //Appears right away
  localNotification() {
    Alert.alert(
      "C'est l'heure de votre suivi quotidien !",
      "N'oubliez pas de remplir votre agenda Oz",
      [
        {
          text: 'Suivi',
          onPress: () => {
            this.setView(CONSTANTS.VIEW_CONSO);
            matomo.logConsoOpen(CONSTANTS.FROM_LOCAL_NOTIFICATION);
          },
        },
        { text: 'Annuler', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification({
    date = new Date(Date.now() + 20 * 1000), // 2 seconds
    title = "C'est l'heure de votre suivi quotidien !",
    message = "N'oubliez pas de remplir votre agenda Oz",
    playSound = true,
    soundName = 'default',
  } = {}) {
    PushNotification.localNotificationSchedule({
      date,
      title,
      message,
      playSound,
      soundName,
    });
  }

  async checkPermission() {
    return await new Promise(resolve => {
      PushNotification.checkPermissions(({ alert }) => {
        resolve(alert);
      });
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
