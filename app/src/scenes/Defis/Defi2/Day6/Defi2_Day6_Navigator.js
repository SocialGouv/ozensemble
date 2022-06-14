import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { setValidatedDays } from '../../utils';
import Defi2_Day6_OnBoarding from './Defi2_Day6_OnBoarding';
import Defi2_Day6 from './Defi2_Day6';

const Defi2Day6Stack = createStackNavigator();

const Defi2_Day6_Navigator = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <Defi2Day6Stack.Navigator headerMode="none" initialRouteName={'DEFI2_DAY6_ONBOARDING'}>
      <Defi2Day6Stack.Screen name="DEFI2_DAY6_ONBOARDING" component={Defi2_Day6_OnBoarding} />
      <Defi2Day6Stack.Screen name="DEFI2_DAY6" component={Defi2_Day6} />
    </Defi2Day6Stack.Navigator>
  );
};

export default Defi2_Day6_Navigator;
