import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import H3 from '../../components/H3';
import QuizzIcon from '../../components/illustrations/QuizzIcon';
import { FeedButtonStyled } from '../../components/FeedButtonStyled';
import { autoEvaluationQuizzResultState } from '../../recoil/quizzs';

const ResultsFeedDisplay = ({ onPress, selected }) => {
  const autoEvaluationDone = useRecoilValue(autoEvaluationQuizzResultState);

  return (
    <TouchableOpacity onPress={onPress}>
      <FeedButtonStyled backgroundColor="#deeceb" borderColor="#aae3dd" showAsSelected={selected}>
        <Content>
          <QuizzIcon size={25} color="#de285e" selected />
          <TextContent>
            <Caption>Questionnaire d'auto-évaluation</Caption>
            <CTA>{autoEvaluationDone ? 'Refaire' : 'Faire'} le questionnaire</CTA>
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

const Caption = styled.Text`
  font-size: 11px;
  margin-bottom: 3px;
`;

const CTA = styled(H3)`
  font-weight: bold;
`;

export default ResultsFeedDisplay;
