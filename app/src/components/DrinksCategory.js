import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components';
import { screenWidth } from '../styles/theme';
import DrinkQuantitySetter from './DrinkQuantitySetter';
import TextStyled from './TextStyled';

export const getDrinksKeysFromCategory = (categoryKey, catalog) =>
  catalog.filter((drink) => drink.categoryKey === categoryKey).map(({ drinkKey }) => drinkKey);

export const getDrinkQuantityFromDrinks = (drinks, drinkKey) => {
  if (drinks === undefined) drinks = 'Cocktails et spiritueux';
  const drink = drinks.find((d) => d.drinkKey === drinkKey);
  if (drink !== undefined) return drink.quantity;
  return 0;
};

const DrinksCategory = ({ asPreview, category, index, drinks, setDrinkQuantity, drinksCatalog }) => {
  return (
    <CategoryContainer asPreview={asPreview} darkBackground={(index + 1) % 2}>
      <CategoryDisplay color="#4030a5">{category}</CategoryDisplay>
      <View className="flex flex-row justify-around flex-wrap my-4 mx-1">
        {getDrinksKeysFromCategory(category, drinksCatalog).map((drinkKey, position) => {
          if (position > 1) {
            return (
              <DrinkQuantitySetter
                asPreview={asPreview}
                key={drinkKey}
                drinkKey={drinkKey}
                setDrinkQuantity={setDrinkQuantity}
                quantity={getDrinkQuantityFromDrinks(drinks, drinkKey)}
                catalog={drinksCatalog}
                margin={true}
              />
            );
          } else {
            return (
              <DrinkQuantitySetter
                asPreview={asPreview}
                key={drinkKey}
                drinkKey={drinkKey}
                setDrinkQuantity={setDrinkQuantity}
                quantity={getDrinkQuantityFromDrinks(drinks, drinkKey)}
                catalog={drinksCatalog}
              />
            );
          }
        })}
      </View>
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
  ${(props) => props.asPreview && previewCss}
`;

const CategoryDisplay = styled(TextStyled)`
  margin: 15px 30px 0px;
  font-weight: bold;
`;

export default DrinksCategory;
