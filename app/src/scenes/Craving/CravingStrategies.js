import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../../components/Background';
import WrapperContainer from '../../components/WrapperContainer';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defineStrategyState } from '../../recoil/strategies';
import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { strategyCatalogObject, getDisplayName } from '../../reference/strategyCatalog';

import TargetStrategy from '../../components/illustrations/icons/TargetStrategy';
import ModifyStrategy from '../../components/illustrations/icons/ModifyStrategy';
import LeftArrowStrategy from '../../components/illustrations/icons/leftArrowStrategy';
import RigthArrowStrategy from '../../components/illustrations/icons/rigthArrowStrategy';
import { useRecoilState } from 'recoil';

const CravingStrategies = ({ navigation }) => {
  const [strategies, setStrategies] = useRecoilState(defineStrategyState);
  const [pageIndex, setIndex] = useState(0);
  const [actionPlanRedictor, setActionPlanRedictor] = useState([]);
  const [actionPlanNotRedictor, setActionPlanNotRedictor] = useState([]);
  const filteredStrategy = strategies.find((strategy) => strategy.index === pageIndex);

  useEffect(() => {
    if (filteredStrategy) {
      const newActionPlanRedictor = [];
      const newActionPlanNotRedictor = [];

      filteredStrategy.actionPlan
        .map((actionPlanKey) => strategyCatalogObject[actionPlanKey])
        .forEach((actionPlan) => {
          if (actionPlan.redirection !== 'notdefined') {
            newActionPlanRedictor.push(actionPlan);
          } else {
            newActionPlanNotRedictor.push(actionPlan);
          }
        });

      setActionPlanRedictor(newActionPlanRedictor);
      setActionPlanNotRedictor(newActionPlanNotRedictor);
    }
  }, [strategies, pageIndex]);

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <WrapperContainer title="Ma stratégie" onPressBackButton={() => navigation.navigate('CRAVING_INDEX')}>
          <View className="border-[#4030A5] border p-5 rounded-lg">
            {filteredStrategy && (
              <View className="flex  flex-col space-y-3">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row items-center space-x-4">
                    <TargetStrategy size={50} />
                    <View className="flex flex-col">
                      <Text className="text-xl font-extrabold text-[#4030A5]">Stratégie n°{pageIndex + 1}</Text>
                      <Text className=" text-[#4030A5]">
                        {new Date(filteredStrategy.createdAt).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DEFINE_STRATEGY', { strategyIndex: filteredStrategy.index });
                      logEvent({
                        category: 'STRATEGY',
                        action: 'CLICK_MODIFY_STRAT',
                        name: filteredStrategy.index,
                      });
                    }}>
                    <ModifyStrategy />
                  </TouchableOpacity>
                </View>
                <Text className="text-lg font-bold text-black ">Déclencheur & Intensité </Text>
                <View className="flex flex-row flex-wrap items-center space-x-4">
                  <View className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                    <Text className="font-extrabold color-white">
                      {getDisplayName(filteredStrategy.trigger, strategyCatalogObject)}
                    </Text>
                  </View>
                  <View className="flex flex-wrap">
                    <View className=" border px-4 py-2 rounded-lg items-center ">
                      <Text className="text-lg font-bold text-[#FF4501]">{filteredStrategy.intensity}</Text>
                    </View>
                  </View>
                </View>
                <Text className="text-lg font-bold text-black ">Mon plan d'action</Text>
                {actionPlanRedictor.length && (
                  <>
                    <Text className="italic text-[#455A64] mb-3 mt-1">
                      <Text className="font-semibold">disponible sur Oz :</Text> cliquez sur une activité pour y accéder
                    </Text>

                    <View className="flex flex-row flex-wrap items-center space-y-2">
                      {actionPlanRedictor.map((actionPlan, elementIndex) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              let _actionPlan = actionPlan;
                              if (actionPlan.redirection === 'RANDOM') {
                                let actionPlanRedictorNotRandom = actionPlanRedictor.filter(
                                  (actionPlan) => actionPlan.redirection !== 'RANDOM'
                                );
                                let randomActionPlanIndex = Math.floor(
                                  Math.random() * actionPlanRedictorNotRandom.length
                                );
                                _actionPlan = actionPlanRedictorNotRandom[randomActionPlanIndex];
                              }
                              navigation.navigate(_actionPlan.redirection);
                            }}
                            key={elementIndex}
                            className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                            <Text className="font-extrabold color-white">{actionPlan.displayFeed}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </>
                )}
                {actionPlanNotRedictor.length && (
                  <>
                    <Text className="italic text-[#455A64] my-2">autres actions</Text>
                    <View className="flex flex-row flex-wrap items-center space-y-2">
                      {actionPlanNotRedictor.map((actionPlan, elementIndex) => {
                        return (
                          <View
                            key={elementIndex}
                            className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#263238] border border-[#263238]">
                            <Text className="font-extrabold color-white">{actionPlan.displayFeed}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
          <View className="flex flex-row items-center justify-center mt-8 space-x-8">
            <TouchableOpacity
              className=" "
              onPress={() => {
                if (pageIndex > 0) {
                  setIndex(pageIndex - 1);
                }
              }}>
              <LeftArrowStrategy />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-[#4030A5]">
              {pageIndex + 1} sur {strategies.length}
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => {
                if (strategies.length > pageIndex + 1) {
                  setIndex(pageIndex + 1);
                }
              }}>
              <RigthArrowStrategy />
            </TouchableOpacity>
          </View>
          <View className=" items-center mt-8">
            <View className="flex flex-row flex-wrap">
              <TouchableOpacity
                className="bg-[#DE285E] rounded-3xl "
                onPress={() => {
                  navigation.navigate('DEFINE_STRATEGY', {
                    strategyIndex: strategies.length,
                  });
                  logEvent({
                    category: 'STRATEGY',
                    action: 'CLICK_ADD_NEW_STRAT',
                    name: strategies.length,
                  });
                }}>
                <Text className="text-white text-xl font-bold py-3 px-7 ">Ajouter une stratégie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </WrapperContainer>
      </Background>
    </SafeAreaProvider>
  );
};

export default CravingStrategies;
