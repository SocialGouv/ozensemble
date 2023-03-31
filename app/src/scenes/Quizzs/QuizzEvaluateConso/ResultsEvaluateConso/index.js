import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import { setValidatedDays } from '../../../Defis/utils';
import HeaderQuizzsResult from '../../../Defis/HeaderQuizzsResult';
import Sources from '../../Sources';
import Advise from './Advise';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { betterEvaluateQuizzResultState } from '../../../../recoil/quizzs';
import TextStyled from '../../../../components/TextStyled';
import { defaultPaddingFontScale } from '../../../../styles/theme';
import { storage } from '../../../../services/storage';
import API from '../../../../services/api';

const QuizzEvaluateResultStack = createStackNavigator();

const ResultsEvaluateConsoNavigator = ({ route }) => {
  const resultKey = useRecoilValue(betterEvaluateQuizzResultState);
  const isFocused = useIsFocused();

  useEffect(() => {
    const matomoId = storage.getString('@UserIdv2');
    if (!isFocused) {
      API.post({
        path: '/defis/display',
        body: {
          matomoId: matomoId,
        },
      });
    }
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
  const route = useRoute();
  if (!wrapped) return <>{children}</>;
  if (wrapped) {
    return (
      <HeaderQuizzsResult title={route?.params?.title} inMyTests={inMyTests}>
        <ResultContainer backgroundColor="#efefef">{children}</ResultContainer>
        <ResultContainer backgroundColor="transparent">
          <Sources>
            <TextStyled>
              Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
              Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
              Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
            </TextStyled>
          </Sources>
        </ResultContainer>
      </HeaderQuizzsResult>
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
  ${(props) => `background-color: ${props.backgroundColor};`}
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;
export default ResultsEvaluateConsoNavigator;
