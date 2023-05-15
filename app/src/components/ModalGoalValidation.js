import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import ButtonPrimary from './ButtonPrimary';
import GoalSetup from './illustrations/icons/GoalSetup';

const ModalGoalValidation = ({ content, onUpdate, onValidate, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" withBackground hideOnTouch className="border">
      <View className="bg-white rounded-xl">
        <View className="flex flex-row justify-center mt-4 mb-2">{<GoalSetup size={50} />}</View>
        <View className="mb-4 p-2">
          <Text color="#000" className="text-center mb-1 text-xl font-extrabold">
            Mon objectif semaine
          </Text>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-4">
            <Text className="text-xs text-[#939EA6] text-center">Jours par semaine où je m'autorise à boire</Text>
            <View className="flex flex-row justify-center">
              <Text className="font-bold text-xl">{content.daysGoal} </Text>
              <Text className="font-bold text-lg">{content.daysGoal > 1 ? 'jours' : 'jour'} max</Text>
            </View>
          </View>
          <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-3 mb-8">
            <Text className="text-xs text-[#939EA6] text-center">Quantité par semaine que je m'autorise à boire</Text>
            <View className="flex flex-row justify-center">
              <Text className="font-bold text-xl">{content.drinksGoal} </Text>
              <Text className="font-bold text-lg">{content.drinksGoal > 1 ? 'unités' : 'unité'} max</Text>
            </View>
          </View>
          <ButtonPrimary content={'Valider mon objectif'} onPress={onValidate} />
          <TouchableOpacity className="mt-4">
            <Text className="text-indigo-600 text-center underline" onPress={onUpdate}>
              Modifier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGoalValidation;
