import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../../../components/TextStyled';
import questionsLifeQuality from '../questions';
import H3 from '../../../../components/H3';
import { screenWidth } from '../../../../styles/theme';

const Results = ({ values }) => {
  if (!values) return null;
  return (
    <ContainerSection>
      <ResultTitle>Votre bilan "Qualité de vie"</ResultTitle>
      <ItemsContainer>
        {values.length === 0 ? <TextStyled>Aucun élément à afficher.</TextStyled> : null}
        {values
          .sort((a, b) => Number(b.score) - Number(a.score))
          .map((r, i) => {
            const question = questionsLifeQuality.find((q) => q.resultLabel === r.title);
            const response = question?.answers.find((a) => a.score === r.score);

            //hide if good score for these questions
            if (['Handicap physique', 'Frein psychique'].includes(question.resultLabel) && response.score > 0) {
              return null;
            }

            return <Item key={i} response={response} question={question} />;
          })}
      </ItemsContainer>
    </ContainerSection>
  );
};

export default Results;

const Item = ({ response, question }) => {
  const scoreToColor = (score) => {
    if (score < 0) return '#c0184a';
    if (score > 0) return '#39cec0';
    if (score === 0) return '#FF9933';
  };
  return (
    <ItemContainer>
      <ItemStyled color={scoreToColor(response.score)}>
        <EmojiStyled>{response.emoji}</EmojiStyled>
      </ItemStyled>
      <TextStyled bold>{question.resultLabel}</TextStyled>
    </ItemContainer>
  );
};

const ItemStyled = styled.View`
  margin: 10px;
  max-width: ${screenWidth / 3}px;
  min-width: ${screenWidth / 3}px;
  max-height: ${screenWidth / 3}px;
  min-height: ${screenWidth / 3}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color || '#fff'};
  border-radius: 30px;
`;

const EmojiStyled = styled(TextStyled)`
  font-size: ${(screenWidth / 3) * 0.4}px;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
`;

const ItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const ItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

const ResultTitle = styled(H3)`
  ${commonCss}
  font-weight: bold;
  color: #4030a5;
`;
