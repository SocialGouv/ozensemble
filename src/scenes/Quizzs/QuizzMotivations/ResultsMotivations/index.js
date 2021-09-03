import React from 'react';
import Header from './Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ navigation, results }) => {
  if (!results) return null;
  return (
    <FullScreenBackground>
      <Header navigation={navigation} />
      {!!results && (
        <ResultContainer>
          <Result results={results} />
        </ResultContainer>
      )}
    </FullScreenBackground>
  );
};

export default Results;
