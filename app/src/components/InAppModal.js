import React, { useEffect } from 'react';
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
import { hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';
import H1 from './H1';
import TextStyled from './TextStyled';
import { shareApp } from '../services/shareApp';
import { logEvent } from '../services/logEventsWithMatomo';
import StarAbstinenceFeature from './illustrations/icons/StarsAbstinenceFeature';
import SuperUserHeart from './illustrations/icons/SuperUserHeart';
import ChatBubble from './illustrations/icons/ChatBubble';
import { openSettings } from 'react-native-permissions';
import NotificationService from '../services/notifications';
import { BagdeDrinksNoStars } from '../scenes//Badges/Svgs/BadgeDrinksNoStars';
import { BadgeGoalsNoStars } from '../scenes/Badges/Svgs/BadgeGoalsNoStars';
import ChatBubbles from './illustrations/Chatbubbles';
import OwnClIcon from './illustrations/icons/OwnClIcon';
import CravingIcon from './illustrations/CravingIcon';
import StrategyIcon from './illustrations/StrategyIcon';
import MotivationIconInAppModal from './illustrations/MotivationIconInAppModal';
import { useRecoilState } from 'recoil';
import { isInCravingKeyState } from '../recoil/craving';
import CupMotivation from './illustrations/icons/CupMotivation';

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
  const [isInCraving, setIsInCraving] = useRecoilState(isInCravingKeyState);
  const inAppModal = route.params;

  const onClose = () => {
    navigation.goBack();
  };
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (inAppModal.CTAEvent) logEvent(inAppModal.CTAEvent);
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
      if (inAppModal.CTAOnPress) {
        if (inAppModal.CTAOnPress === 'openSettings') openSettings();
        else if (inAppModal.CTAOnPress === 'goToCraving') {
          setIsInCraving(true);
        } else {
          await NotificationService.checkAndAskForPermission();
        }
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
          {inAppModal?.id.includes('MyMotivations') && (
            <View className="flex flex-col items-center">
              <CupMotivation size={60} />
            </View>
          )}
          {inAppModal?.id.includes('@Motivation') && (
            <View className="flex flex-col items-center">
              <MotivationIconInAppModal size={80} />
            </View>
          )}
          {inAppModal?.id.includes('CravingStrategy') && (
            <View className="mx-2 flex flex-col items-center">
              <StrategyIcon size={60} />
            </View>
          )}
          {inAppModal?.id.includes('FeatureCraving') && (
            <View className="mx-2 flex flex-col items-center">
              <CravingIcon size={60} />
            </View>
          )}
          {inAppModal?.id.includes('FeatureOwnCl') && (
            <View className="mx-2 flex flex-col items-center">
              <OwnClIcon />
            </View>
          )}
          {inAppModal?.id.includes('TestimoniesFeature') && (
            <View className="mx-2 flex flex-col items-center">
              <ChatBubbles size={60} />
            </View>
          )}

          {inAppModal?.id.includes('NewLongTermBadgesFeature') && (
            <View className="mx-2 flex flex-row items-center">
              <BagdeDrinksNoStars />
              <View className="p-2" />
              <BadgeGoalsNoStars />
            </View>
          )}
          {inAppModal?.id.includes('AllowNotification') && (
            <View className="mx-2 flex flex-col items-center">
              <ChatBubble fill="#4030A5" />
            </View>
          )}
          {inAppModal?.id.includes('Super30UserFeature') && (
            <View className="mx-2 flex flex-col items-center">
              <SuperUserHeart fill="#DE285E" />
            </View>
          )}
          {inAppModal?.id.includes('Super90UserFeature') && (
            <View className="mx-2 flex flex-col items-center">
              <SuperUserHeart fill="#4030A5" />
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
          {inAppModal?.id.includes('OfficialAppAnnouncement') && (
            <View className="mx-2 flex flex-col items-center">
              <Image className="rounded-full w-[100px] h-[100px]" source={require('../assets/images/Icon.png')} />
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
