import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import HeaderQuizzsResult from '../../HeaderQuizzsResult';
import H3 from '../../../../components/H3';
import TextStyled from '../../../../components/TextStyled';
import CheckboxLabelled from '../../../../components/CheckboxLabelled';
import sections from './sections';
import { screenWidth } from '../../../../styles/theme';
import { Defi3_Day3_Answers_Difficulties_State, Defi3_Day3_Answers_Help_State } from '../../../../recoil/quizzs';

const Wrapper = ({ children, wrapped, inMyTests }) => {
  const Defi3_Day3_Answers_Difficulties = useRecoilValue(Defi3_Day3_Answers_Difficulties_State);
  const Defi3_Day3_Answers_Help = useRecoilValue(Defi3_Day3_Answers_Help_State);

  if (!wrapped) return <>{children}</>;
  return (
    <FullScreenBackground>
      <HeaderQuizzsResult inMyTests={inMyTests}>
        {!!(Defi3_Day3_Answers_Difficulties || Defi3_Day3_Answers_Help) && (
          <ResultContainer>{children}</ResultContainer>
        )}
      </HeaderQuizzsResult>
    </FullScreenBackground>
  );
};

const ResultsMotivations = ({ wrapped = true, route }) => {
  const Defi3_Day3_Answers_Difficulties = useRecoilValue(Defi3_Day3_Answers_Difficulties_State);
  const Defi3_Day3_Answers_Help = useRecoilValue(Defi3_Day3_Answers_Help_State);

  if (!Defi3_Day3_Answers_Difficulties || !Defi3_Day3_Answers_Help) return null;

  const inMyTests = route?.params?.rootRoute === 'QUIZZ_MENU';
  return (
    <Wrapper wrapped={wrapped} inMyTests={inMyTests}>
      <ContainerSection>
        <ResultTitle>Difficultés</ResultTitle>
        {!Defi3_Day3_Answers_Difficulties.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de facteurs de difficultés, vous pouvez revenir à ce questionnaire en
            allant dans la rubrique <TextStyled bold>Mes tests</TextStyled> dynamiques
            <TextStyled bold> Défis</TextStyled>.
          </TextStyled>
        )}
        <ItemsContainer>
          {Defi3_Day3_Answers_Difficulties.map((answerKey) => {
            const item = sections.difficulties
              .find((section) => section.answers.map((a) => a.answerKey).includes(answerKey))
              ?.answers?.find((a) => a.answerKey === answerKey);
            return (
              <CheckboxLabelled
                key={item?.answerKey}
                answerKey={item?.answerKey}
                content={item?.content}
                alertText={item?.alertText}
                checked
                disabled
                result
              />
            );
          })}
        </ItemsContainer>
      </ContainerSection>
      <ContainerSection>
        <ResultTitle>Aides</ResultTitle>
        {!Defi3_Day3_Answers_Help.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de facteurs d'aide, vous pouvez revenir à ce questionnaire en allant dans
            la rubrique <TextStyled bold>Mes tests</TextStyled> dynamiques
            <TextStyled bold> Défis</TextStyled>.
          </TextStyled>
        )}
        <ItemsContainer>
          {Defi3_Day3_Answers_Help.map((answerKey) => {
            const item = sections.help
              .find((section) => section.answers.map((a) => a.answerKey).includes(answerKey))
              ?.answers?.find((a) => a.answerKey === answerKey);
            return (
              <CheckboxLabelled
                key={item?.answerKey}
                answerKey={item?.answerKey}
                content={item?.content}
                alertText={item?.alertText}
                checked
                disabled
                result
              />
            );
          })}
        </ItemsContainer>
      </ContainerSection>
    </Wrapper>
  );
};

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;

const ItemsContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ResultTitle = styled(H3)`
  width: 100%;
  flex-shrink: 0;
  font-weight: bold;
  color: #4030a5;
  margin-bottom: 10px;
`;

export default ResultsMotivations;
