import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import ButtonPrimary from './ButtonPrimary';
import GoalSetup from './illustrations/icons/GoalSetup';
import TextStyled from './TextStyled';

const ModalGoalValidation = ({ content, onUpdate, onValidate, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" withBackground hideOnTouch className="border">
      <View className="bg-white rounded-xl">
        <View className="flex flex-row justify-center mt-4 mb-2">{<GoalSetup size={50} />}</View>
        <View className="mb-4 p-2">
          <TextStyled color="#000" className="text-center mb-1 text-xl font-extrabold">
            Mon objectif semaine
          </TextStyled>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-4">
            <TextStyled className="text-xs text-[#939EA6] text-center">
              Jours par semaine où je m'autorise à boire
            </TextStyled>
            <View className="flex flex-row justify-center">
              {content.daysGoal > 0 ? (
                <>
                  <TextStyled className="font-bold text-xl">{content.daysGoal} </TextStyled>
                  <TextStyled className="font-bold text-lg">{content.daysGoal > 1 ? 'jours' : 'jour'} max</TextStyled>
                </>
              ) : (
                <TextStyled className="font-bold text-lg">Aucun jour</TextStyled>
              )}
            </View>
          </View>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-3 mb-8">
            <TextStyled className="text-xs text-[#939EA6] text-center">
              Quantité par semaine que je m'autorise à boire
            </TextStyled>
            <View className="flex flex-row justify-center">
              {content.drinksGoal > 0 ? (
                <>
                  <TextStyled className="font-bold text-xl">{content.drinksGoal} </TextStyled>
                  <TextStyled className="font-bold text-lg">
                    {content.drinksGoal > 1 ? 'unités' : 'unité'} max
                  </TextStyled>
                </>
              ) : (
                <TextStyled className="font-bold text-lg">Aucune unité</TextStyled>
              )}
            </View>
          </View>
          <ButtonPrimary content={'Valider mon objectif'} onPress={onValidate} />
          <TouchableOpacity className="mt-4">
            <TextStyled className="text-indigo-600 text-center underline" onPress={onUpdate}>
              Modifier
            </TextStyled>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGoalValidation;
