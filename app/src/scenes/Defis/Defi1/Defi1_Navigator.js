import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { storage } from '../../../services/storage';
import QuizzMotivations from '../../Quizzs/QuizzMotivations';
import Defi from '../Defi';
import Defi1_Day1 from './Defi1_Day1';
import Defi1_Day3 from './Defi1_Day3';
import Defi1_Day5 from './Defi1_Day5';
import Defi1_Day7 from './Defi1_Day7';
import { defi1_Data } from './defi1_Data';
import Defi1_Onboarding from './Defi1_Onboarding';
import Defi1_OnboardingInfo from './Defi1_OnboardingInfo';
import { setValidatedDays } from '../utils';
import Defi1_Reminder from './Defi1_Reminder';
import Defi1_Day2 from './Defi1_Day2';
import Defi1_Day4 from './Defi1_Day4';

const Defi1_Stack = createStackNavigator();

const Defi1_Navigator = () => {
  return (
    <Defi1_Stack.Navigator
      headerMode="none"
      initialRouteName={storage.getString('@Defi1_StartedAt') ? 'DEFI1_MENU' : 'DEFI1_ONBOARDING'}>
      <Defi1_Stack.Screen name="DEFI1_ONBOARDING" component={Defi1_Onboarding} />
      <Defi1_Stack.Screen name="DEFI1_REMINDER" component={Defi1_Reminder} />
      <Defi1_Stack.Screen name="DEFI1_ONBOARDING_INFO" component={Defi1_OnboardingInfo} />
      <Defi1_Stack.Screen name="DEFI1_MENU" component={Defi1_Menu} />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_1"
        component={Defi1_Day1}
        initialParams={{
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 1,
        }}
      />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_2"
        component={Defi1_Day2}
        initialParams={{
          title: 'Mieux mesurer ma consommation',
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 2,
        }}
      />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_3"
        component={Defi1_Day3}
        initialParams={{
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 3,
        }}
      />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_4"
        component={Defi1_Day4}
        initialParams={{
          title: 'Évaluer sa qualité de vie',
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 4,
        }}
      />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_5"
        component={Defi1_Day5}
        initialParams={{
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 5,
        }}
      />
      <Defi1_Stack.Screen
        name="DEFI1_DAY_6"
        component={QuizzMotivations}
        initialParams={{
          title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
          inDefi1: true,
          rootRoute: 'DEFI1_MENU',
          day: 6,
        }}
      />
      <Defi1_Stack.Screen
        initialParams={{
          inDefi1: true,
          day: 7,
        }}
        name="DEFI1_DAY_7"
        component={Defi1_Day7}
      />
    </Defi1_Stack.Navigator>
  );
};

const Defi1_Menu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(Number(storage.getNumber('@Defi1_ValidatedDays') || 0));
  const [lastUpdate, setLastUpdate] = useState(storage.getString('@Defi1_LastUpdate') || '');

  const getValidatedDays = async () => {
    const storedLastUpdate = storage.getString('@Defi1_LastUpdate');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getNumber('@Defi1_ValidatedDays');
    if (storedValidateDays) setValidateDays(storedValidateDays);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    if (day === 0) {
      storage.delete('@Defi1_ValidatedDays');
      storage.delete('@Defi1_LastUpdate');
      storage.delete('@Defi1_StartedAt');
      setValidateDays(0);
    } else {
      storage.set('@Defi1_ValidatedDays', day);
      setValidateDays(day);
    }
    setLastUpdate('UNLOCK');
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  useEffect(() => {
    if (validatedDays === 4) {
      setValidatedDays(5, '@Defi1');
    }
  }, [validatedDays]);

  const nextDayIsUnlocked = lastUpdate !== new Date().toISOString().split('T')[0];
  const activeDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Faire le point sur 7 jours"
      defiNumber={1}
      data={defi1_Data}
      validatedDays={validatedDays}
      activeDayIndex={activeDayIndex}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi1"
    />
  );
};

export default Defi1_Navigator;
