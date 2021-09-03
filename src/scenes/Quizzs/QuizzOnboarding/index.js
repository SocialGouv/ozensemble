import React from 'react';
import questionsOnboarding from './questions';
import ResultsOnboarding from './ResultsOnboarding';
import { mapOnboardingAnswersToResult } from './utils';
import CONSTANTS from '../../../reference/constants';
import Quizz from '../../../components/Quizz';

const QuizzOnboarding = (props) => (
  <Quizz
    {...props}
    questions={questionsOnboarding}
    memoryKeyResult={CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_RESULT}
    memoryKeyAnswers={CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS}
    mapAnswersToResult={mapOnboardingAnswersToResult}
    Results={ResultsOnboarding}
  />
);

export default QuizzOnboarding;
