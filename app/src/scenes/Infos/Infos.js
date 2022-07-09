import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import pck from '../../../package.json';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale } from '../../styles/theme';
import NPS from '../NPS/NPS';
import CGUs from './CGUs';
import Export from './Export';
import PrivacyPolicy from './PrivacyPolicy';
import Defi1_Reminder from '../Defis/Defi1/Defi1_Reminder';
import { storage } from '../../services/storage';
import GainsReminder from '../Gains/GainsReminder';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';

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
      </InfosStack.Navigator>
    </Background>
  );
};

const InfosMenu = ({ navigation }) => {
  const [NPSvisible, setNPSvisible] = useState(false);
  const onPressContribute = () => setNPSvisible(true);
  const closeNPS = () => setNPSvisible(false);

  const isWithinDefi1 =
    storage.getString('@Defi1_StartedAt')?.length && storage.getString('@Defi1_ValidatedDays') !== 6;
  const reminderCaption = isWithinDefi1 ? 'Rappel de mon défi 7 jours' : 'Rappel de mon suivi de consommations';

  return (
    <>
      <NPS forceView={NPSvisible} close={closeNPS} />
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
          <MenuItem caption="Mon avis sur l'application" onPress={onPressContribute} />
          <VersionContainer>
            <VersionLabel>version {pck.version}</VersionLabel>
          </VersionContainer>
        </Container>
      </WrapperContainer>
    </>
  );
};

const MenuItem = ({ caption, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MenuItemStyled>
      <Text>{caption}</Text>
      <Arrow>{'>'}</Arrow>
    </MenuItemStyled>
  </TouchableOpacity>
);

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

const Arrow = styled.Text`
  color: #4030a5;
  font-weight: bold;
`;
