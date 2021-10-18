import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';

const usePopToTop = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // there is this error coming: The action 'POP_TO_TOP' was not handled by any navigator.
      // I tried to findout how to make it better here:
      // https://github.com/react-navigation/react-navigation/issues/7814
      // but nothing is really worth it : there is no bug per se, so I decided to let it that way
      navigation?.popToTop();
    });

    return unsubscribe;
  }, [navigation]);
};

export default usePopToTop;
