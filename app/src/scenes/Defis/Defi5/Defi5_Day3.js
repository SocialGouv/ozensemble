import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { P } from '../../../components/Articles';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import TextStyled from '../../../components/TextStyled';
import WrapperContainer from '../../../components/WrapperContainer';
import {
  lifeQualityQuizzResultState,
  relifeQualityQuizzAnswersState,
  relifeQualityQuizzResultState,
} from '../../../recoil/quizzs';
import { screenWidth } from '../../../styles/theme';
import QuizzDefi5Day3 from '../../Quizzs/QuizzDefi5Day3BetterLifeQuality';
import QuizzLifeQuality from '../../Quizzs/QuizzLifeQuality';
import questionsLifeQuality from '../../Quizzs/QuizzLifeQuality/questions';
import { setValidatedDays } from '../utils';

const Defi5_Day3_Stack = createStackNavigator();

const Defi5_Day3 = ({ route }) => {
  return (
    <Defi5_Day3_Stack.Navigator headerMode="none" initialRouteName="DEFI5_DAY3_ONBAORDING">
      <Defi5_Day3_Stack.Screen
        name="DEFI5_DAY3_ONBAORDING"
        component={Defi5_Day3_Onboarding}
        initialParams={route.params}
      />
      <Defi5_Day3_Stack.Screen
        name="DEFI5_DAY3_QUIZZ_PARTIE1"
        component={QuizzDefi5Day3}
        initialParams={{ ...route.params, cta: 'Je continue', nextRoute: 'DEFI5_DAY3_QUIZZ_PARTIE2' }}
      />
      <Defi5_Day3_Stack.Screen
        name="DEFI5_DAY3_QUIZZ_PARTIE2"
        component={QuizzLifeQualityRedo}
        initialParams={route.params}
      />
    </Defi5_Day3_Stack.Navigator>
  );
};

const Defi5_Day3_Onboarding = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Quelle évolution de ma qualité de vie après quatre semaines d'effort ?">
      <Element
        content={
          <>
            Nous vous suggérons d'abord d'évaluer{' '}
            <TextStyled bold> l'évolution globale de votre qualité de vie </TextStyled> sur les quatre dernières
            semaines.
          </>
        }
      />

      <ButtonPrimaryStyled content="Je suis prêt" onPress={() => navigation.navigate('DEFI5_DAY3_QUIZZ_PARTIE1')} />
    </WrapperContainer>
  );
};

const QuizzLifeQualityRedo = ({ navigation, route }) => (
  <QuizzLifeQuality
    navigation={navigation}
    route={route}
    event="_RE_QUALITE_DE_VIE"
    recoilAnswersState={relifeQualityQuizzAnswersState}
    recoilResultState={relifeQualityQuizzResultState}
    Results={Dfi5_Day3_ResultsReLifeQuality}
  />
);

const updatedResultsToDisplaySelector = selector({
  key: 'updatedResultsToDisplaySelector',
  get: ({ get }) => {
    const oldresultKey = get(lifeQualityQuizzResultState);
    const resultKey = get(relifeQualityQuizzResultState);
    if (!resultKey?.length) return null;
    return [...oldresultKey]
      .sort((a, b) => Number(b.score) - Number(a.score))
      .map((result) => {
        const question = questionsLifeQuality.find((q) => q.resultLabel === result.title);
        const oldAnswer = oldresultKey.find((r) => r.title === result.title).score;
        const newAnswer = resultKey.find((r) => r.title === result.title).score;

        const difference = newAnswer > oldAnswer ? 1 : newAnswer < oldAnswer ? -1 : 0;

        if (difference === 0) return { response: { sign: 'equal', color: '#39cec0' }, question };
        if (difference < 0) {
          const color = ['Handicap physique', 'Douleurs physiques', 'Frein psychique'].includes(question.resultLabel)
            ? '#28a745'
            : '#FF9933';
          return { response: { sign: 'down', color }, question };
        }
        const color = ['Handicap physique', 'Douleurs physiques', 'Frein psychique'].includes(question.resultLabel)
          ? '#FF9933'
          : '#28a745';
        return { response: { sign: 'up', color }, question };
      })
      .filter(Boolean);
  },
});

