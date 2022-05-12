import AsyncStorage from '@react-native-async-storage/async-storage';
import { capture } from '../../services/sentry';

// Utils
export const findQuestion = (questions, questionKey) =>
  questions.find((question) => question.questionKey === questionKey);
const findAnswer = ({ answers }, answerKey) => answers.find((answer) => answer.answerKey === answerKey);
export const getAnswerScore = (questions, answers, questionKey) =>
  findAnswer(findQuestion(questions, questionKey), answers[questionKey])?.score;

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem('@Quizz_answers');
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return newAnswers.gender;
  }
  return null;
};

export const fetchStoredAnswers = async ({ memoryKeyAnswers, memoryKeyResult, questions = [] }) => {
  const computeInitAnswersState = () => {
    const initAnswerState = {};
    for (let question of questions) {
      initAnswerState[question.questionKey] = null;
    }
    return initAnswerState;
  };

  const toReturn = { answers: null, result: null };
  try {
    const storedAnswers = await AsyncStorage.getItem(memoryKeyAnswers);
    if (storedAnswers !== null) {
      toReturn.answers = JSON.parse(storedAnswers);
    } else {
      toReturn.answers = computeInitAnswersState();
    }
    if (memoryKeyResult) {
      const storedResultKey = await AsyncStorage.getItem(memoryKeyResult);
      if (storedResultKey !== null) {
        toReturn.result = JSON.parse(storedResultKey);
      }
    }
  } catch (e) {
    capture('error catching stored answers', e);
  }
  return toReturn;
};
