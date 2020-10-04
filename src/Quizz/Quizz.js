import React from 'react';
import { UIManager, Platform, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import questions from './questions';
import CONSTANTS from '../reference/constants';
import { mapAnswersToResult } from './utils';
import {
  QuizzBackButton,
  QuizzAndResultContainer,
  QuizzContainer,
  QuestionsContainer,
  QuizzAndResultSubContainer,
} from './styles';
import Question, { Intro } from './Question';
import Background from '../components/Background';
import ProgressBar from '../components/ProgressBar';
import { useBackHandler } from '../helpers/customHooks';
import Results from './Results/Results';
import matomo from '../services/matomo';

/*
HOW DOES THE QUESTIONS WORK:
-> The user can't pass a question.
  It means that he needs to answer the question n to be able to see the question n + 1.
-> Once the user answered a question, he is directly moved to the next question.
-> He then can move back to previous questions to change the answer if he wants, by swiping or by clicking on the button back. But that doesn't change the progress bar progress.
-> Once he went back to previous questions, when he click on an answer, the next question is shown. But that doesn't change the progress bar progress.
-> If he doesn't want to change his answer, he can swipe to the right to go to the next question. But again, that doesn't change the progress bar progress.

*/

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const computeInitAnswersState = () => {
  const initAnswerState = {};
  for (let question of questions) {
    initAnswerState[question.questionKey] = null;
  }
  return initAnswerState;
};

const Quizz = ({ setView }) => {
  const [answers, setAnswers] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [questionInView, setQuestionInView] = React.useState(0);
  const [resultKey, setResultKey] = React.useState(null);
  const [showQuizz, setShowQuizz] = React.useState(true);

  const backToPreviousQuestion = () => {
    LayoutAnimation.easeInEaseOut();
    if (!showQuizz) {
      setShowQuizz(true);
      return true;
    }
    if (questionInView === 0) {
      // setView(CONSTANTS.VIEW_WELCOME);
      return true;
    }
    const newProgress = Math.max(0, questionInView - 2) / questions.length;
    setProgress(newProgress);
    setQuestionInView(questionInView - 1);

    return true;
  };

  const goToNextQuestion = (timeout = 0) => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setQuestionInView(questionInView + 1);
    }, timeout);
  };

  const startQuizz = async () => {
    goToNextQuestion(0);
    await matomo.logQuizzStart();
  };

  const saveAnswer = async (questionIndex, questionKey, answerKey, score) => {
    const newAnswers = {
      ...answers,
      [questionKey]: answerKey,
    };
    setAnswers(newAnswers);
    const newProgress = (questionIndex + 1) / questions.length;
    setProgress(newProgress);

    const endOfQuestions = questionIndex === questions.length - 1;

    if (!endOfQuestions) goToNextQuestion(500);

    await matomo.logQuizzAnswer({ questionKey, answerKey, score });
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS, JSON.stringify(newAnswers));

    if (endOfQuestions) {
      const addictionResult = mapAnswersToResult(newAnswers);
      await matomo.logAddictionResult(addictionResult);
      await matomo.logQuizzFinish();
      if (addictionResult) {
        await AsyncStorage.setItem(CONSTANTS.STORE_KEY_QUIZZ_RESULT, addictionResult);
      }
      setResultKey(addictionResult);
      LayoutAnimation.easeInEaseOut();
      setShowQuizz(false);
      return;
    }
  };

  const resetQuizz = () => {
    setTimeout(() => {
      setShowQuizz(true);
      setProgress(0);
      setQuestionInView(0);
    }, 1000);
  };

  React.useEffect(() => {
    const fetchStoredAnswers = async () => {
      try {
        const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
        if (storedAnswers !== null) {
          const newAnswers = JSON.parse(storedAnswers);
          setAnswers(newAnswers);
        } else {
          setAnswers(computeInitAnswersState());
        }
        const storedResultKey = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_RESULT);
        if (storedResultKey !== null) {
          setResultKey(storedResultKey);
        }
      } catch (e) {
        setAnswers(computeInitAnswersState());
        console.log('error catching stored answers', e);
      }
    };
    if (answers === null) fetchStoredAnswers();
  });

  useBackHandler(backToPreviousQuestion);

  if (!answers) return null;

  return (
    <Background color="#f9f9f9" withSwiperContainer>
      <QuizzAndResultSubContainer>
        <QuizzAndResultContainer showQuizz={showQuizz}>
          <QuizzContainer>
            <ProgressBar progress={progress} />
            <QuestionsContainer questionIndex={questionInView}>
              {[0, ...questions].map((content, index) => {
                if (index === 0) {
                  return <Intro startQuizz={startQuizz} setView={setView} key="intro" />;
                }
                return (
                  <Question
                    {...content}
                    key={index - 1}
                    numberOfQuestions={questions.length}
                    questionIndex={index - 1}
                    saveAnswer={saveAnswer}
                    selectedAnswerKey={answers[content.questionKey]}
                  />
                );
              })}
            </QuestionsContainer>
            {questionInView > 0 && (
              <QuizzBackButton bold content="Retour" onPress={backToPreviousQuestion} />
            )}
          </QuizzContainer>
          <QuizzContainer>
            <Results
              resultKey={resultKey}
              setView={(view) => {
                resetQuizz();
                setView(view);
              }}
              backToQuestions={() => {
                LayoutAnimation.easeInEaseOut();
                setShowQuizz(true);
              }}
            />
          </QuizzContainer>
        </QuizzAndResultContainer>
      </QuizzAndResultSubContainer>
    </Background>
  );
};

export default Quizz;
