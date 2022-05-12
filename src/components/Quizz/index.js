import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import Background from '../Background';
import ProgressBar from '../ProgressBar';
import UnderlinedButton from '../UnderlinedButton';
import Question from './Question';
import { fetchStoredAnswers } from './utils';

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

const Quizz = ({ memoryKeyAnswers, memoryKeyResult, questions, route, mapAnswersToResult, Results }) => {
  const initialState = route?.params?.initialState || {};
  const [{ answers, progress, resultKey }, setGlobalState] = useState({
    answers: initialState.answers,
    resultKey: initialState.result,
    progress: 0,
  });

  const setState = (newState) => setGlobalState((oldState) => ({ ...oldState, ...newState }));

  // eslint-disable-next-line no-unused-vars
  const saveAnswer = async (questionIndex, questionKey, answerKey, score) => {
    const newAnswers = {
      ...answers,
      [questionKey]: answerKey,
    };
    const newProgress = (questionIndex + 1) / questions.length;
    setState({ answers: newAnswers, progress: newProgress });

    const endOfQuestions = questionIndex === questions.length - 1;

    // await matomo.logQuizzAnswer({ questionKey, answerKey, score });
    await AsyncStorage.setItem(memoryKeyAnswers, JSON.stringify(newAnswers));

    if (endOfQuestions) {
      const addictionResult = mapAnswersToResult(questions, newAnswers);
      // await matomo.logAddictionResult(addictionResult);
      // await matomo.logQuizzFinish();
      if (addictionResult) {
        await AsyncStorage.setItem(memoryKeyResult, JSON.stringify(addictionResult));
      }
      setState({ resultKey: addictionResult });
    }
  };

  const setInitAnswers = async () => {
    const fetchedInitialState = await fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult, questions });
    if (fetchedInitialState?.answers || fetchedInitialState?.result) {
      setGlobalState({
        answers: fetchedInitialState.answers,
        resultKey: fetchedInitialState.result,
        progress: 0,
      });
    }
  };

  useEffect(() => {
    if (!answers) setInitAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName={route?.params?.initialRouteName}
        initialParams={route?.params}>
        <QuizzAndResultsStack.Screen name="QUIZZ_QUESTIONS">
          {() => <QuizzQuestions progress={progress} questions={questions} answers={answers} saveAnswer={saveAnswer} />}
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params}>
          {(props) => <Results resultKey={resultKey} {...props} />}
        </QuizzAndResultsStack.Screen>
      </QuizzAndResultsStack.Navigator>
    </Background>
  );
};

const QuizzQuestions = ({ progress, questions, answers, saveAnswer }) => {
  return (
    <>
      <ProgressBar progress={progress} />
      <QuizzStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName="QUIZZ_QUESTION_1">
        {questions.map((content, index) => (
          <QuizzStack.Screen key={index} name={`QUIZZ_QUESTION_${index + 1}`}>
            {(props) => (
              <>
                <Question
                  {...content}
                  numberOfQuestions={questions.length}
                  questionIndex={index}
                  saveAnswer={saveAnswer}
                  selectedAnswerKey={answers?.[content.questionKey]}
                  {...props}
                />
                <QuizzBackButton bold content="Retour" onPress={props.navigation.goBack} />
              </>
            )}
          </QuizzStack.Screen>
        ))}
      </QuizzStack.Navigator>
    </>
  );
};

export default Quizz;

/*
QUIZZ
*/

const QuizzBackButton = styled(UnderlinedButton)`
  margin-top: auto;
  margin-right: auto;
  margin-left: 10px;
  margin-bottom: 3%;
`;
