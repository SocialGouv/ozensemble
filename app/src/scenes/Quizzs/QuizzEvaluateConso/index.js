import React from 'react';
import Quizz from '../../../components/quizz';
import questionsEvaluateConso from './questions';
import { mapEvaluateConsoAnswersToResult } from './utils';

/* Used in Defi1_Day2 */
/* Used in Defi5_Day1 */
const QuizzEvaluateConso = ({ navigation, route, event, recoilAnswersState, recoilResultState, Results }) => (
  <Quizz
    navigation={navigation}
    route={route}
    event={event}
    questions={questionsEvaluateConso}
    mapAnswersToResult={mapEvaluateConsoAnswersToResult}
    recoilAnswersState={recoilAnswersState}
    recoilResultState={recoilResultState}
    Results={Results}
  />
);

export default QuizzEvaluateConso;
