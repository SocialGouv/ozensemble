import React from 'react';
import EmptyView from '../../../../components/EmptyView';
import ResultAddicted from './ResultAddicted';
import ResultGood from './ResultGood';
import ResultRisk from './ResultRisk';

const Results = ({ navigation, route, resultKey }) => {
  if (!resultKey) return null;
  switch (resultKey) {
    default:
    case null:
      return <EmptyView />;
    case 'good':
      return <ResultGood route={route} navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />;
    case 'risk':
      return <ResultRisk route={route} navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />;
    case 'addicted':
      return (
        <ResultAddicted route={route} navigation={navigation} isInOnboarding={Boolean(route?.params?.onboarding)} />
      );
  }
};

export default Results;
