import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';
import { hitSlop } from '../../styles/theme';
import StratPlusIcon from '../../components/illustrations/StratPlusIcon';
import { strategyCatalog, strategyCatalogObject } from './strategies';
import { SafeAreaView } from 'react-native-safe-area-context';

const allActionsPlans = strategyCatalog.filter((strategy) => strategy.categoryKey === 'actionPlan');
const randomPossibleActionPlan = allActionsPlans.filter(
  (actionPlan) => !!actionPlan.redirection && actionPlan.redirection !== 'RANDOM'
);

const SuccessStrategyModal = ({ navigation, route }) => {
  const actionPlan = route.params.actionPlan;
  const actionPlans = actionPlan?.map((actionPlanKey) => strategyCatalogObject[actionPlanKey]) || [];
  const actionPlanRedictor = actionPlans.filter((actionPlan) => actionPlan.redirection);
  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className="flex flex-row justify-center mt-4 mb-2 mx-4">
          <View className="h-5 flex flex-row  justify-end">
            <TouchableOpacity
              hitSlop={hitSlop(15)}
              onPress={() => {
                navigation.navigate('CRAVING', { screen: 'CRAVING_STRATEGIES' });
              }}>
              <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  stroke="black"
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View className="flex w-full px-2 my-8 items-center">
            <StratPlusIcon size={90} className="-mt-10 mb-6" />
            <Text className="text-start  text-xl px-2 font-extrabold text-[#4030A5] ">Stratégie ajoutée !</Text>
            {!!actionPlanRedictor.length && (
              <View className="flex w-full px-2 space-y-6 my-8 items-center">
                <Text className=" text-center px-2 font-semibold">
                  Cliquez sur une activité ci-dessous pour y accéder
                </Text>
                <View className="flex flex-row flex-wrap items-center space-y-2">
                  {actionPlanRedictor.map((actionPlan, elementIndex) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          let _actionPlan = actionPlan;
                          if (actionPlan.redirection === 'RANDOM') {
                            let randomActionPlanIndex = Math.floor(Math.random() * randomPossibleActionPlan.length);
                            _actionPlan = randomPossibleActionPlan[randomActionPlanIndex];
                          }
                          navigation.navigate('CRAVING', {
                            screen: _actionPlan.redirection[0],
                            params: _actionPlan?.redirection[1],
                          });
                        }}
                        key={elementIndex}
                        className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                        <Text className="font-extrabold color-white">{actionPlan.displayFeed}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <View className="flex flex-row justify-center mt-6">
              <TouchableOpacity
                className="justify-center items-center rounded-3xl"
                onPress={() => {
                  navigation.navigate('CRAVING', { screen: 'CRAVING_STRATEGIES' });
                }}>
                <Text className="text-[#4030A5] font-semibold underline">Continuer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessStrategyModal;
