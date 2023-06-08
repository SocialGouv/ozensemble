import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { setValidatedDays } from '../../utils';
import { Screen1, Screen2, Screen3 } from './screens';
import Doctolib from '../../../Health/Doctolib';
import ContactForm from '../../../Health/ContactForm';

const Explicationstack = createStackNavigator();

const Defi3_Day4 = ({ route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi3) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused]);

  return (
    <Explicationstack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <Explicationstack.Screen name="SCREEN1">
        {({ navigation }) => <Screen1 navigation={navigation} />}
      </Explicationstack.Screen>
      <Explicationstack.Screen name="SCREEN2">
        {({ navigation }) => <Screen2 navigation={navigation} />}
      </Explicationstack.Screen>
      <Explicationstack.Screen name="SCREEN3">
        {({ navigation }) => <Screen3 navigation={navigation} />}
      </Explicationstack.Screen>
      <Explicationstack.Screen name="CONTACT" component={ContactForm} />
      <Explicationstack.Screen name="DOCTOLIB" component={Doctolib} />
    </Explicationstack.Navigator>
  );
};

export default Defi3_Day4;
