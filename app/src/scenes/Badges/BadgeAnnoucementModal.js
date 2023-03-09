import React, { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, SafeAreaView, TouchableOpacity, InteractionManager, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InAppReview from 'react-native-in-app-review';
import { useSetRecoilState } from 'recoil';
import { hitSlop } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import TextStyled from '../../components/TextStyled';
import { BagdeDrinksNoStars } from './Svgs/BadgeDrinksNoStars';
import { BadgeGoalsNoStars } from './Svgs/BadgeGoalsNoStars';
import { BadgeDefisNoStars } from './Svgs/BadgeDefisNoStars';
import { storage } from '../../services/storage';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import API from '../../services/api';
import { BadgeArticlesNoStars } from './Svgs/BadgeArticlesNoStars';
import { shareApp } from '../../services/shareApp';
/*
{
  id: '@NewBadgesAnnouncementFeatures',
  badgesCategories: ['drinks', 'goals', 'defis', 'articles'],
  title: 'Nouveau\u00A0: les badges arrivent dans l'application\u00A0!',
  description: 'Gagnez des badges symboliques en ajoutant vos consommations tous les jours ou en atteignant votre objectif de la semaine\u00A0!',
  CTAButton: 'Voir mes badges'
  CTANavigation: 'BADGES_LIST'
}

*/

const BadgeAnnoucementModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const setBadges = useSetRecoilState(badgesState);
  const setBadgesCatalog = useSetRecoilState(badgesCatalogState);

  useEffect(() => {
    const matomoId = storage.getString('@UserIdv2');
    // storage.delete('@NewBadgesAnnouncementFeatures');
    API.get({ path: `/badge/${matomoId}` }).then((res) => {
      if (res.ok) {
        setBadges(res.data.badges);
        setBadgesCatalog(res.data.badgesCatalog);
        if (res.data.announcementModal?.id) {
          setModalContent(res.data.announcementModal);
        }
      }
    });
  }, [setBadges, setBadgesCatalog]);

  const navigation = useNavigation();
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(() => {
      if (modalContent.CTANavigation) {
        navigation.navigate(...modalContent.CTANavigation);
      } else if (modalContent.CTAShare) {
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
  const onClose = () => {
    setModalContent(null);
  };

  return (
    <Modal
      safeAreaView={false}
      visible={!!modalContent}
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
          <View className="w-full mb-6 mt-4 flex flex-row justify-center gap-x-2">
            {modalContent?.badgesCategories?.map((badgeCategory) => {
              return (
                <View key={badgeCategory}>
                  {badgeCategory === 'drinks' && <BagdeDrinksNoStars />}
                  {badgeCategory === 'goals' && <BadgeGoalsNoStars />}
                  {badgeCategory === 'defis' && <BadgeDefisNoStars />}
                  {badgeCategory === 'articles' && <BadgeArticlesNoStars />}
                </View>
              );
            })}
          </View>
          <View className="mb-8">
            <H1 className="text-center">
              <TextStyled>{modalContent?.title}</TextStyled>
            </H1>
          </View>
          <Text className="text-base font-medium mb-8 text-center">
            <TextStyled color={'#3C3C43'}>{modalContent?.description}</TextStyled>
          </Text>
          {!!modalContent?.CTAButton && (
            <View className="items-center mb-4">
              <ButtonPrimary onPress={onCTAPress} content={modalContent?.CTAButton} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BadgeAnnoucementModal;
