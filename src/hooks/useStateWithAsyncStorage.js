import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useStateWithAsyncStorage = (key, initValue) => {

    const [value, setValue] = useState(initValue);

    const getInitItemValue = async () => {
        const foundValue = await AsyncStorage.getItem(key);
        if (!foundValue) return;
        setValue(JSON.parse(foundValue));
    }

    const setValueInAsyncStorage = (newValue) => {
        setValue(newValue)
        AsyncStorage.setItem(key, newValue)
    }

    useEffect(() => {
        getInitItemValue()
    }, [])

    return [value, setValueInAsyncStorage]
}

export default useStateWithAsyncStorage