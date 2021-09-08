import React from 'react';
import Header from '../../../Defis/Header';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { FullScreenBackground, ResultContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/Defi7Days/Defi7Days';

const Results = ({ resultKey, route }) => {
  if (!resultKey) return null;

  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });

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
