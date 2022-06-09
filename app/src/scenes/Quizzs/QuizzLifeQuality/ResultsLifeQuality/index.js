import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components';
import Header from '../../../Defis/Header';
import Result from './Result';
import { setValidatedDays } from '../../../Defis/Defi7Days/utils';
import Sources from '../../Sources';
import { screenWidth } from '../../../../styles/theme';

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

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

export default Results;
