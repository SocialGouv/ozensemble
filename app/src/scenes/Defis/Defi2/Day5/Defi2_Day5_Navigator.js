import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { setValidatedDays } from '../../utils';
import Defi2_Day5_OnBoarding from './Defi2_Day5_OnBoarding';
import Defi2_Day5 from './Defi2_Day5';

const Defi2Day5Stack = createStackNavigator();

const Defi2_Day5_Navigator = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <Defi2Day5Stack.Navigator headerMode="none" initialRouteName={'DEFI2_DAY5_ONBOARDING'}>
      <Defi2Day5Stack.Screen name="DEFI2_DAY5_ONBOARDING" component={Defi2_Day5_OnBoarding} />
      <Defi2Day5Stack.Screen name="DEFI2_DAY5" component={Defi2_Day5} />
    </Defi2Day5Stack.Navigator>
  );
};

export default Defi2_Day5_Navigator;
