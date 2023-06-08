import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import ResultsMotivations from './ResultsMotivations';
import Section from './Section';
import sections from './sections';
import { motivationsQuizzAnswersState, motivationsQuizzResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../../Defis/utils';
import WrapperContainer from '../../../components/WrapperContainer';

const QuizzMotivationsStack = createStackNavigator();

const QuizzMotivations = ({ navigation, route }) => {
  const [motivationsQuizzAnswers, setMotivationsQuizzAnswers] = useRecoilState(motivationsQuizzAnswersState);
  const setMotivationsQuizzResult = useSetRecoilState(motivationsQuizzResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setMotivationsQuizzAnswers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  return (
    <QuizzMotivationsStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuizzMotivationsStack.Screen name="QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer
            onPressBackButton={navigation.goBack}
            title="Quelles raisons vous motivent à changer votre consommation ?">
            <Paragraph>
              <TextStyled>Sélectionnez vos principales raisons pour changer votre consommation d'alcool</TextStyled>
            </Paragraph>
            {sections.map((section, id) => (
              <Section key={id} section={section} onToggle={toggleAnswer} answers={motivationsQuizzAnswers} />
            ))}
            <ButtonsContainer>
              <ButtonPrimary
                onPress={async () => {
                  setMotivationsQuizzResult(true);
                  setValidatedDays(route?.params?.day, '@Defi1');
                  navigation.push('QUIZZ_RESULTS');
                }}
                content="Je valide"
              />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuizzMotivationsStack.Screen>
      <QuizzMotivationsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params} component={ResultsMotivations} />
    </QuizzMotivationsStack.Navigator>
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

export default QuizzMotivations;
