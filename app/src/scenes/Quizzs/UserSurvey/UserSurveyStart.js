import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import H2 from '../../../components/H2';
import { Dimensions, StatusBar, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logEvent } from '../../../services/logEventsWithMatomo';
import H3 from '../../../components/H3';
import UserSurveyLogo from '../../../components/illustrations/UserSurveyLogo';
import Background from '../../../components/Background';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { showBootSplashState } from '../../../components/CustomBootsplash';

// screen displayed after onboarding

const UserSurveyStart = ({ navigation, route }) => {
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#39cec0" />
      <Background color="#39cec0" withSwiperContainer>
        <Container>
          <MiddleContainer>
            <UserSurveyLogo />
            <Title>Bienvenue sur Oz !</Title>
            <Text>
              Répondez à 6 questions pour nous aider à améliorer l’application ensemble !
              <TextStyled bold>Toutes vos réponses sont anonymes et confidentielles</TextStyled>
            </Text>
          </MiddleContainer>

          <InsideContainer>
            <ButtonPrimaryStyled
              content={"C'est parti"}
              onPress={async () => {
                // send
                logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_START' });
                navigation.push('USER_SURVEY', { from: route.params?.from });
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_START_SKIP' });
                // TODO: fix user survey still appearing after bootsplash hide
                setShowBootsplash(true);
                await new Promise((res) => setTimeout(res, 250));
                navigation.navigate('TABS');
                await new Promise((res) => setTimeout(res, 750));
                setShowBootsplash(false);
              }}>
              <Skip>Plus tard</Skip>
            </TouchableOpacity>
          </InsideContainer>
        </Container>
      </Background>
    </SafeAreaProvider>
  );
};

export default UserSurveyStart;

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
