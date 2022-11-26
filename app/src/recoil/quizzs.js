import { atom, selector } from 'recoil';
import { storage } from '../services/storage';
import { capture } from '../services/sentry';
import riskSituations from '../scenes/Quizzs/QuizzRiskSituations/riskSituations';
import Matomo from '../services/matomo';
import { mapOnboardingResultToMatomoProfile } from '../scenes/Quizzs/QuizzOnboarding/utils';
import CONSTANTS from '../reference/constants';

const getInitStoredAnswers = (memoryKeyAnswers, defaultValue = {}) => {
  const storedAnswers = storage.getString(memoryKeyAnswers);
  try {
    if (storedAnswers) return JSON.parse(storedAnswers);
    return defaultValue;
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
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Quizz_result', JSON.stringify(newValue));
        Matomo.setCustomDimensions({
          [CONSTANTS.MATOMO_CUSTOM_DIM_PROFILE]: mapOnboardingResultToMatomoProfile(newValue),
        });
      }),
  ],
});

export const betterEvaluateQuizzAnswersState = atom({
  key: 'betterEvaluateQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzEvaluateConso_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzEvaluateConso_answers', JSON.stringify(newValue)))],
});

export const betterEvaluateQuizzResultState = atom({
  key: 'betterEvaluateQuizzResultState',
  default: getInitStoredResult('@QuizzEvaluateConso_result'),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@QuizzEvaluateConso_result', JSON.stringify(newValue));
        Matomo.setCustomDimensions({
          [CONSTANTS.MATOMO_CUSTOM_DIM_PROFILE]: mapOnboardingResultToMatomoProfile(newValue.scoreAddiction),
        });
      }),
  ],
});

export const lifeQualityQuizzAnswersState = atom({
  key: 'lifeQualityQuizzAnswersState',
  default: getInitStoredResult('@QuizzLifeQuality_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzLifeQuality_answers', JSON.stringify(newValue)))],
});

export const lifeQualityQuizzResultState = atom({
  key: 'lifeQualityQuizzResultState',
  default: getInitStoredAnswers('@QuizzLifeQuality_result', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzLifeQuality_result', JSON.stringify(newValue)))],
});

export const motivationsQuizzAnswersState = atom({
  key: 'motivationsQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzMotivations_answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzMotivations_answers', JSON.stringify(newValue)))],
});

export const motivationsQuizzResultState = atom({
  key: 'motivationsQuizzResultState',
  default: getInitStoredResult('@QuizzMotivations_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzMotivations_result', JSON.stringify(newValue)))],
});

export const Defi3_Day3_Answers_Difficulties_State = atom({
  key: 'Defi3_Day3_Answers_Difficulties_State',
  default: getInitStoredAnswers('@Defi3_Day3_answers_Difficulties', []),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@Defi3_Day3_answers_Difficulties', JSON.stringify(newValue))),
  ],
});

export const Defi3_Day3_Answers_Help_State = atom({
  key: 'Defi3_Day3_Answers_Help_State',
  default: getInitStoredAnswers('@Defi3_Day3_answers_Help', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi3_Day3_answers_Help', JSON.stringify(newValue)))],
});

export const Defi4_Day5_Answers_State = atom({
  key: 'Defi4_Day5_Answers_State',
  default: getInitStoredAnswers('@Defi4_Day5_Answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi4_Day5_Answers', JSON.stringify(newValue)))],
});

export const Defi4_Day5_ResultState = atom({
  key: 'Defi4_Day5_ResultState',
  default: getInitStoredAnswers('@Defi4_Day5_Result', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi4_Day5_Result', JSON.stringify(newValue)))],
});

export const Defi3_Day3_ResultState = atom({
  key: 'Defi3_Day3_ResultState',
  default: getInitStoredResult('@Defi3_Day3_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi3_Day3_result', JSON.stringify(newValue)))],
});

export const riskSituationsQuizzAnswersState = atom({
  key: 'riskSituationsQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzRiskSituations_answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzRiskSituations_answers', JSON.stringify(newValue)))],
});

export const riskSituationsQuizzResultState = atom({
  key: 'riskSituationsQuizzResultState',
  default: getInitStoredResult('@QuizzRiskSituations_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzRiskSituations_result', JSON.stringify(newValue)))],
});

