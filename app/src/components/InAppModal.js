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
  Image,
} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { useNavigation } from '@react-navigation/native';
import { hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';
import H1 from './H1';
import Modal from './Modal';
import TextStyled from './TextStyled';
import API from '../services/api';
import { shareApp } from '../services/shareApp';
import { storage } from '../services/storage';
import AnnouncementCalendar1 from './illustrations/AnnouncementCalendar1';
import AnnouncementCalendar2 from './illustrations/AnnouncementCalendar2';
import UserSurveyLogo from './illustrations/UserSurveyLogo';
import { logEvent } from '../services/logEventsWithMatomo';
import { BadgeShareNoStars } from '../scenes/Badges/Svgs/BadgeShareNoStars';
import StarAbstinenceFeature from './illustrations/icons/StarsAbstinenceFeature';
import SuperUserHeart from './illustrations/icons/SuperUserHeart';
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

const screenWidth = Number(Dimensions.get('window').width - 50);

const InAppModal = ({ navigation, route }) => {
  const inAppModal = route.params;

  const onClose = () => {
    navigation.goBack();
  };
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (inAppModal.CTANavigation) {
        navigation.navigate(...inAppModal.CTANavigation);
      } else if (inAppModal.CTAShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (inAppModal.CTARate) {
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
      } else if (inAppModal.CTALink) {
        Linking.openURL(inAppModal.CTALink);
      }
    });
  };
  const onSecondaryPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      // if NewUserSurveyAnnouncement logevent
      if (inAppModal?.id.includes('NewUserSurveyAnnouncement')) {
        logEvent({ category: 'USER_SURVEY', action: 'USER_SURVEY_IN_APP_SKIP' });
      }
      if (inAppModal.secondaryButtonNavigation) {
        navigation.navigate(...inAppModal.secondaryButtonNavigation);
      } else if (inAppModal.secondaryButtonShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (inAppModal.secondaryButtonRate) {
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
      } else if (inAppModal.secondaryButtonLink) {
        Linking.openURL(inAppModal.secondaryButtonLink);
      }
    });
  };

  useEffect(() => {
    logEvent({ category: 'IN_APP_MODAL', action: inAppModal?.id });
  });

  return (
    <SafeAreaView className="bg-white rounded-t-xl mt-auto">
      <View className="p-4">
        {!inAppModal?.id.includes('NewUserAbstinenceFeature') && (
          <TouchableOpacity
            onPress={() => {
              if (inAppModal?.id.includes('NewUserSurveyAnnouncement')) {
                logEvent({ category: 'USER_SURVEY', action: 'USER_SURVEY_IN_APP_CLOSE_BUTTON' });
              }
              onClose();
            }}
            hitSlop={hitSlop(15)}>
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
        )}
        <View className="w-full mb-6 mt-6 flex flex-col items-center space-y-2">
          {inAppModal?.id.includes('SuperUserFeature') && (
            <View className="mx-2 flex flex-col items-center">
              <SuperUserHeart />
            </View>
          )}
          {inAppModal?.id.includes('NewUserAbstinenceFeature') && (
            <View className="mx-2 flex flex-col items-center">
              <StarAbstinenceFeature />
              <Text className="text-4xl text-[#4030A5] font-black">4</Text>
              <Text className="font-extrabold text-[#4030A5] text-xl">jours d'affilée</Text>
              <Text className="text-light text-[#4030A5]">sans consommation d'alcool</Text>
            </View>
          )}
          {inAppModal?.id.includes('NewCalendarAnnouncement') && (
            <View className="mx-2 flex flex-col items-center">
              <AnnouncementCalendar1 size={screenWidth - 14} />
              <AnnouncementCalendar2 size={screenWidth} />
            </View>
          )}
          {inAppModal?.id.includes('NewUserSurveyAnnouncement') && (
            <View className="mx-2 flex flex-col items-center">
              <UserSurveyLogo />
            </View>
          )}
          {inAppModal?.id.includes('OfficialAppAnnouncement') && (
            <View className="mx-2 flex flex-col items-center">
              <Image className="rounded-full w-[100px] h-[100px]" source={require('../assets/images/Icon.png')} />
            </View>
          )}
          {inAppModal?.id.includes('NewUserShareFeature') && (
            <View>
              <BadgeShareNoStars />
            </View>
          )}
          {inAppModal?.id.includes('NewUserContextFeature') && (
            <View className="flex-row">
              <View className="border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2 bg-[#4030A5]">
                <Text className="color-white">à la maison</Text>
              </View>
              <View className="border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2 bg-[#4030A5]">
                <Text className="color-white">seul</Text>
              </View>
              <View className="border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2 bg-[#4030A5]">
                <Text className="color-white">me détendre</Text>
              </View>
            </View>
          )}
        </View>

        <View className="mb-8 mx-4">
          <H1 className="text-center" color={'black'}>
            {inAppModal?.title}
          </H1>
        </View>
        <Text className="text-base font-medium mb-8 mx-4 text-center">
          <TextStyled color={'#3C3C43'}>
            {inAppModal?.content?.split('__')?.map((string, index) => {
              return (
                <React.Fragment key={string}>
                  <TextStyled bold={index % 2}>{string}</TextStyled>
                </React.Fragment>
              );
            })}
          </TextStyled>
        </Text>
        {!!inAppModal?.CTATitle && (
          <View className="items-center mb-4">
            <ButtonPrimary onPress={onCTAPress} content={inAppModal?.CTATitle} />
          </View>
        )}
        {!!inAppModal?.secondaryButtonTitle?.length && (
          <TouchableOpacity>
            <Text className="text-indigo-600 text-center underline text-base" onPress={onSecondaryPress}>
              {inAppModal?.secondaryButtonTitle}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InAppModal;
