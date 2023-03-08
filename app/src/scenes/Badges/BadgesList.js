import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';
import WrapperContainer from '../../components/WrapperContainer';
import { badgesCatalogState, badgesState } from '../../recoil/badges';
import { BadgeDrinks } from './Svgs/BadgeDrinks';
import { BadgeGoals } from './Svgs/BadgeGoals';
import { LockedBadge } from './Svgs/LockedBadge';
import { BadgeArticles } from './Svgs/BadgeArticles';
import API from '../../services/api';

const BadgesList = ({ navigation }) => {
  const userBadges = useRecoilValue(badgesState);
  const badgesCatalog = useRecoilValue(badgesCatalogState);
  // const badgesPerCategory = badgesCatalog?.find((badge) => badge.category === category);
  // const badge = badgesCatalog.badges?.find((badge) => badge.stars === stars);
  const [clickedBadge, setClickedBadge] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const availableBadges = badgesCatalog.filter((badge) => badge.category === 'drinks' || badge.category === 'goals');
  return (
    <WrapperContainer title="Mes badges obtenus" onPressBackButton={navigation.goBack}>
      {availableBadges.map((badgeCategory) => {
        const userBadgesForCategory = userBadges?.filter((userBadge) => userBadge.category === badgeCategory.category);
        return (
          <React.Fragment key={badgeCategory.category}>
            <View>
              <Text className="text-lg text-[#4030a5] font-extrabold">{badgeCategory.titleForList}</Text>
              <Text className="text-sm my-4">{badgeCategory.description}</Text>
            </View>
            <View className="flex flex-row flex-wrap gap-3 mb-16">
              {badgeCategory.badges.map((badge) => {
                if (userBadgesForCategory.find((userBadge) => userBadge.stars === badge.stars)) {
                  return (
                    <TouchableOpacity
                      key={badge.title}
                      className="bg-[#E8E8F3] rounded-lg flex flex-col p-3 justify-start "
                      style={styles.card}
                      onPress={() => {
                        const category = badge.category;
                        const stars = badge.stars;
                        API.get({ path: '/badge/test', query: { category, stars } });
                      }}>
                      <View>
                        {badgeCategory.category === 'drinks' && (
                          <BadgeDrinks stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                        )}
                        {badgeCategory.category === 'goals' && (
                          <BadgeGoals stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                        )}
                        {badgeCategory.category === 'defis' && (
                          <BadgeGoals stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                        )}
                        {badgeCategory.category === 'articles' && (
                          <BadgeArticles stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                        )}
                      </View>
                      <View className="mt-auto">
                        <Text className="text-center text-[#4030a5] text-xs">{badge.reduced_title || badge.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={badge.title}
                      className="bg-[#E8E8F3] rounded-lg flex flex-col p-3 justify-start "
                      style={styles.card}
                      onPress={() => {
                        const category = 'locked_' + badge.category;
                        console.log('category', category);
                        const stars = badge.stars;
                        API.get({ path: '/badge/test', query: { category, stars } });
                      }}>
                      <View className="mb-4">
                        <LockedBadge size={Dimensions.get('window').width / 4 - 2 * 20} />
                      </View>
                      <View className="mt-auto">
                        <Text className="text-center text-[#4030a5] text-xs">{badge.reduced_title || badge.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </React.Fragment>
        );
      })}
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: Dimensions.get('window').width / 4,
  },
});

export default BadgesList;
