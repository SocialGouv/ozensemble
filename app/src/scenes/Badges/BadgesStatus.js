import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { useFocusEffect } from '@react-navigation/native';
import H1 from '../../components/H1';
import { BagdeDrinksNoStars } from './Svgs/BagdeDrinksNoStars';
import { BadgeGoalsNoStars } from './Svgs/BadgeGoalsNoStars';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import { storage } from '../../services/storage';
import API from '../../services/api';
import { BadgeDefisNoStars } from './Svgs/BadgeDefisNoStars';
import { BadgeArticlesNoStars } from './Svgs/BadgeArticlesNoStars';

const BadgesStatus = ({ navigate }) => {
  const [badges, setBadges] = useRecoilState(badgesState);
  const [badgesCatalog, setBadgesCatalog] = useRecoilState(badgesCatalogState);
  useFocusEffect(
    useCallback(() => {
      const matomoId = storage.getString('@UserIdv2');
      API.get({ path: `/badge/${matomoId}` }).then((res) => {
        if (res.ok) {
          setBadges(res.data.badges);
          setBadgesCatalog(res.data.badgesCatalog);
        }
      });
    }, [setBadges, setBadgesCatalog])
  );

  if (!badgesCatalog.length) return null;

  return (
    <TouchableOpacity className="py-5" onPress={navigate}>
      <View className="mt-2">
        <H1 color="#4030a5" className="mb-4">
          Mes badges obtenus
        </H1>
      </View>
      <View className="flex flex-row flex-wrap -m-2">
        {badgesCatalog.map((badgeCategory) => {
          if (!badgeCategory.badges) return null;
          const numberOfBadges = badges?.filter((userBadge) => userBadge.category === badgeCategory.category).length;
          const numberOfAvailableBadges = badgeCategory.badges.length;
          return (
            <View key={badgeCategory.category} className="p-2 basis-1/2">
              <View className="bg-[#E8E8F3] rounded-lg flex p-2 w-full justify-center">
                <Text className="text-[#4030a5] font-bold text-sm text-center mb-4">
                  {badgeCategory.titleForStatus}
                </Text>
                {badgeCategory.category === 'drinks' && <BagdeDrinksNoStars />}
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
