import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRecoilState, useRecoilValue } from 'recoil';
import Background from '../../components/Background';
import WrapperContainer from '../../components/WrapperContainer';
import { logEvent } from '../../services/logEventsWithMatomo';
import { currentStrategyState, defineStrategyState } from '../../recoil/craving';
import { strategyCatalogObject, getDisplayName, strategyCatalog } from './strategies';
import { screenWidth } from '../../styles/theme';

const allActionsPlans = strategyCatalog.filter((strategy) => strategy.categoryKey === 'actionPlan');
const randomPossibleActionPlan = allActionsPlans.filter(
  (actionPlan) => !!actionPlan.redirection && actionPlan.redirection !== 'RANDOM'
);

import TargetStrategy from '../../components/illustrations/icons/TargetStrategy';
import ModifyStrategy from '../../components/illustrations/icons/ModifyStrategy';
import LeftArrowStrategy from '../../components/illustrations/icons/leftArrowStrategy';
import RigthArrowStrategy from '../../components/illustrations/icons/rigthArrowStrategy';
import { dayjsInstance } from '../../services/dates';
import CupMotivation from '../../components/illustrations/icons/CupMotivation';
import { myMotivationState } from '../../recoil/gains';
import ArrowRight from '../../components/ArrowRight';

const CravingStrategies = ({ navigation }) => {
  const motivation = useRecoilValue(myMotivationState);
  const strategies = useRecoilValue(defineStrategyState);
  const [pageIndex, setIndex] = useRecoilState(currentStrategyState);
  const filteredStrategy = strategies.find((strategy) => strategy.index === pageIndex);
  const actionPlans = filteredStrategy?.actionPlan?.map((actionPlanKey) => strategyCatalogObject[actionPlanKey]) || [];
  const actionPlanRedictor = actionPlans.filter((actionPlan) => actionPlan.redirection);
  const actionPlanNotRedictor = actionPlans.filter((actionPlan) => !actionPlan.redirection);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [pageIndex]);

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <WrapperContainer
          title="Ma stratégie"
          onPressBackButton={() => navigation.navigate('CRAVING_INDEX')}
          ref={scrollRef}>
          <View className="mb-8">
            <Text className="text-gray-500 text-base italic mb-4">
              Définissez des motivations pour vous aider à maitriser votre consommation
            </Text>
            <View className="justify-center">
              {motivation.length ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MY_MOTIVATIONS');
                  }}
                  className=" justify-between items-center rounded-md bg-[#E0E0E0] flex flex-row p-4">
                  <View className="flex flex-row justify-start items-center space-x-4 -mr-2">
                    <CupMotivation />
                    <View className="flex flex-col space-y-2" style={{ width: (screenWidth * 2) / 3 }}>
                      {motivation.map((m, index) =>
                        m ? (
                          <Text key={index} className="text-black font-semibold">
                            {'\u2022 '}
                            {m}
                          </Text>
                        ) : null
                      )}
                    </View>
                  </View>
                  <ArrowRight color="#4030a5" size={18} />
                </TouchableOpacity>
              ) : (
                <View className="flex flex-row justify-center">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MY_MOTIVATIONS');
                    }}
                    className="justify-center items-center rounded-3xl py-3 px-6 bg-[#4030A5]">
                    <Text className="font-extrabold color-white text-center ">Ajouter des motivations</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View className="border-[#4030A5] border p-5 rounded-lg">
            {filteredStrategy && (
              <View className="flex  flex-col space-y-3">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row items-center space-x-4">
                    <TargetStrategy size={50} />
                    <View className="flex flex-col">
                      <Text className="text-xl font-extrabold text-[#4030A5]">Stratégie n°{pageIndex + 1}</Text>
                      <Text className=" text-[#4030A5]">
                        {dayjsInstance(filteredStrategy.createdAt).format('DD/MM/YYYY à HH:mm')}
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
                                let randomActionPlanIndex = Math.floor(Math.random() * randomPossibleActionPlan.length);
                                _actionPlan = randomPossibleActionPlan[randomActionPlanIndex];
                              }
                              navigation.navigate(..._actionPlan.redirection);
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
