import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Platform,
  InteractionManager,
  Dimensions,
} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { useNavigation } from '@react-navigation/native';
import { defaultPaddingFontScale, hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';
import H1 from './H1';
import Modal from './Modal';
import TextStyled from './TextStyled';
import API from '../services/api';
import { shareApp } from '../services/shareApp';
import { storage } from '../services/storage';
import AnnouncementCalendar1 from './illustrations/AnnouncementCalendar1';
import AnnouncementCalendar2 from './illustrations/AnnouncementCalendar2';

/* example
{
    title: '1er jour complété',
    content: 'Super, vous avez complété votre 1er jour! \n Revenez demain pour ajouter le second! ',
    CTATitle: 'Voir mes badges',
    CTANavigation: ['BADGES_LIST'],
    CTALink: null,
    secondaryButtonTitle: "Partager l'application",
    secondaryButtonNavigation: ['BADGES_LIST'],
    secondaryButtonLink: null,
}
*/

const InAppModal = () => {
  const screenWidth = Number(Dimensions.get('window').width - 50);
  console.log(screenWidth);
  console.log(defaultPaddingFontScale());
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const onClose = () => {
    setShowModal(false);
  };
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
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

  const handleShowInAppModal = async (inAppModalContent) => {
    if (!inAppModalContent) return;
    if (inAppModalContent) setModalContent(inAppModalContent);
    setShowModal(true);
  };

  const getModalNewFeature = async () => {
    const isModalViewed = storage.getBoolean('@NewCalendarAnnouncement');
    if (!isModalViewed) {
      const matomoId = storage.getString('@UserIdv2');
      await API.post({
        path: '/appMilestone/init',
        body: {
          matomoId,
        },
      });
    }
  };

  useEffect(() => {
    API.handleShowInAppModal = handleShowInAppModal;
    getModalNewFeature();
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
          <View className="w-full mb-6 mt-6 flex flex-col items-center space-y-2">
            {modalContent?.id.includes('NewCalendarAnnouncement') && (
              <View className="mx-2 flex flex-col items-center">
                <AnnouncementCalendar1 size={screenWidth - 14} />
                <AnnouncementCalendar2 size={screenWidth} />
              </View>
            )}
          </View>

          <View className="mb-8 mx-4">
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
      </SafeAreaView>
    </Modal>
  );
};

export default InAppModal;
