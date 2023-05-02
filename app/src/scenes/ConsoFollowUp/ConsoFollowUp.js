import React, { useMemo, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { findNodeHandle, View, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import OnBoardingModal from '../../components/OnBoardingModal';
import styled, { css } from 'styled-components';
import { defaultPaddingFontScale } from '../../styles/theme';

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
import { ScrollView } from 'react-native-gesture-handler';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useNavigation } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import CheckDefisValidated from '../../components/illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from '../../components/illustrations/icons/CrossDefisFailed';
import LegendStar from '../../components/illustrations/icons/LegendStar';
import LegendInfos from '../../components/illustrations/icons/LegendInfos';

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
  const navigation = useNavigation();
  const [dateToScroll, setDateToScroll] = useState(null);
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const navigateToFirstStep = () => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  };
  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );
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
      setDateToScroll(null);
    }, 250);
  };
  return (
    <ScrollView className="bg-white">
      <GainsCalendar isOnboarded={isOnboarded} setShowOnboardingGainModal={setShowOnboardingGainModal} />
      <View
        className="flex flex-row justify-start mt-3 bg-[#FAFAFA]"
        style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <View>
          <View className="flex flex-row items-center space-x-1">
            <TextStyled color={'#939EA6'} className="text-xs">
              Consommations jour
            </TextStyled>
            <LegendInfos />
          </View>
          <View className="flex flex-row space-x-1 items-center">
            <LegendStar />
            <Text className="text-xs">Pas bu</Text>
          </View>
          <PartDescription value={"Dans l'objectif"} color={'#34D39A'} />
          <PartDescription value={"Au dessus de l'objectif"} color={'#FF7878'} />
        </View>
        <View className="mx-auto">
          <View className="flex flex-row items-center space-x-1">
            <TextStyled color={'#939EA6'} className="text-xs">
              Objectif semaine
            </TextStyled>
            <LegendInfos />
          </View>
          <View className="flex flex-row items-center space-x-2 my-1 ">
            <CheckDefisValidated />
            <Text className="text-xs">Réussi</Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <CrossDefisFailed />
            <Text className="text-xs">Dépassé</Text>
          </View>
        </View>
      </View>
      <FeedAddConsoTodayContainer zIndex={10}>
        {!!showWelcomeMessage && <NoDrinkTodayButton timestamp={Date.now()} content="Je n'ai rien bu aujourd'hui !" />}
      </FeedAddConsoTodayContainer>
      <Feed hideFeed={showWelcomeMessage} scrollToInput={scrollToInput} dateToScroll={dateToScroll} />
      <OnBoardingModal
        title="Sans objectif, pas de gains"
        description="En 3 étapes, je peux me fixer un objectif pour réduire ma consommation d'alcool."
        boutonTitle="Je me fixe un objectif"
        onPress={navigateToFirstStep}
        visible={showOnboardingGainModal}
        hide={() => {
          setShowOnboardingGainModal(false);
        }}
      />
    </ScrollView>
  );
};

const FeedAddConsoTodayContainer = styled.View`
  align-items: center;
`;
const PartDescription = ({ color, value, dashed }) => (
  <View className="flex flex-row items-center">
    <Dot color={color} dashed={dashed} />
    <TextStyled className="text-xs">{value}</TextStyled>
  </View>
);

const dotSize = 20;

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: 7px;
  margin-right: 5px;
  margin-bottom: 2px;
  margin-top: 2px;
  overflow: hidden;
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  margin-left: 1px
  background-color: ${({ color }) => color};
  ${(props) => props.dashed && 'border-style: dashed;'}
  ${(props) => props.dashed && 'border-width: 1px;'}
`;
