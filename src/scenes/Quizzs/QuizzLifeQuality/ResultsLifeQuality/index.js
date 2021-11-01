import React from 'react';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/Defi7Days/utils';
import Sources from '../../Sources';

const Results = ({ resultKey, route }) => {
  if (!resultKey) return null;

  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });

  return (
    <FullScreenBackground>
      <Header />
      <ResultContainer>
        {resultKey ? (
          <>
            <Result values={resultKey} />
            <Sources content="“How to Score and Interpret Single-Item Health Status Measures: A Manual for Users of the SF-8 Health Survey” Ware, Kosinski, Dewey & Gandek, 2001." />
          </>
        ) : null}
      </ResultContainer>
    </FullScreenBackground>
  );
};

export default Results;
