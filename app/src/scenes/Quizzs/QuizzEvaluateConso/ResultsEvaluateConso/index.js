import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import { setValidatedDays } from '../../../Defis/utils';
import Header from '../../../Defis/Header';
import Sources from '../../Sources';
import Advise from './Advise';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { screenWidth } from '../../../../styles/theme';
import { betterEvaluateQuizzResultState } from '../../../../recoil/quizzs';

const QuizzEvaluateResultStack = createStackNavigator();

const ResultsEvaluateConsoNavigator = ({ route }) => {
  const resultKey = useRecoilValue(betterEvaluateQuizzResultState);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (resultKey && route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused, resultKey]);

  if (!resultKey) return null;
  return (
    <QuizzEvaluateResultStack.Navigator headerMode="none">
      <QuizzEvaluateResultStack.Screen
        name="RESULT"
        initialParams={{
          title: 'Mieux mesurer ma consommation',
          rootRoute: route?.params?.rootRoute,
        }}
        component={ResultsEvaluateConso}
      />
      <QuizzEvaluateResultStack.Screen name="ADVISE" component={Advise} />
    </QuizzEvaluateResultStack.Navigator>
  );
};

const Wrapper = ({ wrapped, children, inMyTests }) => {
  if (!wrapped) return <>{children}</>;
  if (wrapped) {
    return (
      <FullScreenBackground>
        <Header inMyTests={inMyTests} />
        <ResultContainer>
          {children}
          <Sources
            content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
          Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
          Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
          />
        </ResultContainer>
      </FullScreenBackground>
    );
  }
};

export const ResultsEvaluateConso = ({ wrapped = true, hideButtons = false, route }) => {
  const resultKey = useRecoilValue(betterEvaluateQuizzResultState);

  const inMyTests = route?.params?.rootRoute === 'QUIZZ_MENU';

  return (
    <Wrapper wrapped={wrapped} inMyTests={inMyTests}>
      <ResultAddiction value={resultKey?.scoreAddiction} />
      <ResultPopulation value={resultKey?.scoreArrow} hideButtons={hideButtons} />
    </Wrapper>
  );
};

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

export default ResultsEvaluateConsoNavigator;
