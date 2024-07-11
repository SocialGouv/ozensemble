import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { useFocusEffect } from '@react-navigation/native';
import { BagdeDrinksNoStars } from './Svgs/BadgeDrinksNoStars';
import { BadgeGoalsNoStars } from './Svgs/BadgeGoalsNoStars';
import { BadgeShareNoStars } from './Svgs/BadgeShareNoStars';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import { storage } from '../../services/storage';
import API from '../../services/api';
import { BadgeDefisNoStars } from './Svgs/BadgeDefisNoStars';
import { BadgeArticlesNoStars } from './Svgs/BadgeArticlesNoStars';
import H2 from '../../components/H2';
import BagdesIcon from '../../components/illustrations/icons/BagdesIcon';

const BadgesStatus = ({ navigate }) => {
  const [badges, setBadges] = useRecoilState(badgesState);
  const [badgesCatalog, setBadgesCatalog] = useRecoilState(badgesCatalogState);
  const availableBadges = badgesCatalog.filter((badge) => !badge.category.includes('locked_'));

  useFocusEffect(
    useCallback(() => {
      const matomoId = storage.getString('@UserIdv2');
      API.get({ path: `/badge/${matomoId}` })
        .then((res) => {
          if (res.ok) {
            setBadges(res.data.badges);
            setBadgesCatalog(res.data.badgesCatalog);
          }
        })
        .catch((err) => console.log('Get badges err', err));
    }, [setBadges, setBadgesCatalog])
  );

  if (!badgesCatalog.length) return null;

  return (
    <TouchableOpacity className="py-5 mt-2" onPress={navigate}>
      <View className="mt-2 flex flex-row space-x-1 items-center mb-3">
        <BagdesIcon size={25} />
        <H2 color="#4030a5">Mes badges obtenus</H2>
      </View>
      <View className="flex flex-row flex-wrap -m-2">
        {availableBadges.map((badgeCategory) => {
          if (!badgeCategory.badges) return null;
          const numberOfBadges = badges?.filter((userBadge) => userBadge.category === badgeCategory.category).length;
          const numberOfAvailableBadges = badgeCategory.badges.length;
          return (
            <View key={badgeCategory.category} className="p-2 basis-1/2">
              <View className="bg-[#E8E8F3] rounded-lg border-none flex p-2 w-full justify-center">
                <Text className="text-[#4030a5] font-bold text-sm text-center mb-4">
                  {badgeCategory.titleForStatus}
                </Text>
                {badgeCategory.category === 'drinks' && <BagdeDrinksNoStars />}
                {badgeCategory.category === 'share' && <BadgeShareNoStars />}
                {badgeCategory.category === 'goals' && <BadgeGoalsNoStars />}
                {badgeCategory.category === 'defis' && <BadgeDefisNoStars />}
                {badgeCategory.category === 'articles' && <BadgeArticlesNoStars />}
                <View className="w-1/2 rounded-xl bg-white h-2 flex mx-auto mt-4">
                  {numberOfBadges > 0 && (
                    <View
                      className="rounded-xl h-2"
                      style={{
                        backgroundColor: badgeCategory.bgColor,
                        width: (numberOfBadges / numberOfAvailableBadges) * 100 + '%',
                      }}
                    />
                  )}
                </View>
                <Text className="text-center text-[#4030a5] font-bold text-xs my-2">
                  {numberOfBadges}/{numberOfAvailableBadges}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default BadgesStatus;
