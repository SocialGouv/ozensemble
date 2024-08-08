import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

export const deepLinkingConfig = {
  prefixes: ["oz://"],
  config: {
    screens: {
      USER_SURVEY: "USER_SURVEY",
      USER_SURVEY_START: "USER_SURVEY_START",
      USER_SURVEY_NOTIF: "USER_SURVEY_NOTIF",
      INACTIVITY_NPS_SCREEN: "INACTIVITY_NPS_SCREEN",
      APP: {
        screens: {
          ADD_DRINK: "ADD_DRINK",
          BADGES_LIST: "BADGES_LIST",
          TABS: {
            screens: {
              CONSO_FOLLOW_UP_NAVIGATOR: "CONSO_FOLLOW_UP_NAVIGATOR",
              DEFI: {
                screens: {
                  DEFI1: "DEFI1",
                  DEFI2: "DEFI2",
                  DEFI3: "DEFI3",
                  DEFI4: "DEFI4",
                },
              },
              GAINS_NAVIGATOR: {
                screens: {
                  GAINS_MAIN_VIEW: "GAINS_MAIN_VIEW",
                  GAINS_MY_OBJECTIVE: "GAINS_MY_OBJECTIVE",
                  GAINS_REMINDER: "GAINS_REMINDER",
                  GAINS_ESTIMATE_PREVIOUS_CONSUMPTION: "GAINS_ESTIMATE_PREVIOUS_CONSUMPTION",
                },
              },
              HEALTH: {
                screens: {
                  HEALTH_ARTICLE: "HEALTH_ARTICLE",
                  CONTACT: "CONTACT",
                  DOCTOLIB: "DOCTOLIB",
                  TO_SAY_NO: "TO_SAY_NO",
                  ALCOHOL_AND_NORMS: "ALCOHOL_AND_NORMS",
                  ALCOHOL_ADDICTION: "ALCOHOL_ADDICTION",
                  ALCOHOL_AND_CALORIES: "ALCOHOL_AND_CALORIES",
                  TO_HELP_ME_REDUCE: "TO_HELP_ME_REDUCE",
                  DID_YOU_KNOW: "DID_YOU_KNOW",
                  ALCOHOL_AND_MOTIVATION: "ALCOHOL_AND_MOTIVATION",
                  ALCOHOL_AND_HEALTH_RISKS: "ALCOHOL_AND_HEALTH_RISKS",
                  ALCOHOL_AND_DEPENDENCY: "ALCOHOL_AND_DEPENDENCY",
                },
              },
              INFOS: "INFOS",
            },
          },
        },
      },
    },
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    // FIXME: this methods makes the app crash
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    // // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync();
    console.log("NotificationService getInitialURL:", JSON.stringify(response, null, 2));
    console.log("URL is ", response?.notification?.request?.content?.data?.url);
    /* NOTE
    as of 2024-08-08 there is a bug in expo-notifications -> https://github.com/expo/expo/issues/28656
    here is the log received from the console.log above:
    (NOBRIDGE) LOG  NotificationService getInitialURL: {
      "actionIdentifier": "expo.modules.notifications.actions.DEFAULT",
      "notification": {
        "date": 1723106331352,
        "request": {
          "identifier": "0:172sd;lmsdf%asdlknsalkmfaslkmdfa",
          "content": {
            "body": "N'oubliez pas de remplir votre agenda Oz",
            "dataString": null,
            "title": "C'est l'heure de votre suivi !"
          },
          "trigger": {
            "type": "push",
            "channelId": null
          }
        }
      }
    }
    (NOBRIDGE) LOG  URL is  undefined

    let's see if the nmapping is still correct when the bug is fixed
    */

    return response?.notification?.request?.content?.data?.url;
  },
  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      listener(url);
    });

    // Listen to expo push notifications
    const notificationsSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("NotificationService notificationsSubscription:", JSON.stringify(response, null, 2));
      const url = response?.notification?.request?.content?.data?.link;
      // Any custom logic to see whether the URL needs to be handled
      //...
      /* NOTE
    as of 2024-08-08 there is a bug in expo-notifications -> https://github.com/expo/expo/issues/28656
    here is the log received from the console.log above, when received in background:

     (NOBRIDGE) LOG  NotificationService notificationsSubscription: {
        "notification": {
          "request": {
            "trigger": {
              "channelId": null,
              "type": "push"
            },
            "content": {
              "title": "C'est l'heure de votre suivi !",
              "dataString": null,
              "body": "N'oubliez pas de remplir votre agenda Oz"
            },
            "identifier": "0:172sd;lmsdf%asdlknsalkmfaslkmdfa"
          },
          "date": 1723106501392
        },
        "actionIdentifier": "expo.modules.notifications.actions.DEFAULT"
      }

      and when receive in foreground

      (NOBRIDGE) LOG  NotificationService notificationsSubscription: {
        "notification": {
          "request": {
            "trigger": {
              "remoteMessage": {
                "originalPriority": 1,
                "sentTime": 1723106569980,
                "notification": {
                  "usesDefaultVibrateSettings": false,
                  "color": null,
                  "channelId": null,
                  "visibility": null,
                  "sound": null,
                  "tag": null,
                  "bodyLocalizationArgs": null,
                  "imageUrl": null,
                  "title": "C'est l'heure de votre suivi !",
                  "ticker": null,
                  "eventTime": null,
                  "body": "N'oubliez pas de remplir votre agenda Oz",
                  "titleLocalizationKey": null,
                  "notificationPriority": null,
                  "icon": null,
                  "usesDefaultLightSettings": false,
                  "sticky": false,
                  "link": null,
                  "titleLocalizationArgs": null,
                  "bodyLocalizationKey": null,
                  "usesDefaultSound": false,
                  "clickAction": null,
                  "localOnly": false,
                  "lightSettings": null,
                  "notificationCount": null
                },
                "data": {
                  "message": "N'oubliez pas de remplir votre agenda Oz",
                  "title": "C'est l'heure de votre suivi !",
                  "link": "oz://ADD_DRINK"
                },
                "to": null,
                "ttl": 2419200,
                "collapseKey": "com.addicto",
                "messageType": null,
                "priority": 1,
                "from": "90509851991",
                "messageId": "0:blablabla"
              },
              "channelId": null,
              "type": "push"
            },
            "content": {
              "title": "C'est l'heure de votre suivi !",
              "badge": null,
              "autoDismiss": true,
              "data": null,
              "body": "N'oubliez pas de remplir votre agenda Oz",
              "sound": "default",
              "sticky": false,
              "subtitle": null
            },
            "identifier": "0:blablabla"
          },
          "date": 1723106569980
        },
        "actionIdentifier": "expo.modules.notifications.actions.DEFAULT"
      }

    let's see if the nmapping is still correct when the bug is fixed
    */

      // Let React Navigation handle the URL
      if (url) listener(url);
    });

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      notificationsSubscription.remove();
    };
  },
};
