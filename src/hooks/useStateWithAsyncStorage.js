import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';

const useStateWithAsyncStorage = (key, initValue, debug_resetOnInit = false) => {
  const [value, setValue] = useState(initValue);

  const valueType = useMemo(() => typeof initValue, [initValue]);
  const isFocused = useIsFocused();

  const getInitItemValue = async () => {
    if (debug_resetOnInit) return AsyncStorage.removeItem(key);
    const foundValue = await AsyncStorage.getItem(key);
    if (!foundValue) return;
    if (valueType === 'number') {
      setValue(Number(foundValue));
    } else if (valueType === 'boolean') {
      setValue(foundValue === 'true' ? true : false);
    } else {
      setValue(JSON.parse(foundValue));
    }
  };

  const setValueInAsyncStorage = (newValue) => {
    setValue(newValue);
    AsyncStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    if (isFocused) getInitItemValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return [value, setValueInAsyncStorage];
};

export default useStateWithAsyncStorage;
