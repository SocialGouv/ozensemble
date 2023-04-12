import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QuantitySetter } from './DrinkQuantitySetter';
import TextStyled from './TextStyled';

const OwnDrinkSelector = ({
  drinkKey,
  volume,
  doses,
  quantity,
  alcoolPercentage,
  category,
  setDrinkQuantityRequest,
}) => {
  const onSetQuantity = (q) => {
    setDrinkQuantityRequest(drinkKey, q, true);
  };
  return (
    <View className="flex flex-row justify-center mb-2 px-4">
      <View className="w-full">
        <View className="bg-white rounded-md border border-[#DFDFEB] flex flex-row flex-wrap justify-between px-3 py-1 ">
          <TouchableOpacity className="mr-2 my-2">
            <TextStyled bold>{drinkKey}</TextStyled>
            {category === 'cocktail' ? (
              <Text className="text-sm">
                {doses} {doses < 1 ? 'unité' : 'unités'}
              </Text>
            ) : (
              <Text className="text-sm">
                {volume} cl - {alcoolPercentage}% - {doses} {doses < 1 ? 'unité' : 'unités'}
              </Text>
            )}
          </TouchableOpacity>
          <View className="my-2">
            <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OwnDrinkSelector;
