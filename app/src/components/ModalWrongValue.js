import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import ButtonPrimary from './ButtonPrimary';
import GoalSetup from './illustrations/icons/GoalSetup';
import TextStyled from './TextStyled';

const ModalWrongValue = ({ onUpdateGoal, onUpdatePreviousConso, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" withBackground hideOnTouch className="border">
      <View className="bg-white rounded-xl">
        <View className="flex flex-row justify-center mt-4 mb-2">{<GoalSetup size={50} />}</View>
        <View className="mb-4 p-2">
          <TextStyled color="#000" className="text-center mb-1 text-xl font-extrabold">
            Mon objectif semaine
          </TextStyled>
          <View className="space-y-2 rounded-lg p-2 mt-4">
            <TextStyled className=" text-lg leading-6 text-center">
              La quantité de votre objectif doit être inférieure à l'estimation initiale de votre consommation actuelle.
              Modifier votre objectif ou votre estimation :)
            </TextStyled>
          </View>

          <ButtonPrimary content={'Modifier mon objectif'} onPress={onUpdateGoal} />
          <TouchableOpacity className="mt-4">
            <TextStyled className="text-indigo-600 text-center underline" onPress={onUpdatePreviousConso}>
              Modifier mon estimation
            </TextStyled>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrongValue;
