import React from 'react';
import EmptyView from '../../../../components/EmptyView';
import Result from './Result';

const Results = ({ navigation, route, resultKey }) => {
  if (!resultKey) return null;
  return resultKey ? (
    <Result
      result={resultKey}
      route={route}
      navigation={navigation}
      isInOnboarding={Boolean(route?.params?.onboarding)}
    />
  ) : (
    <EmptyView />
  );
};

export default Results;
