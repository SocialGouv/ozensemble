import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from '../../components/Modal';
import { hitSlop } from '../../styles/theme';
import StratPlusIcon from '../../components/illustrations/StratPlusIcon';
import { strategyCatalog } from './strategies';
const allActionsPlans = strategyCatalog.filter((strategy) => strategy.categoryKey === 'actionPlan');
const randomPossibleActionPlan = allActionsPlans.filter(
  (actionPlan) => !!actionPlan.redirection && actionPlan.redirection !== 'RANDOM'
);

const SuccessStrategyModal = ({ navigation, actionPlanRedictor, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" withBackground hideOnTouch>
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className="h-5 flex flex-row  justify-end">
          <TouchableOpacity onPress={onClose} hitSlop={hitSlop(15)}>
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

                        navigation.navigate(..._actionPlan.redirection);
                        onClose();
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
            <TouchableOpacity className="justify-center items-center rounded-3xl" onPress={onClose}>
              <Text className="text-[#4030A5] font-semibold underline">Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessStrategyModal;
