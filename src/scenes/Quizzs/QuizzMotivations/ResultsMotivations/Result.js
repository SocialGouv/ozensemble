import React from 'react';
import { ResultTitle, ContainerSection, ItemsContainer } from './styles';
import TextStyled from '../../../../components/TextStyled';
import sections from '../sections';
import Item from '../Item';

const Results = ({ results }) => {
  if (!results) return null;
  const answerKeys = Object.keys(results);
  return (
    <ContainerSection>
      <ResultTitle>Vos motivations à changer</ResultTitle>
      {!answerKeys.length && <TextStyled>Aucun élément à afficher.</TextStyled>}
      <ItemsContainer>
        {answerKeys.map((answerKey) => {
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
  );
};

export default Results;
