import React from 'react';
import Quizz from '../../../components/Quizz';
import { quizzDefi5Day3partie1AnswersState, quizzDefi5Day3partie1ResultState } from '../../../recoil/quizzs';
import questions from './questions';
import Results from './results';

const QuizzDefi5Day3 = ({ navigation, route }) => (
  <Quizz
    navigation={navigation}
    route={route}
    event="_DEFI5_DAY3_PARTIE1"
    questions={questions}
    recoilAnswersState={quizzDefi5Day3partie1AnswersState}
    recoilResultState={quizzDefi5Day3partie1ResultState}
    mapAnswersToResult={() => 1}
    Results={Results}
    calculateScore={false}
  />
);

export default QuizzDefi5Day3;
