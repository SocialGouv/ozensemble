import React from 'react';
import ContactForm from './ContactForm';
import { createStackNavigator } from '@react-navigation/stack';
import DoctoLib from './DoctoLib';

const ContactStack = createStackNavigator();
const Contact = () => (
  <ContactStack.Navigator headerMode="none" initialRouteName="CONTACT_TAB" mode="modal">
    <ContactStack.Screen name="CONTACT_TAB" component={ContactForm} />
    <ContactStack.Screen name="DOCTOLIB" component={DoctoLib} />
  </ContactStack.Navigator>
);

export default Contact;
