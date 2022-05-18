import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import Estimation from './Estimation';
import Goal from './Goal';
import MyGains from './MyGains';
import Reminder from '../Infos/Reminder';
import Sevrage from './Sevrage';
import { getFocusedRouteNameFromRoute, useIsFocused, useRoute } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { showCTAButtonState } from '../AddDrink/AddDrinkCTAButton';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);

  const route = useRoute();
  const focusedRoute = getFocusedRouteNameFromRoute(route);
  const isFocused = useIsFocused();
  const [showCTAButton, setShowCTAButton] = useRecoilState(showCTAButtonState);

  const initNavigator = async () => {
    return setInitialScreen('GAINS_MAIN_VIEW');
  };
  useEffect(() => {
    initNavigator();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      if (!showCTAButton) setShowCTAButton(true);
    } else {
      if (
        ['GAINS_MY_OBJECTIVE', 'GAINS_REMINDER', 'GAINS_ESTIMATE_PREVIOUS_CONSUMPTION', 'GAINS_SEVRAGE'].includes(
          focusedRoute
        )
      ) {
        if (showCTAButton) setShowCTAButton(false);
      } else {
        if (!showCTAButton) setShowCTAButton(true);
      }
    }
  }, [showCTAButton, focusedRoute, setShowCTAButton, isFocused]);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      {!!initialScreen && (
        <GainsStack.Navigator headerMode="none" initialRouteName={initialScreen}>
          <GainsStack.Screen name="GAINS_MAIN_VIEW" component={MyGains} />
          <GainsStack.Screen name="GAINS_MY_OBJECTIVE" component={Goal} />
          <GainsStack.Screen name="GAINS_REMINDER" component={Reminder} />
          <GainsStack.Screen name="GAINS_ESTIMATE_PREVIOUS_CONSUMPTION" component={Estimation} />
          <GainsStack.Screen name="GAINS_SEVRAGE" component={Sevrage} />
        </GainsStack.Navigator>
      )}
    </Background>
  );
};

export default GainsNavigator;
