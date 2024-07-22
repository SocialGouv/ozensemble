import React from 'react';
import Quizz from '../../../components/quizz';
import { autoEvaluationQuizzAnswersState, autoEvaluationQuizzResultState } from '../../../recoil/quizzs';
import questionsOnboarding from './questions';
import ResultsOnboarding from './ResultsOnboarding';
import { mapOnboardingAnswersToResult } from './utils';

const QuizzOnboarding = ({ navigation, route }) => (
  <Quizz
    navigation={navigation}
    route={route}
    questions={questionsOnboarding}
    recoilAnswersState={autoEvaluationQuizzAnswersState}
    recoilResultState={autoEvaluationQuizzResultState}
    mapAnswersToResult={mapOnboardingAnswersToResult}
    Results={ResultsOnboarding}
  />
);

export default QuizzOnboarding;
