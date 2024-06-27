import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import MyGains from './MyGains';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import GainsFromStartModale from './GainsFromStartModale';
import BadgesList from '../Badges/BadgesList';
import MyMotivations from './MyMotivations';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
  useToggleCTA({
    routesToHideCTA: ['GAINS_MY_OBJECTIVE', 'GAINS_REMINDER', 'GAINS_ESTIMATE_PREVIOUS_CONSUMPTION', 'GAINS_SEVRAGE'],
    navigator: 'Gains',
  });

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <GainsStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GAINS_MAIN_VIEW">
        <GainsStack.Screen name="GAINS_MAIN_VIEW" component={MyGains} />
        <GainsStack.Screen name="BADGES_LIST" component={BadgesList} />
        <GainsStack.Screen name="GAINS_FROM_START_MODALE" component={GainsFromStartModale} />
        <GainsStack.Screen name="MY_MOTIVATIONS" component={MyMotivations} />
      </GainsStack.Navigator>
    </Background>
  );
};

export default GainsNavigator;
