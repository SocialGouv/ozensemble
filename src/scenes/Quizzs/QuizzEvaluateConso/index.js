import React from 'react';
import Quizz from '../../../components/Quizz';
import questionsEvaluateConso from './questions';
import ResultsEvaluateConso from './ResultsEvaluateConso';
import { mapEvaluateConsoAnswersToResult } from './utils';

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
