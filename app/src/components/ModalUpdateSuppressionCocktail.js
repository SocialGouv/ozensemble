import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TouchableOpacity, Text } from 'react-native';
import H2 from './H2';
import Modal from './Modal';
import { hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';

const ModalUpdateSuppressionCocktail = ({ isUpdate, visible, onClose, onUpdate, onDelete }) => {
  return (
    <Modal visible={visible} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl m-auto w-10/12">
        <TouchableOpacity onPress={onClose} hitSlop={hitSlop(15)}>
          <Svg fill="none" viewBox="0 0 24 24" className="absolute right-0 mb-8 h-5 w-5">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              stroke="black"
              d="M6 18L18 6M6 6l12 12"
            />
          </Svg>
        </TouchableOpacity>
        <View className="mb-4 mt-2 p-2">
          {isUpdate ? (
            <H2 color="#000">Voulez-vous mettre à jour votre cocktail{'\u00A0'}?</H2>
          ) : (
            <H2 color="#000">Voulez-vous supprimer votre cocktail{'\u00A0'}?</H2>
          )}
          {isUpdate ? (
            <Text className="text-base mt-4">
              Vous êtes sur le point de mettre à jour toutes les consommations ajoutées avec ce cocktail, êtes-vous sûr
              de vouloir le mettre à jour{'\u00A0'}?
            </Text>
          ) : (
            <Text className="text-base mt-4">
              Vous êtes sur le point de supprimer un cocktail que vous avez créé, êtes-vous sûr de vouloir le supprimer
              {'\u00A0'}?
            </Text>
          )}

          <View className=" justify-around mt-6 space-y-4">
            {isUpdate ? (
              <ButtonPrimary content="Oui modifier" onPress={onUpdate} />
            ) : (
              <ButtonPrimary content="Oui supprimer" onPress={onDelete} />
            )}
            <TouchableOpacity onPress={onClose} content={'Oui supprimer'} color={'#4030A5'}>
              <Text className="text-[#4030A5] text-center underline text-base">Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdateSuppressionCocktail;
