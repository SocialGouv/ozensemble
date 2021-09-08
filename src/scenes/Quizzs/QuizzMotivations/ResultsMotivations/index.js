import React from 'react';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/Defi7Days/Defi7Days';

const Results = ({ results, route }) => {
  if (!results) return null;

  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });

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
