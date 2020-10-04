import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// https://dev.to/edmondso006/react-native-local-ios-and-android-notifications-2c58

class NotificationService {
  listeners = {};

  init = async () => {
    await this.configure();
  };

  async configure() {
    PushNotification.configure({
      onNotification: this.handleNotification,
      onRegister: () => null,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: Platform.OS === 'ios',
      requestPermissions: Platform.OS === 'ios',
    });
    this.isConfigured = true;
  }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification({ date, title, message, playSound = true, soundName = 'default' } = {}) {
    PushNotification.localNotificationSchedule({
      date,
      title,
      message,
      playSound,
      soundName,
    });
  }

  async checkPermission() {
    return await new Promise((resolve) => {
      PushNotification.checkPermissions(({ alert }) => {
        resolve(alert);
      });
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  handleNotification = (notification) => {
    const listenerKeys = Object.keys(this.listeners);
    //  handle initial notification if any, if no listener is mounted yet
    if (!listenerKeys.length) {
      this.initNotification = notification;
      notification.finish();
      return;
    }
    this.initNotification = null;

    //handle normal notification
    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const notificationHandler = this.listeners[listenerKeys[i]];
      notificationHandler(notification);
    }
    notification.finish();
  };

  listen = (callback) => {
    const listenerKey = `listener_${Date.now()}`;
    this.listeners[listenerKey] = callback;
    if (this.initNotification) this.handleNotification(this.initNotification);
    return listenerKey;
  };

  remove = (listenerKey) => {
    delete this.listeners[listenerKey];
  };
}

const Notifications = new NotificationService();

export default Notifications;
