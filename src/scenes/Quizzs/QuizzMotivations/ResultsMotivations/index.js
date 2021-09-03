import React from 'react';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ results }) => {
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
