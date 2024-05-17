import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import { logEvent } from '../../services/logEventsWithMatomo';
import {
  strategyCatalogObject,
  strategyKeysByCategory,
  getDisplayName,
  pageContent,
  intensityLevels,
} from '../../reference/StrategyCatalog';

import { useToast } from '../../services/toast';
import { v4 as uuidv4 } from 'uuid';
import API from '../../services/api';
import { storage } from '../../services/storage';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { useRecoilState } from 'recoil';
import { defineStrategyState } from '../../recoil/strategies';

const DefineStrategy = ({ navigation, route }) => {
  const { strategyIndex } = route.params;
  const [strategies, setStrategies] = useRecoilState(defineStrategyState);
  const strategy = strategies.find((strategy) => strategy.index === strategyIndex) ?? { index: strategyIndex };
  const [feelings, setFeelings] = useState(strategy.feelings ?? []);
  const [actionPlan, setActionPlan] = useState(strategy.actionPlan ?? []);
  const [trigger, setTrigger] = useState(strategy.trigger ?? []);
  const [tab, setTab] = useState(0);
  const toast = useToast();
  const categories = ['feeling', 'trigger', 'intensity', 'actionPlan'];
  const intensity = useSharedValue(0);
  const currentStrategySetter = tab === 0 ? setFeelings : tab === 1 ? setTrigger : setActionPlan;
  const currentStrategyElements = tab === 0 ? feelings : tab === 1 ? trigger : tab === 2 ? intensity : actionPlan;
  const [selectedIntensity, setSelectedIntensity] = useState(0);
  const maxIntensity = useSharedValue(10);
  const minIntensity = useSharedValue(0);

  const ValidateStrategy = () => {
    let createdAt = new Date();
    if (strategyIndex === strategies.length) {
      const newStrategyToSave = {
        id: uuidv4(),
        index: strategy.index ?? 0,
        feelings: feelings,
        trigger: trigger,
        intensity: selectedIntensity,
        actionPlan: actionPlan,
        createdAt: createdAt,
      };

      setStrategies([...strategies, newStrategyToSave]);
    } else {
      const modifiedStrategyToSave = {
        id: uuidv4(),
        index: strategyIndex,
        feelings: feelings,
        trigger: trigger,
        intensity: selectedIntensity,
        actionPlan: actionPlan,
        updatedAt: new Date(),
      };
      const modifiedStrategies = strategies.map((strat) => {
        if (strat.index === strategyIndex) {
          return modifiedStrategyToSave;
        }
        return strat;
      });
      setStrategies(modifiedStrategies);
    }
    API.post({
      path: '/strategies',
      body: {
        matomoId: storage.getString('@UserIdv2'),
        strategyIndex: strategy.index ?? 0,
        feelings: feelings,
        trigger: trigger,
        intensity: selectedIntensity,
        actionPlan: actionPlan,
      },
    }).then((res) => {
      if (res.ok) {
        toast.show('Stratégie enregistrée');
      }
    });
    navigation.navigate('CRAVING_STRATEGIES');
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-screen pl-6">
          <BackButton content="< Retour" bold onPress={() => (tab ? setTab(tab - 1) : navigation.goBack())} marginTop />
          <Text className="text-[#4030A5] text-2xl font-extrabold mb-8 mt-3 ">Définir ma stratégie</Text>
          <Text className="text-lg font-extrabold">{pageContent[tab].question}</Text>
          {pageContent[tab].multipleChoice && (
            <Text className="text-sm text-[#455A64]  italic mb-4">{pageContent[tab].multipleChoice}</Text>
          )}
          {pageContent[tab].type === 'selection' && (
            <View className="flex flex-row flex-wrap rounded-lg items-center ">
              {strategyKeysByCategory[categories[tab]].map((name, index) => {
                return (
                  <StrategyButton
                    key={index}
                    name={name}
                    strategyElements={currentStrategyElements}
                    setStrategyElement={currentStrategySetter}
                    multipleChoice={tab !== 1}
                  />
                );
              })}
            </View>
          )}
          {pageContent[tab].type === 'slider' && (
            <View className="mt-10 flex items-center space-y-10">
              <Slider
                className="w-5/6"
                progress={intensity}
                minimumValue={minIntensity}
                maximumValue={maxIntensity}
                step={10}
                theme={{
                  maximumTrackTintColor: '#4030A5',
                  minimumTrackTintColor: '#DE285E',
                  thumbTintColor: '#FFFFFF',
                }}
                onValueChange={(value) => {
                  setSelectedIntensity(value);
                }}
              />
              <View className="border px-7 py-2 rounded-lg w-64 items-center">
                <Text className="text-lg font-bold text-[#FF4501]">
                  {selectedIntensity} - {intensityLevels[selectedIntensity].displayFeed}
                </Text>
              </View>
            </View>
          )}
          {pageContent[tab].type === 'final' && (
            <View className="mt-4 ml-4 space-y-4">
              <Text className="text-lg font-bold text-black ">• Mon ressenti</Text>
              <View className="flex flex-row flex-wrap rounded-lg items-center">
                {strategyKeysByCategory['feeling']
                  .filter((name) => feelings.includes(name))
                  .map((name, index) => (
                    <View key={index} className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                      <Text className="font-extrabold color-white">{getDisplayName(name, strategyCatalogObject)}</Text>
                    </View>
                  ))}
              </View>
              <Text className="text-lg font-bold text-black">• Le déclencheur</Text>
              <View className="flex flex-row flex-wrap rounded-lg items-center">
                {strategyKeysByCategory['trigger']
                  .filter((name) => trigger.includes(name))
                  .map((name, index) => (
                    <View key={index} className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                      <Text className="font-extrabold color-white">{getDisplayName(name, strategyCatalogObject)}</Text>
                    </View>
                  ))}
              </View>
              <Text className="text-lg font-bold text-black">• L'intensité de mon craving</Text>
              <View className="flex flex-row flex-wrap">
                <View className=" border px-2 py-2 rounded-lg items-center ">
                  <Text className="text-lg font-bold text-[#FF4501]">
                    {selectedIntensity} - {intensityLevels[selectedIntensity].displayFeed}
                  </Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-black">• Mon plan d'action</Text>
              <View className="flex flex-row flex-wrap rounded-lg items-center">
                {strategyKeysByCategory['actionPlan']
                  .filter((name) => actionPlan.includes(name))
                  .map((name, index) => (
                    <View key={index} className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]">
                      <Text className="font-extrabold color-white">{getDisplayName(name, strategyCatalogObject)}</Text>
                    </View>
                  ))}
              </View>
              <Text className=" text-black font-semibold">
                Cliquez sur "Valider ma stratégie" pour accéder à vos stratégies
              </Text>
            </View>
          )}
          <View className=" items-center mt-8">
            {pageContent[tab].type === 'final' ? (
              <View className="flex flex-row flex-wrap">
                <TouchableOpacity className="bg-[#DE285E] rounded-3xl" onPress={() => ValidateStrategy()}>
                  <Text className="text-white text-xl font-bold py-3 px-6 ">Valider ma stratégie</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                disabled={currentStrategyElements.length === 0}
                className={`rounded-3xl w-36 ${currentStrategyElements.length === 0 ? 'bg-[#DF94AA]' : 'bg-[#DE285E]'}`}
                onPress={() => setTab(tab + 1)}>
                <Text className="text-white text-xl font-bold py-3 px-6 ">Continuer</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className=" items-center mt-6"
            onPress={() => (tab ? setTab(tab - 1) : navigation.goBack())}>
            <Text className="text-[#4030A5] font-semibold underline">Annuler</Text>
          </TouchableOpacity>
        </ScrollView>
      </Background>
    </SafeAreaProvider>
  );
};
const StrategyButton = ({ name, strategyElements, setStrategyElement, multipleChoice }) => {
  return (
    <TouchableOpacity
      className={[
        'bg-[#FFFFFF]  rounded-3xl px-3.5 py-3 m-1.5',
        strategyElements.includes(name) ? 'bg-[#4030A5] border border-[#4030A5]' : 'border border-[#4030A5] bg-white',
      ].join(' ')}
      onPress={() => {
        if (!multipleChoice) {
          setStrategyElement((prevStrategyElements) => {
            if (prevStrategyElements.includes(name)) {
              return [];
            }
            return [name];
          });
        } else {
          setStrategyElement((prevStrategyElements) => {
            const newStrategyElements = [...prevStrategyElements];
            const index = newStrategyElements.indexOf(name);
            if (index !== -1) {
              newStrategyElements.splice(index, 1);
            } else {
              newStrategyElements.push(name);
            }
            return newStrategyElements;
          });
        }
      }}>
      <Text
        className={['font-extrabold', strategyElements.includes(name) ? 'color-white' : 'text-[#4030A5]'].join(' ')}>
        {getDisplayName(name, strategyCatalogObject)}
      </Text>
    </TouchableOpacity>
  );
};

export default DefineStrategy;
