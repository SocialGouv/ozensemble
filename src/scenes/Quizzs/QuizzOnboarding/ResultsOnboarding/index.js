import React from 'react';
import CONSTANTS from '../../../../reference/constants';
import ResultGood from './ResultGood';
import ResultRisk from './ResultRisk';
import ResultAddicted from './ResultAddicted';
import { EmptyView } from './styles';

const Results = ({ navigation, route, resultKey }) => {
  if (!resultKey) return null;
  switch (resultKey) {
    default:
    case null:
      return <EmptyView />;
    case CONSTANTS.RESULT_GOOD:
      return <ResultGood navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />;
    case CONSTANTS.RESULT_RISK:
      return <ResultRisk navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />;
    case CONSTANTS.RESULT_ADDICTED:
      return <ResultAddicted navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />;
  }
};

export default Results;
