import React from 'react';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ resultKey }) => {
  if (!resultKey) return null;
  return (
    <FullScreenBackground>
      <Header />
      <ResultContainer>
        {resultKey ? <Result values={resultKey?.filter((r) => r.score !== 0)} /> : null}
      </ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
