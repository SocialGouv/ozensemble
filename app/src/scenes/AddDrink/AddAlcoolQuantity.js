import React from 'react';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import H2 from '../../components/H2';
import { alcoolQuantityCatalog } from './alcoolQuantityCatalog';
import { getIcon } from '../ConsoFollowUp/drinksCatalog';
const AddAlcoolQuantity = ({ navigation, setQuantitySelected }) => {
  return (
    <View className="h-full bg-white py-10">
      <View className="bg-white rounded-xl mt-auto absolute bottom-0 w-full h-full shadow-xl shadow-[#5E5E5E]">
        <ScrollView style={{ padding: defaultPaddingFontScale() }}>
          <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
          <H2 color="#4030a5" className="mt-5 mb-4">
            Sélectionnez une quantité d'alcool
          </H2>
          <TextStyled italic className="text-xs mb-4">
            Cliquez sur un contenant pour compléter le champ
          </TextStyled>
          <View className="mb-10">
            {alcoolQuantityCatalog.map((quantity) => {
              const Icon = getIcon(quantity.icon);
              return (
                <TouchableOpacity
                  key={quantity.name}
                  className="flex flex-row bg-[#F3F3F6] h-12 mb-3 rounded-lg border border-[#DBDBE8] items-center px-2"
                  onPress={() => {
                    setQuantitySelected({
                      name: quantity.name,
                      volume: quantity.volume?.split(' ')[0],
                      icon: quantity.icon,
                    });
                    navigation.goBack();
                  }}>
                  <FoundIcon size={30} />
                  <View className="flex flex-row flex-wrap ml-2 w-10/12">
                    <TextStyled bold className="">
                      {quantity.name} :{' '}
                    </TextStyled>
                    <Text>{quantity.volume}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddAlcoolQuantity;
