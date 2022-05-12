import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Background from '../../../components/Background';
import HeaderBackground from '../../../components/HeaderBackground';
import { storage } from '../../../services/storage';
import Reminder from '../../Infos/Reminder';
import QuizzEvaluateConso from '../../Quizzs/QuizzEvaluateConso';
import QuizzLifeQuality from '../../Quizzs/QuizzLifeQuality';
import QuizzMotivations from '../../Quizzs/QuizzMotivations';
import Defi from '../Defi';
import Day1 from './Day1';
import Day3 from './Day3';
import Day5 from './Day5';
import Day7 from './Day7';
import { defi7DaysData } from './defi7DaysData';
import Onboarding from './Onboarding';
import OnboardingInfo from './OnboardingInfo';
import { setValidatedDays } from './utils';

const Defi7DaysStack = createStackNavigator();

const Defi7DaysNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const initNavigator = async () => {
    const defiStartedAt = storage.getString('DEFI_7_JOURS_STARTED_AT');
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
            name="DAY_5"
            component={Day5}
            initialParams={{
              inDefi7Days: true,
              rootRoute: 'DEFI_7_DAYS_MENU',
              day: 5,
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
    const storedLastUpdate = storage.getString('DEFI_7_JOURS_LAST_UPDATE');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getString('DEFI_7_JOURS_VALIDATED_DAYS');
    if (storedValidateDays) setValidateDays(Number(storedValidateDays));
  };

  const updateValidatedDays = async (day) => {
    // set local storage
    setValidatedDays(day);

    //set state
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    storage.set('DEFI_7_JOURS_VALIDATED_DAYS', `${day}`);
    setLastUpdate('UNLOCK');
    setValidateDays(day);
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  useEffect(() => {
    if (validatedDays === 4) {
      setValidatedDays(5);
    }
  }, [validatedDays]);

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
