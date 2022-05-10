import React from 'react';
import questionsEvaluateConso from './questions';
import { mapEvaluateConsoAnswersToResult } from './utils';
import ResultsEvaluateConso from './ResultsEvaluateConso';
import Quizz from '../../../components/Quizz';

const QuizzEvaluateConso = (props) => {
  return (
    <Quizz
      {...props}
      questions={questionsEvaluateConso}
      memoryKeyResult={'@QuizzEvaluateConso_result'}
      memoryKeyAnswers={'@QuizzEvaluateConso_answers'}
      mapAnswersToResult={mapEvaluateConsoAnswersToResult}
      Results={ResultsEvaluateConso}
    />
  );
};

export default QuizzEvaluateConso;