export const riskSituationsAnswersKeysSelector = selector({
  key: 'riskSituationsAnswersKeysSelector',
  get: ({ get }) => {
    const riskSituationsQuizzAnswers = get(riskSituationsQuizzAnswersState);
    return riskSituationsQuizzAnswers.map((answerKey) =>
      riskSituations
        .find((section) => section.answers.map((a) => a.answerKey).includes(answerKey))
        ?.answers?.find((a) => a.answerKey === answerKey)
    );
  },
});

export const QuizzDefi3Day1AnswersState = atom({
  key: 'QuizzDefi3Day1AnswersState',
  default: getInitStoredAnswers('@QuizzDefi3Day1_answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi3Day1_answers', JSON.stringify(newValue)))],
});

export const QuizzDefi3Day1ResultState = atom({
  key: 'QuizzDefi3Day1ResultState',
  default: getInitStoredResult('@QuizzDefi3Day1_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi3Day1_result', JSON.stringify(newValue)))],
});

export const QuizzDefi3Day5AnswersState = atom({
  key: 'QuizzDefi3Day5AnswersState',
  default: getInitStoredAnswers('@QuizzDefi3Day5_answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi3Day5_answers', JSON.stringify(newValue)))],
});

export const QuizzDefi3Day5ResultState = atom({
  key: 'QuizzDefi3Day5ResultState',
  default: getInitStoredResult('@QuizzDefi3Day5_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi3Day5_result', JSON.stringify(newValue)))],
});

export const reevaluateQuizzAnswersState = atom({
  key: 'reevaluateQuizzAnswersState',
  default: getInitStoredAnswers('@QuizzReevaluateConso_answers'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzReevaluateConso_answers', JSON.stringify(newValue)))],
});

export const reevaluateQuizzResultState = atom({
  key: 'reevaluateQuizzResultState',
  default: getInitStoredResult('@QuizzReevaluateConso_result'),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@QuizzReevaluateConso_result', JSON.stringify(newValue));
      }),
  ],
});

export const Defi5_Day2_Answers_State = atom({
  key: 'Defi5_Day2_Answers_State',
  default: getInitStoredAnswers('@Defi5_Day2_Answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day2_Answers', JSON.stringify(newValue)))],
});

export const Defi5_Day2_ResultState = atom({
  key: 'Defi5_Day2_ResultState',
  default: getInitStoredAnswers('@Defi5_Day2_Result', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day2_Result', JSON.stringify(newValue)))],
});

export const quizzDefi5Day3partie1AnswersState = atom({
  key: 'quizzDefi5Day3partie1AnswersState',
  default: getInitStoredAnswers('@QuizzDefi5Day3partie1_answers', []),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi5Day3partie1_answers', JSON.stringify(newValue))),
  ],
});

export const quizzDefi5Day3partie1ResultState = atom({
  key: 'quizzDefi5Day3partie1ResultState',
  default: getInitStoredResult('@QuizzDefi5Day3partie1_result'),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi5Day3partie1_result', JSON.stringify(newValue)))],
});

export const relifeQualityQuizzAnswersState = atom({
  key: 'relifeQualityQuizzAnswersState',
  default: getInitStoredResult('@QuizzDefi5Day3partie2_answers'),
  effects: [
    ({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi5Day3partie2_answers', JSON.stringify(newValue))),
  ],
});

export const relifeQualityQuizzResultState = atom({
  key: 'relifeQualityQuizzResultState',
  default: getInitStoredAnswers('@QuizzDefi5Day3partie2_result', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@QuizzDefi5Day3partie2_result', JSON.stringify(newValue)))],
});

export const Defi5_Day4_Answers_State = atom({
  key: 'Defi5_Day4_Answers_State',
  default: getInitStoredAnswers('@Defi5_Day4_Answers', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day4_Answers', JSON.stringify(newValue)))],
});

export const Defi5_Day4_ResultState = atom({
  key: 'Defi5_Day4_ResultState',
  default: getInitStoredAnswers('@Defi5_Day4_Result', []),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day4_Result', JSON.stringify(newValue)))],
});

export const Defi5_Day5_Answers_State = atom({
  key: 'Defi5_Day5_Answers_State',
  default: getInitStoredAnswers('@Defi5_Day5_Answers', ''),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day5_Answers', JSON.stringify(newValue)))],
});

export const Defi5_Day5_ResultState = atom({
  key: 'Defi5_Day5_ResultState',
  default: getInitStoredAnswers('@Defi5_Day5_Result', false),
  effects: [({ onSet }) => onSet((newValue) => storage.set('@Defi5_Day5_Result', JSON.stringify(newValue)))],
});
