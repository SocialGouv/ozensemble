import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import CountConsumptiom from './CountConsumption';
import Estimation from './Estimation';
import Goal from './Goal';
import MyGains from './MyGains';
import Reminder from '../Infos/Reminder';
import Sevrage from './Sevrage';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const initNavigator = async () => {
    return setInitialScreen('GAINS_MAIN_VIEW');
  };
  useEffect(() => {
    initNavigator();
  }, []);
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      {!!initialScreen && (
        <GainsStack.Navigator headerMode="none" initialRouteName={initialScreen}>
          <GainsStack.Screen name="GAINS_MAIN_VIEW" component={MyGains} />
          <GainsStack.Screen name="GAINS_MY_OBJECTIVE" component={Goal} />
          <GainsStack.Screen name="GAINS_REMINDER" component={Reminder} />
          <GainsStack.Screen name="GAINS_HELP_HOW_TO_COUNT" component={CountConsumptiom} />
          <GainsStack.Screen name="GAINS_ESTIMATE_PREVIOUS_CONSUMPTION" component={Estimation} />
          <GainsStack.Screen name="GAINS_SEVRAGE" component={Sevrage} />
        </GainsStack.Navigator>
      )}
    </Background>
  );
};

export default GainsNavigator;
