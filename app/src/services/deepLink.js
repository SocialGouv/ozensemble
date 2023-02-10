import { Linking } from 'react-native';
import NotificationService from './notifications';

export const deepLinkingConfig = {
  prefixes: ['oz://'],
  config: {
    screens: {
      APP: {
        screens: {
          ADD_DRINK: 'ADD_DRINK',
          TABS: {
            screens: {
              CONSO_FOLLOW_UP_NAVIGATOR: 'CONSO_FOLLOW_UP_NAVIGATOR',
              DEFI: {
                screens: {
                  DEFI1: 'DEFI1',
                  DEFI2: 'DEFI2',
                  DEFI3: 'DEFI3',
                  DEFI4: 'DEFI4',
                },
              },
              GAINS_NAVIGATOR: {
                screens: {
                  GAINS_MAIN_VIEW: 'GAINS_MAIN_VIEW',
                  GAINS_MY_OBJECTIVE: 'GAINS_MY_OBJECTIVE',
                  GAINS_REMINDER: 'GAINS_REMINDER',
                  GAINS_ESTIMATE_PREVIOUS_CONSUMPTION: 'GAINS_ESTIMATE_PREVIOUS_CONSUMPTION',
                },
              },
              HEALTH: {
                screens: {
                  HEALTH: 'HEALTH',
                  CONTACT: 'CONTACT',
                  DOCTOLIB: 'DOCTOLIB',
                  TO_SAY_NO: 'TO_SAY_NO',
                  ALCOHOL_AND_NORMS: 'ALCOHOL_AND_NORMS',
                  ALCOHOL_ADDICTION: 'ALCOHOL_ADDICTION',
                  ALCOHOL_AND_CALORIES: 'ALCOHOL_AND_CALORIES',
                  TO_HELP_ME_REDUCE: 'TO_HELP_ME_REDUCE',
                  DID_YOU_KNOW: 'DID_YOU_KNOW',
                  ALCOHOL_AND_MOTIVATION: 'ALCOHOL_AND_MOTIVATION',
                  ALCOHOL_AND_HEALTH_RISKS: 'ALCOHOL_AND_HEALTH_RISKS',
                  ALCOHOL_AND_DEPENDENCY: 'ALCOHOL_AND_DEPENDENCY',
                },
              },
              INFOS: 'INFOS',
            },
          },
        },
      },
    },
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Check if there is an initial notification
    const notification = NotificationService.popInitialNotification();

    // Get deep link from data
    // if this is undefined, the app will open the default/home page
    return notification?.data?.link;
  },
  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    const unsubscribeNotificationService = NotificationService.subscribe((notification) => {
      if (notification?.data?.link) listener(notification.data.link);
    });

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      unsubscribeNotificationService();
    };
  },
};
