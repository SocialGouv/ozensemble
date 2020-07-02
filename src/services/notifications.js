import PushNotification from 'react-native-push-notification';

// https://dev.to/edmondso006/react-native-local-ios-and-android-notifications-2c58

export default class NotificationService {
  constructor(notificationHandler) {
    this.configure(notificationHandler);
  }

  async configure(notificationHandler) {
    PushNotification.configure({
      onNotification: notificationHandler,
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

  //Appears after a specified time. App does not have to be open.
  scheduleNotification({ date, title, message, playSound = true, soundName = 'default' } = {}) {
    console.log({ date, title, message, playSound, soundName });
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
