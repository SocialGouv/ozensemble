import questions from './questions';
import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

// Utils
const findQuestion = (questionKey) => questions.find((question) => question.questionKey === questionKey);
const findAnswer = ({ answers }, answerKey) => answers.find((answer) => answer.answerKey === answerKey);
const getAnswerScore = (answers, questionKey) => findAnswer(findQuestion(questionKey), answers[questionKey])?.score;

export const getGender = (answers) => answers[CONSTANTS.GENDER];

const lookupConsommationPopulation = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 7, 7],
  [7, 7, 7, 7, 7],
  [7, 7, 12, 12, 14],
  [7, 7, 12, 14, 14],
];

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ANSWERS);
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return getGender(newAnswers);
  }
  return null;
};

export const getAcceptableDosePerDay = (gender) => {
  if (!gender) return 3;
  if (gender === CONSTANTS.MAN) return 3;
  return 2;
};

export const computeScore = (answers) => {
  console.log({ answers });
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return {
        [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
        [CONSTANTS.SCORE]: 0,
      };
    }
    const questionKeys = Object.keys(answers).filter((key) => key !== CONSTANTS.GENDER);
    let score = 0;
    for (let questionKey of questionKeys) {
      console.log({ questionKey });
      const answerKey = answers[questionKey];
      if (!answerKey) {
        console.log('error computing score of these answers: ' + JSON.stringify(answers));
        Sentry.captureMessage('error computing score of these answers: ' + JSON.stringify(answers));
        continue;
      }
      console.log({ score });
      score += getAnswerScore(answers, questionKey);
      console.log({ score });
    }
    console.log({ score });

    // get the index score for scorePopulation
    const x = getAnswerScore(answers, '0');
    const y = getAnswerScore(answers, '1');

    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: score,
      population: lookupConsommationPopulation[x][y],
    };
  } catch (e) {
    console.log(e);
    Sentry.captureMessage('cannot compute score of these answers: ' + JSON.stringify(answers));
    Sentry.captureException(e);
  }
  if (answers[CONSTANTS.GENDER]) {
    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: -1,
      population: -1,
    };
  }
  return {
    [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
    [CONSTANTS.SCORE]: -1,
    population: -1,
  };
};

const mapScoreToResult = (computedScore) => {
  console.log({ computedScore });
  const gender = computedScore[CONSTANTS.GENDER];
  const score = computedScore[CONSTANTS.SCORE];
  const scorePopulation = computedScore.population;
  // woman first
  if (gender === CONSTANTS.WOMAN) {
    if (score > 12) return { scoreAddiction: CONSTANTS.RESULT_ADDICTED, scorePopulation };
    if (score > 5) return { scoreAddiction: CONSTANTS.RESULT_RISK, scorePopulation };
    return { scoreAddiction: CONSTANTS.RESULT_GOOD, scorePopulation };
  }
  // then men
  if (gender === CONSTANTS.MAN) {
    if (score > 12) return { scoreAddiction: CONSTANTS.RESULT_ADDICTED, scorePopulation };
    if (score > 6) return { scoreAddiction: CONSTANTS.RESULT_RISK, scorePopulation };
    return { scoreAddiction: CONSTANTS.RESULT_GOOD, scorePopulation };
  }
};

export const mapResultToMatomoProfile = (resultKey) => {
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

export const mapAnswersToResult = (answers) => mapScoreToResult(computeScore(answers));
