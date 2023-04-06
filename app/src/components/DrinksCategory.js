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
    <View
      className={[
        asPreview ? '-ml-5 my-5 w-full transform scale-90' : '',
        (index + 1) % 2 ? 'bg-gray-100' : 'bg-gray-200',
      ].join(' ')}>
      <View className="pt-4 px-7">
        <TextStyled bold color="#4030a5">
          {category}
        </TextStyled>
      </View>
      <View className="flex flex-row justify-around flex-wrap mt-4 mx-1">
        {getDrinksKeysFromCategory(category, drinksCatalog).map((drinkKey) => {
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
        })}
      </View>
    </View>
  );
};

export default DrinksCategory;
