import React, { useMemo, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { findNodeHandle } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Feed from './Feed';
import { NoDrinkTodayButton } from './NoConsoYetFeedDisplay';
import { drinksState } from '../../recoil/consos';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import HeaderBackground from '../../components/HeaderBackground';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import AlcoholAndHealthRisks from '../Health/Articles/AlcoholAndHealthRisks';
import GainsCalendar from '../Gains/GainsCalendar';
import { maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import { defaultPaddingFontScale } from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

const ConsoFollowUpStack = createStackNavigator();
const ConsoFollowUpNavigator = () => {
  useToggleCTA({ navigator: 'Consos' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ConsoFollowUpStack.Navigator headerMode="none" initialRouteName="CONSO_FOLLOW_UP">
        <ConsoFollowUpStack.Screen name="CONSO_FOLLOW_UP" component={ConsoFollowUp} />
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

const ConsoFollowUp = () => {
  const showWelcomeMessage = !useRecoilValue(drinksState)?.length;
  const scrollViewRef = useRef(null);
  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);

  const scrollToInput = (ref) => {
    if (!ref) return;
    if (!scrollViewRef.current) return;
    setTimeout(() => {
      ref.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
        },
        (error) => console.log('error scrolling', error)
      );
    }, 250);
  };
  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );
  return (
    <ScrollView style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <GainsCalendar isOnboarded={isOnboarded} setShowOnboardingGainModal={setShowOnboardingGainModal} />
      <FeedAddConsoTodayContainer zIndex={10}>
        {!!showWelcomeMessage && <NoDrinkTodayButton timestamp={Date.now()} content="Je n'ai rien bu aujourd'hui !" />}
      </FeedAddConsoTodayContainer>
      <Feed hideFeed={showWelcomeMessage} scrollToInput={scrollToInput} />
    </ScrollView>
  );
};

const FeedAddConsoTodayContainer = styled.View`
  align-items: center;
`;
