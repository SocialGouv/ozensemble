import React from 'react';
import Header from './Header';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ navigation, resultKey }) => {
  console.log({ resultKey });
  if (!resultKey) return null;
  return (
    <FullScreenBackground>
      <Header navigation={navigation} />
      <ResultContainer>
        <ResultAddiction value={resultKey?.scoreAddiction} />
        <ResultPopulation value={resultKey?.scorePopulation} navigation={navigation} />
      </ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
