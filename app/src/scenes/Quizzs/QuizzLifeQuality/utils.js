import { findQuestion, getAnswerScore } from '../../../components/Quizz/utils';
import { capture } from '../../../services/sentry';

// Utils

export const mapLifeQualityAnswersToResult = (questions, answers) => {
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return [];
    }
    const questionKeys = Object.keys(answers);
    let res = [];
    for (let questionKey of questionKeys) {
      const answerKey = answers[questionKey];
      if (!answerKey) {
        capture('error computing score of these answers for quizz life quality', { extra: { answers } });
        continue;
      }
      const question = findQuestion(questions, questionKey);
      res.push({ title: question.resultLabel, score: getAnswerScore(questions, answers, questionKey) });
    }
    return res;
  } catch (e) {
    capture('error in mapLifeQualityAnswersToResult ' + e, { extra: { answers } });
  }
  return [];
};
