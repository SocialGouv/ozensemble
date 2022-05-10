import React from 'react';
import styled from 'styled-components';
import { Linking } from 'react-native';

import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';
import { Content as ResultsEvaluateConso } from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';
import ResultLifeQuality from '../../Quizzs/QuizzLifeQuality/ResultsLifeQuality/Result';
import ResultMotivation from '../../Quizzs/QuizzMotivations/ResultsMotivations/Result';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';

import Sources from '../../Quizzs/Sources';

export default ({ navigation }) => {
  const [{ resultEvaluateConso, resultLifeQuality, resultMotivation }, setGlobalResults] = React.useState({});
  const setResults = (newState) => setGlobalResults((oldState) => ({ ...oldState, ...newState }));

  const getResultsFromStorage = async (memoryKeyAnswers, memoryKeyResult, key, cb) => {
    const r = await fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
    cb({ [key]: r });
  };
  React.useEffect(() => {
    getResultsFromStorage(
      '@QuizzEvaluateConso_answers',
      '@QuizzEvaluateConso_result',
      'resultEvaluateConso',
      setResults
    );
    getResultsFromStorage('@QuizzLifeQuality_answers', '@QuizzLifeQuality_result', 'resultLifeQuality', setResults);
    getResultsFromStorage('@QuizzMotivations_answers', '@QuizzMotivations_result', 'resultMotivation', setResults);
  }, []);

  React.useEffect(() => {
    console.log({ resultEvaluateConso, resultLifeQuality, resultMotivation });
  }, [resultEvaluateConso, resultLifeQuality, resultMotivation]);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">Le bilan de mon Défi 7 jours</H1>
          </TopTitle>
          {/* TODO HERE */}
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

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
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
`;

const AddConsoCTAContainer = styled.View`
  margin-bottom: 100px;
  align-items: center;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
`;
const IconWrapper = styled.View`
  align-items: center;
`;
const Volume = styled(TextStyled)`
  margin-top: 5px;
`;
const EqualWrapper = styled.View`
  padding: 10px;
  padding-bottom: 50px;
`;
