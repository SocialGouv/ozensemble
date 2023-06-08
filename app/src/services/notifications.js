import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import { checkNotifications, RESULTS } from 'react-native-permissions';
import { logEvent } from './logEventsWithMatomo';
import { storage } from './storage';
import API from './api';

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

      popInitialNotification: Platform.OS === 'android',
      requestPermissions: false,
    });
    this.initAndroidChannels();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener('registrationError', this.onRegistrationError);
    }
    this.checkAndGetPermissionIfAlreadyGiven('configure');
  };

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
    storage.set('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN', tokenPayload.token);
    logEvent({
      category: 'PUSH_NOTIFICATION_TOKEN_REGISTER',
      action: 'SUCCESS',
    });
    const matomoId = storage.getString('@UserIdv2');
    API.put({
      path: '/user',
      body: {
        pushNotifToken: tokenPayload.token,
        matomoId,
      },
    });
  };

  onRegistrationError = (err) => {
    console.error('NotificationService onRegistrationError:', err.message, err);
    logEvent({
      category: 'PUSH_NOTIFICATION_TOKEN_REGISTER',
      action: 'ERROR',
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
        channelId: 'unique_reminder', // (required)
        channelName: 'Rappel', // (required)
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.createChannel(
      {
        channelId: 'PUSH-LOCAL-NOTIFICATIONS', // (required)
        channelName: 'Autres', // (required)
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  };

  // LOCAL NOTIFICATIONS

  //Appears after a specified time. App does not have to be open.
  // scheduleNotification({ date, title, message, playSound = true, soundName = 'default', repeatType = 'day' } = {}) {
  //   PushNotification.localNotificationSchedule({
  //     date,
  //     title,
  //     message,
  //     playSound,
  //     soundName,
  //     channelId: this.channelId,
  //     repeatType,
  //   });
  // }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification({ date, title, message, playSound = true, soundName = 'default' } = {}) {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: `${date}-${message}-${title}`,
        fireDate: date,
        body: message,
        title: title,
        sound: soundName,
      });
    } else {
      PushNotification.localNotificationSchedule({
        date,
        title,
        message,
        playSound,
        soundName,
        channelId: this.channelId,
      });
    }
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
    // the line below is because when we clear all local notifications we also clear NPSInitialOpening
    // and we want the NPS to be still triggered
    storage.delete('@NPSInitialOpening');
  }

  // PUSH NOTIFICATIONS
  getInitNotification() {
    const { onNotificationOpened } = this;
    PushNotification.popInitialNotification(function (notification) {
      console.log('Initial Notification', JSON.stringify(notification, null, 2));
      if (notification) {
        onNotificationOpened(notification);
      }
    });
  }

  onNotificationOpened = (notification) => {
    console.log('NotificationService onNotificationOpened:', JSON.stringify(notification, null, 2));

    logEvent({
      category: 'PUSH_NOTIFICATION_RECEIVE',
      action: 'CLICKED',
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
      listenerKey = parseInt(Math.random() * 9999, 10).toString();
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
}

const Notifications = new NotificationService();

export default Notifications;
