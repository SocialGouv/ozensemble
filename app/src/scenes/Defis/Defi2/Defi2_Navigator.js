import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Background from '../../../components/Background';
import { storage } from '../../../services/storage';
import Defi from '../Defi';
import { defi2_Data } from './defi2_Data';
import { setValidatedDays } from '../utils';
import Defi2_Day1 from './Defi2_Day1';
import Defi2_Day2 from './Defi2_Day2';
import Defi2_Day6 from './Defi2_Day6';
import Defi2_Day5_Navigator from './Day6/Defi2_Day5_Navigator';

const Defi2_Stack = createStackNavigator();

const Defi2_Navigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <Defi2_Stack.Navigator headerMode="none" initialRouteName={'DEFI2_MENU'}>
        <Defi2_Stack.Screen name="DEFI2_MENU" component={Defi2_Menu} />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_1"
          component={Defi2_Day1}
          initialParams={{
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 1,
          }}
        />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_2"
          component={Defi2_Day2}
          initialParams={{
            title: 'Évaluer sa consommation',
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 2,
          }}
        />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_3"
          component={Defi2_Day1}
          initialParams={{
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 3,
          }}
        />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_4"
          component={Defi2_Day1}
          initialParams={{
            title: 'Évaluer sa qualité de vie',
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 4,
          }}
        />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_5"
          component={Defi2_Day5_Navigator}
          initialParams={{
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 5,
          }}
        />
        <Defi2_Stack.Screen
          name="DEFI2_DAY_6"
          component={Defi2_Day6}
          initialParams={{
            title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
            inDefi2: true,
            rootRoute: 'DEFI2_MENU',
            day: 6,
          }}
        />
        <Defi2_Stack.Screen name="DEFI2_DAY_7" component={Defi2_Day1} />
      </Defi2_Stack.Navigator>
    </Background>
  );
};

const Defi2_Menu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(Number(storage.getNumber('@Defi2_ValidatedDays') || 0));
  const [lastUpdate, setLastUpdate] = useState(storage.getString('@Defi2_LastUpdate') || '');

  const getValidatedDays = async () => {
    const storedLastUpdate = storage.getString('@Defi2_LastUpdate');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getNumber('@Defi2_ValidatedDays');
    if (storedValidateDays) setValidateDays(storedValidateDays);
  };

  const updateValidatedDays = async (day) => {
    // set local storage
    setValidatedDays(day, '@Defi2');

    //set state
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    storage.set('@Defi2_ValidatedDays', day);
    setLastUpdate('UNLOCK');
    setValidateDays(day);
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  useEffect(() => {
    if (validatedDays === 4) {
      setValidatedDays(5, '@Defi2');
    }
  }, [validatedDays]);

  const nextDayIsUnlocked = lastUpdate !== new Date().toISOString().split('T')[0];
  const ActiveDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Aller plus loin sur 7 jours"
      data={defi2_Data}
      validatedDays={validatedDays}
      ActiveDayIndex={ActiveDayIndex}
      updateValidatedDays={updateValidatedDays}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi2"
    />
  );
};

export default Defi2_Navigator;
