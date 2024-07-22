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
    return response?.notification.request.content.data.url;
  },
  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      listener(url);
    });

    // Listen to expo push notifications
    const notificationsSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.link;

        // Any custom logic to see whether the URL needs to be handled
        //...

        // Let React Navigation handle the URL
        if (url) listener(url);
      }
    );

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      notificationsSubscription.remove();
    };
  },
};
