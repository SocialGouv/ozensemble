import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../components/TextStyled';
import DrinkQuantitySetter from './DrinkQuantitySetter';
import { getDrinksKeysFromCategory } from '../consoDuck';

const getCurrentDrinkQuantity = (drinks, drinkKey) => {
  const drink = drinks.find(d => d.drinkKey === drinkKey);
  if (drink) {
    return drink.quantity;
  }
  return 0;
};

const DrinksCategory = ({ asPreview, category, index, drinks, setDrinkQuantity }) => {
  return (
    <CategoryContainer asPreview={asPreview} darkBackground={index % 2}>
      <CategoryDisplay type="title">{category}</CategoryDisplay>
      <DrinksContainer>
        {getDrinksKeysFromCategory(category).map(drinkKey => (
          <DrinkQuantitySetter
            asPreview={asPreview}
            key={drinkKey}
            drinkKey={drinkKey}
            setDrinkQuantity={setDrinkQuantity}
            quantity={getCurrentDrinkQuantity(drinks, drinkKey)}
          />
        ))}
      </DrinksContainer>
    </CategoryContainer>
  );
};

const previewCss = css`
  margin-left: -20px;
  margin-vertical: 20px;
  width: ${props => props.theme.dimensions.screen.width}px;
  transform: scale(0.9);
`;

const CategoryContainer = styled.View`
  background: ${({ darkBackground, theme }) => (darkBackground ? theme.colors.whiteBg : theme.colors.greyBg)};
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
