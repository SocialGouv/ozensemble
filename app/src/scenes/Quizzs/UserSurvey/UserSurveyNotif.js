import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import H2 from '../../../components/H2';
import { Dimensions, Platform, StatusBar, Touchable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logEvent } from '../../../services/logEventsWithMatomo';
import H3 from '../../../components/H3';
import UserSurveyLogo from '../../../components/illustrations/UserSurveyLogo';
import Background from '../../../components/Background';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// screen displayed from notification

const UserSurveyNotif = ({ navigation, route }) => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#39cec0" />
      <Background color="#39cec0" withSwiperContainer>
        <Container>
          <MiddleContainer>
            <UserSurveyLogo />
            <Title>1 min pour améliorer Oz ?</Title>
            <Text>
              Répondez à 6 questions pour nous aider à améliorer l’application ensemble !
              <TextStyled bold>Toutes vos réponses sont anonymes et confidentielles</TextStyled>
            </Text>
          </MiddleContainer>

          <InsideContainer>
            <ButtonPrimaryStyled
              content={'Répondre au sondage'}
              onPress={async () => {
                logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_NOTIF' });
                navigation.push('USER_SURVEY', { from: route.params?.from });
              }}
            />
            <TouchableOpacity
              onPress={() => {
                logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_NOTIF_SKIP' });
                navigation.navigate('TABS');
              }}>
              <Skip>Plus tard</Skip>
            </TouchableOpacity>
          </InsideContainer>
        </Container>
      </Background>
    </SafeAreaProvider>
  );
};

export default UserSurveyNotif;

const Container = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50%;
  padding-bottom: 15%;
  background: #fff;
`;

const Skip = styled(TextStyled)`
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: center;
  text-decoration: underline;
  color: #4030a5;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

const commonCss = css`
  //   margin-bottom: 15px;
  flex-shrink: 0;
`;

const QuestionNumber = styled(H2)`
  ${commonCss}
`;

const Title = styled(H2)`
  color: #4030a5;
  ${commonCss}
  text-align: center;
  font-size: 24px;
`;

const Text = styled(H3)`
  ${commonCss}
  margin-bottom: 10;
  width: 75%;
  text-align: center;
`;

const InsideContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const MiddleContainer = styled(View)`
  width: 100%;
  align-items: center;
  gap: 20px;
`;
