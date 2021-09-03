import React from 'react';
import questionsLifeQuality from './questions';
import ResultsLifeQuality from './ResultsLifeQuality';
import { mapLifeQualityAnswersToResult } from './utils';
import CONSTANTS from '../../../reference/constants';
import Quizz from '../../../components/Quizz';

const QuizzLifeQuality = (props) => (
  <Quizz
    {...props}
    questions={questionsLifeQuality}
    memoryKeyResult={CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_RESULT}
    memoryKeyAnswers={CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_ANSWERS}
    mapAnswersToResult={mapLifeQualityAnswersToResult}
    Results={ResultsLifeQuality}
  />
);

export default QuizzLifeQuality;
