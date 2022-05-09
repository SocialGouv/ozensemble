import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components';
import { screenHeight, screenWidth } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import H1 from '../../components/H1';

const CategorieGain = ({ icon, value, unit, description1, description2 }) => {
  return (
    <Categorie>
      <ComponentCategorie>
        <IconCategorie>
          {icon}
        </IconCategorie>
        <UnitCategorie>
          <CategorieValue>
            <TextStyled bold> {value}</TextStyled>
          </CategorieValue>
          <CategorieUnit>
            <TextStyled bold> {unit}</TextStyled>
          </CategorieUnit>
        </UnitCategorie>
      </ComponentCategorie>
      <TextCategorie>
        <TextStyled >{description1}</TextStyled>
        <TextStyled >{description2}</TextStyled>
      </TextCategorie>
    </Categorie>
  )
}

const width = (screenWidth / 3)

const Categorie = styled.View`
  margin-left: ${width * 0.2};
  margin-right: ${width * 0.2};
`;

const ComponentCategorie = styled.View`
  border-style: solid;
  border-width: 1px;
  border-color: #4030A5;
  border-radius: 5px;
  width: ${width * 0.85};
  height: ${width * 0.85};
`;


const IconCategorie = styled.View`
  justify-content: center;
  flex-direction: row ;
  height: ${width * 0.85 * 0.4}; 
  align-items: center;
`;

const UnitCategorie = styled.View`
  justify-content: center;
  flex-direction: row ;
  align-items: flex-end;
  height: ${width * 0.85 * 0.5};
 `;

const CategorieUnit = styled(H1)` 
`;

const CategorieValue = styled.Text` 
  font-size: 50px;
`;

const TextCategorie = styled.View`
  padding-top: 2px;  
  align-items: center;
`;
export default CategorieGain