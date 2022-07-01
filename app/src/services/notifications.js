import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppState, Platform } from 'react-native';
import { checkNotifications, RESULTS } from 'react-native-permissions';
import API from './api';

class NotificationService {
  listeners = {};

  init = () => {
    this.configure();
  };

  delete = () => {
    this.appStateListener?.remove();
    PushNotificationIOS.removeEventListener('registrationError', this.failIOSToken);
  };

  async configure() {
    const onRegister = this.handleRegister('configure');
    PushNotification.configure({
      onNotification: this.handleNotification,
      onRegister,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: false,
    });
    this.checkAndGetPermissionIfAlreadyGiven('configure');
    this.initAndroidLocalScheduledNotifications();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('registrationError', this.failIOSToken);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (newState) => {
    if (newState === 'active') {
      this.checkAndGetPermissionIfAlreadyGiven('appstate change');
    }
  };

  handleRegister =
    (from) =>
    async ({ token }) => {
      console.log('token ', from, token);
      if (token) API.pushToken = token;
      await API.put({ path: '/user', body: { pushToken: API.pushToken, userId: API.userId } });
      if (Platform.OS === 'android') return;
    };

  failIOSToken = (error) => {
    API.put({ path: '/user', body: { error, userId: API.userId } });
    if (Platform.OS === 'android') return;
  };

  checkPermission = async () => {
    const authStatus = await checkNotifications().then(({ status }) => status);
    // …'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked'
    let permission = { granted: false, canAsk: false };
    switch (authStatus) {
      case RESULTS.UNAVAILABLE:
        permission = { granted: false, canAsk: false };
        break;
      case RESULTS.DENIED:
        permission = { granted: false, canAsk: true };
        break;
      case RESULTS.LIMITED:
        permission = { granted: true };
        break;
      case RESULTS.GRANTED:
        permission = { granted: true };
        break;
      case RESULTS.BLOCKED:
        permission = { granted: false, canAsk: false };
        break;
    }
    return permission;
  };

  checkAndAskForPermission = async () => {
    const { granted, canAsk } = await this.checkPermission();
    if (granted) return true;
    if (!canAsk) return false;
    const permission = await PushNotification.requestPermissions();
    return permission;
  };

  checkAndGetPermissionIfAlreadyGiven = async (from) => {
    console.log('check permission from', from);
    const { granted } = await this.checkPermission();
    if (!granted) return true;
    const permission = await PushNotification.requestPermissions();
    return permission;
  };
  // LOCAL NOTIFICATIONS

  channelId = 'PUSH-LOCAL-NOTIFICATIONS'; // same as in strings.xml, for Android
  initAndroidLocalScheduledNotifications = () => {
    PushNotification.createChannel(
      {
        channelId: this.channelId, // (required)
        channelName: 'Push local notifications', // (required)
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  };

  //Appears after a specified time. App does not have to be open.
  scheduleNotification({ date, title, message, playSound = true, soundName = 'default', repeatType = 'day' } = {}) {
    PushNotification.localNotificationSchedule({
      date,
      title,
      message,
      playSound,
      soundName,
      channelId: this.channelId,
      repeatType,
    });
  }

  localNotification({ title, message, playSound = true, soundName = 'default' } = {}) {
    PushNotification.localNotification({
      title,
      message,
      playSound,
      soundName,
      channelId: this.channelId,
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  // PUSH NOTIFICATIONS
  getInitNotification() {
    PushNotification.popInitialNotification((notification) => {
      console.log('Initial Notification', notification);
      this.handleNotification(notification);
    });
  }

  handleNotification = (notification) => {
    console.log('handle Notification', JSON.stringify(notification, null, 2));

    /* ANDROID FOREGROUND */

    if (Platform.OS === 'android') {
      // if not the line below, the notification is launched without notifying
      // with the line below, there is a local notification triggered
      if (notification.foreground && !notification.userInteraction && notification.channelId === this.channelId) return;
    }
    /* LISTENERS */

    const listenerKeys = Object.keys(this.listeners);
    //  handle initial notification if any, if no listener is mounted yet
    if (!listenerKeys.length) {
      this.initNotification = notification;
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }
    this.initNotification = null;

    //handle normal notification
    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const notificationHandler = this.listeners[listenerKeys[i]];
      notificationHandler(notification);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
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
