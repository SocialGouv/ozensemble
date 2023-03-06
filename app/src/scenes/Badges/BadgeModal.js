import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { defaultPaddingFontScale, hitSlop } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import TextStyled from '../../components/TextStyled';
import API from '../../services/api';
import { BadgeDrinks } from './Svgs/BadgeDrinks';
import { BadgeGoals } from './Svgs/BadgeGoals';
import { badgesState } from '../../recoil/badges';

const BadgeModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    category: 'DRINKS_ADD',
    title: '1er jour complété',
    content: 'Super, vous avez complété votre 1er jour! \n Revenez demain pour ajouter le second! ',
    stars: 2,
    CTATitle: 'Voir mes badges',
    secondaryButtonTitle: "Partager l'application",
    secondaryButtonLink: '',
  });
  const [badges, setBadges] = useRecoilState(badgesState);

  const onClose = () => setShowModal(false);
  const handleShowBadge = async ({ newBadge, allBadges }) => {
    // InteractionManager.runAfterInteractions(() => {
    //   setModalContent(newBadge);
    //   setShowModal(true);
    // });

    if (newBadge) setModalContent(newBadge);
    if (allBadges) setBadges(allBadges);
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
            {modalContent.category === 'DRINKS_ADD' && <BadgeDrinks stars={modalContent.stars} />}
            {modalContent.category === 'GOALS' && <BadgeGoals stars={modalContent.stars} />}
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
            <ButtonPrimary onPress={onClose} content={modalContent.CTATitle} />
          </View>
          {/* {modalContent.secondaryButtonTitle.length >= 0 && (
            <View>
              <Text
                className="text-indigo-600 text-center underline text-base"
                onPress={() => Linking.openURL(modalContent.secondaryButtonLink)}>
                {modalContent.secondaryButtonTitle}
              </Text>
            </View>
          )} */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BadgeModal;
