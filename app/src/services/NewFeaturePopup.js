import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { defaultPaddingFontScale, screenHeight, screenWidth } from '../styles/theme';
import { logEvent } from './logEventsWithMatomo';
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
    title: 'Regardez ça !',
    description: 'Eh oui !',
    onOkPress: 'EVENT_ON_OK_PRESS',
    onDismissPress: 'EVENT_ON_DISMISS_PRESS',
  }
]
 */
const NewFeaturePopupDisplay = ({ canShow }) => {
  const [featuresShownIds, setFeaturesShownIds] = useState(() => {
    // storage.delete('@NewFeaturesPopupIdsShown');
    return JSON.parse(storage.getString('@NewFeaturesPopupIdsShown') || JSON.stringify([]));
  });
  const [lastShownId, setLastShownId] = useState(() => {
    // storage.delete('@NewFeaturesLastShownId');
    return storage.getString('@NewFeaturesLastShownId') || '';
  });
  const [featuresToShow, setFeaturesToShow] = useState([]);

  const handleFeaturesShow = useCallback(
    async (featuresToShow = []) => {
      const newFeaturesToShow = featuresToShow.filter((f) => !featuresShownIds.includes(f.id));
      setFeaturesToShow(newFeaturesToShow);
    },
    [featuresShownIds]
  );

  useEffect(() => {
    NewFeaturePop.lastShownId = lastShownId;
    storage.set('@NewFeaturesLastShownId', lastShownId || '');
  }, [lastShownId]);

  useEffect(() => {
    NewFeaturePop.featuresShownIds = featuresShownIds;
    storage.set('@NewFeaturesPopupIdsShown', JSON.stringify(featuresShownIds || []));
  }, [featuresShownIds]);

  useEffect(() => {
    const featurePopupListener = NewFeaturePop.listen(handleFeaturesShow);
    return () => NewFeaturePop.remove(featurePopupListener);
  }, [handleFeaturesShow]);

  if (!featuresToShow.length) return null;
  const featureToShow = featuresToShow?.[0];

  const onOkPress = () => {
    if (featureToShow.onOkEvent) logEvent(featureToShow.onOkEvent);
    setFeaturesToShow((features) => features.filter((f) => f.id !== featureToShow?.id));
    setLastShownId(featureToShow?.id);
    setFeaturesShownIds((featureIds) => [...new Set([...featureIds, featureToShow?.id].filter(Boolean))]);
  };

  if (!canShow) return null;

  return (
    <>
      <View style={[styles.container(featureToShow.position), featureToShow.styles?.container || {}]}>
        {!!featureToShow?.title && (
          <Text style={[styles.title, featureToShow.styles?.title || {}]}>{featureToShow.title}</Text>
        )}
        {!!featureToShow?.description && (
          <Text style={[styles.description, featureToShow.styles?.description || {}]}>{featureToShow.description}</Text>
        )}
        <TouchableOpacity onPress={onOkPress}>
          <Text style={[styles.okButton, featureToShow.styles?.okButton || {}]}>{featureToShow.okButton}</Text>
        </TouchableOpacity>
      </View>
      {!featureToShow.noPointer && (
        <Svg
          viewBox="0 0 14 10"
          fill="none"
          style={[styles.pointer(featureToShow.pointerPosition), featureToShow.styles?.pointer || {}]}>
          <Path d="M6.9282 10L0 0.25L13.8564 0.25L6.9282 10Z" fill="#4030A5" />
        </Svg>
      )}
    </>
  );
};

export default NewFeaturePopupDisplay;

const styles = StyleSheet.create({
  container: ({ top, bottom, left, right }) => ({
    position: 'absolute',
    top: top !== undefined ? (top?.includes?.('%') ? top : screenHeight * 0.12 + top) : undefined,
    bottom: bottom !== undefined ? (bottom?.includes?.('%') ? bottom : screenHeight * 0.12 + bottom) : undefined,
    left: left !== undefined ? (left?.includes?.('%') ? left : defaultPaddingFontScale() / 2 + left) : undefined,
    right: right !== undefined ? (right?.includes?.('%') ? right : defaultPaddingFontScale() / 2 + right) : undefined,
    backgroundColor: '#4030a5',
    padding: defaultPaddingFontScale() / 3,
    minWidth: screenWidth / 2,
    maxWidth: screenWidth * 0.75,
    borderRadius: 5,
  }),
  title: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '800',
    color: '#ffffff',
    marginBottom: 5,
  },
  description: {
    color: '#ffffff',
    fontWeight: Platform.OS === 'android' ? 'thin' : '300',
  },
  okButton: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '800',
    color: '#ffffff',
    marginTop: 5,
    marginLeft: 'auto',
  },
  pointer: ({ top, bottom, left, right }) => ({
    position: 'absolute',
    top: top !== undefined ? screenHeight * 0.12 + top : undefined,
    bottom: bottom !== undefined ? screenHeight * 0.12 + bottom : undefined,
    left,
    right,
    height: 20,
    width: 28,
  }),
});

class NewFeaturePopService {
  stop() {
    this.unsubscribe = null;
  }

  handleShowNewFeaturePopup = (newFeatures) => {
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
      this.initFeaturePopup = newFeatures;
      return;
    }
    this.initFeaturePopup = null;

    //handle normal in-app message
    for (let i = listenerKeys.length - 1; i >= 0; i--) {
      const newFeatureListener = this.listeners[listenerKeys[i]];
      newFeatureListener(newFeatures);
    }
  };

  listeners = {};
  listen = (callback, fromComponent = 'main') => {
    const listenerKey = `popuplistener_${fromComponent}_${Date.now()}`;
    this.listeners[listenerKey] = callback;
    if (this.initFeaturePopup) this.handleShowNewFeaturePopup(this.initFeaturePopup);
    return listenerKey;
  };

  featuresShownIds = [];
  lastShownId = '';

  remove = (listenerKey) => {
    delete this.listeners[listenerKey];
  };
}

export const NewFeaturePop = new NewFeaturePopService();
