import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Background from '../../../components/Background';
import { storage } from '../../../services/storage';
import Defi from '../Defi';
import { defi5_Data } from './defi5_Data';
import Defi5_Day1 from './Defi5_Day1';
import Defi5_Day2 from './Defi5_Day2';
// import Defi5_Day1 from './Defi5_Day1';
// import Defi5_Day2 from './Defi4_Day2';
// import Defi5_Day3 from './Defi5_Day3';
// import Defi5_Day4 from './Defi5_Day4';
// import Defi5_Day5 from './Day5';
// import Defi5_Day6 from './Defi5_Day6';
// import Defi5_Day7 from './Defi5_Day7';
// import AlcoholAndDependency from '../../Health/Articles/AlcoholAndDependency';

const Defi5_Stack = createStackNavigator();

const Defi5_Navigator = () => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <Defi5_Stack.Navigator headerMode="none" initialRouteName={'DEFI5_MENU'}>
        <Defi5_Stack.Screen name="DEFI5_MENU" component={Defi5_Menu} />
        <Defi5_Stack.Screen
          name="DEFI5_DAY_1"
          component={Defi5_Day1}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 1,
          }}
        />
        <Defi5_Stack.Screen
          name="DEFI5_DAY_2"
          component={Defi5_Day2}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 2,
          }}
        />
        {/* <Defi5_Stack.Screen
          name="DEFI5_DAY_3"
          component={Defi5_Day3}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 3,
          }}
        />
        <Defi5_Stack.Screen
          name="DEFI5_DAY_4"
          component={Defi5_Day4}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 4,
          }}
        />
        <Defi5_Stack.Screen
          name="DEFI5_DAY_5"
          component={Defi5_Day5}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 5,
          }}
        />
        <Defi5_Stack.Screen
          name="DEFI5_DAY_6"
          component={Defi5_Day6}
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 6,
          }}
        />
        <Defi5_Stack.Screen
          initialParams={{
            inDefi5: true,
            rootRoute: 'DEFI5_MENU',
            day: 7,
          }}
          name="DEFI5_DAY_7"
          component={Defi5_Day7}
        /> */}
        {/* <Defi5_Stack.Screen name="ALCOHOL_AND_DEPENDENCY" component={AlcoholAndDependency} /> */}
      </Defi5_Stack.Navigator>
    </Background>
  );
};

const Defi5_Menu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(Number(storage.getNumber('@Defi5_ValidatedDays') || 6));
  const [lastUpdate, setLastUpdate] = useState(storage.getString('@Defi5_LastUpdate') || '');

  const getValidatedDays = async () => {
    const storedLastUpdate = storage.getString('@Defi5_LastUpdate');
    if (storedLastUpdate) setLastUpdate(storedLastUpdate);
    const storedValidateDays = storage.getNumber('@Defi5_ValidatedDays');
    if (storedValidateDays) setValidateDays(storedValidateDays);
  };

  const hackAndUnlockDay = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    if (day === 0) {
      storage.delete('@Defi5_ValidatedDays');
      storage.delete('@Defi5_LastUpdate');
      storage.delete('@Defi5_StartedAt');
      storage.delete('@Defi5_OnBoardingDoneState');
      setValidateDays(0);
    } else {
      storage.set('@Defi5_ValidatedDays', day);
      setValidateDays(day);
    }
    setLastUpdate('UNLOCK');
  };

  useFocusEffect(() => {
    getValidatedDays();
  });

  const nextDayIsUnlocked = lastUpdate !== new Date().toISOString().split('T')[0];
  const activeDayIndex = validatedDays - (nextDayIsUnlocked ? 0 : 1);

  return (
    <Defi
      navigation={navigation}
      title="Je fais le point au bout de 4 semaines en 7 jours"
      data={defi5_Data}
      defiNumber={5}
      validatedDays={validatedDays}
      activeDayIndex={activeDayIndex}
      hackAndUnlockDay={hackAndUnlockDay}
      defiStorageKey="@Defi5"
    />
  );
};

export default Defi5_Navigator;
