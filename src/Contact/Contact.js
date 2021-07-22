import React from 'react';
import ContactForm from './ContactForm';
import { createStackNavigator } from '@react-navigation/stack';
import DoctoLib from './DoctoLib';

const ContactStack = createStackNavigator();
const Contact = () => (
  <ContactStack.Navigator headerMode="none" initialRouteName="CONTACT_INTRO" mode="modal">
    <ContactStack.Screen name="CONTACT_INTRO" component={ContactForm} />
    <ContactStack.Screen name="DOCTOLIB" component={DoctoLib} />
  </ContactStack.Navigator>
);

export default Contact;
