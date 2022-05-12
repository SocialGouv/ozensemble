import React from 'react';
import styled, { css } from 'styled-components';
import H2 from '../H2';
import UnderlinedButton from '../UnderlinedButton';
import ButtonPrimary from '../ButtonPrimary';
import { defaultPadding, screenWidth } from '../../styles/theme';
/*
QUIZZ
*/

// needed to prevent QuizzAndResultContainer to overflow on ConsoFolluwUp screen
//  when Results are shown (cf margin-left)
export const QuizzAndResultSubContainer = styled.View`
  overflow: hidden;
`;

export const QuizzAndResultContainer = styled.View`
  flex-direction: row;
  margin-left: ${({ showQuizz }) => (showQuizz ? 0 : -screenWidth)}px;
`;

export const QuizzContainer = styled.View`
  flex-shrink: 0;
  flex-grow: 1;
  width: ${screenWidth}px;
  padding-bottom: 80px;
`;

export const QuestionsContainer = styled.View`
  flex-shrink: 1;
  /* flex-grow: 1; */ /* DONT PUT "flex-grow: 1" or the ScrollView will disappear #fuckingbug */
  flex-basis: 100%;
  flex-direction: row;
  margin-left: ${({ questionIndex }) => -questionIndex * screenWidth}px;
  overflow: hidden;
`;

export const QuizzBackButton = styled(UnderlinedButton)`
  margin-top: auto;
  margin-right: auto;
  margin-left: 10px;
`;

export const AnswersContainer = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 0;
  padding-right: 10px;
  border: 1px solid transparent;
`;

export const AnswerButton = styled.TouchableOpacity`
  width: 100%;
  /* min-height: 50px; */
  padding-vertical: 8px;
  background-color: ${({ selected }) => (selected ? '#5352a3' : '#f3f3f6')};
  border-color: ${({ selected }) => (selected ? '#4030a5' : '#dbdbe9')};
  border-width: 1px;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: ${({ last }) => (last ? 50 : 10)}px;
`;

export const AnswerContent = styled(H2)`
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#f9f9f9' : '#191919')};
`;

/*
QUESTION
*/

export const ScreenBgStyled = styled.View`
  background-color: #f9f9f9;
  padding-horizontal: ${defaultPadding}px;
  padding-top: ${defaultPadding / 2}px;
  flex-shrink: 1;
  flex-grow: 1;
  width: ${screenWidth}px;
  max-width: ${screenWidth}px;
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const commonCss = css`
  margin-bottom: 15px;
  flex-shrink: 0;
`;

export const QuestionNumber = styled(H2)`
  ${commonCss}
`;

export const QuestionTitle = styled(H2)`
  color: #4030a5;
  ${commonCss}
  margin-bottom: ${Math.min(30, screenWidth * 0.05)}px;
`;

export const SubTitle = styled(H2)`
  font-weight: normal;
  margin-bottom: 50px;
  flex-shrink: 0;
`;

export const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 80px;
  margin-right: auto;
`;
