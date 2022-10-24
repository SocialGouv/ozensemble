import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Background from '../../../components/Background';
import { storage } from '../../../services/storage';
import Defi from '../Defi';
import { defi3_Data } from './defi3_Data';
import { setValidatedDays } from '../utils';
import Defi3_Day1 from './Defi3_Day1';
import Defi3_Day2 from './Defi3_Day2';
import Defi3_Day3 from './Day3';
import Defi3_Day4 from './Day4';
import Defi3_Day5 from './Defi3_Day5';
// import Defi2_Day6 from './Defi2_Day6';
import Defi3_Day7 from './Defi3_Day7';
// import ToSayNo from '../../Health/Articles/ToSayNo';
// import AlcoholAndNorms from '../../Health/Articles/AlcoholAndNorms';

const Defi3_Stack = createStackNavigator();

const Defi3_Navigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <Defi3_Stack.Navigator headerMode="none" initialRouteName={'DEFI3_MENU'}>
        <Defi3_Stack.Screen name="DEFI3_MENU" component={Defi3_Menu} />
        {/* <Defi3_Stack.Screen name="TO_SAY_NO" component={ToSayNo} /> */}
        {/* <Defi3_Stack.Screen name="ALCOHOL_AND_NORMS" component={AlcoholAndNorms} /> */}
        <Defi3_Stack.Screen
          name="DEFI3_DAY_1"
          component={Defi3_Day1}
          initialParams={{
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 1,
          }}
        />
        <Defi3_Stack.Screen
          name="DEFI3_DAY_2"
          component={Defi3_Day2}
          initialParams={{
            title: 'Mieux mesurer ma consommation',
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 2,
          }}
        />
        <Defi3_Stack.Screen
          name="DEFI3_DAY_3"
          component={Defi3_Day3}
          initialParams={{
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 3,
          }}
        />
        <Defi3_Stack.Screen
          name="DEFI3_DAY_4"
          component={Defi3_Day4}
          initialParams={{
            title: 'Évaluer sa qualité de vie',
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 4,
          }}
        />
        <Defi3_Stack.Screen
          name="DEFI3_DAY_5"
          component={Defi3_Day5}
          initialParams={{
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 5,
          }}
        />
        {/* 
        <Defi3_Stack.Screen
          name="DEFI3_DAY_6"
          component={Defi3_Day6}
          initialParams={{
            title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 6,
          }}
        /> */}
        <Defi3_Stack.Screen
          initialParams={{
            inDefi3: true,
            rootRoute: 'DEFI3_MENU',
            day: 7,
          }}
          name="DEFI3_DAY_7"
          component={Defi3_Day7}
        />
      </Defi3_Stack.Navigator>
    </Background>
  );
};

const Defi3_Menu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(Number(storage.getNumber('@Defi3_ValidatedDays') || 0));
  const [lastUpdate, setLastUpdate] = useState(storage.getString('@Defi3_LastUpdate') || '');

  const getValidatedDays = async () => {
    const storedLastUpdate = storage.getString('@Defi3_LastUpdate');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getNumber('@Defi3_ValidatedDays');
    if (storedValidateDays) setValidateDays(storedValidateDays);
  };

  const updateValidatedDays = async (day) => {
    // set local storage
    setValidatedDays(day, '@Defi3');

    //set state
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    if (day === 0) {
      storage.delete('@Defi3_ValidatedDays');
      storage.delete('@Defi3_LastUpdate');
      storage.delete('@Defi3_StartedAt');
      storage.delete('@Defi3_OnBoardingDoneState');
      setValidateDays(0);
    } else {
      storage.set('@Defi3_ValidatedDays', day);
      setValidateDays(day);
    }
    setLastUpdate('UNLOCK');
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  const nextDayIsUnlocked = lastUpdate !== new Date().toISOString().split('T')[0];
  const ActiveDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Comprendre le rôle de l'alcool dans ma vie quotidienne en 7 jours"
      data={defi3_Data}
      defiNumber={3}
      validatedDays={validatedDays}
      ActiveDayIndex={ActiveDayIndex}
      updateValidatedDays={updateValidatedDays}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi3"
    />
  );
};

export default Defi3_Navigator;