export const Dfi5_Day3_ResultsReLifeQuality = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const resultKey = useRecoilValue(relifeQualityQuizzAnswersState);

  useEffect(() => {
    if (resultKey && route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
  }, [route?.params, isFocused, resultKey]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="L'évolution des composantes de ma qualité de vie">
      <ResultsReLifeQuality />
      <ButtonsContainer>
        <ButtonPrimary
          onPress={() => {
            if (route?.params?.inDefi5) {
              navigation.navigate('DEFI5_MENU');
            } else {
              navigation.navigate('TESTS_DEFIS');
            }
          }}
          content="J'ai compris"
        />
      </ButtonsContainer>
    </WrapperContainer>
  );
};

export const ResultsReLifeQuality = () => {
  const resultKey = useRecoilValue(relifeQualityQuizzAnswersState);
  const resultsToDisplay = useRecoilValue(updatedResultsToDisplaySelector);

  if (!resultKey || !resultsToDisplay) return null;

  return (
    <ContainerSection>
      <ItemsContainer>
        {resultKey.length === 0 ? <P>Aucun élément à afficher.</P> : null}
        {resultsToDisplay.map(({ response, question }, i) => (
          <SignBlock key={i} response={response} question={question} />
        ))}
      </ItemsContainer>
    </ContainerSection>
  );
};

const SignBlock = ({ response, question }) => {
  return (
    <ItemContainer>
      <ItemStyled color={response.color}>
        <Svg
          width={screenWidth / 5}
          height={screenWidth / 5}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {response.sign === 'down' && (
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.934.732a9.608 9.608 0 0 1 10.475 2.084l24.369 24.37v-8.033a9.611 9.611 0 0 1 19.222 0v31.236A9.611 9.611 0 0 1 50.389 60H19.153a9.611 9.611 0 0 1 0-19.222h8.044L2.817 16.409A9.61 9.61 0 0 1 5.934.732Zm.28 5.483a4.802 4.802 0 0 0 0 6.795L34.698 41.48a2.403 2.403 0 0 1-1.699 4.102H19.153a4.806 4.806 0 0 0 0 9.611h31.236a4.806 4.806 0 0 0 4.805-4.805V19.153a4.806 4.806 0 0 0-9.61 0v13.834a2.403 2.403 0 0 1-4.102 1.698L13.01 6.215a4.808 4.808 0 0 0-3.399-1.41 4.802 4.802 0 0 0-3.398 1.41Z"
              fill="#fff"
            />
          )}
          {response.sign === 'up' && (
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M.732 54.066a9.608 9.608 0 0 1 2.084-10.474l24.37-24.37h-8.033a9.611 9.611 0 0 1 0-19.222h31.236A9.611 9.611 0 0 1 60 9.611v31.236a9.611 9.611 0 0 1-19.222 0v-8.044l-24.369 24.38A9.61 9.61 0 0 1 .732 54.066Zm5.483-.28a4.802 4.802 0 0 0 6.795 0L41.48 25.302a2.403 2.403 0 0 1 4.102 1.699v13.846a4.806 4.806 0 0 0 9.611 0V9.611a4.806 4.806 0 0 0-4.805-4.805H19.153a4.805 4.805 0 1 0 0 9.61h13.834a2.403 2.403 0 0 1 1.698 4.102L6.215 46.99a4.808 4.808 0 0 0-1.41 3.399 4.802 4.802 0 0 0 1.41 3.398Z"
              fill="#fff"
            />
          )}
          {response.sign === 'equal' && (
            <>
              <Rect x={2} y={13} width={56} height={8} rx={4} stroke="#fff" strokeWidth={4} />
              <Rect x={2} y={38} width={56} height={8} rx={4} stroke="#fff" strokeWidth={4} />
            </>
          )}
        </Svg>
      </ItemStyled>
      <TextStyled bold center>
        {question.resultLabel}
      </TextStyled>
    </ItemContainer>
  );
};

const ItemStyled = styled.View`
  width: ${screenWidth / 3}px;
  height: ${screenWidth / 3}px;
  margin-bottom: 5px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color || '#fff'};
  border-radius: 30px;
`;

const ItemContainer = styled.View`
  width: ${screenWidth / 3}px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

const ContainerSection = styled.View`
  padding-vertical: 20px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const ButtonsContainer = styled.View`
  margin-top: 40px;
  align-items: center;
  width: 100%;
`;

export default Defi5_Day3;
