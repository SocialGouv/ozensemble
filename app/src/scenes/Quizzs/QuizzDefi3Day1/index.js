import React from 'react';
import Quizz from '../../../components/Quizz';
import { QuizzDefi3Day1AnswersState, QuizzDefi3Day1ResultState } from '../../../recoil/quizzs';
import questions from './questions';
import Results from './results';

const QuizzDefi3Day1 = (props) => (
  <Quizz
    {...props}
    event="_DEFI3_DAY1"
    questions={questions}
    recoilAnswersState={QuizzDefi3Day1AnswersState}
    recoilResultState={QuizzDefi3Day1ResultState}
    mapAnswersToResult={() => 1}
    Results={Results}
    calculateScore={false}
  />
);

export default QuizzDefi3Day1;
