import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import CountConsumptiom from './CountConsumption';
import Estimation from './Estimation';
import Goal from './Goal';
import MyGains from './MyGains';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const initNavigator = async () => {
    return setInitialScreen('GAINS');
  };
  useEffect(() => {
    initNavigator();
  }, []);
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      {!!initialScreen && (
        <GainsStack.Navigator headerMode="none" initialRouteName={initialScreen}>
          <GainsStack.Screen name="GAINS" component={MyGains} />
          <GainsStack.Screen name="GOAL" component={Goal} />
          <GainsStack.Screen name="HOWCOUNT" component={CountConsumptiom} />
          <GainsStack.Screen name="ESTIMATION" component={Estimation} />
        </GainsStack.Navigator>
      )}
    </Background>
  );
};

export default GainsNavigator;
