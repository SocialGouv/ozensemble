import React from 'react';
import EmptyView from '../../../../components/EmptyView';
import Result from './Result';
import ResultRisk from './ResultRisk';
import ResultGood from './ResultGood';
import ResultAddicted from './ResultAddicted';

const Results = ({ navigation, route, resultKey }) => {
  if (!resultKey) return null;
  // return resultKey ? (
  //   <Result
  //     result={resultKey}
  //     route={route}
  //     navigation={navigation}
  //     isInOnboarding={Boolean(route?.params?.onboarding)}
  //   />
  // ) : (
  //   <EmptyView />
  // );

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
