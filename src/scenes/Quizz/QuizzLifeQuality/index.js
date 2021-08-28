import React from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import questions from './questions';
import CONSTANTS from '../../../reference/constants';
import { mapAnswersToResult } from './utils';
import Question from '../Question';
import Background from '../../../components/Background';
import ProgressBar from '../../../components/ProgressBar';
import Results from './Results';
import matomo from '../../../services/matomo';
import HeaderBackground from '../../../components/HeaderBackground';
import UnderlinedButton from '../../../components/UnderlinedButton';
import { createStackNavigator } from '@react-navigation/stack';

/*
HOW DOES THE QUESTIONS WORK:
-> The user can't pass a question.
  It means that he needs to answer the question n to be able to see the question n + 1.
-> Once the user answered a question, he is directly moved to the next question.
-> He then can move back to previous questions to change the answer if he wants, by swiping or by clicking on the button back. But that doesn't change the progress bar progress.
-> Once he went back to previous questions, when he click on an answer, the next question is shown. But that doesn't change the progress bar progress.
-> If he doesn't want to change his answer, he can swipe to the right to go to the next question. But again, that doesn't change the progress bar progress.

*/

const computeInitAnswersState = () => {
  const initAnswerState = {};
  for (let question of questions) {
    initAnswerState[question.questionKey] = null;
  }
  return initAnswerState;
};

const QuizzStack = createStackNavigator();
const QuizzAndResultsStack = createStackNavigator();

const Quizz = () => {
  const [{ answers, progress }, setState] = React.useState({ answers: null, progress: 0 });
  const [resultKey, setResultKey] = React.useState(null);

  const saveAnswer = async (questionIndex, questionKey, answerKey, score) => {
    const newAnswers = {
      ...answers,
      [questionKey]: answerKey,
    };
    const newProgress = (questionIndex + 1) / questions.length;
    setState({ answers: newAnswers, progress: newProgress });

    const endOfQuestions = questionIndex === questions.length - 1;

    // await matomo.logQuizzAnswer({ questionKey, answerKey, score });
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_ANSWERS, JSON.stringify(newAnswers));

    if (endOfQuestions) {
      const addictionResult = mapAnswersToResult(newAnswers);
      console.log({ addictionResult });
      // await matomo.logAddictionResult(addictionResult);
      // await matomo.logQuizzFinish();
      if (addictionResult) {
        await AsyncStorage.setItem(CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_RESULT, JSON.stringify(addictionResult));
      }
      setResultKey(addictionResult);
    }
  };

  React.useEffect(() => {
    const fetchStoredAnswers = async () => {
      try {
        const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_ANSWERS);
        if (storedAnswers !== null) {
          const newAnswers = JSON.parse(storedAnswers);
          setState((s) => ({ ...s, answers: newAnswers }));
        } else {
          setState((s) => ({ ...s, answers: computeInitAnswersState() }));
        }
        const storedResultKey = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_RESULT);
        if (storedResultKey !== null) {
          setResultKey(JSON.parse(storedResultKey));
        }
      } catch (e) {
        setAnswers(computeInitAnswersState());
        console.log('error catching stored answers', e);
      }
    };
    if (answers === null) fetchStoredAnswers();
  }, []);

  if (!answers) return null;

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName="QUIZZ_QUESTIONS">
        <QuizzAndResultsStack.Screen name="QUIZZ_QUESTIONS">
          {() => {
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
                            selectedAnswerKey={answers[content.questionKey]}
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
          }}
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS">
          {(props) => <Results resultKey={resultKey} {...props} />}
        </QuizzAndResultsStack.Screen>
      </QuizzAndResultsStack.Navigator>
    </Background>
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
