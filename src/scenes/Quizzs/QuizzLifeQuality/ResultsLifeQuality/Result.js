import React from 'react';
import { ResultTitle, ContainerSection, ItemStyled, ItemsContainer, ItemContainer } from './styles';
import TextStyled from '../../../../components/TextStyled';

const Results = ({ values }) => {
  return (
    <ContainerSection>
      <ResultTitle>Votre bilan "Qualité de vie"</ResultTitle>
      <ItemsContainer>
        {values.length === 0 ? <TextStyled>Aucun élément à afficher.</TextStyled> : null}
        {values.map((response) => (
          <Item response={response} />
        ))}
      </ItemsContainer>
    </ContainerSection>
  );
};

export default Results;

const Item = ({ response }) => {
  if (response.score === 0) return null;
  return (
    <ItemContainer>
      <ItemStyled color={response.score > 0 ? '#39cec0' : '#c0184a'}>
        <TextStyled style={{ fontSize: 30 }} bold>
          {response.score > 0 ? '👍' : '👎'}
        </TextStyled>
      </ItemStyled>
      <TextStyled>{response.title}</TextStyled>
    </ItemContainer>
  );
};
