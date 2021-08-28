import React from 'react';
import Header from './Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ navigation, resultKey }) => {
  console.log(resultKey);
  if (!resultKey) return null;
  return (
    <FullScreenBackground>
      <Header navigation={navigation} />
      <ResultContainer>
        {resultKey ? <Result values={resultKey?.filter((r) => r.score !== 0)} /> : null}
      </ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
