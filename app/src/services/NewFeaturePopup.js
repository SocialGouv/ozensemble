import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { storage } from './storage';

/*
featuresShown = [
  {
    id: 'feature-to-show',
    position: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    pointerPosition: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    title: 'Regardez ça !'
    description: 'Eh oui !'
    onOkPress: 'EVENT_ON_OK_PRESS',
    onDismissPress: 'EVENT_ON_DISMISS_PRESS',
  }
]
 */
const NewFeaturePopupDisplay = () => {
  const featuresShownIds = useRef(JSON.parse(storage.getString('@NewFeaturesPopupIdsShown') || JSON.stringify([])));
  const [featuresToShow, setFeaturesToShow] = useState([]);

  const handleFeaturesShow = async (featuresToShow = []) => {
    const newFeaturesToShow = featuresToShow.filter((f) => !featuresShownIds.includes(f.id));
    setFeaturesToShow(newFeaturesToShow);
  };

  useEffect(() => {
    NewFeaturePop.featuresShownIds = featuresShownIds.current;
    const featurePopupListener = NewFeaturePop.listen(handleFeaturesShow);
    return () => NewFeaturePop.remove(featurePopupListener);
  }, []);

  if (!featuresToShow.length) return null;
  // const featureToShow = featuresToShow[0];
  // const isLastFeature = featuresToShow.length === 1;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Ceci est une nouvelle fonctionnalité</Text>
        <Text style={styles.description}>Elle permet d'être trop cool</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewFeaturePopupDisplay;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f00',
  },
  title: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '800',
    color: '#ffffff',
  },
  description: {
    color: '#ffffff',
  },
});

class NewFeaturePopService {
  stop() {
    this.unsubscribe = null;
  }

  handleShowNewFeaturePopup = (inAppMessage) => {
    // two kind of notifications: push notification and in-app message
    // in-app is filled with `data`
    // push notification is filled with `notification`
    /* {
      "data": {},
      "messageId": "1604927651534187",
      "notification": {
        "body": "Tu vois que ça marche !",
        "ios": {},
        "title": "Ça marche !"
      },
      "background": false
    } */

    const listenerKeys = Object.keys(this.listeners);
    //  handle initial in-app-message if any, if no listener is mounted yet
    if (!listenerKeys.length) {
      this.initFeaturePopup = inAppMessage;
      return;
    }
    this.initFeaturePopup = null;

    //handle normal in-app message
    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const inAppMessageHandler = this.listeners[listenerKeys[i]];
      inAppMessageHandler(inAppMessage);
    }
  };

  listeners = {};
  listen = (fromComponent, callback) => {
    const listenerKey = `popuplistener_${fromComponent}_${Date.now()}`;
    this.listeners[listenerKey] = callback;
    if (this.initFeaturePopup) this.handleShowNewFeaturePopup(this.initFeaturePopup);
    return listenerKey;
  };

  featuresShownIds = [];

  remove = (listenerKey) => {
    delete this.listeners[listenerKey];
  };
}

export const NewFeaturePop = new NewFeaturePopService();
