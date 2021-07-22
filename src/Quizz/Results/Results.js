import React from 'react';
import CONSTANTS from '../../reference/constants';
import ResultGood from './ResultGood';
import ResultRisk from './ResultRisk';
import ResultAddicted from './ResultAddicted';
import { EmptyView } from './styles';

const Results = ({ navigation, resultKey }) => {
  const backToQuizz = async () => {
    navigation.navigate('QUIZZ_QUESTIONS', { screen: 'QUIZZ_QUESTION_1' });
  };

  switch (resultKey) {
    default:
    case null:
      return <EmptyView />;
    case CONSTANTS.RESULT_GOOD:
      return <ResultGood navigation={navigation} backToQuizz={backToQuizz} />;
    case CONSTANTS.RESULT_RISK:
      return <ResultRisk navigation={navigation} backToQuizz={backToQuizz} />;
    case CONSTANTS.RESULT_ADDICTED:
      return <ResultAddicted navigation={navigation} backToQuizz={backToQuizz} />;
  }
};

export default Results;
