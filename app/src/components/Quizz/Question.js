import React from 'react';
import { ScreenBgStyled } from '../Styles/SreenByStyled';
import { AnswerButton, AnswerContent, AnswersContainer, QuestionNumber, QuestionTitle } from './styles';

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

export default Question;
