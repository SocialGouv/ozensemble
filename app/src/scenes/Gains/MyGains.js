import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { isOnboardedSelector } from '../../recoil/gains';
import OnBoardingModal from '../../components/OnBoardingModal';
import BadgesStatus from '../Badges/BadgesStatus';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { badgesState } from '../../recoil/badges';
import H2 from '../../components/H2';
import Diagram from '../ConsoFollowUp/Diagram';
import FollowUpConsos from '../../components/illustrations/icons/FollowUpConsos';
import GoalSetup from '../../components/illustrations/icons/GoalSetup';
import ArrowRight from '../../components/ArrowRight';
import IconAdd from '../../components/illustrations/IconAdd';

dayjs.extend(isBetween);

const MyGains = () => {
  const navigation = useNavigation();

  const badges = useRecoilValue(badgesState);
  const [selectedBar, setSelectedBar] = useState({});

  useEffect(() => {
    logEvent({
      category: 'APP',
      action: 'APP_OPEN_IN_GAIN_VIEW',
    });
  }, []);

  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const navigateToFirstStep = () => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  };
  const isOnboarded = useRecoilValue(isOnboardedSelector);

  const appOpenEvent = useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && !appOpenEvent.current) {
      appOpenEvent.current = true;
      const eventTimeout = setTimeout(() => {
        logEvent({
          action: 'GAINS_MAIN_VIEW',
          category: 'NAVIGATION',
        });
      }, 5000);
      return () => {
        clearTimeout(eventTimeout);
      };
    }
  }, [isFocused]);

  return (
    <>
      <WrapperContainer title={'Suivi'}>
        {!isOnboarded && (
          <View className="mb-8">
            <View className="flex flex-row space-x-1 items-center mb-3">
              <GoalSetup size={25} />
              <H2 color={'#4030a5'}>Estimation et Objectif semaine</H2>
            </View>
            <TouchableOpacity
              onPress={() => {
                logEvent({
                  category: 'GAINS',
                  action: 'TOOLTIP_GOAL',
                });
                navigateToFirstStep();
              }}
              className="flex flex-row items-center justify-around bg-[#E8E8F3] rounded-lg px-4 py-2 border border-[#4030a5]">
              <IconAdd size={35} color={'#4030a5'} />
              <Text className="mx-6">
                Estimez votre consommation <Text className="font-bold">actuelle</Text> et fixez-vous un{' '}
                <Text className="font-bold">objectif</Text> pour calculer vos gains dans le temps&nbsp;!
              </Text>
              <View>
                <ArrowRight color="#4030a5" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <>
          <View>
            <View className="flex flex-row space-x-1 items-center mb-3">
              <FollowUpConsos size={25} />
              <H2 color={'#4030a5'}>Suivi des consommations</H2>
            </View>
            <Diagram
              onShowHelp={() => {
                logEvent({
                  category: 'CONSO',
                  action: 'CONSO_OPEN_HELP',
                });
              }}
              selectedBar={selectedBar}
              setSelectedBar={setSelectedBar}
            />
          </View>
        </>

        <BadgesStatus
          isOnboarded={isOnboarded}
          userBadges={badges}
          navigate={() => navigation.navigate('BADGES_LIST')}
        />
      </WrapperContainer>
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
    </>
  );
};

export default MyGains;
