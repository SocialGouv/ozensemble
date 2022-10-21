import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import ResultsMotivations from './ResultsQuestionnaire';
import Section from './Section';
import sections from './sections';
import {
  Defi3_Day3_Answers_Difficulties_State,
  Defi3_Day3_Answers_Help_State,
  Defi3_Day3_ResultState,
} from '../../../../recoil/quizzs';
import { setValidatedDays } from '../../utils';
import WrapperContainer from '../../../../components/WrapperContainer';

const QuestionnaireStack = createStackNavigator();

const Questionnaire = ({ navigation, route }) => {
  const [Defi3_Day3_answers_Difficulties, setDefi3_Day3_Answers_Difficulties_State] = useRecoilState(
    Defi3_Day3_Answers_Difficulties_State
  );
  const [Defi3_Day3_answers_Help, setDefi3_Day3_Answers_Help_State] = useRecoilState(Defi3_Day3_Answers_Help_State);
  const setDefi3_Day3_ResultState = useSetRecoilState(Defi3_Day3_ResultState);

  const toggleAnswerDifficulties = async (answerKey, checked) => {
    setDefi3_Day3_Answers_Difficulties_State((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const toggleAnswerHelp = async (answerKey, checked) => {
    setDefi3_Day3_Answers_Help_State((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const nextQuestions = async () => {
    navigation.push('QUIZZ_QUESTIONS_2');
  };

  const validateAnswers = async () => {
    setDefi3_Day3_ResultState(true);
    setValidatedDays(route?.params?.day, '@Defi3');
    navigation.push('QUIZZ_RESULTS');
  };

  return (
    <QuestionnaireStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireStack.Screen name="QUIZZ_QUESTIONS_1">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Les facteurs influençant ma consommation">
            <Paragraph>
              <TextStyled>
                Parmi ces exemples, quels facteurs ont pu rendre{' '}
                <TextStyled bold>plus difficile votre réduction de consommation</TextStyled> d’alcool ? Je sélectionne
                les facteurs de risque les plus pertinents.{' '}
              </TextStyled>
            </Paragraph>
            {sections.difficulties.map((section, id) => (
              <Section
                key={id}
                section={section}
                onToggle={toggleAnswerDifficulties}
                answers={Defi3_Day3_answers_Difficulties}
              />
            ))}
            <ButtonsContainer>
              <ButtonPrimary onPress={nextQuestions} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireStack.Screen>
      <QuestionnaireStack.Screen name="QUIZZ_QUESTIONS_2">
        {({ navigation }) => (
          <WrapperContainer
            onPressBackButton={navigation.goBack}
            title="Quelles raisons vous motivent à changer votre consommation ?">
            <Paragraph>
              <TextStyled>Sélectionnez vos principales raisons pour changer votre consommation d'alcool</TextStyled>
            </Paragraph>
            {sections.help.map((section, id) => (
              <Section key={id} section={section} onToggle={toggleAnswerHelp} answers={Defi3_Day3_answers_Help} />
            ))}
            <ButtonsContainer>
              <ButtonPrimary onPress={validateAnswers} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireStack.Screen>
      <QuestionnaireStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params} component={ResultsMotivations} />
    </QuestionnaireStack.Navigator>
  );
};

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ButtonsContainer = styled.View`
  margin-top: 10px;
  align-items: center;
  width: 100%;
`;

export default Questionnaire;
