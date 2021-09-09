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
        {values.map((r) => {
          const response = questionsLifeQuality
            .find((q) => q.resultLabel === r.title)
            .answers.find((a) => a.score === r.score);
          return <Item response={r} emoji={response.emoji} />;
        })}
      </ItemsContainer>
    </ContainerSection>
  );
};

export default Results;

const Item = ({ response, emoji }) => {
  return (
    <ItemContainer>
      <ItemStyled color={response.score > 0 ? '#39cec0' : '#c0184a'}>
        <EmojiStyled>{emoji}</EmojiStyled>
      </ItemStyled>
      <TextStyled bold>{response.title}</TextStyled>
    </ItemContainer>
  );
};
