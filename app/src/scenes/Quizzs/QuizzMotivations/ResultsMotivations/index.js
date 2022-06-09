import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/utils';
import Header from '../../../Defis/Header';
import Result from './Result';
import { screenWidth } from '../../../../styles/theme';

const Results = ({ results, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (results && route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused, results]);

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
