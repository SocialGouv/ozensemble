import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Background from "../../components/Background";
import WrapperContainer from "../../components/WrapperContainer";

import { logEvent } from "../../services/logEventsWithMatomo";
import {
  strategyKeysByCategory,
  getDisplayName,
  intensityLevels,
  strategyCatalogObject,
} from "./strategies";

import { useToast } from "../../services/toast";
import { v4 as uuidv4 } from "uuid";
import API from "../../services/api";
import { storage } from "../../services/storage";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentStrategyState,
  defineStrategyState,
} from "../../recoil/craving";
import { useNavigation } from "@react-navigation/native";

const DefineStrategyNavigator = createStackNavigator();

const DefineStrategy = ({ navigation, route }) => {
  const strategyIndex = route?.params?.strategyIndex ?? 0;
  console.log("strategyIndex", strategyIndex);
  const [strategies, setStrategies] = useRecoilState(defineStrategyState);
  const setCurrentStrategyIndex = useSetRecoilState(currentStrategyState);
  const toast = useToast();

  const defaultStrategy = {
    index: strategyIndex,
    intensity: 5,
    feelings: [],
    actionPlan: [],
    trigger: [],
  };

  const strategy =
    strategies.find((strategy) => strategy.index === strategyIndex) ??
    defaultStrategy;

  const [feelings, setFeelings] = useState(strategy.feelings);
  const [actionPlan, setActionPlan] = useState(strategy.actionPlan);
  const [trigger, setTrigger] = useState(strategy.trigger);
  const [selectedIntensity, setSelectedIntensity] = useState(
    strategy.intensity
  );

  const validateStrategy = () => {
    let createdAt = new Date();
    if (strategyIndex === strategies.length) {
      const newStrategyToSave = {
        id: uuidv4(),
        index: strategyIndex,
        feelings: feelings,
        trigger: trigger,
        intensity: selectedIntensity,
        actionPlan: actionPlan,
        createdAt: createdAt,
      };
      console.log(newStrategyToSave);
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
    setCurrentStrategyIndex(strategyIndex);
    console.log("strategies", strategies);
    for (let [index, feeling] of Object.entries(
      strategyKeysByCategory.feeling
    )) {
      if (feelings.includes(feeling)) {
        logEvent({
          category: "STRATEGY",
          action: "DEFINE_STRATEGY",
          name: "validate feeling",
          value: index,
        });
      }
    }
    for (let [index, _trigger] of Object.entries(
      strategyKeysByCategory.trigger
    )) {
      if (trigger.includes(_trigger)) {
        logEvent({
          category: "STRATEGY",
          action: "DEFINE_STRATEGY",
          name: "validate trigger",
          value: index,
        });
      }
    }
    logEvent({
      category: "STRATEGY",
      action: "DEFINE_STRATEGY",
      name: "validate intensity",
      value: selectedIntensity,
    });
    for (let [index, plan] of Object.entries(
      strategyKeysByCategory.actionPlan
    )) {
      if (actionPlan.includes(plan)) {
        logEvent({
          category: "STRATEGY",
          action: "DEFINE_STRATEGY",
          name: "validate actionPlan",
          value: index,
        });
      }
    }
    console.log("strategies", strategies);
    API.post({
      path: "/strategies",
      body: {
        matomoId: storage.getString("@UserIdv2"),
        strategyIndex: strategyIndex,
        feelings: feelings,
        trigger: trigger,
        intensity: selectedIntensity,
        actionPlan: actionPlan,
      },
    }).then((res) => {
      if (res.ok) {
        toast.show("Stratégie enregistrée");
      }
      navigation.reset({
        index: 1,
        routes: [{ name: "CRAVING_INDEX" }, { name: "CRAVING_STRATEGIES" }],
      });
    });
    navigation.navigate("SUCCESS_STRATEGY_MODAL", { actionPlan: actionPlan });
  };

  return (
    <SafeAreaProvider className="flex-1">
      <Background color="#f9f9f9" withSwiperContainer>
        <DefineStrategyNavigator.Navigator
          initialRouteName="DEFINE_STRATEGY_FEELING"
          screenOptions={{ headerShown: false }}
        >
          <DefineStrategyNavigator.Screen name="DEFINE_STRATEGY_FEELING">
            {(props) => (
              <DefineStrategyFeeling
                {...props}
                feelings={feelings}
                setFeelings={setFeelings}
                onNext={() =>
                  props.navigation.navigate("DEFINE_STRATEGY_TRIGGER")
                }
              />
            )}
          </DefineStrategyNavigator.Screen>
          <DefineStrategyNavigator.Screen name="DEFINE_STRATEGY_TRIGGER">
            {(props) => (
              <DefineStrategyTrigger
                {...props}
                trigger={trigger}
                setTrigger={setTrigger}
                onNext={() =>
                  props.navigation.navigate("DEFINE_STRATEGY_INTENSITY")
                }
              />
            )}
          </DefineStrategyNavigator.Screen>
          <DefineStrategyNavigator.Screen name="DEFINE_STRATEGY_INTENSITY">
            {(props) => (
              <DefineStrategyIntensity
                {...props}
                selectedIntensity={selectedIntensity}
                setSelectedIntensity={setSelectedIntensity}
                onNext={() =>
                  props.navigation.navigate("DEFINE_STRATEGY_ACTION_PLAN")
                }
              />
            )}
          </DefineStrategyNavigator.Screen>
          <DefineStrategyNavigator.Screen name="DEFINE_STRATEGY_ACTION_PLAN">
            {(props) => (
              <DefineStrategyActionPlan
                {...props}
                actionPlan={actionPlan}
                setActionPlan={setActionPlan}
                onNext={() =>
                  props.navigation.navigate("DEFINE_STRATEGY_VALIDATE")
                }
              />
            )}
          </DefineStrategyNavigator.Screen>
          <DefineStrategyNavigator.Screen name="DEFINE_STRATEGY_VALIDATE">
            {(props) => (
              <DefineStrategyValidate
                {...props}
                actionPlan={actionPlan}
                selectedIntensity={selectedIntensity}
                trigger={trigger}
                feelings={feelings}
                onNext={validateStrategy}
              />
            )}
          </DefineStrategyNavigator.Screen>
        </DefineStrategyNavigator.Navigator>
      </Background>
    </SafeAreaProvider>
  );
};

const DefineStrategyWrapper = ({ children }) => {
  const navigation = useNavigation();
  return (
    <WrapperContainer
      title="Définir ma stratégie"
      onPressBackButton={navigation.goBack}
    >
      {children}
      <TouchableOpacity
        className=" items-center mt-6"
        onPress={() => navigation.navigate("CRAVING_STRATEGIES")}
      >
        <Text className="text-[#4030A5] font-semibold underline">Annuler</Text>
      </TouchableOpacity>
    </WrapperContainer>
  );
};

const DefineStrategyFeeling = ({ feelings, setFeelings, onNext }) => {
  return (
    <DefineStrategyWrapper>
      <Text className="text-lg font-extrabold">
        Comment vous sentez-vous actuellement ?
      </Text>
      <Text className="text-sm text-[#455A64]  italic mb-4">
        plusieurs choix possibles
      </Text>
      <View className="flex flex-row flex-wrap rounded-lg items-center ">
        {strategyKeysByCategory.feeling.map((name, index) => {
          return (
            <StrategyButton
              key={index}
              name={name}
              strategyElements={feelings}
              setStrategyElement={setFeelings}
              multipleChoice
            />
          );
        })}
      </View>
      <View className=" items-center mt-8">
        <TouchableOpacity
          disabled={feelings.length === 0}
          className={`rounded-3xl w-36 ${
            feelings.length === 0 ? "bg-[#DF94AA]" : "bg-[#DE285E]"
          }`}
          onPress={onNext}
        >
          <Text className="text-white text-xl font-bold py-3 px-6 ">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </DefineStrategyWrapper>
  );
};

const DefineStrategyTrigger = ({ trigger, setTrigger, onNext }) => {
  return (
    <DefineStrategyWrapper>
      <Text className="text-lg font-extrabold">
        Quel est le déclencheur de ce craving ?
      </Text>
      <Text className="text-sm text-[#455A64]  italic mb-4">
        un seul choix possible
      </Text>
      <View className="flex flex-row flex-wrap rounded-lg items-center ">
        {strategyKeysByCategory.trigger.map((name, index) => {
          return (
            <StrategyButton
              key={index}
              name={name}
              strategyElements={trigger}
              setStrategyElement={setTrigger}
              multipleChoice={false}
            />
          );
        })}
      </View>
      <View className=" items-center mt-8">
        <TouchableOpacity
          disabled={trigger.length === 0}
          className={`rounded-3xl w-36 ${
            trigger.length === 0 ? "bg-[#DF94AA]" : "bg-[#DE285E]"
          }`}
          onPress={onNext}
        >
          <Text className="text-white text-xl font-bold py-3 px-6 ">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </DefineStrategyWrapper>
  );
};

const colorSteps = {
  0: "#7fb896",
  1: "#80b281",
  2: "#86ab6b",
  3: "#90a356",
  4: "#9c9843",
  5: "#aa8c35",
  6: "#b87e2e",
  7: "#c56e30",
  8: "#d15a3a",
  9: "#d9434a",
  10: "#dd275e",
};

const DefineStrategyIntensity = ({
  selectedIntensity,
  setSelectedIntensity,
  onNext,
}) => {
  const intensity = useSharedValue(selectedIntensity);
  const maxIntensity = useSharedValue(10);
  const minIntensity = useSharedValue(0);

  return (
    <DefineStrategyWrapper>
      <Text className="text-lg font-extrabold">
        Quelle est l'intensité de votre envie de consommer ?
      </Text>
      <Text className="text-sm text-[#455A64]  italic mb-4">
        sélectionnez une note sur le curseur ci-dessous
      </Text>
      <View className="mt-10 flex items-center space-y-10">
        <Slider
          className="w-5/6"
          progress={intensity}
          cache={0}
          minimumValue={minIntensity}
          maximumValue={maxIntensity}
          step={10}
          theme={{
            maximumTrackTintColor: "#4030A533",
            minimumTrackTintColor: colorSteps[selectedIntensity],
            thumbTintColor: "#ffffff",
          }}
          onValueChange={(value) => {
            setSelectedIntensity(value);
          }}
        />
        <View
          className="border px-7 py-2 rounded-lg w-64 items-center"
          style={{
            opacity: selectedIntensity != null ? 1 : 0,
          }}
        >
          <Text
            className="text-lg font-bold"
            style={{ color: colorSteps[selectedIntensity] }}
          >
            {selectedIntensity} -{" "}
            {intensityLevels[selectedIntensity]?.displayFeed}
          </Text>
        </View>
      </View>
      <View className=" items-center mt-8">
        <TouchableOpacity
          disabled={intensity === 0}
          className={`rounded-3xl w-36 ${
            intensity === 0 ? "bg-[#DF94AA]" : "bg-[#DE285E]"
          }`}
          onPress={onNext}
        >
          <Text className="text-white text-xl font-bold py-3 px-6 ">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </DefineStrategyWrapper>
  );
};

const DefineStrategyActionPlan = ({ actionPlan, setActionPlan, onNext }) => {
  return (
    <DefineStrategyWrapper>
      <Text className="text-lg font-extrabold">
        Quel est votre plan d'action ?
      </Text>
      <Text className="text-sm text-[#455A64]  italic mb-4">
        plusieurs choix possibles
      </Text>
      <View className="flex flex-row flex-wrap rounded-lg items-center ">
        {strategyKeysByCategory.actionPlan.map((name, index) => {
          return (
            <StrategyButton
              key={index}
              name={name}
              strategyElements={actionPlan}
              setStrategyElement={setActionPlan}
              multipleChoice
            />
          );
        })}
      </View>
      <View className=" items-center mt-8">
        <TouchableOpacity
          disabled={actionPlan.length === 0}
          className={`rounded-3xl w-36 ${
            actionPlan.length === 0 ? "bg-[#DF94AA]" : "bg-[#DE285E]"
          }`}
          onPress={onNext}
        >
          <Text className="text-white text-xl font-bold py-3 px-6 ">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </DefineStrategyWrapper>
  );
};

const DefineStrategyValidate = ({
  actionPlan,
  selectedIntensity,
  feelings,
  trigger,
  onNext,
}) => {
  return (
    <DefineStrategyWrapper>
      <Text className="text-lg font-extrabold">Récapitulatif</Text>
      <View className="mt-4 ml-4 space-y-4">
        <Text className="text-lg font-bold text-black ">• Mon ressenti</Text>
        <View className="flex flex-row flex-wrap rounded-lg items-center">
          {strategyKeysByCategory.feeling
            .filter((name) => feelings.includes(name))
            .map((name, index) => (
              <View
                key={index}
                className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]"
              >
                <Text className="font-extrabold color-white">
                  {getDisplayName(name, strategyCatalogObject)}
                </Text>
              </View>
            ))}
        </View>
        <Text className="text-lg font-bold text-black">• Le déclencheur</Text>
        <View className="flex flex-row flex-wrap rounded-lg items-center">
          {strategyKeysByCategory.trigger
            .filter((name) => trigger.includes(name))
            .map((name, index) => (
              <View
                key={index}
                className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]"
              >
                <Text className="font-extrabold color-white">
                  {getDisplayName(name, strategyCatalogObject)}
                </Text>
              </View>
            ))}
        </View>
        <Text className="text-lg font-bold text-black">
          • L'intensité de mon craving
        </Text>
        <View className="flex flex-row flex-wrap">
          <View className=" border px-2 py-2 rounded-lg items-center ">
            <Text className="text-lg font-bold text-[#FF4501]">
              {selectedIntensity} -{" "}
              {intensityLevels[selectedIntensity]?.displayFeed}
            </Text>
          </View>
        </View>
        <Text className="text-lg font-bold text-black">
          • Mon plan d'action
        </Text>
        <View className="flex flex-row flex-wrap rounded-lg items-center">
          {strategyKeysByCategory.actionPlan
            .filter((name) => actionPlan.includes(name))
            .map((name, index) => (
              <View
                key={index}
                className="rounded-3xl px-3.5 py-3 m-1.5 bg-[#4030A5] border border-[#4030A5]"
              >
                <Text className="font-extrabold color-white">
                  {getDisplayName(name, strategyCatalogObject)}
                </Text>
              </View>
            ))}
        </View>
        <Text className=" text-black font-semibold">
          Cliquez sur "Valider ma stratégie" pour accéder à votre stratégie et
          aux activités du plan d'action
        </Text>
      </View>
      <View className=" items-center mt-8">
        <View className="flex flex-row flex-wrap">
          <TouchableOpacity
            className="bg-[#DE285E] rounded-3xl"
            onPress={onNext}
          >
            <Text className="text-white text-xl font-bold py-3 px-6 ">
              Valider ma stratégie
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefineStrategyWrapper>
  );
};

const StrategyButton = ({
  name,
  strategyElements,
  setStrategyElement,
  multipleChoice,
}) => {
  return (
    <TouchableOpacity
      className={[
        "bg-[#FFFFFF]  rounded-3xl px-3.5 py-3 m-1.5",
        strategyElements.includes(name)
          ? "bg-[#4030A5] border border-[#4030A5]"
          : "border border-[#4030A5] bg-white",
      ].join(" ")}
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
      }}
    >
      <Text
        className={[
          "font-extrabold",
          strategyElements.includes(name) ? "color-white" : "text-[#4030A5]",
        ].join(" ")}
      >
        {getDisplayName(name, strategyCatalogObject)}
      </Text>
    </TouchableOpacity>
  );
};

export default DefineStrategy;
