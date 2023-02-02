import React from 'react';
import Quizz from '../../../components/quizz';
import questionsLifeQuality from './questions';
import { mapLifeQualityAnswersToResult } from './utils';

/* Used in Defi1_Day4 */
/* Used in Defi5_Day3 */
const QuizzLifeQuality = ({ navigation, route, event, recoilAnswersState, recoilResultState, Results }) => (
  <Quizz
    navigation={navigation}
    route={route}
    event={event}
    questions={questionsLifeQuality}
    recoilAnswersState={recoilAnswersState}
    recoilResultState={recoilResultState}
    mapAnswersToResult={mapLifeQualityAnswersToResult}
    Results={Results}
  />
);

export default QuizzLifeQuality;
