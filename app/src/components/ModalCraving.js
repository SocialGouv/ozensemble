import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import CravingIcon from './illustrations/CravingIcon';
import ButtonPrimary from './ButtonPrimary';
import TipIcon from './illustrations/TipIcon';

const ModalCraving = ({ firstTimeOnCraving, onClose }) => {
  return (
    <Modal visible={firstTimeOnCraving} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl px-2 h-5/6">
        <View className="h-5 flex flex-row  justify-end">
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
        <View className="flex flex-col justify-between h-full">
          <View className="flex flex-col items-center">
            <CravingIcon size={70} className="" />
          </View>
          <Text color="#000" className="text-start text-xl font-extrabold text-[#DE285E] ">
            M'aider avec mon craving
          </Text>
          <View className="flex flex-row ">
            <TipIcon size={20} className="mt-1 -mr-4 " />
            <Text className="text-start text-black text-lg">
              {'     '}
              Vous êtes dans un moment de craving, et nous sommes là pour vous aider !
            </Text>
          </View>
          <Text className="text-start text-[#4030A5] font-bold text-lg">
            Sachez qu’un moment de craving n’est pas eternel, et dure généralement entre 5 et 20 minutes.
          </Text>
          <Text className="text-start text-black text-lg">
            Le craving peut être intense et difficile à gérer, mais il existe des moyens de le surmonter.
          </Text>
          <Text className="text-start text-black text-lg">
            Oz vous propose divers conseils et activités afin de vous accompagner dans ces moments délicats.
          </Text>
          <Text className="text-start text-black text-lg">
            Cliquez sur “Commencer” pour accéder dès maintenant aux activités !
          </Text>
        </View>
        <View className="flex flex-row justify-center">
          <ButtonPrimary
            content="Commencer"
            onPress={() => {
              onClose();
            }}
            className="mt-4"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalCraving;
