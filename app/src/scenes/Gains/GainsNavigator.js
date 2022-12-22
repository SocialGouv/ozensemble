import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import GainsPreviousConsumption from './GainsPreviousConsumption';
import Goal from './Goal';
import MyGains from './MyGains';
import Sevrage from './Sevrage';
import GainsReminder from './GainsReminder';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import GainsFromStartModale from './GainsFromStartModale';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
  useToggleCTA({
    routesToHideCTA: ['GAINS_MY_OBJECTIVE', 'GAINS_REMINDER', 'GAINS_ESTIMATE_PREVIOUS_CONSUMPTION', 'GAINS_SEVRAGE'],
    navigator: 'Gains',
  });

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <GainsStack.Navigator headerMode="none" initialRouteName="GAINS_MAIN_VIEW">
        <GainsStack.Screen name="GAINS_MAIN_VIEW" component={MyGains} />
        <GainsStack.Screen name="GAINS_MY_OBJECTIVE" component={Goal} />
        <GainsStack.Screen name="GAINS_REMINDER" component={GainsReminder} />
        <GainsStack.Screen name="GAINS_ESTIMATE_PREVIOUS_CONSUMPTION" component={GainsPreviousConsumption} />
        <GainsStack.Screen
          name="GAINS_SEVRAGE"
          component={Sevrage}
          initialParams={{
            rootRoute: 'GAINS_MAIN_VIEW',
          }}
        />
        <GainsStack.Screen name="GAINS_FROM_START_MODALE" component={GainsFromStartModale} />
      </GainsStack.Navigator>
    </Background>
  );
};

export default GainsNavigator;
