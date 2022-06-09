import React from 'react';
import styled, { css } from 'styled-components';
import H2 from '../H2';
import { screenWidth } from '../../styles/theme';
import { ScreenBgStyled } from '../ScreenBgStyled';

const Question = ({
  questionIndex,
  numberOfQuestions,
  questionKey,
  questionTitle,
  selectedAnswerKey,
  answers,
  saveAnswer,
  navigation,
}) => (
  <ScreenBgStyled defaultPadding>
    <QuestionNumber>
      Question {questionIndex + 1} / {numberOfQuestions}
    </QuestionNumber>
    <QuestionTitle>{questionTitle}</QuestionTitle>
    <AnswersContainer>
      {answers.map(({ answerKey, content, score }, i) => (
        <AnswerButton
          key={answerKey}
          onPress={async () => {
            saveAnswer(questionIndex, questionKey, answerKey, score);
            setTimeout(() => {
              const endOfQuestions = questionIndex === numberOfQuestions - 1;
              if (!endOfQuestions) {
                navigation.push(`QUIZZ_QUESTION_${questionIndex + 1 + 1}`);
              } else {
                navigation.push('QUIZZ_RESULTS');
              }
            }, 500);
          }}
          selected={answerKey === selectedAnswerKey}
          last={i === answers.length - 1}>
          <AnswerContent selected={answerKey === selectedAnswerKey}>{content}</AnswerContent>
        </AnswerButton>
      ))}
    </AnswersContainer>
  </ScreenBgStyled>
);

const AnswersContainer = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 0;
  padding-right: 10px;
  border: 1px solid transparent;
`;

const AnswerButton = styled.TouchableOpacity`
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

const AnswerContent = styled(H2)`
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#f9f9f9' : '#191919')};
`;

/*
QUESTION
*/

const commonCss = css`
  margin-bottom: 15px;
  flex-shrink: 0;
`;

const QuestionNumber = styled(H2)`
  ${commonCss}
`;

const QuestionTitle = styled(H2)`
  color: #4030a5;
  ${commonCss}
  margin-bottom: ${Math.min(30, screenWidth * 0.05)}px;
`;

export default Question;
