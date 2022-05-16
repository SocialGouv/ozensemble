import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactForm from './ContactForm';
import DoctoLib from './DoctoLib';
import Conseils from './Conseils';
import ToSayNo from './ToSayNo';

const HealthStack = createStackNavigator();
const Health = () => (
  <HealthStack.Navigator headerMode="none" initialRouteName="CONSEILS" mode="modal">
    <HealthStack.Screen name="CONTACT_TAB" component={ContactForm} />
    <HealthStack.Screen name="DOCTOLIB" component={DoctoLib} />
    <HealthStack.Screen name="CONSEILS" component={Conseils} />
    <HealthStack.Screen name="TO_SAY_NO" component={ToSayNo} />
  </HealthStack.Navigator>
);

export default Health;
