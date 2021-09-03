import React from 'react';
import Header from '../../../Defis/Header';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ resultKey, route }) => {
  if (!resultKey) return null;
  return (
    <FullScreenBackground>
      <Header />
      <ResultContainer>
        <ResultAddiction value={resultKey?.scoreAddiction} />
        <ResultPopulation value={resultKey?.scorePopulation} />
      </ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
