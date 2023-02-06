import { Linking } from 'react-native';
import NotificationService from './notifications';

export const deepLinkingConfig = {
  prefixes: ['oz://'],
  config: {
    screens: {
      APP: {
        screens: {
          TABS: {
            screens: {
              CONSO_FOLLOW_UP_NAVIGATOR: 'CONSO_FOLLOW_UP_NAVIGATOR',
              DEFI: {
                screens: {
                  DEFI1: 'DEFI1',
                },
              },
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
