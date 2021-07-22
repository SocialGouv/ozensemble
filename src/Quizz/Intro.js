import React from 'react';
import ScreenBgStyled from '../components/ScreenBgStyled';
import { QuestionNumber, QuestionTitle, ButtonPrimaryStyled, SubTitle, AnswersContainer } from './styles';

const Intro = ({ startQuizz, navigation }) => (
  <ScreenBgStyled>
    <AnswersContainer>
      <QuestionNumber>Auto-évaluation</QuestionNumber>
      <QuestionTitle>Commençons par quelques questions rapides !</QuestionTitle>
      <SubTitle>Pour évaluer votre consommation d'alcool et détecter des comportements à risques.</SubTitle>
      <ButtonPrimaryStyled content="Commencez" onPress={() => navigation.navigate('QUIZZ_QUESTION_1')} />
    </AnswersContainer>
  </ScreenBgStyled>
);

export default Intro;
