import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import ButtonPrimary from './ButtonPrimary';
import PreviousConsumption from './illustrations/icons/PreviousConsumption';

const ModalPreviousDrinksValidation = ({ content, onUpdate, onValidate, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" withBackground hideOnTouch className="border">
      <View className="bg-white rounded-xl">
        <View className="flex flex-row justify-center mt-4 mb-2">{<PreviousConsumption size={50} />}</View>
        <View className="mb-4 p-2">
          <Text color="#000" className="text-center mb-1 text-xl font-extrabold">
            Mon estimation initiale sur une semaine
          </Text>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-4">
            <Text className="text-xs text-[#939EA6] text-center">Unités d'alcool consommées</Text>
            <View className="flex flex-row justify-center">
              <Text className="font-bold text-xl">{content.numberDrinkEstimation} </Text>
              <Text className="font-bold text-lg">{content.numberDrinkEstimation > 1 ? 'unités' : 'unité'}</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-indigo-600 text-center underline" onPress={onUpdate}>
                Modifier
              </Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-3 mb-8">
            <Text className="text-xs text-[#939EA6] text-center">Soit une consommation équivalente</Text>
            <View className="flex flex-row justify-evenly">
              <Text className="font-bold text-xl">{content.weeklyExpenses}€</Text>
              <View className="flex flex-row items-baseline">
                <Text className="font-bold text-xl">{content.kcals} </Text>
                <Text className="font-bold text-base">KCAL</Text>
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
