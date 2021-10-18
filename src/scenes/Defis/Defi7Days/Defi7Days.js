import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './Onboarding';
import OnboardingInfo from './OnboardingInfo';
import Reminder from '../../Infos/Reminder';
import Day1 from './Day1';
import Day3 from './Day3';
import Day7 from './Day7';
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
  const [initialScreen, setInitialScreen] = useState(null);
  const initNavigator = async () => {
    const defiStartedAt = await AsyncStorage.getItem('DEFI_7_JOURS_STARTED_AT');
    if (defiStartedAt) return setInitialScreen('DEFI_7_DAYS_MENU');
    return setInitialScreen('ONBOARDING');
  };
  useEffect(() => {
    initNavigator();
  }, []);
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      {!!initialScreen && (
        <Defi7DaysStack.Navigator headerMode="none" initialRouteName={initialScreen}>
          <Defi7DaysStack.Screen name="ONBOARDING" component={Onboarding} />
          <Defi7DaysStack.Screen name="DEFI_7_DAYS_REMINDER" component={Reminder} />
          <Defi7DaysStack.Screen name="ONBOARDING_INFO" component={OnboardingInfo} />
          <Defi7DaysStack.Screen name="DEFI_7_DAYS_MENU" component={Defi7DaysMenu} />
          <Defi7DaysStack.Screen
            name="DAY_1"
            component={Day1}
            initialParams={{
              inDefi7Days: true,
              rootRoute: 'DEFI_7_DAYS_MENU',
              day: 1,
            }}
          />
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
            name="DAY_3"
            component={Day3}
            initialParams={{
              inDefi7Days: true,
              rootRoute: 'DEFI_7_DAYS_MENU',
              day: 3,
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
          <Defi7DaysStack.Screen name="DAY_7" component={Day7} />
        </Defi7DaysStack.Navigator>
      )}
    </Background>
  );
};

const Defi7DaysMenu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  const getValidatedDays = async () => {
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
