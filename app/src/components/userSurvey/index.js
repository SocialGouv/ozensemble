import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState } from 'recoil';
import Background from '../Background';
import Question from './Question';
import { logEvent } from '../../services/logEventsWithMatomo';
import QuestionMultipleChoice from './QuestionMultipleChoice';

const QuizzStack = createStackNavigator();
const QuizzAndResultsStack = createStackNavigator();

const QuizzUserSurvey = ({ questions, recoilAnswersState, route, Results, event = '' }) => {
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useRecoilState(recoilAnswersState);

  const logQuizzAnswer = async ({ questionKey, score }) => {
    const category = `QUIZZ${event}`;
    const action = 'QUIZZ_ANSWER';
    const name = questionKey;
    const value = score;
    await logEvent({ category, action, name, value });
  };

  const saveAnswer = async (questionIndex, questionKey, answerKey, score) => {
    if (questionIndex === 0) {
      logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_START' });
    }
    const newAnswers = {
      ...answers,
      [questionKey]: answerKey,
    };

    setAnswers(newAnswers);
    setProgress((questionIndex + 1) / questions.length);
    const endOfQuestions = questionIndex === questions.length - 1;

    logQuizzAnswer({ questionKey, score });

    if (endOfQuestions) {
      logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_FINISH' });
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
  };

  const logMultipleAnswer = async (questionIndex, name, scores) => {
    const category = `QUIZZ${event}`;
    const action = 'QUIZZ_ANSWER';

    for (const score of scores) {
      logEvent({ category, action, name, value: score });
    }

    const endOfQuestions = questionIndex === questions.length - 1;
    if (endOfQuestions) {
      logEvent({ category: `QUIZZ${event}`, action: 'QUIZZ_FINISH' });
    }
  };

  return (
    <Background color="#f9f9f9" withSwiperContainer neverBottom>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f9f9f9' } }}
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
              logMultipleAnswer={logMultipleAnswer}
              route={route}
              event={event}
            />
          )}
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params} component={Results} />
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
  logMultipleAnswer,
  route,
  event,
}) => {
  const from = route?.params?.from;

  return (
    <>
      <QuizzStack.Navigator
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f9f9f9' } }}
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
                    saveMultipleAnswer={saveMultipleAnswer}
                    logMultipleAnswer={logMultipleAnswer}
                    selectedAnswerKey={answers?.[content.questionKey] || []}
                    from={from}
                    progress={progress}
                    event={event}
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
                    progress={progress}
                    event={event}
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

export default QuizzUserSurvey;
