import React from 'react';
import {
  ScreenBgStyled,
  QuestionNumber,
  QuestionTitle,
  AnswerButton,
  AnswerContent,
  ButtonPrimaryStyled,
  SubTitle,
  AnswersContainer,
} from './styles';

const Question = ({
  questionIndex,
  numberOfQuestions,
  questionKey,
  questionTitle,
  selectedAnswerKey,
  answers,
  saveAnswer,
}) => (
  <ScreenBgStyled>
    <QuestionNumber>
      Question {questionIndex + 1} / {numberOfQuestions}
    </QuestionNumber>
    <QuestionTitle>{questionTitle}</QuestionTitle>
    <AnswersContainer>
      {answers.map(({ answerKey, content, score }, i) => (
        <AnswerButton
          key={answerKey}
          onPress={() => {
            saveAnswer(questionIndex, questionKey, answerKey, score);
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

export const Intro = ({ startQuizz }) => (
  <ScreenBgStyled>
    <AnswersContainer>
      <QuestionNumber>Auto-évaluation</QuestionNumber>
      <QuestionTitle>Commençons par quelques questions rapides !</QuestionTitle>
      <SubTitle>Pour évaluer votre consommation d'alcool et détecter des comportements à risques.</SubTitle>
      <ButtonPrimaryStyled content="Commencez" onPress={startQuizz} />
    </AnswersContainer>
  </ScreenBgStyled>
);
