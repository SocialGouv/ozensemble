import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefisMenu from './DefisMenu';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import Defi1_Navigator from './Defi1/Defi1_Navigator';
import Defi2_Navigator from './Defi2/Defi2_Navigator';
import QuizzsNavigator from '../Quizzs/QuizzsNavigator';
import Result from '../Quizzs/QuizzOnboarding/ResultsOnboarding/Result';

const DefisStack = createStackNavigator();

const DefisNavigator = () => (
  <Background color="#39cec0" withSwiperContainer>
    <HeaderBackground />
    <DefisStack.Navigator headerMode="none" initialRouteName="DEFIS_MENU">
      <DefisStack.Screen
        name="ONBOARDING_QUIZZ"
        component={QuizzOnboarding}
        initialParams={{
          root: 'DEFIS',
        }}
      />
      <DefisStack.Screen name="ONBOARDING_QUIZZ_RESULT" component={Result} />
      <DefisStack.Screen name="DEFIS_MENU" component={DefisMenu} />
      <DefisStack.Screen name="DEFI1" component={Defi1_Navigator} />
      <DefisStack.Screen name="DEFI2" component={Defi2_Navigator} />
      <DefisStack.Screen name="TESTS_DEFIS" component={QuizzsNavigator} />
    </DefisStack.Navigator>
  </Background>
);

export default DefisNavigator;
