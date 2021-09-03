import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnswerScore } from '../../../components/Quizz/utils';
import { capture } from '../../../services/sentry';

const lookupConsommationPopulation = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 7, 7],
  [7, 7, 7, 7, 7],
  [7, 7, 12, 12, 14],
  [7, 7, 12, 14, 14],
];

export const getGenderFromLocalStorage = async () => {
  const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS);
  if (storedAnswers !== null) {
    const newAnswers = JSON.parse(storedAnswers);
    return newAnswers[CONSTANTS.GENDER];
  }
  return null;
};

export const computeScore = (questions, answers) => {
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
      const answerKey = answers[questionKey];
      if (!answerKey) {
        capture('error computing score of these answers for quizz evaluate conso', { extra: { answers } });
        continue;
      }
      score += getAnswerScore(questions, answers, questionKey);
    }

    // get the index score for scorePopulation
    const x = getAnswerScore(questions, answers, '0');
    const y = getAnswerScore(questions, answers, '1');

    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: score,
      population: lookupConsommationPopulation[x][y],
    };
  } catch (e) {
    capture('error in mapEvaluateConsoAnswersToResult ' + e, { extra: { answers } });
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

export const mapEvaluateConsoAnswersToResult = (questions, answers) =>
  mapScoreToResult(computeScore(questions, answers));
