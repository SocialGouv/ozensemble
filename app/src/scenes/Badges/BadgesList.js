/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Dimensions, StyleSheet } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import { badgesState } from '../../recoil/badges';
import { BadgeDrinks } from './Svgs/BadgeDrinks';
import { BadgeGoals } from './Svgs/BadgeGoals';
import { badgeCatalog } from './badgesCatalog';
import { LockedBadge } from './Svgs/LockedBadge';

const BadgesList = ({ navigation }) => {
  const userBadges = useRecoilValue(badgesState);
  const userDrinksBagdes = userBadges?.filter((userBadge) => userBadge['category'] === 'DRINKS');
  const userGoalsBadge = userBadges?.filter((userBadge) => userBadge['category'] === 'GOALS');

  return (
    <WrapperContainer title="Mes badges obtenus" noMarginBottom onPressBackButton={navigation.goBack}>
      <View>
        <Text className="text-lg text-[#4030a5] font-extrabold">Badges jours</Text>
        <Text className="text-sm my-4">
          Gagnez ces badges en ajoutant votre consommation d'alcool tous les jours , en effet connaître sa consommation
          permet déjà de la maitriser !
        </Text>
      </View>
      <View className="flex flex-row flex-wrap items-center justify-right gap-3">
        {badgeCatalog['drinks_badge'].map((badge, index) => {
          if (userDrinksBagdes.find((userBadge) => userBadge['stars'] === badge['stars'])) {
            return (
              <View
                key={index}
                className="bg-[#E8E8F3] rounded-lg flex flex-col items-center p-3 gap-y-5 justify-between"
                style={styles.card}>
                <BadgeDrinks stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                <Text className="text-center text-[#4030a5] text-xs"> {badge.reduced_title} </Text>
              </View>
            );
          } else {
            return (
              <View
                key={index}
                className="bg-[#E8E8F3] rounded-lg flex flex-col items-center p-3 gap-y-5 justify-between"
                style={styles.card}>
                <LockedBadge size={Dimensions.get('window').width / 4 - 2 * 20} />
                <Text className="text-center text-[#4030a5] text-xs"> {badge.reduced_title} </Text>
              </View>
            );
          }
        })}
      </View>
      <View>
        <Text className="text-lg text-[#4030a5] font-extrabold mt-10">Badges objectifs</Text>
        <Text className="text-sm my-4">
          Gagnez ces badges en vous fixant votre objectif, puis d'une semaine à l'autre quand votre consommation
          d'alcool est inférieure à votre objectif!
        </Text>
      </View>
      <View className="flex flex-row flex-wrap gap-3 mb-16">
        {badgeCatalog['goals_badge'].map((badge, index) => {
          if (userGoalsBadge.find((userBadge) => userBadge['stars'] === badge['stars'])) {
            return (
              <View
                key={index}
                className="bg-[#E8E8F3] rounded-lg flex flex-col p-3 justify-start "
                style={styles.card}>
                <View className="mb-2">
                  <BadgeGoals stars={badge.stars} size={Dimensions.get('window').width / 4 - 2 * 20} />
                </View>
                <View className="mt-auto">
                  <Text className="text-center text-[#4030a5] text-xs"> {badge.title} </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View
                key={index}
                className="bg-[#E8E8F3] rounded-lg flex flex-col items-center p-3 gap-y-5 justify-between"
                style={styles.card}>
                <LockedBadge size={Dimensions.get('window').width / 4 - 2 * 20} />
                <Text className="text-center text-[#4030a5] text-xs"> {badge.title} </Text>
              </View>
            );
          }
        })}
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: Dimensions.get('window').width / 4,
  },
});

export default BadgesList;
