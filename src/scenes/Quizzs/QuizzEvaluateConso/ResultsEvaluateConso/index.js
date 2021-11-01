import React from 'react';
import Header from '../../../Defis/Header';
import ResultAddiction from './ResultAddiction';
import ResultPopulation from './ResultPopulation';
import { FullScreenBackground, ResultContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from '../../../Defis/Defi7Days/utils';
import { createStackNavigator } from '@react-navigation/stack';
import Advise from './Advise';
import Sources from '../../Sources';

const QuizzEvaluateResultStack = createStackNavigator();

export default (props) => (
  <QuizzEvaluateResultStack.Navigator headerMode="none">
    <QuizzEvaluateResultStack.Screen
      name="RESULT"
      initialParams={{
        title: 'Évaluer sa consommation',
        ...props?.route?.params,
      }}>
      {() => <Results {...props} />}
    </QuizzEvaluateResultStack.Screen>
    <QuizzEvaluateResultStack.Screen name="ADVISE" component={Advise} />
  </QuizzEvaluateResultStack.Navigator>
);

const Results = ({ resultKey, route }) => {
  if (!resultKey) return null;

  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });

  return (
    <FullScreenBackground>
      <Header />
      <ResultContainer>
        <Content resultKey={resultKey} />
        <Sources
          content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
        />
      </ResultContainer>
    </FullScreenBackground>
  );
};

export const Content = ({ resultKey, hideButtons }) => (
  <>
    <ResultAddiction value={resultKey?.scoreAddiction} />
    <ResultPopulation value={resultKey?.scoreArrow} hideButtons={hideButtons} />
  </>
);
