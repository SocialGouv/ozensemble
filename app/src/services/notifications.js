import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppState, Platform } from 'react-native';
import { checkNotifications, RESULTS } from 'react-native-permissions';
import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logEvent } from "./logEventsWithMatomo";

const STORAGE_KEY_PUSH_NOTIFICATION_TOKEN = "STORAGE_KEY_PUSH_NOTIFICATION_TOKEN";
const STORAGE_KEY_PUSH_NOTIFICATION_TOKEN_ERROR = "STORAGE_KEY_PUSH_NOTIFICATION_TOKEN_ERROR";
class NotificationService {
  listeners = {};

  init = () => {
    PushNotification.configure({
      onNotification: this.onNotificationOpened.bind(this),
      onRegister: this.onRegister.bind(this),
      onRegistrationError: this.onRegistrationError.bind(this),

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: false,
    });
    this.initAndroidChannels();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('registrationError', this.onRegistrationError);
    }
    this.checkAndGetPermissionIfAlreadyGiven('configure');
  }

  delete = () => {
    this.appStateListener?.remove();
    PushNotificationIOS.removeEventListener('registrationError', this.failIOSToken);
  };

  handleAppStateChange = (newState) => {
    if (newState === 'active') {
      this.checkAndGetPermissionIfAlreadyGiven('appstate change');
    }
  };

  onRegister = (tokenPayload) => {
    console.log('NotificationService onRegister:', tokenPayload);
    AsyncStorage.setItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN, tokenPayload.token);
    AsyncStorage.removeItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN_ERROR);
    logEvent({
      category: "PUSH_NOTIFICATION_TOKEN_REGISTER",
      action: "SUCCESS",
    });
  };

  onRegistrationError = (err) => {
    console.error('NotificationService onRegistrationError:', err.message, err);
    AsyncStorage.setItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN_ERROR, err.message);
    logEvent({
      category: "PUSH_NOTIFICATION_TOKEN_REGISTER",
      action: "ERROR",
    });
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
  
  initAndroidChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "reminder", // (required)
        channelName: "Rappel", // (required)
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.createChannel(
      {
        channelId: 'PUSH-LOCAL-NOTIFICATIONS', // (required)
        channelName: "Autres", // (required)
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  };

  // LOCAL NOTIFICATIONS

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

  onNotificationOpened = (notification) => {
    console.log('NotificationService onNotificationOpened:', JSON.stringify(notification, null, 2));

    logEvent({
      category: "PUSH_NOTIFICATION_RECEIVE",
      action: "CLICKED",
    });

    /* ANDROID FOREGROUND */
    // if (Platform.OS === 'android') {
    //   // if not the line below, the notification is launched without notifying
    //   // with the line below, there is a local notification triggered
    //   if (notification.foreground && !notification.userInteraction && notification.channelId === this.channelId) return;
    // }

    /* LISTENERS */

    const listenerKeys = Object.keys(this.listeners);

    if (!listenerKeys.length) {
      this.initNotification = notification;
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return;
    }
    this.initNotification = null;

    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const listener = this.listeners[listenerKeys[i]];
      listener?.(notification);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  };

  subscribe = (callback) => {
    let listenerKey = null;
    while (!listenerKey) {
      listenerKey = parseInt(Math.random() * 9999).toString();
      if (this.listeners.hasOwnProperty(listenerKey)) {
        listenerKey = null;
      }
    }
    this.listeners[listenerKey] = callback;
    return () => {
      delete this.listeners[listenerKey];
    };
  };

  popInitialNotification = () => {
    const _initialNotification = this.initialNotification;
    this.initNotification = null;
    return _initialNotification;
  };

  getToken = async () => {
    return await AsyncStorage.getItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN, null);
  };

  hasToken = async () => {
    return (await AsyncStorage.getItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN, null)) !== null;
  };

  getTokenError = async () => {
    return await AsyncStorage.getItem(STORAGE_KEY_PUSH_NOTIFICATION_TOKEN_ERROR, null);
  };

  listen = (callback) => {
    // const listenerKey = `listener_${Date.now()}`;
    // this.listeners[listenerKey] = callback;
    // if (this.initNotification) this.handleNotification(this.initNotification);
    // return listenerKey;
  };

  remove = (listenerKey) => {
    // delete this.listeners[listenerKey];
  };
}

const Notifications = new NotificationService();

export default Notifications;
