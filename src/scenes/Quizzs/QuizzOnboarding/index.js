import React from 'react';
import Quizz from '../../../components/Quizz';
import questionsOnboarding from './questions';
import ResultsOnboarding from './ResultsOnboarding';
import { mapOnboardingAnswersToResult } from './utils';

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
