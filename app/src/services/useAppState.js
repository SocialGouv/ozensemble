import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = ({ isActive, isInactive }) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        isActive();
      }
      if (nextAppState.match(/inactive|background/) && !appState.current.match(/inactive|background/)) {
        isInactive();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [isActive, isInactive]);
  return null;
};

export default useAppState;
