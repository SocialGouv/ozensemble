import React from 'react';
import CONSTANTS from '../../../../reference/constants';
import ResultGood from './ResultGood';
import ResultRisk from './ResultRisk';
import ResultAddicted from './ResultAddicted';
import { EmptyView } from './styles';

const Results = ({ navigation, resultKey }) => {
  if (!resultKey) return null;
  switch (resultKey) {
    default:
    case null:
      return <EmptyView />;
    case CONSTANTS.RESULT_GOOD:
      return <ResultGood navigation={navigation} />;
    case CONSTANTS.RESULT_RISK:
      return <ResultRisk navigation={navigation} />;
    case CONSTANTS.RESULT_ADDICTED:
      return <ResultAddicted navigation={navigation} />;
  }
};

export default Results;
