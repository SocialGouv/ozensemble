import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/Defi7Days/utils';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ results, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (results && route?.params?.inDefi7Days) setValidatedDays(route?.params?.day);
  }, [route?.params, isFocused, results]);

  if (!results) return null;
  return (
    <FullScreenBackground>
      <Header />
      {!!results && (
        <ResultContainer>
          <Result results={results} />
        </ResultContainer>
      )}
    </FullScreenBackground>
  );
};

export default Results;
