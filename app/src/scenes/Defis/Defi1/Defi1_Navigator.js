import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Background from '../../../components/Background';
import { storage } from '../../../services/storage';
import QuizzEvaluateConso from '../../Quizzs/QuizzEvaluateConso';
import QuizzLifeQuality from '../../Quizzs/QuizzLifeQuality';
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

const Defi1_Stack = createStackNavigator();

const Defi1_Navigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
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
          component={QuizzEvaluateConso}
          initialParams={{
            title: 'Évaluer sa consommation',
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
          component={QuizzLifeQuality}
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
        <Defi1_Stack.Screen name="DEFI1_DAY_7" component={Defi1_Day7} />
      </Defi1_Stack.Navigator>
    </Background>
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

  const updateValidatedDays = async (day) => {
    // set local storage
    setValidatedDays(day, '@Defi1');

    //set state
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    storage.set('@Defi1_ValidatedDays', day);
    setLastUpdate('UNLOCK');
    setValidateDays(day);
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
  const ActiveDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Faire le point sur 7 jours"
      data={defi1_Data}
      validatedDays={validatedDays}
      ActiveDayIndex={ActiveDayIndex}
      updateValidatedDays={updateValidatedDays}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi1"
    />
  );
};

export default Defi1_Navigator;
