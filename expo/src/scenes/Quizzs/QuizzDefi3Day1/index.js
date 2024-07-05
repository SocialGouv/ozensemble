import React from 'react';
import Quizz from '../../../components/quizz';
import { quizzDefi3Day1AnswersState, quizzDefi3Day1ResultState } from '../../../recoil/quizzs';
import questions from './questions';
import Results from './results';

const QuizzDefi3Day1 = ({ navigation, route }) => {
  return (
    <Quizz
      navigation={navigation}
      route={route}
      event="_DEFI3_DAY1"
      questions={questions}
      recoilAnswersState={quizzDefi3Day1AnswersState}
      recoilResultState={quizzDefi3Day1ResultState}
      mapAnswersToResult={() => 1}
      Results={Results}
      calculateScore={false}
    />
  );
};

export default QuizzDefi3Day1;
