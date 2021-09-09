import React from 'react';
import styled from 'styled-components';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';
import { Content as ResultsEvaluateConso } from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';
import ResultLifeQuality from '../../Quizzs/QuizzLifeQuality/ResultsLifeQuality/Result';
import ResultMotivation from '../../Quizzs/QuizzMotivations/ResultsMotivations/Result';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';

import CONSTANTS from '../../../reference/constants';

export default ({ navigation }) => {
  const [{ resultEvaluateConso, resultLifeQuality, resultMotivation }, setGlobalResults] = React.useState({});
  const setResults = (newState) => setGlobalResults((oldState) => ({ ...oldState, ...newState }));

  const getResultsFromStorage = async (memoryKeyAnswers, memoryKeyResult, key, cb) => {
    const r = await fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
    cb({ [key]: r });
  };
  React.useEffect(() => {
    getResultsFromStorage(
      CONSTANTS.STORE_KEY_QUIZZ_EVALUATE_CONSO_ANSWERS,
      CONSTANTS.STORE_KEY_QUIZZ_EVALUATE_CONSO_RESULT,
      'resultEvaluateConso',
      setResults
    );
    getResultsFromStorage(
      CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_ANSWERS,
      CONSTANTS.STORE_KEY_QUIZZ_LIFE_QUALITY_RESULT,
      'resultLifeQuality',
      setResults
    );
    getResultsFromStorage(
      CONSTANTS.STORE_KEY_QUIZZ_MOTIVATIONS_ANSWERS,
      CONSTANTS.STORE_KEY_QUIZZ_MOTIVATIONS_RESULT,
      'resultMotivation',
      setResults
    );
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
          <ResultsEvaluateConso resultKey={resultEvaluateConso?.result} />
          <ResultLifeQuality values={resultLifeQuality?.result?.filter((r) => r.score !== 0)} />
          <ResultMotivation results={resultMotivation?.answers} />
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
