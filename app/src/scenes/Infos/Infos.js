import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, TouchableWithoutFeedback, Share, Platform } from 'react-native';
import styled from 'styled-components';
import pck from '../../../package.json';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale } from '../../styles/theme';
import CGUs from './CGUs';
import Export from './Export';
import PrivacyPolicy from './PrivacyPolicy';
import Defi1_Reminder from '../Defis/Defi1/Defi1_Reminder';
import { storage } from '../../services/storage';
import GainsReminder from '../Gains/GainsReminder';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';
import FakeData from '../../reference/mocks/FakeData';
import { capture } from '../../services/sentry';

const InfosStack = createStackNavigator();

const Infos = () => {
  useToggleCTA({ navigator: 'Infos' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <InfosStack.Navigator initialRouteName="INFOS_MENU" headerMode="none">
        <InfosStack.Screen name="INFOS_MENU" component={InfosMenu} />
        <InfosStack.Screen name="DEFI1_REMINDER" component={Defi1_Reminder} />
        <InfosStack.Screen name="GAINS_REMINDER" component={GainsReminder} />
        <InfosStack.Screen name="CGU">{({ navigation }) => <CGUs onClose={navigation.goBack} />}</InfosStack.Screen>
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
  const isWithinDefi1 =
    storage.getString('@Defi1_StartedAt')?.length && storage.getString('@Defi1_ValidatedDays') !== 6;
  const reminderCaption = isWithinDefi1 ? 'Rappel de mon défi 7 jours' : 'Rappel de mon suivi de consommations';

  const [debugPressed, setDebugPressed] = useState(0);
  useEffect(() => {
    if (debugPressed >= (__DEV__ ? 2 : 8)) navigation.navigate('FAKE_DATA');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugPressed]);

  return (
    <WrapperContainer title="Mes Informations">
      <Container>
        <MenuItem
          caption={reminderCaption}
          onPress={() => {
            logEvent({
              category: 'REMINDER',
              action: 'REMINDER_OPEN',
              name: isWithinDefi1 ? 'DEFI1' : 'GAIN',
            });
            navigation.push(isWithinDefi1 ? 'DEFI1_REMINDER' : 'GAINS_REMINDER');
          }}
        />
        <MenuItem caption="Conditions Générales d'Utilisation" onPress={() => navigation.push('CGU')} />
        <MenuItem
          caption="Mentions Légales & Politique de Confidentialité"
          onPress={() => navigation.push('PRIVACY_POLICY')}
        />
        <MenuItem caption="Exporter mes données" onPress={() => navigation.push('EXPORT')} />
        <MenuItem
          caption="Mon avis sur l'application"
          onPress={() => navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Infos' })}
        />
        <MenuItem caption="Partager l’application à mes proches" onPress={() => shareApp()} showArrow={false} />
        <VersionContainer>
          <TouchableWithoutFeedback onPress={() => setDebugPressed((p) => p + 1)}>
            <VersionLabel>version {pck.version}</VersionLabel>
          </TouchableWithoutFeedback>
        </VersionContainer>
      </Container>
    </WrapperContainer>
  );
};

const MenuItem = ({ caption, onPress, showArrow = true }) => (
  <TouchableOpacity onPress={onPress}>
    <MenuItemStyled>
      <Text>{caption}</Text>
      {showArrow && <Arrow>{'>'}</Arrow>}
    </MenuItemStyled>
  </TouchableOpacity>
);

const shareApp = async () => {
  const url = 'https://ozensemble.fr/';
  try {
    logEvent({
      category: 'SHARE_APP',
      action: 'PRESSED',
    });

    const result = await Share.share({
      message:
        `Bonjour, je te recommande l’application gratuite et totalement anonyme Oz Ensemble qui aide à maitriser sa consommation d’alcool. Bonne découverte !` +
        (Platform.OS === 'android' ? '\n' + url : ''),
      url: Platform.OS === 'ios' && url,
    });
    if (result?.action === Share.sharedAction) {
      if (result?.activityType) {
        logEvent({
          category: 'SHARE_APP',
          action: 'SHARED',
          name: result?.activityType,
        });
      } else {
        logEvent({
          category: 'SHARE_APP',
          action: 'SHARED',
        });
      }
    } else if (result.action === Share.dismissedAction) {
      logEvent({
        category: 'SHARE_APP',
        action: 'DISMISSED',
      });
    }
  } catch (error) {
    capture('share app failure ' + error);
    logEvent({
      category: 'SHARE_APP',
      action: 'ERROR',
    });
  }
};

export default Infos;

const Container = styled.View`
  margin-horizontal: -${defaultPaddingFontScale}px;
`;

const VersionContainer = styled.View`
  margin-top: 30px;
  flex: 1;
  align-items: center;
`;
const VersionLabel = styled(TextStyled)`
  color: #ddd;
`;

const MenuItemStyled = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #4030a522;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const Arrow = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;
