import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { defaultPaddingFontScale, hitSlop } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import TextStyled from '../../components/TextStyled';
import API from '../../services/api';
import { BadgeDrinks } from './Svgs/BadgeDrinks';
import { BadgeGoals } from './Svgs/BadgeGoals';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import { useNavigation } from '@react-navigation/native';

const BadgeModal = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(() => ({
    category: 'DRINKS_ADD',
    title: '1er jour complété',
    content: 'Super, vous avez complété votre 1er jour! \n Revenez demain pour ajouter le second! ',
    stars: 2,
    CTATitle: 'Voir mes badges',
    CTANavigation: ['BADGES_LIST'],
    CTALink: null,
    secondaryButtonTitle: "Partager l'application",
    secondaryButtonNavigation: ['BADGES_LIST'],
    secondaryButtonLink: null,
  }));
  const setBadges = useSetRecoilState(badgesState);
  const setBadgesCatalog = useSetRecoilState(badgesCatalogState);

  const onClose = () => setShowModal(false);

  const onCTAPress = () => {
    if (modalContent.CTANavigation) {
      navigation.navigate(...modalContent.CTANavigation);
    } else if (modalContent.CTALink) {
      Linking.openURL(modalContent.CTALink);
    }
  };
  const onSecondaryPress = () => {
    if (modalContent.CTANavigation) {
      navigation.navigate(...modalContent.CTANavigation);
    } else if (modalContent.CTALink) {
      Linking.openURL(modalContent.CTALink);
    }
  };

  const handleShowBadge = async ({ newBadge, allBadges, badgesCatalog }) => {
    // InteractionManager.runAfterInteractions(() => {
    //   setModalContent(newBadge);
    //   setShowModal(true);
    // });

    if (newBadge) setModalContent(newBadge);
    if (allBadges) setBadges(allBadges);
    if (badgesCatalog) setBadgesCatalog(badgesCatalog);
    setShowModal(true);
  };

  useEffect(() => {
    API.handleShowBadge = handleShowBadge;
  }, []);
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
          <View className="mb-8 mt-4">
            {modalContent.category === 'drinks' && <BadgeDrinks stars={modalContent.stars} />}
            {modalContent.category === 'goals' && <BadgeGoals stars={modalContent.stars} />}
          </View>
          <View className="mb-8">
            <H1 className="text-center">
              <TextStyled>{modalContent.title}</TextStyled>
            </H1>
          </View>
          <Text className="text-base font-medium mb-8 text-center">
            <TextStyled color={'#3C3C43'}>{modalContent.content}</TextStyled>
          </Text>
          <View className="items-center mb-4">
            <ButtonPrimary onPress={onCTAPress} content={modalContent.CTATitle} />
          </View>
          {!!modalContent.secondaryButtonTitle.length && (
            <TouchableOpacity>
              <Text className="text-indigo-600 text-center underline text-base" onPress={onSecondaryPress}>
                {modalContent.secondaryButtonTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BadgeModal;
