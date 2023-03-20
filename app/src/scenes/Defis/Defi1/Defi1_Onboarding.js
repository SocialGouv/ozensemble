import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import TextStyled from '../../../components/TextStyled';
import UnderlinedButton from '../../../components/UnderlinedButton';
import { logEvent } from '../../../services/logEventsWithMatomo';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { storage } from '../../../services/storage';
import DefiLanding from '../../../components/illustrations/DefiLanding';
import WrapperContainer from '../../../components/WrapperContainer';
import NotificationService from '../../../services/notifications';

const Defi1_Onboarding = ({ navigation }) => {
  const startDefi = async () => {
    const notifActivated = await NotificationService.checkPermission();
    const startAt = new Date().toISOString().split('T')[0];
    storage.set('@Defi1_StartedAt', startAt);
    logEvent({
      category: 'DEFI1',
      action: 'DEFI1_CLICK_START',
    });
    if (!notifActivated.granted) {
      navigation.navigate('DEFI1_REMINDER', {
        onPressContinueNavigation: ['DEFI1_MENU'],
      });
      return;
    }
    navigation.navigate('DEFI1', { screen: 'DEFI1_MENU' });
  };

  return (
    <WrapperContainer onPressBackButton={navigation.goBack}>
      <Container>
        <DefiLanding size={200} color="#4030a5" selected={false} />
        <Title>
          <TextStyled color="#4030a5">Nous vous proposons de faire le point pendant 7 jours</TextStyled>
        </Title>
        <SubTitle>
          <TextStyled color="#191919">
            Observez votre situation, notez votre consommation d'alcool et recevez un bilan personnalisé
          </TextStyled>
        </SubTitle>
        <UnderlinedButton
          color="#4030a5"
          withoutPadding
          content="À qui s'adresse cette activité 7 jours ?"
          onPress={() => navigation.navigate('DEFI1_ONBOARDING_INFO')}
        />
        <ButtonsContainer>
          <ButtonPrimary content="Je commence" onPress={startDefi} />
        </ButtonsContainer>
      </Container>
    </WrapperContainer>
  );
};

const Container = styled.View`
  background-color: #f9f9f9;
  padding: 0 ${defaultPaddingFontScale()}px;
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

const SubTitle = styled(H2)`
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

export default Defi1_Onboarding;
