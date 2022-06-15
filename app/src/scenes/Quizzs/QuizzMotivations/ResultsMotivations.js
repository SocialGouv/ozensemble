import React from 'react';
import styled, { css } from 'styled-components';
import { selector, useRecoilValue } from 'recoil';
import Header from '../../Defis/Header';
import H3 from '../../../components/H3';
import TextStyled from '../../../components/TextStyled';
import Item from './Item';
import sections from './sections';
import { screenWidth } from '../../../styles/theme';
import { motivationsQuizzAnswersState } from '../../../recoil/quizzs';

const answersKeysSelector = selector({
  key: 'answersKeysSelector',
  get: ({ get }) => {
    const motivationsQuizzAnswers = get(motivationsQuizzAnswersState);
    const onlyTrueResults = Object.keys(motivationsQuizzAnswers).reduce((acc, current) => {
      if (motivationsQuizzAnswers[current]) acc[current] = motivationsQuizzAnswers[current];
      return acc;
    }, {});
    return Object.keys(onlyTrueResults);
  },
});

const ResultsMotivations = () => {
  const motivationsQuizzAnswers = useRecoilValue(motivationsQuizzAnswersState);
  const answersKeys = useRecoilValue(answersKeysSelector);

  return (
    <FullScreenBackground>
      <Header />
      {!!motivationsQuizzAnswers && (
        <ResultContainer>
          <ContainerSection>
            <ResultTitle>Vos motivations à changer</ResultTitle>
            {!answersKeys.length && (
              <TextStyled>
                Vous n'avez pas encore sélectionné de motivations à changer, vous pouvez revenir à ce questionnaire en
                allant dans l'onglet <TextStyled bold>Mes infos</TextStyled> et en cliquant sur{' '}
                <TextStyled bold>Mes tests</TextStyled>.
              </TextStyled>
            )}
            <ItemsContainer>
              {answersKeys.map((answerKey) => {
                const item = sections
                  .find((section) => section.answers.map((a) => a.answerKey).includes(answerKey))
                  ?.answers?.find((a) => a.answerKey === answerKey);
                return (
                  <Item
                    key={item?.answerKey}
                    answerKey={item?.answerKey}
                    content={item?.content}
                    alertText={item?.alertText}
                    checked
                    disabled
                  />
                );
              })}
            </ItemsContainer>
          </ContainerSection>
        </ResultContainer>
      )}
    </FullScreenBackground>
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

const commonCss = css`
  width: 100%;
  flex-shrink: 0;
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
  ${commonCss}
  font-weight: bold;
  color: #4030a5;
  margin-bottom: 10px;
`;

export default ResultsMotivations;
