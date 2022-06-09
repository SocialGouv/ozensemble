import React from 'react';
import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import TextStyled from '../../../../components/TextStyled';
import Item from '../Item';
import sections from '../sections';

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

export default Results;
