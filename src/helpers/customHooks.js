/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AppState, BackHandler } from 'react-native';
import CONSTANTS from '../reference/constants';
import { getGender, getAcceptableDosePerDay } from '../Quizz/utils';

export const useBackHandler = (handler, activate = true) => {
  React.useEffect(() => {
    if (!activate) return;
    BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  });
};

export default function useAppState(settings) {
  const { onChange, onForeground, onBackground } = settings || {};
  const [appState, setAppState] = React.useState(AppState.currentState);

  React.useEffect(() => {
    function handleAppStateChange(nextAppState) {
      if (nextAppState === 'active') {
        isValidFunction(onForeground) && onForeground();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        isValidFunction(onBackground) && onBackground();
      }
      setAppState(nextAppState);
      isValidFunction(onChange) && onChange(nextAppState);
    }
    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [onChange, onForeground, onBackground, appState]);

  // settings validation
  function isValidFunction(func) {
    return func && typeof func === 'function';
  }
  return { appState };
}

export const usefetchAsyncStorage = (key, initValue = null) => {
  const [value, setValue] = React.useState(initValue);
  const [alreadyFetched, setAlreadyFetched] = React.useState(false);
  React.useEffect(() => {
    const fetchKeyFromLocalStorage = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          try {
            setValue(JSON.parse(storedValue));
          } catch (e) {
            setValue(storedValue);
          }
        }
      } catch (e) {
        console.log('error fetching ' + key, e);
      } finally {
        setAlreadyFetched(true);
      }
    };
    if (initValue === null && !alreadyFetched) fetchKeyFromLocalStorage();
  });
  return value;
};

export const usefetchQuizzAnswers = () => usefetchAsyncStorage(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);

export const useFetchResultKey = () => usefetchAsyncStorage(CONSTANTS.STORE_KEY_QUIZZ_RESULT);

export const useFetchResultReminder = () => usefetchAsyncStorage(CONSTANTS.STORE_KEY_REMINDER);

export const usefetchMaxAcceptableDosesPerDay = () => {
  const quizzAnswers = usefetchQuizzAnswers();
  if (!quizzAnswers) return 3;
  return getAcceptableDosePerDay(getGender(quizzAnswers));
};
