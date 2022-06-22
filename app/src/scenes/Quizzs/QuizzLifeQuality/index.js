import React from 'react';
import Quizz from '../../../components/Quizz';
import { lifeQualityQuizzAnswersState, lifeQualityQuizzResultState } from '../../../recoil/quizzs';
import questionsLifeQuality from './questions';
import ResultsLifeQuality from './ResultsLifeQuality';
import { mapLifeQualityAnswersToResult } from './utils';

const QuizzLifeQuality = (props) => (
  <Quizz
    {...props}
    event="_QUALITE_DE_VIE"
    questions={questionsLifeQuality}
    recoilAnswersState={lifeQualityQuizzAnswersState}
    recoilResultState={lifeQualityQuizzResultState}
    mapAnswersToResult={mapLifeQualityAnswersToResult}
    Results={ResultsLifeQuality}
  />
);

export default QuizzLifeQuality;
