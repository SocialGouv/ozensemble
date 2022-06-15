import React from 'react';
import Quizz from '../../../components/Quizz';
import { betterEvaluateQuizzAnswersState, betterEvaluateQuizzResultState } from '../../../recoil/quizzs';
import questionsEvaluateConso from './questions';
import ResultsEvaluateConso from './ResultsEvaluateConso';
import { mapEvaluateConsoAnswersToResult } from './utils';

const QuizzEvaluateConso = (props) => {
  return (
    <Quizz
      {...props}
      questions={questionsEvaluateConso}
      recoilAnswersState={betterEvaluateQuizzAnswersState}
      recoilResultState={betterEvaluateQuizzResultState}
      mapAnswersToResult={mapEvaluateConsoAnswersToResult}
      Results={ResultsEvaluateConso}
    />
  );
};

export default QuizzEvaluateConso;
