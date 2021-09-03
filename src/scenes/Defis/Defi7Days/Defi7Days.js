import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Day1 from './Day1';
import { createStackNavigator } from '@react-navigation/stack';
import Defi from '../Defi';
// import QuizzEvaluateConsommation from '../../Quizzs/QuizzEvaluateConsommation';
import { defi7DaysData } from './defi7DaysData';
import Background from '../../../components/Background';
import HeaderBackground from '../../../components/HeaderBackground';

const Defi7DaysStack = createStackNavigator();

const Defi7DaysNavigator = () => (
  <Background color="#39cec0" withSwiperContainer>
    <HeaderBackground />

    <Defi7DaysStack.Navigator headerMode="none" initialRouteName="MENU">
      <Defi7DaysStack.Screen name="MENU" component={Defi7DaysMenu} />
      <Defi7DaysStack.Screen name="DAY_1" component={Day1} />
      {/* <Defi7DaysStack.Screen name="DAY_2">{(props) => <QuizzEvaluateConsommation {...props} />}</Defi7DaysStack.Screen> */}
      <Defi7DaysStack.Screen name="DAY_3" component={Day1} />
      <Defi7DaysStack.Screen name="DAY_4" component={Day1} />
      <Defi7DaysStack.Screen name="DAY_5" component={Day1} />
      <Defi7DaysStack.Screen name="DAY_6" component={Day1} />
      <Defi7DaysStack.Screen name="DAY_7" component={Day1} />
    </Defi7DaysStack.Navigator>
  </Background>
);

const Defi7DaysMenu = ({ navigation }) => {
  const [validatedDays, setValidateDays] = useState(0);

  const getValidatedDays = async () => {
    await AsyncStorage.setItem('DEFI_7_JOURS', `${1}`);
    const storedValidateDays = await AsyncStorage.getItem('DEFI_7_JOURS');
    if (storedValidateDays) setValidateDays(Number(storedValidateDays));
  };

  const updateValidatedDays = async (day) => {
    await new Promise((res) => setTimeout(res, 1000)); // better UX
    await AsyncStorage.setItem('DEFI_7_JOURS', `${day}`);
    // setValidateDays(day);
  };

  useEffect(() => {
    getValidatedDays();
  }, []);

  return (
    <Defi
      navigation={navigation}
      title="Faire le point sur 7 jours"
      data={defi7DaysData}
      validatedDays={validatedDays}
      updateValidatedDays={updateValidatedDays}
    />
  );
};

export default Defi7DaysNavigator;

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;
