import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnswerScore } from '../../../components/Quizz/utils';
import { capture } from '../../../services/sentry';

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem('@Quizz_answers');
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return newAnswers.gender;
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
        gender: 'woman',
        score: 0,
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
      gender: answers.gender,
      score: score,
    };
  } catch (e) {
    capture('error in mapEvaluateConsoAnswersToResult ' + e, { extra: { answers } });
  }
  if (answers.gender) {
    return {
      gender: answers.gender,
      score: -1,
    };
  }
  return {
    gender: 'woman',
    score: -1,
  };
};

const mapScoreToResult = ({ computedScore, answers }) => {
  const gender = computedScore.gender;
  const score = computedScore.score;

  // woman first
  let scores = {};
  if (gender === 'woman') {
    // score for the first part, addiction
    if (score <= 4) scores.scoreAddiction = 'good';
    if (score >= 5) scores.scoreAddiction = 'risk';
    if (score >= 12) scores.scoreAddiction = 'addicted';

    //score for the second part, the arrow
    if (score === 0) scores.scoreArrow = 'RESULT_ARROW_NO_USAGE';
    if (score >= 1 && score <= 6) scores.scoreArrow = 'RESULT_ARROW_SIMPLE_USAGE';
    if (score >= 7 && score <= 11) scores.scoreArrow = 'RESULT_ARROW_HARMFUL_USAGE';
    if (atLeastOneAnswerIsNotNever(answers)) scores.scoreArrow = 'RESULT_ARROW_HARMFUL_USAGE';
    if (score >= 12) scores.scoreArrow = 'RESULT_ARROW_ADDICTED';
  }
  // then men
  else if (gender === 'man') {
    if (score <= 5) scores.scoreAddiction = 'good';
    if (score >= 6) scores.scoreAddiction = 'risk';
    if (score >= 12) scores.scoreAddiction = 'addicted';

    //score for the second part, the arrow
    if (score === 0) scores.scoreArrow = 'RESULT_ARROW_NO_USAGE';
    if (score >= 1 && score <= 7) scores.scoreArrow = 'RESULT_ARROW_SIMPLE_USAGE';
    if (score >= 8 && score <= 11) scores.scoreArrow = 'RESULT_ARROW_HARMFUL_USAGE';
    if (atLeastOneAnswerIsNotNever(answers)) scores.scoreArrow = 'RESULT_ARROW_HARMFUL_USAGE';
    if (score >= 12) scores.scoreArrow = 'RESULT_ARROW_ADDICTED';
  }
  console.log({ score });
  console.log({ scores });
  return scores;
};

export const mapEvaluateConsoAnswersToResult = (questions, answers) =>
  mapScoreToResult({ computedScore: computeScore(questions, answers), answers });
