import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Header from '../../../Defis/Header';
import Result from './Result';
import { FullScreenBackground, ResultContainer } from './styles';
import { setValidatedDays } from '../../../Defis/Defi7Days/utils';
import Sources from '../../Sources';

const Results = ({ resultKey, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (resultKey && route?.params?.inDefi7Days) setValidatedDays(route?.params?.day);
  }, [route?.params, isFocused, resultKey]);

  if (!resultKey) return null;

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
