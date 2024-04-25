import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import CravingIcon from './illustrations/CravingIcon';
import ButtonPrimary from './ButtonPrimary';

const ModalCraving = ({ firstTimeOnCraving, onClose }) => {
  return (
    <Modal visible={firstTimeOnCraving} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl p-2">
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

        <View className="mb-4">
          <CravingIcon size={70} className="m-auto mb-4 " />
          <Text color="#000" className="text-start text-xl font-extrabold text-[#DE285E] mb-4">
            M'aider avec mon craving
          </Text>
          <Text className="text-start text-black text-base">
            Vous êtes dans un moment de craving, et nous sommes là pour vous aider !{'\n'}
          </Text>
          <Text className="text-start text-[#4030A5] font-bold text-base">
            Sachez qu’un moment de craving n’est pas eternel, et dure généralement entre 5 et 20 minutes.{'\n'}
          </Text>
          <Text className="text-start text-black text-base">
            Le craving peut être intense et difficile à gérer, mais il existe des moyens de le surmonter.
            {'\n'}
            {'\n'} Oz vous propose divers conseils et activités afin de vous accompagner dans ces moments délicats.
            {'\n'}
            {'\n'} Cliquez sur “Commencer” pour accéder dès maintenant aux activités !
          </Text>
        </View>
        <View className="flex items-center mb-4">
          <ButtonPrimary content="Commencer" className="" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalCraving;
