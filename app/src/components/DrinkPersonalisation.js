import React, { useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';

const DrinkPersonalisation = ({ navigation, quantitySelected, setQuantitySelected }) => {
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [drinkName, setDrinkName] = useState('');
  const [drinkPrice, setDrinkPrice] = useState('');
  const [drinkAlcoolPercentage, setDrinkAlcoolPercentage] = useState('');
  const [quantity, setQuantity] = useState(0);
  return (
    <View>
      <View>
        <View className="mb-5">
          <TextStyled bold>Nom ou marque</TextStyled>
          <TextInput
            className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
            placeholder="Bière forte, verre de vin au bar..."
            value={drinkName}
            onChangeText={(value) => setDrinkName(value)}
          />
          <Text className="text-xs">(30 caractères max)</Text>
        </View>
        <View className="mb-4">
          <TextStyled bold>Quantité d'alcool servie (cl)</TextStyled>
          {!quantitySelected?.volume ? (
            <TouchableOpacity
              className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
              onPress={() => navigation.navigate('ADD_QUANTITY')}>
              <Text className="text-[#CACACD] flex">Sélectionnez une quantité</Text>
              <ArrowDown color="#000000" size={30} strokeWidth={2} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
              onPress={() => navigation.navigate('ADD_QUANTITY')}>
              <Text className="text-[#4030A5] flex">{quantitySelected?.volume?.split(' ')[0]}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex flex-row justify-between mb-8">
          <View className="basis-1/2 pr-2">
            <TextStyled bold>Degré d'alcool (%)</TextStyled>
            <TextInput
              className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
              placeholder="Degrés"
              value={drinkAlcoolPercentage}
              onChangeText={(value) => setDrinkAlcoolPercentage(value)}
            />
          </View>
          <View className="basis-1/2 pl-2">
            <TextStyled bold>Prix (€)</TextStyled>
            <TextInput
              className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
              placeholder="Euros"
              value={drinkPrice}
              keyboardType="number-pad"
              onChangeText={(value) => setDrinkPrice(value)}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center flex-wrap gap-y-6">
          <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
          <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
        </View>
        <View className="flex flex-row justify-center mt-14 mb-10 ">
          <ButtonPrimary
            content="Créer ma boisson"
            onPress={() => {
              setQuantitySelected(null);
            }}
            disabled={
              drinkPrice === '' || drinkAlcoolPercentage === '' || drinkName === '' || !quantitySelected?.volume
            }
          />
        </View>
      </View>
    </View>
  );
};

export default DrinkPersonalisation;
