import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import CravingIcon from './illustrations/CravingIcon';
import ButtonPrimary from './ButtonPrimary';
import TipIcon from './illustrations/TipIcon';
import { ScrollView } from 'react-native-gesture-handler';

const ModalCraving = ({ firstTimeOnCraving, onClose }) => {
  return (
    <Modal visible={firstTimeOnCraving} animationType="fade" withBackground hideOnTouch safeAreaView>
      <ScrollView className="h-full p-1 gap-4">
        <View className="h-5 flex flex-row  justify-end ">
          <TouchableOpacity onPress={onClose} hitSlop={hitSlop(15)}>
            <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                stroke="black"
                d="M6 18L18 6M6 6l12 12"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View className="items-center">
          <CravingIcon size={70} className="-mt-6" />
        </View>
        <Text color="#000" className="text-start text-xl font-extrabold text-[#FF0000] ">
          M'aider avec mon craving
        </Text>
        <View className="flex flex-row ">
          <TipIcon size={20} className="mt-1 -mr-4 " />
          <Text className="text-start text-black text-lg">
            {'     '}
            Vous êtes dans un moment de craving, et nous sommes là pour vous aider !
          </Text>
        </View>
        <Text className="text-start text-black text-lg">
          Le craving est un désir intense de consommer une substance addictive, comme l'alcool.
        </Text>
        <Text className="text-start text-[#4030A5] font-bold text-lg">
          Sachez qu’un moment de craving n’est pas éternel, et dure généralement entre 5 et 20 minutes.
        </Text>
        <View className="flex flex-col ">
          <Text className="text-start text-black text-lg">Oz vous accompagne dans ces moments délicats, avec : </Text>
          <Text className="text-start text-black text-lg">
            {`\u2022`} des <Text className="font-bold">conseils</Text> rapides, à appliquer immédiatement,
            {`\n`} {`\u2022`} des <Text className="font-bold">exercices de respiration</Text>, à adapter selon vos
            besoins,
            {`\n`}
            {`\u2022`} un catalogue varié de <Text className="font-bold">vidéos</Text>, avec plusieurs catégories.
          </Text>
        </View>

        <Text className="text-start text-black text-lg">
          Cliquez sur “Commencer” pour accéder dès maintenant aux activités !
        </Text>

        <View className="flex flex-row justify-center mb-2">
          <ButtonPrimary
            content="Commencer"
            onPress={() => {
              onClose();
            }}
            className=""
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalCraving;
