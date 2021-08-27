import React from 'react';
import Header from './Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';

const Results = ({ navigation, results }) => {
  console.log(results);
  if (!results) return null;
  return (
    <FullScreenBackground>
      <Header />
      <ResultContainer>{results ? <Result values={results} /> : null}</ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
