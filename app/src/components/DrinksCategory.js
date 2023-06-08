import React from 'react';
import { View } from 'react-native';
import DrinkQuantitySetter from './DrinkQuantitySetter';
import TextStyled from './TextStyled';
import {
  drinkKeysByCategory,
  drinksCatalogObject,
  getDrinkQuantityFromDrinks,
} from '../scenes/ConsoFollowUp/drinksCatalog';

const DrinksCategory = ({ asPreview, category, index, drinks, setDrinkQuantity }) => {
  const drinksKeys = drinkKeysByCategory[category];
  // return null;
  return (
    <View
      className={[
        asPreview ? '-ml-5 my-5 w-full transform scale-90' : '',
        (index + 1) % 2 ? 'bg-[#F9F9F9]' : 'bg-[#EFEFEF]',
      ].join(' ')}>
      <View className="pt-4 px-7">
        <TextStyled bold color="#4030a5">
          {category}
        </TextStyled>
      </View>
      <View className="flex flex-row justify-around flex-wrap mt-4 mx-1">
        {drinksKeys.map((drinkKey) => {
          const quantity = getDrinkQuantityFromDrinks(drinks, drinkKey);
          return (
            <DrinkQuantitySetter
              asPreview={asPreview}
              key={drinkKey}
              drinkKey={drinkKey}
              setDrinkQuantity={setDrinkQuantity}
              quantity={quantity}
              drink={drinksCatalogObject[drinkKey]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default DrinksCategory;
