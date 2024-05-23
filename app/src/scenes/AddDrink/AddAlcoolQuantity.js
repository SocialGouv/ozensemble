import React, { useState } from 'react';

import { View, TextInput, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import TextStyled from '../../components/TextStyled';
import WrapperContainer from '../../components/WrapperContainer';
import { alcoolQuantityCatalog } from './alcoolQuantityCatalog';
import { getIcon } from '../ConsoFollowUp/drinksCatalog';
import CheckDefisValidated from '../../components/illustrations/icons/CheckDefisValidated';

const AddAlcoolQuantity = ({ visible, hide, setQuantitySelected }) => {
  const [value, setValue] = useState('');
  return (
    <Modal visible={visible} hide={hide} animationType="sheet" presentationStyle="formSheet">
      <View className="h-full w-full bg-white">
        <WrapperContainer title="Sélectionnez une quantité d'alcool" onPressBackButton={hide}>
          <TextStyled italic className="text-xs mb-4">
            Saisissez une valeur dans le premier champ ou cliquez sur un contenant pour compléter le champ
          </TextStyled>
          <View className="mb-10">
            <View className="flex flex-row border border-[#DBDBE8] bg-[#F3F3F6] items-center justify-between rounded-lg h-14 px-2 mb-5">
              <TextInput
                className=""
                placeholder="Saisissez une valeur en cl"
                keyboardType="numeric"
                value={value}
                onChangeText={(value) => {
                  setValue(value);
                  setQuantitySelected({ volume: value, name: 'Boisson personnalisée', icon: 'OwnClGlass' });
                }}></TextInput>
              <TouchableOpacity
                className=""
                onPress={() => {
                  hide();
                  setQuantitySelected({ volume: value, name: 'Boisson personnalisée', icon: 'OwnClGlass' });
                }}>
                <CheckDefisValidated size={30} fill={'#DE285E'} />
              </TouchableOpacity>
            </View>

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
                    setValue('');
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
        </WrapperContainer>
      </View>
    </Modal>
  );
};

export default AddAlcoolQuantity;
