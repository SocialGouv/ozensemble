import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Background from '../../../components/Background';
import { storage } from '../../../services/storage';
import Defi from '../Defi';
import { defi4_Data } from './defi4_Data';
import { setValidatedDays } from '../utils';
import Defi4_Day1 from './Defi4_Day1';
import Defi4_Day2 from './Defi4_Day2';
import Defi4_Day3 from './Defi4_Day3';
// import Defi4_Day4 from './Day4';
// import Defi4_Day5 from './Defi4_Day5';
// import Defi4_Day6 from './Day6';
// import Defi4_Day7 from './Defi4_Day7';
// import AlcoholAndMotivations from '../../Health/Articles/AlcoholAndMotivation';
// import AlcoholAndHealthRisks from '../../Health/Articles/AlcoholAndHealthRisks';

const Defi4_Stack = createStackNavigator();

const Defi4_Navigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <Defi4_Stack.Navigator headerMode="none" initialRouteName={'DEFI4_MENU'}>
        <Defi4_Stack.Screen name="DEFI4_MENU" component={Defi4_Menu} />
        <Defi4_Stack.Screen
          name="DEFI4_DAY_1"
          component={Defi4_Day1}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 1,
          }}
        />
        <Defi4_Stack.Screen
          name="DEFI4_DAY_2"
          component={Defi4_Day2}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 2,
          }}
        />
        <Defi4_Stack.Screen
          name="DEFI4_DAY_3"
          component={Defi4_Day3}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 3,
          }}
        />
        {/* 
        <Defi4_Stack.Screen
          name="DEFI4_DAY_4"
          component={Defi4_Day4}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 4,
          }}
        />
        <Defi4_Stack.Screen
          name="DEFI4_DAY_5"
          component={Defi4_Day5}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 5,
          }}
        />

        <Defi4_Stack.Screen
          name="DEFI4_DAY_6"
          component={Defi4_Day6}
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 6,
          }}
        />
        <Defi4_Stack.Screen
          initialParams={{
            inDefi4: true,
            rootRoute: 'DEFI4_MENU',
            day: 7,
          }}
          name="DEFI4_DAY_7"
          component={Defi4_Day7}
        /> */}
        {/* <Defi4_Stack.Screen name="ALCOHOL_AND_HEALTH_RISKS" component={AlcoholAndHealthRisks} /> */}
      </Defi4_Stack.Navigator>
    </Background>
  );
};

const Defi4_Menu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(Number(storage.getNumber('@Defi4_ValidatedDays') || 0));
  const [lastUpdate, setLastUpdate] = useState(storage.getString('@Defi4_LastUpdate') || '');

  const getValidatedDays = async () => {
    const storedLastUpdate = storage.getString('@Defi4_LastUpdate');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getNumber('@Defi4_ValidatedDays');
    if (storedValidateDays) setValidateDays(storedValidateDays);
  };

  const updateValidatedDays = async (day) => {
    // set local storage
    setValidatedDays(day, '@Defi4');

    //set state
    setLastUpdate(lastUpdate);
    setValidateDays(day);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    if (day === 0) {
      storage.delete('@Defi4_ValidatedDays');
      storage.delete('@Defi4_LastUpdate');
      storage.delete('@Defi4_StartedAt');
      storage.delete('@Defi4_OnBoardingDoneState');
      setValidateDays(0);
    } else {
      storage.set('@Defi4_ValidatedDays', day);
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
      title="Se fixer un objectif de consommation en 7 jours"
      data={defi4_Data}
      defiNumber={4}
      validatedDays={validatedDays}
      ActiveDayIndex={ActiveDayIndex}
      updateValidatedDays={updateValidatedDays}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi4"
    />
  );
};

export default Defi4_Navigator;
