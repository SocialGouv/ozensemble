import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import Header from '../../Defis/Header';
import H3 from '../../../components/H3';
import TextStyled from '../../../components/TextStyled';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import sections from './sections';
import { screenWidth } from '../../../styles/theme';
import { motivationsQuizzAnswersState } from '../../../recoil/quizzs';

const Wrapper = ({ children, wrapped }) => {
  const motivationsQuizzAnswers = useRecoilValue(motivationsQuizzAnswersState);
  if (!wrapped) return <>{children}</>;
  return (
    <FullScreenBackground>
      <Header />
      {!!motivationsQuizzAnswers && <ResultContainer>{children}</ResultContainer>}
    </FullScreenBackground>
  );
};

const ResultsMotivations = ({ wrapped = true }) => {
  const motivationsQuizzAnswers = useRecoilValue(motivationsQuizzAnswersState);

  if (!motivationsQuizzAnswers) return null;

  return (
    <Wrapper wrapped={wrapped}>
      <ContainerSection>
        <ResultTitle>Vos motivations à changer</ResultTitle>
        {!motivationsQuizzAnswers.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de motivations à changer, vous pouvez revenir à ce questionnaire en
            allant dans l'onglet <TextStyled bold>Mes infos</TextStyled> et en cliquant sur{' '}
            <TextStyled bold>Mes tests</TextStyled>.
          </TextStyled>
        )}
        <ItemsContainer>
          {motivationsQuizzAnswers.map((answerKey) => {
            const item = sections
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
