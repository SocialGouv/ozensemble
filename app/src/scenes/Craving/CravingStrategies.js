import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import ChillIcon from '../../components/illustrations/ChillIcon';
import FunIcon from '../../components/illustrations/FunIcon';
import SensationIcon from '../../components/illustrations/SensationIcon';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defineStrategyState } from '../../recoil/strategies';
import { useEffect, useState } from 'react';
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

import API from '../../services/api';
import TargetStrategy from '../../components/illustrations/icons/TargetStrategy';
import ModifyStrategy from '../../components/illustrations/icons/ModifyStrategy';
import LeftArrowStrategy from '../../components/illustrations/icons/leftArrowStrategy';
import RigthArrowStrategy from '../../components/illustrations/icons/rigthArrowStrategy';
import { useRecoilValue } from 'recoil';

const CravingStrategies = ({ navigation }) => {
  const [strategies, setStrategies] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    API.get({
      path: '/strategies/list',
      query: {
        matomoId: storage.getString('@UserIdv2'),
      },
    })
      .then((res) => {
        if (res.ok) {
          if (res.strategies.length === 0) {
            navigation.navigate('DEFINE_STRATEGY');
          }
          if (JSON.stringify(res.strategies) !== JSON.stringify(strategies)) {
            setStrategies(res.strategies);
            console.log('Get strategies', res.strategies);
          }
        }
      })
      .catch((err) => console.log('Get goals err', err));
  }, []);

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-screen px-6 mt-3">
          <BackButton content="< Retour" bold onPress={() => navigation.navigate('CRAVING_INDEX')} marginTop />
          <Text className="text-[#4030A5] text-2xl font-extrabold mb-8 mt-3 ">Ma stratégie</Text>
          <View className="border-[#4030A5] border p-5 rounded-lg">
            {strategies
              .filter((strategy) => strategy.index === index)
              .map((strategy, index) => (
                <View key={index} className="flex space-y-3">
                  <View className="flex flex-row justify-between">
                    <View className="flex flex-row items-center space-x-4">
                      <TargetStrategy size={50} />
                      <Text className="text-xl font-extrabold text-[#4030A5]">Strategy n°{index + 1}</Text>
                    </View>
                    <ModifyStrategy />
                  </View>
                  <Text className="text-lg font-bold text-black ">Déclencheur & Intensité </Text>
                  <View className="flex flex-row flex-wrap items-center space-x-4">
                    <View className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                      <Text className="font-extrabold color-white">
                        {getDisplayName(strategy.trigger, strategyCatalogObject)}
                      </Text>
                    </View>
                    <View className="flex flex-wrap">
                      <View className=" border px-4 py-2 rounded-lg items-center ">
                        <Text className="text-lg font-bold text-[#FF4501]">{strategy.intensity}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row flex-wrap items-center">
                    <Text className="text-lg font-bold text-black ">Mon plan d'action</Text>
                    <Text className="italic font-bold text-[#455A64] mb-3 ">
                      disponible sur Oz : cliquez sur une activité pour y accéder
                    </Text>
                    <View className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                      <Text className="font-extrabold color-white">
                        {getDisplayName(strategy.actionPlan, strategyCatalogObject)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
          <View className="flex flex-row items-center justify-center mt-8 space-x-8">
            <TouchableOpacity
              className=" "
              onPress={() => {
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}>
              <LeftArrowStrategy />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-[#4030A5]">
              {index + 1} sur {strategies.length}
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => {
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}>
              <RigthArrowStrategy />
            </TouchableOpacity>
          </View>
          <View className=" items-center mt-8">
            <View className="flex flex-row flex-wrap">
              <TouchableOpacity
                className="bg-[#DE285E] rounded-3xl "
                onPress={() => navigation.navigate('DEFINE_STRATEGY', { strategyIndex: index })}>
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
