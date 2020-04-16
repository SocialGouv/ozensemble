import React from 'react';
import styled, { withTheme } from 'styled-components';
import H3 from '../components/H3';
import QuizzIcon from '../components/Illustrations/QuizzIcon';
import { FeedButtonStyled } from './styles';
import { TouchableOpacity } from 'react-native';

const ResultsFeedDisplay = withTheme(({ onPress, selected, theme }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FeedButtonStyled backgroundColor="#deeceb" borderColor="#aae3dd" showAsSelected={selected}>
        <Content>
          <QuizzIcon size={25} color={theme.colors.buttonPrimary} selected />
          <TextContent>
            <Caption>Questionnaire d'auto-évaluation</Caption>
            <CTA>Refaire le questionnaire</CTA>
          </TextContent>
        </Content>
      </FeedButtonStyled>
    </TouchableOpacity>
  );
});

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
