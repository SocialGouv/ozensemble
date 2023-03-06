import React, { useState } from 'react';
import { hitSlop } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import TextStyled from '../../components/TextStyled';
import Svg, { Path } from 'react-native-svg';
import { BagdeDrinksNoStars } from './Svgs/BagdeDrinksNoStars';
import { BadgeGoalsNoStars, BagdeGoalsNoStars } from './Svgs/BadgeGoalsNoStars';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { storage } from '../../services/storage';
import { useNavigation } from '@react-navigation/native';

const BadgeAnnoucementModal = () => {
  const [showModal, setShowModal] = useState(!storage.getBoolean('@NewBadgesAnnouncementFeatures'));
  const navigation = useNavigation();
  const onGoToBadgesList = () => {
    onClose();
    navigation.navigate('BADGES_LIST');
  };

  const onClose = () => {
    storage.set('@NewBadgesAnnouncementFeatures', true);
    setShowModal(false);
  };

  return (
    <Modal
      safeAreaView={false}
      visible={showModal}
      animationType="fade"
      withBackground
      hideOnTouch
      className="absolute bottom-0 w-full">
      <SafeAreaView className="bg-white rounded-t-xl mt-auto">
        <View className="p-4">
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
          <View className="mb-6 mt-4 flex flex-row justify-center gap-x-2">
            <View>
              <BagdeDrinksNoStars />
            </View>
            <View>
              <BadgeGoalsNoStars />
            </View>
          </View>
          <View className="mb-8">
            <H1 className="text-center">
              <TextStyled>Nouveau : les badges arrivent dans l'application !</TextStyled>
            </H1>
          </View>
          <Text className="text-base font-medium mb-8 text-center">
            <TextStyled color={'#3C3C43'}>
              Gagnez des badges symboliques en ajoutant vos consommations tous les jours ou en atteignant votre objectif
              de la semaine !
            </TextStyled>
          </Text>
          <View className="items-center mb-4">
            <ButtonPrimary onPress={onGoToBadgesList} content="Voir mes badges" />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BadgeAnnoucementModal;
