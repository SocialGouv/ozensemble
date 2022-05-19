import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactForm from './ContactForm';
import Doctolib from './Doctolib';
import Conseils from './Conseils';
import ToSayNo from './ToSayNo';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';

const HealthStack = createStackNavigator();
const Health = () => (
  <HealthStack.Navigator headerMode="none" initialRouteName="HEALTH">
    <HealthStack.Screen
      name="ONBOARDING_QUIZZ"
      component={QuizzOnboarding}
      initialParams={{
        backToRoot: 'Retour à la rubrique santé',
        root: 'HEALTH',
      }}
    />
    <HealthStack.Screen name="HEALTH" component={Conseils} />
    <HealthStack.Screen name="CONTACT_TAB" component={ContactForm} />
    <HealthStack.Screen name="DOCTOLIB" component={Doctolib} />
    <HealthStack.Screen name="CONSEILS" component={Conseils} />
    <HealthStack.Screen name="TO_SAY_NO" component={ToSayNo} />
  </HealthStack.Navigator>
);

export default Health;
