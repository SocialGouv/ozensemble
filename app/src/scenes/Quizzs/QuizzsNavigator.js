import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import TextStyled from '../../components/TextStyled';

import QuizzEvaluateConso from './QuizzEvaluateConso';
import QuizzLifeQuality from './QuizzLifeQuality';
import QuizzMotivations from './QuizzMotivations';
import QuizzOnboarding from './QuizzOnboarding';

import QuizzElement from './QuizzElement';
import ContactForm from '../Health/ContactForm';
import Doctolib from '../Health/Doctolib';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import BackButton from '../../components/BackButton';

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
    <QuizzsStack.Screen name="CONTACT" component={ContactForm} />
    <QuizzsStack.Screen name="DOCTOLIB" component={Doctolib} />
  </QuizzsStack.Navigator>
);
const QuizzMenu = () => {
  const navigation = useNavigation();

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
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

const TopContainer = styled.View`
  padding: 0px 20px 40px;
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
  min-height: 100%;
`;
