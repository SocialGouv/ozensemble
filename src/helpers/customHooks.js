/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';
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

const usefetchAsyncStorage = (key, initValue = null) => {
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

export const usefetchMaxAcceptableDosesPerDay = () => {
  const quizzAnswers = usefetchAsyncStorage(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
  if (!quizzAnswers) return 3;
  return getAcceptableDosePerDay(getGender(quizzAnswers));
};
