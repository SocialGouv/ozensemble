import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import {
  InteractionManager,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InAppReview from "react-native-in-app-review";
import Svg, { Path } from "react-native-svg";
import { useSetRecoilState } from "recoil";
import ButtonPrimary from "../../components/ButtonPrimary";
import Confetti from "../../components/Confettis";
import H1 from "../../components/H1";
import TextStyled from "../../components/TextStyled";
import { badgesCatalogState, badgesState } from "../../recoil/badges";
import { logEvent } from "../../services/logEventsWithMatomo";
import { shareApp } from "../../services/shareApp";
import { hitSlop } from "../../styles/theme";
import { BadgeArticles } from "./Svgs/BadgeArticles";
import { BadgeDefis } from "./Svgs/BadgeDefis";
import { BadgeDrinks } from "./Svgs/BadgeDrinks";
import { BadgeGoals } from "./Svgs/BadgeGoals";
import { BadgeShare } from "./Svgs/BadgeShare";
import { LockedBadge } from "./Svgs/LockedBadge";
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
const BadgeModal = ({ navigation, route }) => {
  const { params } = route;
  const badge = params?.newBadge;
  const setBadges = useSetRecoilState(badgesState);
  const setBadgesCatalog = useSetRecoilState(badgesCatalogState);
  useEffect(() => {
    if (params.allBadges) setBadges(params.allBadges);
    if (params.badgesCatalog) setBadgesCatalog(params.badgesCatalog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    navigation.goBack();
  };
  const onCTAPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (badge.CTAEvent) {
        logEvent(badge.CTAEvent);
      }
      if (badge.CTANavigation) {
        navigation.navigate(...badge.CTANavigation);
      } else if (badge.CTAShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (badge.CTARate) {
        if (InAppReview.isAvailable()) {
          InAppReview.RequestInAppReview();
        } else {
          Linking.openURL(
            Platform.select({
              ios: "https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1",
              android: "https://play.google.com/store/apps/details?id=com.addicto",
            })
          );
        }
      } else if (badge.CTALink) {
        Linking.openURL(badge.CTALink);
      }
    });
  };
  const onSecondaryPress = () => {
    onClose();
    InteractionManager.runAfterInteractions(async () => {
      if (badge.secondaryButtonEvent) {
        logEvent(badge.secondaryButtonEvent);
      }
      if (badge.secondaryButtonNavigation) {
        navigation.navigate(...badge.secondaryButtonNavigation);
      } else if (badge.secondaryButtonShare) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        shareApp();
      } else if (badge.secondaryButtonRate) {
        if (InAppReview.isAvailable()) {
          InAppReview.RequestInAppReview();
        } else {
          Linking.openURL(
            Platform.select({
              ios: "https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1",
              android: "https://play.google.com/store/apps/details?id=com.addicto",
            })
          );
        }
      } else if (badge.secondaryButtonLink) {
        Linking.openURL(badge.secondaryButtonLink);
      }
    });
  };
  //

  return (
    <SafeAreaView className="bg-white rounded-t-xl mt-auto">
      <View className="p-4 ">
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
          {badge?.category === "drinks" && <BadgeDrinks stars={badge?.stars} />}
          {badge?.category === "share" && <BadgeShare stars={badge?.stars} />}
          {badge?.category === "goals" && <BadgeGoals stars={badge?.stars} />}
          {badge?.category === "articles" && <BadgeArticles stars={badge?.stars} />}
          {badge?.category === "defis" && <BadgeDefis stars={badge?.stars} />}
          {badge?.category?.includes("locked_") && <LockedBadge />}
        </View>
        <View className="mb-8">
          <H1 className="text-center" color={"black"}>
            {badge?.title}
          </H1>
        </View>
        <Text className="text-base font-medium mb-8 mx-4 text-center">
          <TextStyled color={"#3C3C43"}>
            {badge?.content?.split("__")?.map((string, index) => {
              return (
                <React.Fragment key={string}>
                  <TextStyled bold={index % 2}>{string}</TextStyled>
                </React.Fragment>
              );
            })}
          </TextStyled>
        </Text>
        {!!badge?.CTATitle && (
          <View className="items-center mb-4">
            <ButtonPrimary onPress={onCTAPress} content={badge?.CTATitle} />
          </View>
        )}
        {!!badge?.secondaryButtonTitle?.length && (
          <TouchableOpacity>
            <Text
              className="text-indigo-600 text-center underline text-base"
              onPress={onSecondaryPress}>
              {badge?.secondaryButtonTitle}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {badge?.showConfettis && <Confetti run={true} />}
    </SafeAreaView>
  );
};
export default BadgeModal;
