import React from 'react';
import { betterEvaluateQuizzAnswersState, betterEvaluateQuizzResultState } from '../../../recoil/quizzs';
import QuizzEvaluateConso from '../../Quizzs/QuizzEvaluateConso';
import ResultsEvaluateConsoNavigator from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';

const Defi1_Day2 = ({ navigation, route }) => (
  <QuizzEvaluateConso
    navigation={navigation}
    route={route}
    event="_MIEUX_MESURER_MA_CONSO"
    recoilAnswersState={betterEvaluateQuizzAnswersState}
    recoilResultState={betterEvaluateQuizzResultState}
    Results={ResultsEvaluateConsoNavigator}
  />
);

export default Defi1_Day2;
