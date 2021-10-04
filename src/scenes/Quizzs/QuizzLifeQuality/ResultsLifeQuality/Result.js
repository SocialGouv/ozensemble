import React from 'react';
import { ResultTitle, ContainerSection, ItemStyled, ItemsContainer, ItemContainer, EmojiStyled } from './styles';
import TextStyled from '../../../../components/TextStyled';
import questionsLifeQuality from '../questions';

const Results = ({ values }) => {
  if (!values) return null;
  return (
    <ContainerSection>
      <ResultTitle>Votre bilan "Qualité de vie"</ResultTitle>
      <ItemsContainer>
        {values.length === 0 ? <TextStyled>Aucun élément à afficher.</TextStyled> : null}
        {values
          .sort((a, b) => Number(a.score) < Number(b.score))
          .map((r, i) => {
            const question = questionsLifeQuality.find((q) => q.resultLabel === r.title);
            const response = question?.answers.find((a) => a.score === r.score);

            //hide if good score for these questions
            if (['Handicap physique', 'Frein psychique'].includes(question.resultLabel) && response.score > 0)
              return null;

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
