import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import ButtonPrimary from './ButtonPrimary';
import PreviousConsumption from './illustrations/icons/PreviousConsumption';
import TextStyled from './TextStyled';

const ModalPreviousDrinksValidation = ({ content, onUpdate, onValidate, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" withBackground hideOnTouch className="border">
      <View className="bg-white rounded-xl">
        <View className="flex flex-row justify-center mt-4 mb-2">{<PreviousConsumption size={50} />}</View>
        <View className="mb-4 p-2">
          <TextStyled color="#000" className="text-center mb-1 text-xl font-extrabold">
            Mon estimation initiale sur une semaine
          </TextStyled>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-4">
            <TextStyled className="text-xs text-[#939EA6] text-center">Unités d'alcool consommées</TextStyled>
            <View className="flex flex-row justify-center">
              <TextStyled className="font-bold text-xl">{content.numberDrinkEstimation} </TextStyled>
              <TextStyled className="font-bold text-lg">
                {content.numberDrinkEstimation > 1 ? 'unités' : 'unité'}
              </TextStyled>
            </View>
            <TouchableOpacity>
              <TextStyled className="text-indigo-600 text-center underline" onPress={onUpdate}>
                Modifier
              </TextStyled>
            </TouchableOpacity>
          </View>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-3 mb-8">
            <TextStyled className="text-xs text-[#939EA6] text-center">Soit une consommation équivalente</TextStyled>
            <View className="flex flex-row justify-evenly">
              <TextStyled className="font-bold text-xl">{content.weeklyExpenses}€</TextStyled>
              <View className="flex flex-row items-baseline">
                <TextStyled className="font-bold text-xl">{content.kcals} </TextStyled>
                <TextStyled className="font-bold text-base">KCAL</TextStyled>
              </View>
            </View>
          </View>
          <ButtonPrimary content={'Valider et continuer'} onPress={onValidate} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPreviousDrinksValidation;
