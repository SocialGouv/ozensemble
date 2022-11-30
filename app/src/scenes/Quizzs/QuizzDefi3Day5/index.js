import React from 'react';
import Quizz from '../../../components/Quizz';
import { quizzDefi3Day5AnswersState, quizzDefi3Day5ResultState } from '../../../recoil/quizzs';
import questions from './questions';
import Results from './results';

const QuizzDefi3Day5 = ({ navigation, route }) => (
  <Quizz
    navigation={navigation}
    route={route}
    event="_DEFI3_DAY5"
    questions={questions}
    recoilAnswersState={quizzDefi3Day5AnswersState}
    recoilResultState={quizzDefi3Day5ResultState}
    mapAnswersToResult={() => 1}
    Results={Results}
    calculateScore={false}
  />
);

export default QuizzDefi3Day5;
