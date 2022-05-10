import React from 'react';
import questionsLifeQuality from './questions';
import ResultsLifeQuality from './ResultsLifeQuality';
import { mapLifeQualityAnswersToResult } from './utils';
import Quizz from '../../../components/Quizz';

const QuizzLifeQuality = (props) => (
  <Quizz
    {...props}
    questions={questionsLifeQuality}
    memoryKeyResult={'@QuizzLifeQuality_result'}
    memoryKeyAnswers={'@QuizzLifeQuality_answers'}
    mapAnswersToResult={mapLifeQualityAnswersToResult}
    Results={ResultsLifeQuality}
  />
);

export default QuizzLifeQuality;
