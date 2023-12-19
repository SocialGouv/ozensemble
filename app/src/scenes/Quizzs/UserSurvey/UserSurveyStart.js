import React from 'react';
import styled, { css } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import H2 from '../../../components/H2';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { logEvent } from '../../../services/logEventsWithMatomo';
import H3 from '../../../components/H3';
import UserSurveyLogo from '../../../components/illustrations/UserSurveyLogo';
import Background from '../../../components/Background';
import { showBootSplashState } from '../../../components/CustomBootsplash';

const UserSurveyStart = ({ navigation, route }) => {
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  return (
    <Background color="#fff" withSwiperContainer neverBottom>
      <Container>
        <MiddleContainer>
          <UserSurveyLogo />
          <Title>Bienvenue sur Oz !</Title>
          <Text>
            Répondez à 6 questions pour nous aider à améliorer l’application ensemble !{'\n\n'}
            <TextStyled bold>Toutes vos réponses sont anonymes et confidentielles</TextStyled>
          </Text>
        </MiddleContainer>

        <InsideContainer>
          <ButtonPrimaryStyled
            content={"C'est parti"}
            onPress={async () => {
              logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_START' });
              navigation.push('USER_SURVEY_FROM_ONBOARDING', { from: route.params?.from });
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'USER_SURVEY_START_SKIP' });
              // TODO: fix user survey still appearing after bootsplash hide
              navigation.navigate('TABS');
              setShowBootsplash(true);
              await new Promise((res) => setTimeout(res, 250));
            }}>
            <Skip>Plus tard</Skip>
          </TouchableOpacity>
        </InsideContainer>
      </Container>
    </Background>
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
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const Title = styled(H2)`
  color: #4030a5;
  ${commonCss}
  text-align: center;
  font-size: 24px;
`;

const Text = styled(H3)`
  ${commonCss}
  margin-bottom: 10px;
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
