import React from 'react';

import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import TextStyled from '../../components/TextStyled';
import H2 from '../../components/H2';
import { alcoolQuantityCatalog } from './alcoolQuantityCatalog';
import { getIcon } from '../ConsoFollowUp/drinksCatalog';

const AddAlcoolQuantity = ({ visible, hide, setQuantitySelected }) => {
  return (
    <Modal visible={visible} hide={hide} animationType="sheet" presentationStyle="formSheet">
      <View className="h-full w-full bg-white">
        <ScrollView>
          <View className="my-10" style={{ padding: defaultPaddingFontScale() }}>
            <BackButton content="Retour" bold onPress={hide} />
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
                      hide();
                    }}>
                    <Icon size={30} />
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
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddAlcoolQuantity;
