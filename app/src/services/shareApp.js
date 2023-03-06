import { Share, Platform } from 'react-native';
import { logEvent } from './logEventsWithMatomo';
import { capture } from './sentry';

export const shareApp = async () => {
  const url = 'https://ozensemble.fr/';
  try {
    logEvent({
      category: 'SHARE_APP',
      action: 'PRESSED',
    });

    const result = await Share.share({
      message:
        "Bonjour, je te recommande l'application gratuite et totalement anonyme Oz Ensemble qui aide à maitriser sa consommation d'alcool. Bonne découverte !" +
        (Platform.OS === 'android' ? '\n' + url : ''),
      url: Platform.OS === 'ios' && url,
    });
    if (result?.action === Share.sharedAction) {
      if (result?.activityType) {
        logEvent({
          category: 'SHARE_APP',
          action: 'SHARED',
          name: result?.activityType,
        });
      } else {
        logEvent({
          category: 'SHARE_APP',
          action: 'SHARED',
        });
      }
    } else if (result.action === Share.dismissedAction) {
      logEvent({
        category: 'SHARE_APP',
        action: 'DISMISSED',
      });
    }
  } catch (error) {
    capture('share app failure ' + error);
    logEvent({
      category: 'SHARE_APP',
      action: 'ERROR',
    });
  }
};
