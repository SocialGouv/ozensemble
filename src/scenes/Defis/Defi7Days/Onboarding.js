import React from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { defaultPadding } from '../../../styles/theme';
import ReminderIcon from '../../../components/Illustrations/ReminderIcon';
import H2 from '../../../components/H2';
import UnderlinedButton from '../../../components/UnderlinedButton';
import matomo from '../../../services/matomo';

export default ({ navigation }) => {
  const startDefi = async () => {
    const startAt = new Date().toISOString().split('T')[0];
    await AsyncStorage.setItem('DEFI_7_JOURS_STARTED_AT', startAt);
    matomo.logClickStartDefi7Days();
    navigation.navigate('DEFI_7_DAYS_REMINDER', {
      title: 'Un rappel pour penser à faire votre défi 7 jours',
      enableContinueButton: true,
      onPressContinueButton: () => navigation.navigate('DEFI_7_DAYS_MENU'),
    });
  };
  const noThankYou = () => {
    matomo.logClickNotStartDefi7Days();
    navigation.navigate('DEFI_7_DAYS_REMINDER', {
      enableContinueButton: true,
      onPressContinueButton: () => navigation.navigate('TABS', { screen: 'CONSO_FOLLOW_UP' }),
    });
  };
  return (
    <ScreenBgStyled>
      <Container>
        <ReminderIcon size={80} color="#4030a5" selected={false} />
        <Title>
          <TextStyled color="#4030a5">Nous vous proposons de faire le point pendant 7 jours</TextStyled>
        </Title>
        <SubTitle>
          <TextStyled color="#191919">
            Observez votre situation, notez votre consommation d'alcool et recevez un bilan personnalisé
          </TextStyled>
        </SubTitle>
        <UnderlinedButton
          withoutPadding
          content="À qui s'adresse ce défi 7 jours ?"
          onPress={() => navigation.navigate('ONBOARDING_INFO')}
        />
        <ButtonsContainer>
          <ButtonPrimary content="Oui, je veux le faire" onPress={startDefi} />
          <UnderlinedButton
            withoutPadding
            color="#4030a5"
            content="Non merci, peut-être plus tard"
            bold
            onPress={noThankYou}
          />
        </ButtonsContainer>
      </Container>
    </ScreenBgStyled>
  );
};

const Container = styled.View`
  background-color: #f9f9f9;
  padding: 0 ${defaultPadding}px;
  padding-top: 20px;
  align-items: center;
  padding-bottom: 100px;
`;

const Title = styled(H1)`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 80%;
  flex-shrink: 0;
  text-align: center;
`;

export const SubTitle = styled(H2)`
  width: 80%;
  margin-bottom: 15px;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
`;

const ButtonsContainer = styled.View`
  justify-content: space-around;
  margin-vertical: 15px;
`;

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;
