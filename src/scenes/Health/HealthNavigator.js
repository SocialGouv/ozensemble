import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactForm from './ContactForm';
import Doctolib from './Doctolib';
import Conseils from './Conseils';
import ToSayNo from './Conseil/ToSayNo';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import ToHelpMeReduce from './Conseil/ToHelpMeReduce';
import DidYouKnow from './Conseil/DidYouKnow';

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
    <HealthStack.Screen name="TO_SAY_NO" component={ToSayNo} />
    <HealthStack.Screen name="TO_HELP_ME_REDUCE" component={ToHelpMeReduce} />
    <HealthStack.Screen name="DID_YOU_KNOW" component={DidYouKnow} />
  </HealthStack.Navigator>
);

export default Health;
