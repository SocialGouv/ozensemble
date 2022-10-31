import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { setValidatedDays } from '../../Defis/utils';
import { QuizzDefi3Day1AnswersState } from '../../../recoil/quizzs';
import TextStyled from '../../../components/TextStyled';
import { P, Spacer } from '../../../components/Articles';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import questions from './questions';
import TextResult from './TextResult';
import ButtonPrimary from '../../../components/ButtonPrimary';

const ResultsQuizzDefi3Day1 = ({ route, navigation }) => {
  const answers = useRecoilValue(QuizzDefi3Day1AnswersState);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (answers && route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused, answers]);

  if (!answers) return null;
  return (
    <WrapperContainer
      title={'Résultats du quiz vrai ou faux'}
      onPressBackButton={() =>
        route?.params?.rootRoute ? navigation.navigate(route?.params?.rootRoute) : navigation.goBack()
      }>
      <Content>
        <SectionTitle color="#de285e" noMarginBottom>
          C'est déjà terminé !
        </SectionTitle>
        <TextParagraph>
          Merci d’avoir répondu au quiz. Voici toutes les réponses aux{' '}
          <TextStyled bold>questions de connaissance sur l’alcool :</TextStyled>
        </TextParagraph>
      </Content>

      {questions.map((q) => (
        <AnswerResult questionKey={q.questionKey} />
      ))}

      <Spacer size={5} />
      <ButtonPrimaryStyled content="J’ai compris" onPress={() => navigation.navigate('DEFI3_MENU')} />
    </WrapperContainer>
  );
};

const AnswerResult = ({ questionKey }) => {
  const answers = useRecoilValue(QuizzDefi3Day1AnswersState);
  const answer = answers[questionKey];
  const question = questions.find((q) => q.questionKey === questionKey);

  if (!question || !answer) return null;

  const allAnswersCorrect = question.trueAnswer === 'all';
  const goodAnswer = question.trueAnswer === answer;

  return (
    <Element
      contentView={
        <>
          <TextStyled>{question.questionTitle}</TextStyled>
          {allAnswersCorrect ? (
            <ButtonAllAnswers />
          ) : question.trueAnswer === 'Vrai' ? (
            <ButtonVraiAnswer goodAnswer={goodAnswer} />
          ) : (
            <ButtonFauxAnswer goodAnswer={goodAnswer} />
          )}
          {allAnswersCorrect ? (
            <TextStyled bold color="#20B55C">
              C'est vrai... et c'est faux !
            </TextStyled>
          ) : goodAnswer ? (
            <TextStyled bold color="#20B55C">
              Bonne réponse... C’est {question.trueAnswer.toLowerCase()} !
            </TextStyled>
          ) : (
            <TextStyled bold color="#DE285E">
              Mauvaise réponse... C’est {question.trueAnswer.toLowerCase()} !
            </TextStyled>
          )}

          <Spacer size={20} />
          <TextResult questionKey={questionKey} />
        </>
      }
    />
  );
};

const ButtonAllAnswers = () => (
  <ButtonsContainer>
    <Button green>
      <TextStyled bold color="#FFFFFF">
        VRAI
      </TextStyled>
    </Button>
    <Button green>
      <TextStyled bold color="#FFFFFF">
        FAUX
      </TextStyled>
    </Button>
  </ButtonsContainer>
);

const ButtonVraiAnswer = ({ goodAnswer }) => (
  <ButtonsContainer>
    <Button green={goodAnswer}>
      <TextStyled bold color={goodAnswer ? '#FFFFFF' : '#4030a5'}>
        VRAI
      </TextStyled>
    </Button>
    <Button red={!goodAnswer}>
      <TextStyled bold color={!goodAnswer ? '#FFFFFF' : '#4030a5'}>
        FAUX
      </TextStyled>
    </Button>
  </ButtonsContainer>
);

const ButtonFauxAnswer = ({ goodAnswer }) => (
  <ButtonsContainer>
    <Button red={!goodAnswer}>
      <TextStyled bold color={!goodAnswer ? '#FFFFFF' : '#4030a5'}>
        VRAI
      </TextStyled>
    </Button>
    <Button green={goodAnswer}>
      <TextStyled bold color={goodAnswer ? '#FFFFFF' : '#4030a5'}>
        FAUX
      </TextStyled>
    </Button>
  </ButtonsContainer>
);

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const ButtonsContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Button = styled.View`
  ${(props) => props.red && `background-color: #DE285E;`}
  ${(props) => props.green && `background-color: #20B55C;`}
  height: 45px;
  min-width: 40%;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding-horizontal: 30px;
  border: 1px;
  border-color: #4030a5;
  ${(props) => (props.red || props.green) && `border: 0px;`}
`;

const SectionTitle = styled(P)`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextParagraph = styled(P)`
  margin-bottom: 8px;
`;

const Content = styled.View`
  margin-bottom: 20px;
`;

export default ResultsQuizzDefi3Day1;
