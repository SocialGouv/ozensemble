import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';

import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';
import H1 from '../../../components/H1';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';
import TextStyled from '../../../components/TextStyled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { Content as ResultsEvaluateConso } from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';
import ResultLifeQuality from '../../Quizzs/QuizzLifeQuality/ResultsLifeQuality/Result';
import ResultMotivation from '../../Quizzs/QuizzMotivations/ResultsMotivations/Result';

import Sources from '../../Quizzs/Sources';

export default ({ navigation }) => {
  const [{ resultEvaluateConso, resultLifeQuality, resultMotivation }, setGlobalResults] = useState({});
  const setResults = (newState) => setGlobalResults((oldState) => ({ ...oldState, ...newState }));

  const getResultsFromStorage = (memoryKeyAnswers, memoryKeyResult, key, cb) => {
    const r = fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
    cb({ [key]: r });
  };
  useEffect(() => {
    getResultsFromStorage(
      '@QuizzEvaluateConso_answers',
      '@QuizzEvaluateConso_result',
      'resultEvaluateConso',
      setResults
    );
    getResultsFromStorage('@QuizzLifeQuality_answers', '@QuizzLifeQuality_result', 'resultLifeQuality', setResults);
    getResultsFromStorage('@QuizzMotivations_answers', '@QuizzMotivations_result', 'resultMotivation', setResults);
  }, []);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">Le bilan de mon Défi 7 jours</H1>
          </TopTitle>
          <ResultsEvaluateConso resultKey={resultEvaluateConso?.result} hideButtons />
          <ResultLifeQuality values={resultLifeQuality?.result} />
          <ResultMotivation results={resultMotivation?.answers} />
          <Sources
            content={
              <TextStyled>
                Santé publique France,{'\n'}
                <TextStyled
                  color="#4030a5"
                  onPress={() => {
                    Linking.openURL(
                      'https://www.santepubliquefrance.fr/les-actualites/2017/avis-d-experts-relatif-a-l-evolution-du-discours-public-en-matiere-de-consommation-d-alcool-en-france-organise-par-sante-publique-france-et-l-insti'
                    );
                  }}>
                  Voir l'article sur santepubliquefrance.fr
                </TextStyled>
                {'\n\n'}
                Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
                Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful
                Alcohol Consumption II. Addiction 1993 Jun ; 88(6) : 791-804.
                {'\n\n'}
                “How to Score and Interpret Single-Item Health Status Measures: A Manual for Users of the SF-8 Health
                Survey” Ware, Kosinski, Dewey & Gandek, 2001.
              </TextStyled>
            }
          />
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const TopContainer = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
  padding-bottom: 100px;
`;

const Spacer = styled.View`
  width: 5%;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`;
