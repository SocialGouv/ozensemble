import React from 'react';
import { ResultTitle, ContainerSection } from './styles';
import TextStyled from '../../../../components/TextStyled';
import { Item } from '../sections';

export default ({ values }) => {
  console.log({ values });
  return (
    <ContainerSection>
      <ResultTitle>Vos motivations à changer</ResultTitle>
      {values.length === 0 ? <TextStyled>Aucun élément à afficher.</TextStyled> : null}
      {values.map((item) => (
        <Item key={item.id} id={item.id} title={item.title} onPress={() => {}} checked />
      ))}
    </ContainerSection>
  );
};
