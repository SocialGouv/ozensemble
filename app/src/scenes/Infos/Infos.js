import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components';
import appJson from '../../../app.json';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import CGUs from './CGUs';
import Export from './Export';
import PrivacyPolicy from './PrivacyPolicy';
import WrapperContainer from '../../components/WrapperContainer';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import FakeData from '../../reference/mocks/FakeData';
import { shareApp } from '../../services/shareApp';
import MentionsLegales from './MentionsLegales';
import ArrowRight from '../../components/ArrowRight';
import PreviousConsumption from '../../components/illustrations/icons/PreviousConsumption';
import GoalSetup from '../../components/illustrations/icons/GoalSetup';
import ReminderIcon from '../../components/illustrations/icons/ReminderIcon';
import ExportDataIcon from '../../components/illustrations/icons/ExportDataIcon';
import ShareAppIcon from '../../components/illustrations/icons/ShareAppIcon';
import RateAppIcon from '../../components/illustrations/icons/RateAppIcon';
import GiveFeedbackIcon from '../../components/illustrations/icons/GiveFeedbackIcon';
import FilesIcon from '../../components/illustrations/icons/FilesIcon';
import InAppReview from 'react-native-in-app-review';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useRecoilValue } from 'recoil';
import { maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';

const InfosStack = createStackNavigator();

const Infos = () => {
  useToggleCTA({ navigator: 'Infos' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <InfosStack.Navigator initialRouteName="INFOS_MENU" headerMode="none">
        <InfosStack.Screen name="INFOS_MENU" component={InfosMenu} />
        <InfosStack.Screen name="CGU">{({ navigation }) => <CGUs onClose={navigation.goBack} />}</InfosStack.Screen>
        <InfosStack.Screen name="MENTIONS_LEGALES">
          {({ navigation }) => <MentionsLegales onClose={navigation.goBack} />}
        </InfosStack.Screen>
        <InfosStack.Screen name="PRIVACY_POLICY">
          {({ navigation }) => <PrivacyPolicy onClose={navigation.goBack} />}
        </InfosStack.Screen>
        <InfosStack.Screen name="EXPORT" component={Export} />
        <InfosStack.Screen name="FAKE_DATA" component={FakeData} />
      </InfosStack.Navigator>
    </Background>
  );
};

const InfosMenu = ({ navigation }) => {
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );
  const [debugPressed, setDebugPressed] = useState(0);
  useEffect(() => {
    if (debugPressed >= (__DEV__ ? 2 : 8)) navigation.navigate('FAKE_DATA');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugPressed]);

  return (
    <WrapperContainer title="Informations">
      <View>
        <Text className="text-[#4030a5] font-bold mb-4">NOUS AIDER</Text>
        <View className="border border-[#DDDDDD] rounded-lg p-4 ">
          <MenuItem
            caption={"Partager l'application"}
            Icon={ShareAppIcon}
            onPress={() => {
              logEvent({
                category: 'SHARE_APP',
                action: 'PRESSED_FROM_INFOS',
              });
              shareApp();
            }}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4 border-"></View>
          <MenuItem
            caption={'Donner mon avis'}
            Icon={GiveFeedbackIcon}
            onPress={() => {
              logEvent({
                category: 'NPS',
                action: 'NPS_OPEN_FROM_INFOS',
              });
              navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Infos' });
            }}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4"></View>
          <MenuItem
            caption={'Noter 5 étoiles'}
            Icon={RateAppIcon}
            onPress={() => {
              if (InAppReview.isAvailable()) {
                logEvent({
                  category: 'RATE_APP',
                  action: 'OPEN_FROM_INFOS',
                });
                InAppReview.RequestInAppReview();
              }
            }}
          />
        </View>

        <Text className="text-[#4030a5] font-bold mb-4 mt-8">MES PARAMÈTRES</Text>
        <View className="border border-[#DDDDDD] rounded-lg p-4 ">
          <MenuItem
            caption={'Mon estimation initiale'}
            Icon={PreviousConsumption}
            onPress={() => navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION')}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4 border-"></View>
          <MenuItem
            caption={'Mon objectif par semaine'}
            Icon={GoalSetup}
            onPress={() => {
              logEvent({
                category: 'GAINS',
                action: 'GOAL_OPEN',
                name: 'INFOS',
              });
              if (isOnboarded) {
                navigation.navigate('GAINS_MY_OBJECTIVE');
              } else {
                navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
              }
            }}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4"></View>
          <MenuItem
            caption={'Mon rappel'}
            Icon={ReminderIcon}
            onPress={() => {
              logEvent({
                category: 'REMINDER',
                action: 'REMINDER_OPEN',
                name: 'INFOS',
              });
              if (isOnboarded) {
                navigation.navigate('GAINS_REMINDER', {
                  enableContinueButton: true,
                  onPressContinueNavigation: ['GAINS_MAIN_VIEW'],
                });
              } else {
                logEvent({
                  category: 'GAINS',
                  action: 'GOAL_OPEN',
                  name: 'INFOS',
                });
                navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
              }
            }}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4"></View>
          <MenuItem
            caption={'Exporter mes consommations'}
            Icon={ExportDataIcon}
            onPress={() => {
              logEvent({
                category: 'GAINS',
                action: 'GOAL_OPEN',
              });
              navigation.push('EXPORT');
            }}
          />
        </View>
        <Text className="text-[#4030a5] font-bold mb-4 mt-8">INFORMATIONS</Text>
        <View className="border border-[#DDDDDD] rounded-lg p-4 ">
          <MenuItem
            caption={"Conditions générales d'utilisation"}
            Icon={FilesIcon}
            onPress={() => navigation.push('CGU')}
          />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4 border-"></View>
          <MenuItem caption={'Mentions Légales'} Icon={FilesIcon} onPress={() => navigation.push('MENTIONS_LEGALES')} />
          <View className="w-full border border-[#E8E8EA] mt-4 mb-4"></View>
          <MenuItem
            caption={'Politique de confidentialité'}
            Icon={FilesIcon}
            onPress={() => navigation.push('PRIVACY_POLICY')}
          />
        </View>
        <View className="mt-7 flex items-center">
          <TouchableWithoutFeedback onPress={() => setDebugPressed((p) => p + 1)}>
            <VersionLabel>
              version {appJson.version.buildName} ({appJson.version.buildNumber})
            </VersionLabel>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </WrapperContainer>
  );
};

const MenuItem = ({ caption, onPress, Icon, disabled }) => (
  <TouchableOpacity onPress={onPress} showArrow={false} disabled={disabled}>
    <View className="flex flex-row justify-between items-center flex-wrap ">
      <View className="flex flex-row space-x-1">
        <Icon size={30} />
        <View>
          <Text className="text-[#4030a5] font-semibold mt-2 ">{caption}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-end grow">
        <ArrowRight size={15} color="#4030a5" />
      </View>
    </View>
  </TouchableOpacity>
);

export default Infos;

const VersionLabel = styled(TextStyled)`
  color: #ddd;
`;

const Arrow = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;
