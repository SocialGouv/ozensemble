import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useStateWithAsyncStorage = (key, initValue, resetOnInit) => {

    const [value, setValue] = useState(initValue);

    const valueType = useMemo(() => typeof initValue, [initValue])

    const getInitItemValue = async () => {
        if (resetOnInit) return AsyncStorage.removeItem(key);
        const foundValue = await AsyncStorage.getItem(key);
        if (!foundValue) return;
        if (valueType === 'number') {
            setValue(Number(foundValue));
        } else if (valueType === 'boolean') {
            setValue('true' ? true : false);
        } else {
            setValue(JSON.parse(foundValue));
        }
    }

    const setValueInAsyncStorage = (newValue) => {
        setValue(newValue)
        AsyncStorage.setItem(key, JSON.stringify(newValue))
    }

    useEffect(() => {
        getInitItemValue()
    }, [])

    return [value, setValueInAsyncStorage]
}

export default useStateWithAsyncStorage