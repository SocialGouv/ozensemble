import React, { useState } from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Day1 from './Day1';
import { createStackNavigator } from '@react-navigation/stack';
import Defi from '../Defi';
import { defi7DaysData } from './defi7DaysData';
import Background from '../../../components/Background';
import HeaderBackground from '../../../components/HeaderBackground';
import QuizzEvaluateConso from '../../Quizzs/QuizzEvaluateConso';
import QuizzLifeQuality from '../../Quizzs/QuizzLifeQuality';
import QuizzMotivations from '../../Quizzs/QuizzMotivations';
import { useFocusEffect } from '@react-navigation/native';

const Defi7DaysStack = createStackNavigator();

const Defi7DaysNavigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <Defi7DaysStack.Navigator headerMode="none" initialRouteName="DEFI_7_DAYS_MENU">
        <Defi7DaysStack.Screen name="DEFI_7_DAYS_MENU" component={Defi7DaysMenu} />
        <Defi7DaysStack.Screen name="DAY_1" component={Day1} />
        <Defi7DaysStack.Screen
          name="DAY_2"
          component={QuizzEvaluateConso}
          initialParams={{
            title: 'Évaluer sa consommation',
            inDefi7Days: true,
            rootRoute: 'DEFI_7_DAYS_MENU',
            day: 2,
          }}
        />
        <Defi7DaysStack.Screen
          name="DAY_4"
          component={QuizzLifeQuality}
          initialParams={{
            title: 'Évaluer sa qualité de vie',
            inDefi7Days: true,
            rootRoute: 'DEFI_7_DAYS_MENU',
            day: 4,
          }}
        />
        <Defi7DaysStack.Screen
          name="DAY_6"
          component={QuizzMotivations}
          initialParams={{
            title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
            inDefi7Days: true,
            rootRoute: 'DEFI_7_DAYS_MENU',
            day: 6,
          }}
        />
        <Defi7DaysStack.Screen name="DAY_7" component={Day1} />
      </Defi7DaysStack.Navigator>
    </Background>
  );
};

const Defi7DaysMenu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  const getValidatedDays = async () => {
    // await AsyncStorage.clear();
    const storedLastUpdate = await AsyncStorage.getItem('DEFI_7_JOURS_LAST_UPDATE');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = await AsyncStorage.getItem('DEFI_7_JOURS_VALIDATED_DAYS');
    if (storedValidateDays) setValidateDays(Number(storedValidateDays));
  };

  const updateValidatedDays = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    await AsyncStorage.setItem('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
    const lastUpdate = new Date().toISOString().split('T')[0];
    await AsyncStorage.setItem('DEFI_7_JOURS_LAST_UPDATE', lastUpdate);
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    await AsyncStorage.setItem('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
    setLastUpdate('UNLOCK');
    setValidateDays(day);
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  const nextDayIsUnlocked = lastUpdate !== new Date().toISOString().split('T')[0];
  const ActiveDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Faire le point sur 7 jours"
      data={defi7DaysData}
      validatedDays={validatedDays}
      ActiveDayIndex={ActiveDayIndex}
      updateValidatedDays={updateValidatedDays}
      hackAndUnlockDay={hackAndUnlockDay}
    />
  );
};

export default Defi7DaysNavigator;

export const setValidatedDays = async (day) => {
  await new Promise((res) => setTimeout(res, 1000)); // better UX
  await AsyncStorage.setItem('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
  const lastUpdate = new Date().toISOString().split('T')[0];
  await AsyncStorage.setItem('DEFI_7_JOURS_LAST_UPDATE', lastUpdate);
};
