import questions from './questions';
import CONSTANTS from '../reference/constants';
import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';

// Utils
const findQuestion = questionKey =>
  questions.find(question => question.questionKey === questionKey);
const findAnswer = ({ answers }, answerKey) =>
  answers.find(answer => answer.answerKey === answerKey);
const getAnswerScore = answer => answer.score;

export const getGender = answers => answers[CONSTANTS.GENDER];

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return getGender(newAnswers);
  }
  return null;
};

export const getAcceptableDosePerDay = gender => {
  if (!gender) return 3;
  if (gender === CONSTANTS.MAN) return 3;
  return 2;
};

const computeScore = answers => {
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return {
        [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
        [CONSTANTS.SCORE]: 0,
      };
    }
    const questionKeys = Object.keys(answers).filter(key => key !== CONSTANTS.GENDER);
    let score = 0;
    for (let questionKey of questionKeys) {
      const answerKey = answers[questionKey];
      const question = findQuestion(questionKey);
      const answer = findAnswer(question, answerKey);
      score = score + getAnswerScore(answer);
    }
    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: score,
    };
  } catch (e) {
    Sentry.captureMessage('cannot compute score of these answers: ' + JSON.stringify(answers));
    Sentry.captureException(e);
  }
};

const mapScoreToResult = scoreAndGender => {
  const gender = scoreAndGender[CONSTANTS.GENDER];
  const score = scoreAndGender[CONSTANTS.SCORE];
  // woman first
  if (gender === CONSTANTS.WOMAN) {
    if (score > 4) return CONSTANTS.RESULT_ADDICTED;
    if (score > 3) return CONSTANTS.RESULT_RISK;
    return CONSTANTS.RESULT_GOOD;
  }
  // then men
  if (gender === CONSTANTS.MAN) {
    if (score > 5) return CONSTANTS.RESULT_ADDICTED;
    if (score > 4) return CONSTANTS.RESULT_RISK;
    return CONSTANTS.RESULT_GOOD;
  }
};

export const mapResultToMatomoProfile = resultKey => {
  switch (resultKey) {
    case CONSTANTS.RESULT_ADDICTED:
      return 3;
    case CONSTANTS.RESULT_RISK:
      return 2;
    case CONSTANTS.RESULT_GOOD:
      return 1;
    default:
      return null;
  }
};

export const mapAnswersToResult = answers => mapScoreToResult(computeScore(answers));
