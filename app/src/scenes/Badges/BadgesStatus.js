import React, { useCallback } from 'react';
import H1 from '../../components/H1';
import { View, Text } from 'react-native';
import { BagdeDrinksNoStars } from './Svgs/BagdeDrinksNoStars';
import { BadgeGoalsNoStars } from './Svgs/BadgeGoalsNoStars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { badgesState } from '../../recoil/badges';
import { useFocusEffect } from '@react-navigation/native';
import { storage } from '../../services/storage';
import API from '../../services/api';

const BadgesStatus = ({ navigate }) => {
  const [badges, setBadges] = useRecoilState(badgesState);
  const nbUserDrinksBagdes = badges?.filter((userBadge) => userBadge['category'] === 'DRINKS').length;
  const nbUserGoalsBadge = badges?.filter((userBadge) => userBadge['category'] === 'GOALS').length;
  useFocusEffect(
    useCallback(() => {
      const matomoId = storage.getString('@UserIdv2');
      API.get({ path: `/badge/${matomoId}` }).then((res) => {
        if (res.ok) setBadges(res.data);
      });
    }, [])
  );

  return (
    <TouchableOpacity className="py-5" onPress={navigate}>
      <View className="mt-2">
        <H1 color="#4030a5" className="mb-4">
          Mes badges obtenus
        </H1>
      </View>
      <View className="flex flex-row gap-x-4">
        <View className="bg-[#E8E8F3] rounded-lg flex p-2 flex-grow justify-center">
          <Text className="text-[#4030a5] font-bold text-sm text-center mb-4"> Jours complétés </Text>
          <View className="" style={{ transform: [{ scale: 1.2 }] }}>
            <BagdeDrinksNoStars />
          </View>
          <View className="w-1/2 rounded-xl bg-white h-2 flex mx-auto mt-4">
            {nbUserDrinksBagdes > 0 && (
              <View
                className="rounded-xl bg-[#FBD361] h-2"
                style={{ width: (nbUserDrinksBagdes / 5) * 100 + '%' }}></View>
            )}
          </View>
          <Text className="text-center text-[#4030a5] font-bold text-xs my-2"> {nbUserDrinksBagdes}/5 </Text>
        </View>
        <View className="bg-[#E8E8F3] rounded-lg flex justify-center p-2 flex-grow">
          <Text className="text-[#4030a5] font-bold text-sm text-center mb-4"> Objectifs atteints </Text>
          <View style={{ transform: [{ scale: 1.2 }] }}>
            <BadgeGoalsNoStars />
          </View>

          <View className="w-1/2 rounded-xl bg-white h-2 flex mx-auto mt-4">
            {nbUserGoalsBadge > 0 && (
              <View
                className="rounded-xl bg-[#81DBD3] h-2"
                style={{ width: (nbUserGoalsBadge / 5) * 100 + '%' }}></View>
            )}
          </View>
          <Text className="text-center text-[#4030a5] font-bold text-xs my-2"> {nbUserGoalsBadge}/5 </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BadgesStatus;
