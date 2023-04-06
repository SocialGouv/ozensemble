import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import TextStyled from '../../components/TextStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlass';
import H3 from '../../components/H3';
import H2 from '../../components/H2';
import API from '../../services/api';
import { alcoolQuantityCatalog } from './alcoolQuantityCatalog';
const AddAlcoolQuantity = ({ navigation, handleQuantitySelection }) => {
  return (
    <View className="h-full bg-white pt-5">
      <ScrollView className="pb-5" style={{ padding: defaultPaddingFontScale() }}>
        <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
        <H2 color="#4030a5" className="mt-5 mb-4">
          Sélectionnez une quantité d'alcool
        </H2>
        <TextStyled italic className="text-xs mb-4">
          Cliquez sur un contenant pour compléter le champ
        </TextStyled>
        {alcoolQuantityCatalog.map((quantity) => {
          return (
            <TouchableOpacity
              key={quantity.name}
              className="flex flex-row bg-[#F3F3F6] h-12 mb-3 rounded-lg border border-[#DBDBE8] items-center px-2"
              onPress={() => {
                handleQuantitySelection(quantity.volume);
              }}>
              <quantity.icon size={30} />
              <View className="flex flex-row flex-wrap ml-2 w-10/12">
                <TextStyled bold className="">
                  {quantity.name} :{' '}
                </TextStyled>
                <Text>{quantity.volume}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddAlcoolQuantity;
