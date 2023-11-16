import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import HeaderBackground from '../../components/HeaderBackground';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import AlcoholAndHealthRisks from '../Health/Articles/AlcoholAndHealthRisks';
import Feed from './Feed';
import { logEvent } from '../../services/logEventsWithMatomo';

const ConsoFollowUpStack = createStackNavigator();
const ConsoFollowUpNavigator = () => {
  useToggleCTA({ navigator: 'Consos' });
  useEffect(() => {
    logEvent({
      category: 'APP',
      action: 'APP_OPEN_IN_GAIN_VIEW',
    });
  }, []);
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ConsoFollowUpStack.Navigator headerMode="none" initialRouteName="CONSO_FOLLOW_UP">
        <ConsoFollowUpStack.Screen name="CONSO_FOLLOW_UP" component={Feed} />
        <ConsoFollowUpStack.Screen
          name="ONBOARDING_QUIZZ"
          component={QuizzOnboarding}
          initialParams={{ root: 'CONSO_FOLLOW_UP' }}
        />
        <ConsoFollowUpStack.Screen name="ALCOHOL_AND_HEALTH_RISKS" component={AlcoholAndHealthRisks} />
      </ConsoFollowUpStack.Navigator>
    </Background>
  );
};

export default ConsoFollowUpNavigator;
