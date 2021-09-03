import React from 'react';
import questionsEvaluateConso from './questions';
import { mapEvaluateConsoAnswersToResult } from './utils';
import ResultsEvaluateConso from './ResultsEvaluateConso';
import CONSTANTS from '../../../reference/constants';
import Quizz from '../../../components/Quizz';

const QuizzEvaluateConso = (props) => {
  return (
    <Quizz
      {...props}
      questions={questionsEvaluateConso}
      memoryKeyResult={CONSTANTS.STORE_KEY_QUIZZ_EVALUATE_CONSO_RESULT}
      memoryKeyAnswers={CONSTANTS.STORE_KEY_QUIZZ_EVALUATE_CONSO_ANSWERS}
      mapAnswersToResult={mapEvaluateConsoAnswersToResult}
      Results={ResultsEvaluateConso}
    />
  );
};

export default QuizzEvaluateConso;
