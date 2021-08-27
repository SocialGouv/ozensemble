import questions from './questions';
import CONSTANTS from '../../../reference/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

// Utils
const findQuestion = (questionKey) => questions.find((question) => question.questionKey === questionKey);
const findAnswer = ({ answers }, answerKey) => answers.find((answer) => answer.answerKey === answerKey);

export const mapAnswersToResult = (answers) => {
  console.log({ answers });
  try {
    if (!Object.values(answers).filter(Boolean).length) {
      return [];
    }
    const questionKeys = Object.keys(answers);
    let res = [];
    for (let questionKey of questionKeys) {
      console.log({ questionKey });
      const answerKey = answers[questionKey];
      if (!answerKey) {
        console.log('error computing score of these answers: ' + JSON.stringify(answers));
        Sentry.captureMessage('error computing score of these answers: ' + JSON.stringify(answers));
        continue;
      }
      const question = findQuestion(questionKey);
      const answer = findAnswer(findQuestion(questionKey), answers[questionKey]);
      res.push({ title: question.resultLabel, score: answer.score });
    }
    return res;
  } catch (e) {
    console.log(e);
    Sentry.captureMessage('cannot compute score of these answers: ' + JSON.stringify(answers));
    Sentry.captureException(e);
  }
  return [];
};
