import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, SafeAreaView, TouchableOpacity, Linking, Platform, InteractionManager } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InAppReview from 'react-native-in-app-review';
import { useNavigation } from '@react-navigation/native';
import { hitSlop } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import TextStyled from '../../components/TextStyled';
import API from '../../services/api';
import { BadgeDrinks } from './Svgs/BadgeDrinks';
import { BadgeGoals } from './Svgs/BadgeGoals';
import { LockedBadge } from './Svgs/LockedBadge';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import { BadgeArticles } from './Svgs/BadgeArticles';
import { BadgeDefis } from './Svgs/BadgeDefis';
import { shareApp } from '../../services/shareApp';
import { logEvent } from '../../services/logEventsWithMatomo';
import ConfettiCannon from 'react-native-confetti-cannon';
/* example
{
    category: 'drinks',
    title: '1er jour complété',
    content: 'Super, vous avez complété votre 1er jour! \n Revenez demain pour ajouter le second! ',
    stars: 2,
    CTATitle: 'Voir mes badges',
    CTANavigation: ['BADGES_LIST'],
    CTALink: null,
    secondaryButtonTitle: "Partager l'application",
    secondaryButtonNavigation: ['BADGES_LIST'],
    secondaryButtonLink: null,
}
*/
const BadgeModal = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const setBadges = useSetRecoilState(badgesState);
  const setBadgesCatalog = useSetRecoilState(badgesCatalogState);
  const [lastBadge, setLastBadge] = useState(false);
  const isLastBadge = () => {
    let last = false;
    if (modalContent?.category === 'articles') {
      if (modalContent?.stars === 4) {
        last = true;
      }
    } else if (modalContent?.stars === 5) {
      last = true;
    }
    return last;
  };
  const onClose = () => {
    setShowModal(false);
    setModalContent(null);
  };
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (modalContent.CTAEvent) {
        logEvent(modalContent.CTAEvent);
      }
      if (modalContent.CTANavigation) {
        navigation.navigate(...modalContent.CTANavigation);
      } else if (modalContent.CTAShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (modalContent.CTARate) {
        if (InAppReview.isAvailable()) {
          InAppReview.RequestInAppReview();
        } else {
          Linking.openURL(
            Platform.select({
              ios: 'https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1',
              android: 'https://play.google.com/store/apps/details?id=com.addicto',
            })
          );
        }
      } else if (modalContent.CTALink) {
        Linking.openURL(modalContent.CTALink);
      }
    });
  };
  const onSecondaryPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (modalContent.secondaryButtonEvent) {
        logEvent(modalContent.secondaryButtonEvent);
      }
      if (modalContent.secondaryButtonNavigation) {
        navigation.navigate(...modalContent.secondaryButtonNavigation);
      } else if (modalContent.secondaryButtonShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (modalContent.secondaryButtonRate) {
        if (InAppReview.isAvailable()) {
          InAppReview.RequestInAppReview();
        } else {
          Linking.openURL(
            Platform.select({
              ios: 'https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1',
              android: 'https://play.google.com/store/apps/details?id=com.addicto',
            })
          );
        }
      } else if (modalContent.secondaryButtonLink) {
        Linking.openURL(modalContent.secondaryButtonLink);
      }
    });
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
    setLastBadge(isLastBadge());
  });
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
            {modalContent?.category === 'drinks' && <BadgeDrinks stars={modalContent?.stars} />}
            {modalContent?.category === 'goals' && <BadgeGoals stars={modalContent?.stars} />}
            {modalContent?.category === 'articles' && <BadgeArticles stars={modalContent?.stars} />}
            {modalContent?.category === 'defis' && <BadgeDefis stars={modalContent?.stars} />}
            {modalContent?.category?.includes('locked_') && <LockedBadge />}
          </View>
          <View className="mb-8">
            <H1 className="text-center" color={'black'}>
              {modalContent?.title}
            </H1>
          </View>
          <Text className="text-base font-medium mb-8 mx-4 text-center">
            <TextStyled color={'#3C3C43'}>
              {modalContent?.content?.split('__')?.map((string, index) => {
                return (
                  <React.Fragment key={string}>
                    <TextStyled bold={index % 2}>{string}</TextStyled>
                  </React.Fragment>
                );
              })}
            </TextStyled>
          </Text>
          {!!modalContent?.CTATitle && (
            <View className="items-center mb-4">
              <ButtonPrimary onPress={onCTAPress} content={modalContent?.CTATitle} />
            </View>
          )}
          {!!modalContent?.secondaryButtonTitle?.length && (
            <TouchableOpacity>
              <Text className="text-indigo-600 text-center underline text-base" onPress={onSecondaryPress}>
                {modalContent?.secondaryButtonTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {lastBadge && (
          <ConfettiCannon
            className="absolute"
            count={200}
            fallSpeed={2000}
            origin={{ x: 0, y: 500 }}
            autoStart={true}
            fadeOut={true}
            explosionSpeed={250}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};
export default BadgeModal;
