import React from 'react';

import styled from 'styled-components';
import { screenWidth } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import H1 from '../../components/H1';

const CategorieGain = ({ children, icon = null, value = '?', unit = '', description }) => {
  return (
    <Categorie>
      <ComponentCategorie>
        {!!icon && <IconCategorie>{icon}</IconCategorie>}
        {children}
        <UnitCategorie>
          <CategorieValue>
            <TextStyled bold> {!isNaN(value) ? '?' : value}</TextStyled>
          </CategorieValue>
          {!!unit && (
            <CategorieUnit>
              <TextStyled bold> {unit}</TextStyled>
            </CategorieUnit>
          )}
        </UnitCategorie>
      </ComponentCategorie>
      <TextCategorie>
        <TextStyled>{description}</TextStyled>
      </TextCategorie>
    </Categorie>
  );
};

const width = screenWidth / 3;

const Categorie = styled.View`
  margin-left: ${width * 0.2}px;
  margin-right: ${width * 0.2}px;
`;

const ComponentCategorie = styled.View`
  border: 1px solid #4030a5;
  border-radius: 5px;
  width: ${width * 0.85}px;
  height: ${width * 0.85}px;
  justify-content: center;
  align-items: center;
`;

const IconCategorie = styled.View`
  justify-content: center;
  flex-direction: row;
  height: ${width * 0.85 * 0.4}px;
  align-items: center;
`;

const UnitCategorie = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: flex-end;
  height: ${width * 0.85 * 0.5}px;
`;

const CategorieUnit = styled(H1)``;

const CategorieValue = styled.Text`
  font-size: 45px;
`;

const TextCategorie = styled.View`
  padding-top: 2px;
  align-items: center;
`;
export default CategorieGain;
