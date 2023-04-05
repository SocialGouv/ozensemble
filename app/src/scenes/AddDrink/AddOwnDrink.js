import React, { useState } from 'react';

import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';
import styled from 'styled-components';
import { defaultPaddingFontScale } from '../../styles/theme';
import H1 from '../../components/H1';
import { TextInput } from 'react-native-gesture-handler';
import TextStyled from '../../components/TextStyled';
import ArrowDown from '../../components/ArrowDown';
import { QuantitySetter } from '../../components/DrinkQuantitySetter';
import ButtonPrimary from '../../components/ButtonPrimary';
import SwitchButtons from '../../components/SwitchButtons';
const AddOwnDrink = ({ navigation }) => {
  const [quantity, setQuantity] = useState(0);
  const onSetQuantity = (q) => {
    setQuantity(q);
  };

  return (
    <View className="h-full bg-white">
      <SafeAreaView className="bg-white rounded-xl mt-auto absolute bottom-0 w-full shadow-xl shadow-[#5E5E5E]	">
        <View style={{ paddingHorizontal: defaultPaddingFontScale(), paddingTop: defaultPaddingFontScale() }}>
          <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
          <H1 className="mt-5 mb-8">Créez une nouvelle boisson</H1>
          <View className="mb-8 flex flex-row justify-between">
            <Text className="font-bold text-lg">Est-ce un cocktail ?</Text>
            <SwitchButtons />
          </View>
          <View>
            <View className="mb-5">
              <TextStyled bold>Nom ou marque</TextStyled>
              <TextInput
                className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
                placeholder="Bière forte, verre de vin au bar..."
              />
              <Text className="text-xs">(30 caractères max)</Text>
            </View>
            <View className="mb-4">
              <TextStyled bold>Quantité d’alcool servie (cl)</TextStyled>
              <TouchableOpacity className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center">
                <Text className="text-[#CACACD] flex">Sélectionnez une quantité</Text>
                <ArrowDown color="#000000" size={30} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between mb-8">
              <View className="basis-1/2 pr-2">
                <TextStyled bold>Degré d'alcool (%)</TextStyled>
                <TextInput
                  className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
                  placeholder="Degrés"
                />
              </View>
              <View className="basis-1/2 pl-2">
                <TextStyled bold>Prix (€)</TextStyled>
                <TextInput
                  className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
                  placeholder="Euros"
                />
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
              <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
            </View>
          </View>
          <View className="flex flex-row justify-center mt-14 mb-10">
            <ButtonPrimary
              content="Créer ma boisson"
              onPress={() => {
                // Todo: add drink to database
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddOwnDrink;
