import React, { useState } from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';

const CocktailPersonalisation = ({ navigation }) => {
  const [quantity, setQuantity] = useState(0);
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  return (
    <>
      <View className="mb-4">
        <TextStyled bold>Cocktail</TextStyled>
        <TouchableOpacity
          className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
          onPress={() => navigation.navigate('ADD_COCKTAIL')}>
          <Text className="text-[#CACACD] flex">Sélectionnez un cocktail</Text>
          <ArrowDown color="#000000" size={30} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <View className="mb-5">
        <TextStyled bold>Prix (€)</TextStyled>
        <TextInput
          className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
          placeholder="Euros"
          keyboardType="decimal-pad"
          maxLength={5}
        />
      </View>
      <View className="flex flex-row justify-between items-center flex-wrap">
        <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
        <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
      </View>
      <View className="flex flex-row justify-center mt-14 mb-10">
        <ButtonPrimary content="Créer mon cocktail" onPress={() => {}} />
      </View>
    </>
  );
};

export default CocktailPersonalisation;
