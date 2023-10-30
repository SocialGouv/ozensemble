import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Background from '../Background';
import ProgressBar from '../ProgressBar';
import Question from './Question';
import ContactForm from '../../scenes/Health/ContactForm';
import Doctolib from '../../scenes/Health/Doctolib';
import { logEvent } from '../../services/logEventsWithMatomo';
import Matomo from '../../services/matomo';
import BackButton from '../BackButton';
import CONSTANTS from '../../reference/constants';
import { storage } from '../../services/storage';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import { TouchableOpacity, View } from 'react-native';
import CloseButton from '../CloseButton';
import styled from 'styled-components';
import { defaultPaddingFontScale } from '../../styles/theme';

/*
HOW DOES THE QUESTIONS WORK:
-> The user can't pass a question.
  It means that he needs to answer the question n to be able to see the question n + 1.
-> Once the user answered a question, he is directly moved to the next question.
-> He then can move back to previous questions to change the answer if he wants, by swiping or by clicking on the button back. But that doesn't change the progress bar progress.
-> Once he went back to previous questions, when he click on an answer, the next question is shown. But that doesn't change the progress bar progress.
-> If he doesn't want to change his answer, he can swipe to the right to go to the next question. But again, that doesn't change the progress bar progress.

*/

const QuizzStack = createStackNavigator();
const QuizzAndResultsStack = createStackNavigator();

const Quizz = ({
  questions,
  recoilAnswersState,
  recoilResultState,
  route,
  mapAnswersToResult,
  Results,
  event = '',
  calculateScore = true,
  closeButton = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useRecoilState(recoilAnswersState);
  const setResultKey = useSetRecoilState(recoilResultState);

  const logQuizzAnswer = async ({ questionKey, answerKey, score }) => {
    const category = `QUIZZ${event}`;
    const action = 'QUIZZ_ANSWER';
    const name = questionKey;
    const value = score;
    if (questionKey === 'age') {
      const age = score;
      Matomo.setCustomDimensions({
        [CONSTANTS.MATOMO_CUSTOM_DIM_AGE]: age,
      });
      storage.set('@Age', age);
    }
    if (questionKey === 'gender') {
      const gender = answerKey;
      Matomo.setCustomDimensions({
        [CONSTANTS.MATOMO_CUSTOM_DIM_GENDER]: gender,
      });
      storage.set('@Gender', gender);
    }
    await logEvent({ category, action, name, value });
  };

  const saveAnswer = async (questionIndex, questionKey, answerKey, score) => {
    if (questionIndex === 0) {
      // TODO: check if we need to log a "QUIZZ" event ? should be a `QUIZZ${event}` event ?
      if (event === 'USER_SURVEY') logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_START' });
      logEvent({ category: 'QUIZZ', action: 'QUIZZ_START' });
    }
    const newAnswers = {
      ...answers,
      [questionKey]: answerKey,
    };

    setAnswers(newAnswers);
    setProgress((questionIndex + 1) / questions.length);
    const endOfQuestions = questionIndex === questions.length - 1;

    logQuizzAnswer({ questionKey, answerKey, score });

    if (endOfQuestions) {
      if (calculateScore) {
        const addictionResult = mapAnswersToResult(questions, newAnswers);
        if (addictionResult) setResultKey(addictionResult);
      }
      if (event === 'USER_SURVEY') logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_FINISH' });

      // TODO: check if we need to log a "QUIZZ" event ? should be a `QUIZZ${event}` event ?
      logEvent({ category: 'QUIZZ', action: 'QUIZZ_FINISH' });
    }
  };

  const saveMultipleAnswer = async (questionIndex, questionKey, answerKeys, score) => {
    if (questionIndex === 0) logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_START' });
    const newAnswers = {
      ...answers,
      [questionKey]: answerKeys,
    };

    setAnswers(newAnswers);
    setProgress((questionIndex + 1) / questions.length);
    const endOfQuestions = questionIndex === questions.length - 1;
  };

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName={route?.params?.initialRouteName}
        initialParams={route?.params}>
        <QuizzAndResultsStack.Screen name="QUIZZ_QUESTIONS">
          {() => (
            <QuizzQuestions
              progress={progress}
              questions={questions}
              answers={answers}
              saveAnswer={saveAnswer}
              saveMultipleAnswer={saveMultipleAnswer}
              route={route}
              event={event}
              closeButton={closeButton}
            />
          )}
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params} component={Results} />
        <QuizzAndResultsStack.Screen name="CONTACT" component={ContactForm} />
        <QuizzAndResultsStack.Screen name="DOCTOLIB" component={Doctolib} />
      </QuizzAndResultsStack.Navigator>
    </Background>
  );
};

const QuizzQuestions = ({
  progress,
  questions,
  answers,
  saveAnswer,
  saveMultipleAnswer,
  route,
  event,
  closeButton,
}) => {
  const navigation = useNavigation();

  const from = route?.params?.from;

  return (
    <>
      {closeButton ? (
        <HeaderContainer>
          <BackButton onPress={navigation.goBack} marginLeft marginTop />
          <TouchableOpacity
            onPress={() => {
              logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_CLOSE_BUTTON' });
              navigation.navigate('TABS');
            }}>
            <CloseButton />
          </TouchableOpacity>
        </HeaderContainer>
      ) : (
        <BackButton onPress={navigation.goBack} marginLeft marginTop />
      )}
      <ProgressBar progress={progress} />
      <QuizzStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName="QUIZZ_QUESTION_1">
        {questions.map((content, index) => (
          <QuizzStack.Screen key={index} name={`QUIZZ_QUESTION_${index + 1}`}>
            {(props) => (
              <>
                {content.multipleChoice ? (
                  <QuestionMultipleChoice
                    {...content}
                    numberOfQuestions={questions.length}
                    questionIndex={index}
                    saveAnswer={saveAnswer}
                    saveMultipleAnswer={saveMultipleAnswer}
                    selectedAnswerKey={answers?.[content.questionKey] || []}
                    from={from}
                    {...props}
                  />
                ) : (
                  <Question
                    {...content}
                    numberOfQuestions={questions.length}
                    questionIndex={index}
                    saveAnswer={saveAnswer}
                    selectedAnswerKey={answers?.[content.questionKey]}
                    from={from}
                    {...props}
                  />
                )}
              </>
            )}
          </QuizzStack.Screen>
        ))}
      </QuizzStack.Navigator>
    </>
  );
};

export default Quizz;

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: ${defaultPaddingFontScale()}px;
`;
