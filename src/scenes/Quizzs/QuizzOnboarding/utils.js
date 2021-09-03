import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { capture } from '../../../services/sentry';
import { getAnswerScore } from '../../../components/Quizz/utils';

// Utils

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
        capture('error computing score of these answers', { extra: { answers, questionKey } });
        continue;
      }
      score = score + getAnswerScore(questions, answers, questionKey);
    }
    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: score,
    };
  } catch (e) {
    capture('error in mapOnboardingAnswersToResult ' + e, {
      extra: { answers, message: 'cannot compute score of onboarding quizz' },
    });
  }
  if (answers[CONSTANTS.GENDER]) {
    return {
      [CONSTANTS.GENDER]: answers[CONSTANTS.GENDER],
      [CONSTANTS.SCORE]: 0,
    };
  }
  return {
    [CONSTANTS.GENDER]: CONSTANTS.WOMAN,
    [CONSTANTS.SCORE]: 0,
  };
};

const mapScoreToResult = (scoreAndGender) => {
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

export const mapOnboardingResultToMatomoProfile = (resultKey) => {
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

export const mapOnboardingAnswersToResult = (questions, answers) => mapScoreToResult(computeScore(questions, answers));
