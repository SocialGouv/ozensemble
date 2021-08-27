import React from 'react';
import CONSTANTS from '../../../../reference/constants';
import { View } from 'react-native';
import {
  EmptyView,
  ResultTitle,
  ResultParagraph,
  ContainerSection,
  ItemStyled,
  ItemsContainer,
  ItemContainer,
} from './styles';
import TextStyled from '../../../../components/TextStyled';

export default ({ values }) => {
  console.log({ values });
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

const Item = ({ response }) => {
  if (response.score === 0) return null;
  return (
    <ItemContainer>
      <ItemStyled color={response.score > 0 ? '#B4E44D' : '#EE4F6C'}>
        <TextStyled style={{ fontSize: 30 }} bold>
          {response.score > 0 ? '👍' : '👎'}
        </TextStyled>
      </ItemStyled>
      <TextStyled>{response.title}</TextStyled>
    </ItemContainer>
  );
};
