import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnswerScore } from '../../../components/Quizz/utils';
import { capture } from '../../../services/sentry';

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS);
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return newAnswers[CONSTANTS.GENDER];
  }
  return null;
};

const atLeastOneAnswerIsNotNever = (answers) => {
  const questionKeys = Object.keys(answers).filter((key) => key !== CONSTANTS.GENDER && key !== 'age');
  const hasNotAnsweredNeverAtLeastOne = questionKeys.reduce((prev, curr) => {
    if (curr < 3) return prev;
    const answerKey = answers[curr];
    return (answerKey !== 'never' && answerKey !== 'no') || !!prev;
  }, false);
  console.log({ answers });
  console.log({ hasNotAnsweredNeverAtLeastOne });
  return hasNotAnsweredNeverAtLeastOne;
};

export const computeScore = (questions, answers) => {
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return {
        [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
        [CONSTANTS.SCORE]: 0,
      };
    }
    const questionKeys = Object.keys(answers).filter((key) => key !== CONSTANTS.GENDER && key !== 'age');
    let score = 0;
    for (let questionKey of questionKeys) {
      const answerKey = answers[questionKey];
      if (!answerKey) {
        capture('error computing score of these answers for quizz evaluate conso', { extra: { answers } });
        continue;
      }
      score += getAnswerScore(questions, answers, questionKey);
    }

    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: score,
    };
  } catch (e) {
    capture('error in mapEvaluateConsoAnswersToResult ' + e, { extra: { answers } });
  }
  if (answers[CONSTANTS.GENDER]) {
    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: -1,
    };
  }
  return {
    [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
    [CONSTANTS.SCORE]: -1,
  };
};

const mapScoreToResult = ({ computedScore, answers }) => {
  const gender = computedScore[CONSTANTS.GENDER];
  const score = computedScore[CONSTANTS.SCORE];

  // woman first
  let scores = {};
  if (gender === CONSTANTS.WOMAN) {
    // score for the first part, addiction
    if (score > 12) scores.scoreAddiction = CONSTANTS.RESULT_ADDICTED;
    if (score > 5) scores.scoreAddiction = CONSTANTS.RESULT_RISK;
    scores.scoreAddiction = CONSTANTS.RESULT_GOOD;

    //score for the second part, the arrow
    if (score >= 12) scores.scoreArrow = CONSTANTS.RESULT_ARROW_ADDICTED;
    if (score >= 7 && score <= 11) scores.scoreArrow = CONSTANTS.RESULT_ARROW_HARMFUL_USAGE;
    if (score >= 1 && score <= 6) scores.scoreArrow = CONSTANTS.RESULT_ARROW_SIMPLE_USAGE;
    if (score === 0) scores.scoreArrow = CONSTANTS.RESULT_ARROW_NO_USAGE;
    if (atLeastOneAnswerIsNotNever(answers)) scores.scoreArrow = CONSTANTS.RESULT_ARROW_HARMFUL_USAGE;
  }
  // then men
  else if (gender === CONSTANTS.MAN) {
    if (score > 12) scores.scoreAddiction = CONSTANTS.RESULT_ADDICTED;
    if (score > 6) scores.scoreAddiction = CONSTANTS.RESULT_RISK;
    scores.scoreAddiction = CONSTANTS.RESULT_GOOD;

    //score for the second part, the arrow
    if (score >= 12) scores.scoreArrow = CONSTANTS.RESULT_ARROW_ADDICTED;
    if (score >= 8 && score <= 11) scores.scoreArrow = CONSTANTS.RESULT_ARROW_HARMFUL_USAGE;
    if (score >= 1 && score <= 7) scores.scoreArrow = CONSTANTS.RESULT_ARROW_SIMPLE_USAGE;
    if (score === 0) scores.scoreArrow = CONSTANTS.RESULT_ARROW_NO_USAGE;
    if (atLeastOneAnswerIsNotNever(answers)) scores.scoreArrow = CONSTANTS.RESULT_ARROW_HARMFUL_USAGE;
  }
  console.log({ score });
  console.log({ scores });
  return scores;
};

export const mapEvaluateConsoAnswersToResult = (questions, answers) =>
  mapScoreToResult({ computedScore: computeScore(questions, answers), answers });
