import { atom } from 'recoil';
import { storage } from '../services/storage';
import { capture } from '../services/sentry';

const getInitStoredAnswers = (memoryKeyAnswers) => {
  const storedAnswers = storage.getString(memoryKeyAnswers);
  try {
    if (storedAnswers) return JSON.parse(storedAnswers);
    return {};
  } catch (e) {
    capture(e, { extra: { memoryKeyAnswers, storedAnswers } });
  }
};

const getInitStoredResult = (memoryKeyResult) => {
  const storedResultKey = storage.getString(memoryKeyResult);
  try {
    if (storedResultKey) return JSON.parse(storedResultKey);
    return null;
  } catch (e) {
    capture(e, { extra: { memoryKeyResult, storedResultKey } });
  }
};

export const autoEvaluationQuizzAnswersState = atom({
  key: 'autoEvaluationQuizzAnswersState',
  default: getInitStoredAnswers('@Quizz_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Quizz_answers', JSON.stringify(newValue)))],
});

export const autoEvaluationQuizzResultState = atom({
  key: 'autoEvaluationQuizzResultState',
  default: getInitStoredResult('@Quizz_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Quizz_result', JSON.stringify(newValue)))],
});

export const betterEvaluateQuizzAnswersState = atom({
  key: 'betterEvaluateQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzEvaluateConso_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzEvaluateConso_answers', JSON.stringify(newValue)))],
});

export const betterEvaluateQuizzResultState = atom({
  key: 'betterEvaluateQuizzResultState',
  default: getInitStoredResult('@QuizzEvaluateConso_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzEvaluateConso_result', JSON.stringify(newValue)))],
});

export const lifeQualityQuizzAnswersState = atom({
  key: 'lifeQualityQuizzAnswersState',
  default: getInitStoredResult('@QuizzLifeQuality_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzLifeQuality_answers', JSON.stringify(newValue)))],
});

export const lifeQualityQuizzResultState = atom({
  key: 'lifeQualityQuizzResultState',
  default: getInitStoredAnswers('@QuizzLifeQuality_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzLifeQuality_result', JSON.stringify(newValue)))],
});

export const motivationsQuizzAnswersState = atom({
  key: 'motivationsQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzMotivations_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzMotivations_answers', JSON.stringify(newValue)))],
});

export const motivationsQuizzResultState = atom({
  key: 'motivationsQuizzResultState',
  default: getInitStoredResult('@QuizzMotivations_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzMotivations_result', JSON.stringify(newValue)))],
});

export const riskSituationsQuizzAnswersState = atom({
  key: 'riskSituationsQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzRiskSituations_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzRiskSituations_answers', JSON.stringify(newValue)))],
});

export const riskSituationsQuizzResultState = atom({
  key: 'riskSituationsQuizzResultState',
  default: getInitStoredResult('@QuizzRiskSituations_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzRiskSituations_result', JSON.stringify(newValue)))],
});
