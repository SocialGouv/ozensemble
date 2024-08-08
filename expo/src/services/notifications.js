import * as Notifications from "expo-notifications";
import { Platform, AppState } from "react-native";
import { logEvent } from "./logEventsWithMatomo";
import { storage } from "./storage";
import API from "./api";

class NotificationService {
  listeners = {};

  init = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === "android") {
      await this.initAndroidChannels();
    }

    await this.checkAndGetPermissionIfAlreadyGiven("configure");
    this.appStateListener = AppState.addEventListener("change", this.handleAppStateChange);
  };

  delete = () => {
    this.appStateListener?.remove();
  };

  handleAppStateChange = (newState) => {
    if (newState === "active") {
      this.checkAndGetPermissionIfAlreadyGiven("appstate change");
    }
  };

  onRegister = async (tokenPayload) => {
    console.log("NotificationService onRegister:", tokenPayload);
    storage.set("STORAGE_KEY_PUSH_NOTIFICATION_TOKEN", tokenPayload.data ?? "");
    logEvent({
      category: "PUSH_NOTIFICATION_TOKEN_REGISTER",
      action: "SUCCESS",
    });
    const matomoId = storage.getString("@UserIdv2");
    await API.put({
      path: "/user",
      body: {
        pushNotifToken: tokenPayload.data,
        matomoId,
      },
    });
  };

  onRegistrationError = (err) => {
    console.error("NotificationService onRegistrationError:", err.message, err);
    logEvent({
      category: "PUSH_NOTIFICATION_TOKEN_REGISTER",
      action: "ERROR",
    });
  };

  checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return {
      granted: settings.granted,
      canAsk: settings.canAskAgain,
    };
  };

  checkAndAskForPermission = async () => {
    const { granted, canAsk } = await this.checkPermission();
    if (granted) return true;
    if (!canAsk) return false;
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      const token = await Notifications.getDevicePushTokenAsync();
      this.onRegister(token);
    }
    return status === "granted";
  };

  checkAndGetPermissionIfAlreadyGiven = async (from) => {
    console.log("check permission from", from);
    const { granted } = await this.checkPermission();
    if (!granted) return false;
    const token = await Notifications.getDevicePushTokenAsync();
    this.onRegister(token);
    return true;
  };

  initAndroidChannels = async () => {
    console.log("INIT ANDROID CHANNELS");
    await Notifications.setNotificationChannelAsync("unique_reminder", {
      name: "Rappel",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default",
    });

    await Notifications.setNotificationChannelAsync("PUSH-LOCAL-NOTIFICATIONS", {
      name: "Autres",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default",
    });
  };

  scheduleLocalAlarm = async ({ date, title, message, playSound = true, soundName = "default" }) => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        sound: playSound ? soundName : null,
      },
      trigger: date,
    });
  };

  localNotification = async ({ title, message, playSound = true, soundName = "default" }) => {
    await Notifications.presentNotificationAsync({
      title,
      body: message,
      sound: playSound ? soundName : null,
    });
  };

  cancelAll = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    storage.delete("@NPSInitialOpening");
  };

  getInitNotification = async () => {
    const lastNotificationResponse = await Notifications.getLastNotificationResponseAsync();
    if (lastNotificationResponse) {
      this.onNotificationOpened(lastNotificationResponse.notification);
    }
  };

  onNotificationOpened = (notification) => {
    console.log("NotificationService onNotificationOpened:", JSON.stringify(notification, null, 2));

    logEvent({
      category: "PUSH_NOTIFICATION_RECEIVE",
      action: "CLICKED",
      name: notification?.request?.content?.data?.type,
    });

    const listenerKeys = Object.keys(this.listeners);

    if (!listenerKeys.length) {
      this.initNotification = notification;
      return;
    }
    this.initNotification = null;

    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const listener = this.listeners[listenerKeys[i]];
      listener?.(notification);
    }
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
      if (this.listeners[listenerKey]) delete this.listeners[listenerKey];
    };
  };
}

const _NotificationService = new NotificationService();

export default _NotificationService;
