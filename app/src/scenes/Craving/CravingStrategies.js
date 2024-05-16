import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defineStrategyState } from '../../recoil/strategies';
import { useState, useCallback } from 'react';
import { storage } from '../../services/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  strategyCatalog,
  strategyCatalogObject,
  strategyCategories,
  strategyKeysByCategory,
  getDisplayName,
  pageContent,
  intensityLevels,
} from '../../reference/StrategyCatalog';
import { useFocusEffect } from '@react-navigation/native';

import API from '../../services/api';
import TargetStrategy from '../../components/illustrations/icons/TargetStrategy';
import ModifyStrategy from '../../components/illustrations/icons/ModifyStrategy';
import LeftArrowStrategy from '../../components/illustrations/icons/leftArrowStrategy';
import RigthArrowStrategy from '../../components/illustrations/icons/rigthArrowStrategy';
import { useRecoilState, useRecoilValue } from 'recoil';

const CravingStrategies = ({ navigation }) => {
  const [strategies, setStrategies] = useRecoilState(defineStrategyState);
  const [pageIndex, setIndex] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const fetchStrategies = async () => {
        try {
          const res = await API.get({
            path: '/strategies/list',
            query: {
              matomoId: storage.getString('@UserIdv2'),
            },
          });
          if (res.ok) {
            setStrategies(res.strategies);
          }
        } catch (err) {
          console.log('Get strats err', err);
        }
      };

      fetchStrategies();
    }, [])
  );

  const filteredStrategy = strategies.find((strategy) => strategy.index === pageIndex);

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-screen px-6 mt-3">
          <BackButton content="< Retour" bold onPress={() => navigation.navigate('CRAVING_INDEX')} marginTop />
          <Text className="text-[#4030A5] text-2xl font-extrabold mb-8 mt-3 ">Ma stratégie</Text>
          <View className="border-[#4030A5] border p-5 rounded-lg">
            {filteredStrategy && (
              <View className="flex  flex-col space-y-3">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row items-center space-x-4">
                    <TargetStrategy size={50} />
                    <View className="flex flex-col">
                      <Text className="text-xl font-extrabold text-[#4030A5]">Strategy n°{pageIndex + 1}</Text>
                      <Text className=" text-[#4030A5]">
                        {new Date(filteredStrategy.createdAt).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DEFINE_STRATEGY', { toModifyStrategy: filteredStrategy });
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
                <Text className="italic font-bold text-[#455A64] mb-3 ">
                  <Text className="font-extrabold">disponible sur Oz :</Text> cliquez sur une activité pour y accéder
                </Text>

                <View className="flex flex-row flex-wrap items-center space-y-2">
                  {filteredStrategy.actionPlan
                    .map((actionPlanKey) => strategyCatalogObject[actionPlanKey])
                    .filter((actionPlan) => actionPlan.redirection !== 'notdefined')
                    .map((actionPlan, elementIndex) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            actionPlan.navigator === 'notdefined'
                              ? navigation.navigate(actionPlan.navigator, { screen: actionPlan.redirection })
                              : navigation.navigate(actionPlan.redirection);
                          }}
                          key={elementIndex}
                          className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                          <Text className="font-extrabold color-white">{actionPlan.displayFeed}</Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                <Text className="italic font-bold text-[#455A64] ">autres actions</Text>
                <View className="flex flex-row flex-wrap items-center space-y-2">
                  {filteredStrategy.actionPlan
                    .map((actionPlanKey) => strategyCatalogObject[actionPlanKey])
                    .filter((actionPlan) => actionPlan.redirection === 'notdefined')
                    .map((actionPlan, elementIndex) => {
                      return (
                        <View
                          key={elementIndex}
                          className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#263238] border border-[#263238]">
                          <Text className="font-extrabold color-white">{actionPlan.displayFeed}</Text>
                        </View>
                      );
                    })}
                </View>
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
                  console.log(strategies.length);
                  navigation.navigate('DEFINE_STRATEGY', {
                    toModifyStrategy: {
                      index: strategies.length,
                      feelings: [],
                      trigger: [],
                      intensity: 0,
                      actionPlan: [],
                    },
                  });
                }}>
                <Text className="text-white text-xl font-bold py-3 px-7 ">Ajouter une stratégie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaProvider>
  );
};

export default CravingStrategies;
