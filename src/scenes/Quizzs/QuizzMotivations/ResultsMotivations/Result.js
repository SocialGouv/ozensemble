import React from 'react';
import { ResultTitle, ContainerSection, ItemsContainer } from './styles';
import TextStyled from '../../../../components/TextStyled';
import sections from '../sections';
import Item from '../Item';

const Results = ({ results }) => {
  if (!results) return null;
  const onlyTrueResults = Object.keys(results).reduce((acc, current) => {
    if (results[current]) acc[current] = results[current];
    return acc;
  }, {});
  const answerKeys = Object.keys(onlyTrueResults);
  return (
    <ContainerSection>
      <ResultTitle>Vos motivations à changer</ResultTitle>
      {!answerKeys.length && (
        <TextStyled>
          Vous n'avez pas encore sélectionné de motivations à changer, vous pouvez revenir à ce questionnaire en allant
          dans l'onglet <TextStyled bold>Mes infos</TextStyled> et en cliquant sur{' '}
          <TextStyled bold>Mes tests</TextStyled>.
        </TextStyled>
      )}
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
