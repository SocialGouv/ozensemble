import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import H3 from '../../components/H3';
import QuizzIcon from '../../components/illustrations/QuizzIcon';
import { FeedButtonStyled } from '../../components/FeedButtonStyled';
import { autoEvaluationQuizzResultState } from '../../recoil/quizzs';
import { logEvent } from '../../services/logEventsWithMatomo';
import TextStyled from '../../components/TextStyled';

const mapResultToDisplay = (result) => {
  if (result === 'addicted') return "Résultat: risque d'addiction";
  if (result === 'risk') return 'Résultat: risque de dépendance';
  if (result === 'good') return 'Résultat: pas de dépendance';
  return 'Faire le questionnaire';
};

const ResultsFeedDisplay = ({ selected }) => {
  const navigation = useNavigation();
  const resultKey = useRecoilValue(autoEvaluationQuizzResultState);
  const onPress = () => {
    navigation.navigate('ONBOARDING_QUIZZ', { screen: resultKey ? 'QUIZZ_RESULTS' : 'QUIZZ_QUESTIONS' });
    logEvent({
      category: 'QUIZZ',
      action: 'QUIZZ_OPEN',
      name: 'FROM_CONSO',
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <FeedButtonStyled backgroundColor="#deeceb" borderColor="#aae3dd" showAsSelected={selected}>
        <Content>
          <QuizzIcon size={25} color="#de285e" selected />
          <TextContent>
            <Caption>Questionnaire d'auto-évaluation</Caption>
            <CTA>{mapResultToDisplay(resultKey)}</CTA>
          </TextContent>
        </Content>
      </FeedButtonStyled>
    </TouchableOpacity>
  );
};

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContent = styled.View`
  margin-left: 5px;
`;

const Caption = styled(TextStyled)`
  font-size: 11px;
  margin-bottom: 3px;
`;

const CTA = styled(H3)`
  font-weight: bold;
`;

export default ResultsFeedDisplay;
