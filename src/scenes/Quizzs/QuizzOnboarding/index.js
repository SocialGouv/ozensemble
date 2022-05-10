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
    memoryKeyResult={'@Quizz_result'}
    memoryKeyAnswers={'@Quizz_answers'}
    mapAnswersToResult={mapOnboardingAnswersToResult}
    Results={ResultsOnboarding}
  />
);

export default QuizzOnboarding;
