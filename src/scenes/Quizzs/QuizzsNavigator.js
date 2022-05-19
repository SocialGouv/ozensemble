import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import TextStyled from '../../components/TextStyled';
import { screenWidth } from '../../styles/theme';

import QuizzEvaluateConso from './QuizzEvaluateConso';
import QuizzLifeQuality from './QuizzLifeQuality';
import QuizzMotivations from './QuizzMotivations';
import QuizzOnboarding from './QuizzOnboarding';

import QuizzElement from './QuizzElement';
import GoBackButtonText from '../../components/GoBackButtonText';
import { useNavigation } from '@react-navigation/native';

const QuizzsStack = createStackNavigator();

const QuizzsNavigator = () => (
  <QuizzsStack.Navigator headerMode="none">
    <QuizzsStack.Screen name="QUIZZ_MENU" component={QuizzMenu} />
    <QuizzsStack.Screen name="ONBOARDING_QUIZZ" component={QuizzOnboarding} />
    <QuizzsStack.Screen
      name="EVALUATE_CONSO_QUIZZ"
      component={QuizzEvaluateConso}
      initialParams={{
        title: 'Évaluer sa consommation',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="LIFE_QUALITY_QUIZZ"
      component={QuizzLifeQuality}
      initialParams={{
        title: 'Évaluer sa qualité de vie',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
    <QuizzsStack.Screen
      name="MOTIVATIONS_QUIZZ"
      component={QuizzMotivations}
      initialParams={{
        title: 'Quelles raisons vous motivent à diminuer votre consommation ?',
        rootRoute: 'QUIZZ_MENU',
      }}
    />
  </QuizzsStack.Navigator>
);
const QuizzMenu = () => {
  const navigation = useNavigation();

  return (
    <ScreenBgStyled>
      <TopContainer>
        <GoBackButton>
          <GoBackButtonText content="< Retour" onPress={navigation.goBack} bold withoutPadding />
        </GoBackButton>
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
            Évaluez votre situation, vos motivations et risques liés à votre consommation d'alcool avec ces
            questionnaires
          </TextStyled>
        </SubTitle>
      </TopContainer>
      <Quizzcontainer>
        <QuizzElement
          topTitle="Questionnaire d'auto-évaluation"
          title="Ma consommation d'alcool"
          quizzRoute="ONBOARDING_QUIZZ"
          memoryKeyResult={'@Quizz_result'}
          memoryKeyAnswers={'@Quizz_answers'}
          showEvenNotDone
        />
        <QuizzElement
          topTitle="Défi 7 jours"
          title="Évaluer sa consommation"
          quizzRoute="EVALUATE_CONSO_QUIZZ"
          memoryKeyResult={'@QuizzEvaluateConso_result'}
          memoryKeyAnswers={'@QuizzEvaluateConso_answers'}
        />
        <QuizzElement
          topTitle="Défi 7 jours"
          title="Qualité de vie"
          quizzRoute="LIFE_QUALITY_QUIZZ"
          memoryKeyResult={'@QuizzLifeQuality_result'}
          memoryKeyAnswers={'@QuizzLifeQuality_answers'}
        />
        <QuizzElement
          topTitle="Défi 7 jours"
          title="Mes motivations à diminuer"
          quizzRoute="MOTIVATIONS_QUIZZ"
          memoryKeyResult={'@QuizzMotivations_result'}
          memoryKeyAnswers={'@QuizzMotivations_answers'}
        />
      </Quizzcontainer>
    </ScreenBgStyled>
  );
};

export default QuizzsNavigator;

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const TopContainer = styled.View`
  padding: 20px 20px 40px;
`;

const Title = styled(H2)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const SubTitle = styled(H3)``;

const GoBackButton = styled.View`
  margin-right: auto;
`;

export const Quizzcontainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  min-height: 100%;
`;
