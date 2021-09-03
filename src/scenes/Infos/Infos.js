import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components';
import H1 from '../../components/H1';
import { defaultPadding } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import Reminder from './Reminder';
import Export from './Export';
import CGUs from './CGUs';
import PrivacyPolicy from './PrivacyPolicy';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import QuizzsNavigator from '../Quizzs/QuizzsNavigator';

const InfosStack = createStackNavigator();

const Infos = () => (
  <Background color="#39cec0" withSwiperContainer>
    <HeaderBackground />
    <InfosStack.Navigator headerMode="none">
      <InfosStack.Screen name="INFOS_TAB" component={InfosMenu} />
      <InfosStack.Screen name="REMINDER" component={Reminder} />
      <InfosStack.Screen name="CGU">{({ navigation }) => <CGUs onClose={navigation.goBack} />}</InfosStack.Screen>
      <InfosStack.Screen name="PRIVACY_POLICY">
        {({ navigation }) => <PrivacyPolicy onClose={navigation.goBack} />}
      </InfosStack.Screen>
      <InfosStack.Screen name="EXPORT" component={Export} />
      <InfosStack.Screen name="TESTS" component={QuizzsNavigator} />
    </InfosStack.Navigator>
  </Background>
);

const InfosMenu = ({ navigation }) => (
  <>
    <ScreenBgStyled>
      <TopTitle>
        <TextStyled color="#4030a5">Mes informations</TextStyled>
      </TopTitle>
      <MenuItem caption="Rappel" onPress={() => navigation.push('REMINDER')} />
      <MenuItem caption="Conditions Générales d'Utilisation" onPress={() => navigation.push('CGU')} />
      <MenuItem
        caption="Mentions Légales & Politique de Confidentialité"
        onPress={() => navigation.push('PRIVACY_POLICY')}
      />
      <MenuItem caption="Exporter mes données" onPress={() => navigation.push('EXPORT')} />
      {/* todo : open nps */}
      <MenuItem caption="Mon avis sur l'application" onPress={() => {}} />
      <MenuItem caption="Mes Tests " onPress={() => navigation.push('TESTS')} />
    </ScreenBgStyled>
  </>
);

const MenuItem = ({ caption, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MenuItemStyled>
      <Text>{caption}</Text>
      <Arrow>{'>'}</Arrow>
    </MenuItemStyled>
  </TouchableOpacity>
);

export default Infos;

const ScreenBgStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f9f9f9',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '100%',
    minHeight: '100%',
  },
})`
  background-color: #f9f9f9;
`;

const MenuItemStyled = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #4030a522;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${defaultPadding}px;
`;

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const Arrow = styled.Text`
  color: #4030a5;
  font-weight: bold;
`;

const TopTitle = styled(H1)`
  ${commonCss}
  padding-horizontal: 30px;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
