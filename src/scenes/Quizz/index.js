import React from 'react';
import styled from 'styled-components';
import { defaultPadding, screenWidth } from '../../styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import QuizzOnboarding from './QuizzOnboarding';
import QuizzEvalutateConsomation from './QuizzEvalutateConsomation';
import QuizzLifeQuality from './QuizzLifeQuality';
import QuizzMotivations from './QuizzMotivations';
import TextStyled from '../../components/TextStyled';
import Background from '../../components/Background';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import CONSTANTS from '../../reference/constants';

import QuizzElement from './QuizzElement';

const QuizzStack = createStackNavigator();

export default () => (
  <QuizzStack.Navigator headerMode="none">
    <QuizzStack.Screen name="QUIZZ_MENU" component={QuizzMenu} />
    <QuizzStack.Screen name="ONBOARDING_QUIZZ" component={QuizzOnboarding} />
    <QuizzStack.Screen name="EVALUATE_CONSO_QUIZZ" component={QuizzEvalutateConsomation} />
    <QuizzStack.Screen name="LIFE_QUALITY_QUIZZ" component={QuizzLifeQuality} />
    <QuizzStack.Screen name="MOTIVATIONS_QUIZZ" component={QuizzMotivations} />
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
            onStart={() => {
              navigation.navigate('ONBOARDING_QUIZZ', { screen: 'QUIZZ_QUESTIONS' });
            }}
            onShowResult={() => {
              navigation.navigate('ONBOARDING_QUIZZ', { screen: 'QUIZZ_RESULTS' });
            }}
            storageKey={CONSTANTS.STORE_KEY_QUIZZ_RESULT}
            disabled={false}
          />
          <QuizzElement
            topTitle="Défi 7 jours"
            title="Evaluer sa consommation"
            onStart={() => {
              navigation.navigate('EVALUATE_CONSO_QUIZZ', { screen: 'QUIZZ_QUESTIONS' });
            }}
            onShowResult={() => {
              navigation.navigate('EVALUATE_CONSO_QUIZZ', { screen: 'QUIZZ_RESULTS' });
            }}
            storageKey={CONSTANTS.STORE_KEY_QUIZZ_EVALUATE_CONSO_RESULT}
            disabled={false}
          />
          <QuizzElement
            topTitle="Défi 7 jours"
            title="Qualité de vie"
            onStart={() => {
              navigation.navigate('LIFE_QUALITY_QUIZZ', { screen: 'QUIZZ_QUESTIONS' });
            }}
            onShowResult={() => {
              navigation.navigate('LIFE_QUALITY_QUIZZ', { screen: 'QUIZZ_RESULTS' });
            }}
            storageKey={CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_RESULT}
            disabled={false}
          />
          <QuizzElement
            topTitle="Défi 7 jours"
            title="Mes motivations à diminuer"
            onStart={() => {
              navigation.navigate('MOTIVATIONS_QUIZZ', { screen: 'QUIZZ_QUESTIONS' });
            }}
            onShowResult={() => {
              navigation.navigate('MOTIVATIONS_QUIZZ', { screen: 'QUIZZ_RESULTS' });
            }}
            storageKey={CONSTANTS.STORE_KEY_QUIZZ_MOTIVATIONS_ANSWERS}
            disabled={false}
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
