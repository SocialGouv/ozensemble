import React, { useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { findNodeHandle, TouchableOpacity, View, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import OnBoardingModal from '../../components/OnBoardingModal';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import HeaderBackground from '../../components/HeaderBackground';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import AlcoholAndHealthRisks from '../Health/Articles/AlcoholAndHealthRisks';
import { ScrollView } from 'react-native-gesture-handler';
import { logEvent } from '../../services/logEventsWithMatomo';
import LegendHelpModal from './LegendHelpModal';
import { isOnboardedSelector } from '../../recoil/gains';
import Feed from './Feed';
import { defaultPaddingFontScale } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import LegendStar from '../../components/illustrations/icons/LegendStar';
import ButtonPrimary from '../../components/ButtonPrimary';
import LegendInfos from '../../components/illustrations/icons/LegendInfos';
import CheckDefisValidated from '../../components/illustrations/icons/CheckDefisValidated';
import CrossDefisFailed from '../../components/illustrations/icons/CrossDefisFailed';
import OnGoingGoal from '../../components/illustrations/icons/OnGoingGoal';
import GainsCalendar from '../Gains/GainsCalendar';

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
  const now = Date.now();
  const scrollViewRef = useRef(null);
  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const navigation = useNavigation();
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [dateToScroll, setDateToScroll] = useState(null);

  const navigateToFirstStep = () => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  };

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

  const isOnboarded = useRecoilValue(isOnboardedSelector);

  return (
    <ScrollView ref={scrollViewRef} className="bg-white">
      <GainsCalendar
        isOnboarded={isOnboarded}
        setShowOnboardingGainModal={setShowOnboardingGainModal}
        setDateToScroll={setDateToScroll}
        onLegendClick={setHelpModalVisible}
      />
      <TouchableOpacity
        onPress={() => {
          setHelpModalVisible(true);
        }}
        disabled={!isOnboarded}
        className="flex flex-row justify-start mt-3 mb-3 bg-[#FAFAFA]"
        style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <View className="mt-2 mb-4">
          <View className="flex flex-row items-center space-x-1 mb-1">
            <TextStyled color={'#939EA6'} className="text-xs">
              Consommations jour
            </TextStyled>
            {isOnboarded && <LegendInfos />}
          </View>
          <View className="flex flex-row space-x-1 items-center">
            <LegendStar />
            <Text className="text-xs">Pas bu</Text>
          </View>
          {isOnboarded ? (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#34D39A] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Dans l'objectif</Text>
              </View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Au dessus de l'objectif</Text>
              </View>
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center">
                <View className="bg-[#FF7878] w-5 h-5 rounded-md mt-1 mr-1" />
                <Text className="text-xs mt-1">Bu</Text>
              </View>
            </View>
          )}
        </View>
        <View className="mx-auto mt-2 mb-4">
          <View className="flex flex-row items-center space-x-1 mb-1 justify-center">
            <TextStyled color={'#939EA6'} className="text-xs">
              Objectif semaine
            </TextStyled>
            {isOnboarded && <LegendInfos />}
          </View>
          {isOnboarded ? (
            <View>
              <View className="flex flex-row items-center space-x-2 my-1 ">
                <CheckDefisValidated />
                <Text className="text-xs">Réussi</Text>
              </View>
              <View className="flex flex-row items-center space-x-2 mb-1">
                <CrossDefisFailed />
                <Text className="text-xs">Dépassé</Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <OnGoingGoal />
                <Text className="text-xs">En cours</Text>
              </View>
            </View>
          ) : (
            <View className="mt-2">
              <ButtonPrimary content={'Me fixer un objectif'} small onPress={navigateToFirstStep} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Feed scrollToInput={scrollToInput} dateToScroll={dateToScroll} />
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
      <LegendHelpModal
        visible={helpModalVisible}
        hide={() => {
          setHelpModalVisible(false);
        }}
      />
    </ScrollView>
  );
};
