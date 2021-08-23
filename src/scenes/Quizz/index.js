import React from 'react';
import styled, { css } from 'styled-components';
import { defaultPadding, screenWidth } from '../../styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import QuizzOnboarding from './QuizzOnboarding';
import QuizzEvalutateConsomation from './QuizzEvalutateConsomation';
import TextStyled from '../../components/TextStyled';
import Background from '../../components/Background';
import H2 from '../../components/H2';
import H3 from '../../components/H3';

import QuizzElement from './QuizzElement';

const QuizzStack = createStackNavigator();

export default () => (
  <QuizzStack.Navigator headerMode="none">
    <QuizzStack.Screen name="QUIZZ_MENU" component={QuizzMenu} />
    <QuizzStack.Screen name="ONBOARDING_QUIZZ" component={QuizzOnboarding} />
    <QuizzStack.Screen name="EVALUATE_CONSO_QUIZZ" component={QuizzEvalutateConsomation} />

    {/* <QuizzStack.Screen name="PRIVACY_POLICY">
      {({ navigation }) => <PrivacyPolicy onClose={navigation.goBack} />}
    </QuizzStack.Screen> */}
  </QuizzStack.Navigator>
);
const QuizzMenu = ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <Title>
            <TextStyled color="#4030a5">
              Vos{' '}
              <TextStyled color="#4030a5" bold>
                tests
              </TextStyled>{' '}
              et{' '}
              <TextStyled color="#4030a5" bold>
                questionnaires
              </TextStyled>
            </TextStyled>
          </Title>
          <SubTitle>
            <TextStyled>
              Évaluez votre situation, vos motivations et risques liés à votre consommation d’alcool avec ces
              questionnaires
            </TextStyled>
          </SubTitle>
        </TopContainer>
        <Quizzcontainer>
          <QuizzElement
            topTitle="Questionnaire d’auto-évaluation"
            title="Ma consommation d'alcool"
            onStart={() => navigation.push('ONBOARDING_QUIZZ')}
            onShowResult={() => {}}
            done={true}
            disabled={false}
          />
          <QuizzElement
            topTitle="Questionnaire d’auto-évaluation"
            title="Evaluer sa consommation"
            onStart={() => navigation.push('EVALUATE_CONSO_QUIZZ')}
            onShowResult={() => {}}
            done={false}
            disabled={false}
          />
          <QuizzElement
            topTitle="Questionnaire d’auto-évaluation"
            title="Qualité de vie"
            onStart={() => {}}
            onShowResult={() => {}}
            done={false}
            disabled={true}
          />
          <QuizzElement
            topTitle="Questionnaire d’auto-évaluation"
            title="Mes motivations à diminuer"
            onStart={() => {}}
            onShowResult={() => {}}
            done={false}
            disabled={true}
          />
        </Quizzcontainer>
      </ScreenBgStyled>
    </Background>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  padding-top: ${defaultPadding / 2}px;
  flex-shrink: 1;
  flex-grow: 1;
  width: ${screenWidth}px;
  max-width: ${screenWidth}px;
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const TopContainer = styled.View`
  padding: 20px 20px 40px;
`;

const Title = styled(H2)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const SubTitle = styled(H3)``;

export const Quizzcontainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
`;
