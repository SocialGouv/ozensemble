import { capture } from '../../../services/sentry';
import { getAnswerScore } from '../../../components/Quizz/utils';

// Utils
export const computeScore = (questions, answers) => {
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return {
        gender: 'woman',
        score: 0,
      };
    }
    const questionKeys = Object.keys(answers).filter((key) => key !== 'gender');
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
      gender: answers.gender,
      score: score,
    };
  } catch (e) {
    capture('error in mapOnboardingAnswersToResult ' + e, {
      extra: { answers, message: 'cannot compute score of onboarding quizz' },
    });
  }
  if (answers.gender) {
    return {
      gender: answers.gender,
      score: 0,
    };
  }
  return {
    gender: 'woman',
    score: 0,
  };
};

const mapScoreToResult = (scoreAndGender) => {
  const gender = scoreAndGender.gender;
  const score = scoreAndGender.score;
  // woman first
  if (gender === 'woman') {
    if (score > 4) return 'addicted';
    if (score > 3) return 'risk';
    return 'good';
  }
  // then men
  if (gender === 'man') {
    if (score > 5) return 'addicted';
    if (score > 4) return 'risk';
    return 'good';
  }
};

export const mapOnboardingResultToMatomoProfile = (resultKey) => {
  switch (resultKey) {
    case 'nocif':
      return 4;
    case 'addicted':
      return 3;
    case 'risk':
      return 2;
    case 'good':
      return 1;
    default:
      return null;
  }
};

export const mapOnboardingAnswersToResult = (questions, answers) => mapScoreToResult(computeScore(questions, answers));
