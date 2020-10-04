import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../components/TextStyled';
import DrinkQuantitySetter from './DrinkQuantitySetter';
import {
  getDrinksKeysFromCategory,
  drinksCatalog,
  getDrinkQuantityFromDrinks,
} from '../ConsoFollowUp/drinksCatalog';
import { screenWidth } from '../styles/theme';

const DrinksCategory = ({ asPreview, category, index, drinks, setDrinkQuantity }) => {
  return (
    <CategoryContainer asPreview={asPreview} darkBackground={index % 2}>
      <CategoryDisplay color="#4030a5">{category}</CategoryDisplay>
      <DrinksContainer>
        {getDrinksKeysFromCategory(category, drinksCatalog).map(drinkKey => (
          <DrinkQuantitySetter
            asPreview={asPreview}
            key={drinkKey}
            drinkKey={drinkKey}
            setDrinkQuantity={setDrinkQuantity}
            quantity={getDrinkQuantityFromDrinks(drinks, drinkKey)}
            catalog={drinksCatalog}
          />
        ))}
      </DrinksContainer>
    </CategoryContainer>
  );
};

const previewCss = css`
  margin-left: -20px;
  margin-vertical: 20px;
  width: ${screenWidth}px;
  transform: scale(0.9);
`;

const CategoryContainer = styled.View`
  background: ${({ darkBackground }) => (darkBackground ? '#f9f9f9' : '#efefef')};
  ${props => props.asPreview && previewCss}
`;

const CategoryDisplay = styled(TextStyled)`
  margin: 15px 30px 0px;
  font-weight: bold;
`;

const DrinksContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin: 15px 5px;
`;

export default DrinksCategory;
