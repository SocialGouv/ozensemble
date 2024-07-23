import React, { useState } from "react";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import WrapperContainer from "../../components/WrapperContainer.js";
import { storage } from "../../services/storage.js";
import API from "../../services/api.js";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import TipIcon from "../../components/illustrations/TipIcon.js";
import ClickIcon from "../../components/illustrations/icons/ClickIcon.js";
import UploadIcon from "../../components/illustrations/icons/UploadIcon.js";
import FolderIcon from "../../components/illustrations/icons/FolderIcon.js";
import OppositeArrowsIcon from "../../components/illustrations/icons/OppositeArrowsIcon.js";
import CloudIcon from "../../components/illustrations/icons/CloudIcon.js";
import DownloadIcon from "../../components/illustrations/icons/DownloadIcon.js";
import {
  isOnboardedSelector,
  maxDrinksPerWeekSelector,
  totalDrinksByDrinkingDaySelector,
  daysWithGoalNoDrinkState,
  drinksByWeekState,
  previousDrinksPerWeekState,
  goalsState,
  goalsByWeekSelector,
  myMotivationState,
} from "../../recoil/gains.js";
import {
  autoEvaluationQuizzAnswersState,
  autoEvaluationQuizzResultState,
  userSurveyQuizzAnswersState,
  betterEvaluateQuizzAnswersState,
  betterEvaluateQuizzResultState,
  lifeQualityQuizzAnswersState,
  lifeQualityQuizzResultState,
  motivationsQuizzAnswersState,
  motivationsQuizzResultState,
  defi3_Day3_Answers_Difficulties_State,
  defi3_Day3_Answers_Help_State,
  defi3_Day3_ResultState,
  defi4_Day5_Answers_State,
  defi4_Day5_ResultState,
  riskSituationsQuizzAnswersState,
  riskSituationsQuizzResultState,
  riskSituationsAnswersKeysSelector,
  quizzDefi3Day1AnswersState,
  quizzDefi3Day1ResultState,
  quizzDefi3Day5AnswersState,
  quizzDefi3Day5ResultState,
  reevaluateQuizzAnswersState,
  reevaluateQuizzResultState,
  defi5_Day2_Answers_State,
  defi5_Day2_ResultState,
  quizzDefi5Day3partie1AnswersState,
  quizzDefi5Day3partie1ResultState,
  relifeQualityQuizzAnswersState,
  relifeQualityQuizzResultState,
  defi5_Day4_Answers_State,
  defi5_Day4_ResultState,
  defi5_Day5_Answers_State,
  defi5_Day5_ResultState,
} from "../../recoil/quizzs.js";
import { drinksContextsState } from "../../recoil/contexts.js";
import { defineStrategyState, currentStrategyState, isInCravingKeyState } from "../../recoil/craving.js";
import { drinksState, ownDrinksCatalogState } from "../../recoil/consos.js";
import { badgesCatalogState, badgesState } from "../../recoil/badges.js";
import { useRecoilState } from "recoil";
import {
  defi2OnBoardingDoneState,
  defi3OnBoardingDoneState,
  defi4OnBoardingDoneState,
  defi5OnBoardingDoneState,
  defi2EmotionState,
} from "../../recoil/defis.js";
import {
  reminderGain,
  reminderGainsHasBeenSetState,
  reminderGainMode,
  reminderGainWeekDay,
} from "../../recoil/reminder.js";

const Transfer = ({ navigation }) => {
  const [drinks, setDrinksState] = useRecoilState(drinksState);
  const [ownDrinksCatalog, setOwnDrinksCatalogState] = useRecoilState(ownDrinksCatalogState);
  const [isOnboardedSel, setIsOnboardedSelector] = useRecoilState(isOnboardedSelector);
  const [maxDrinksPerWeekSel, setMaxDrinksPerWeekSelector] = useRecoilState(maxDrinksPerWeekSelector);
  const [totalDrinksByDrinkingDaySel, setTotalDrinksByDrinkingDaySelector] = useRecoilState(
    totalDrinksByDrinkingDaySelector
  );
  const [daysWithGoalNoDrink, setDaysWithGoalNoDrinkState] = useRecoilState(daysWithGoalNoDrinkState);
  const [drinksByWeek, setDrinksByWeekState] = useRecoilState(drinksByWeekState);
  const [previousDrinksPerWeek, setPreviousDrinksPerWeekState] = useRecoilState(previousDrinksPerWeekState);
  const [goals, setGoalsState] = useRecoilState(goalsState);
  const [goalsByWeek, setGoalsByWeekState] = useRecoilState(goalsByWeekSelector);
  const [myMotivation, setMyMotivationState] = useRecoilState(myMotivationState);
  const [drinksContexts, setDrinksContextsState] = useRecoilState(drinksContextsState);
  const [autoEvaluationQuizzResult, setAutoEvaluationQuizzResultState] = useRecoilState(autoEvaluationQuizzResultState);
  const [defineStrategy, setDefineStrategyState] = useRecoilState(defineStrategyState);
  const [currentStrategy, setCurrentStrategyState] = useRecoilState(currentStrategyState);
  const [isInCravingKey, setIsInCravingKeyState] = useRecoilState(isInCravingKeyState);
  const [badgesCatalog, setBadgesCatalogState] = useRecoilState(badgesCatalogState);
  const [badges, setBadgesState] = useRecoilState(badgesState);
  const [defi2OnBoardingDone, setDefi2OnBoardingDoneState] = useRecoilState(defi2OnBoardingDoneState);
  const [defi3OnBoardingDone, setDefi3OnBoardingDoneState] = useRecoilState(defi3OnBoardingDoneState);
  const [defi4OnBoardingDone, setDefi4OnBoardingDoneState] = useRecoilState(defi4OnBoardingDoneState);
  const [defi5OnBoardingDone, setDefi5OnBoardingDoneState] = useRecoilState(defi5OnBoardingDoneState);
  const [defi2Emotion, setDefi2EmotionState] = useRecoilState(defi2EmotionState);
  const [autoEvaluationQuizzAnswers, setAutoEvaluationQuizzAnswersState] = useRecoilState(
    autoEvaluationQuizzAnswersState
  );
  const [userSurveyQuizzAnswers, setUserSurveyQuizzAnswersState] = useRecoilState(userSurveyQuizzAnswersState);
  const [betterEvaluateQuizzAnswers, setBetterEvaluateQuizzAnswersState] = useRecoilState(
    betterEvaluateQuizzAnswersState
  );
  const [betterEvaluateQuizzResult, setBetterEvaluateQuizzResultState] = useRecoilState(betterEvaluateQuizzResultState);
  const [lifeQualityQuizzAnswers, setLifeQualityQuizzAnswersState] = useRecoilState(lifeQualityQuizzAnswersState);
  const [lifeQualityQuizzResult, setLifeQualityQuizzResultState] = useRecoilState(lifeQualityQuizzResultState);
  const [motivationsQuizzAnswers, setMotivationsQuizzAnswersState] = useRecoilState(motivationsQuizzAnswersState);
  const [motivationsQuizzResult, setMotivationsQuizzResultState] = useRecoilState(motivationsQuizzResultState);
  const [defi3Day3AnswersDifficulties, setDefi3Day3AnswersDifficultiesState] = useRecoilState(
    defi3_Day3_Answers_Difficulties_State
  );
  const [defi3Day3AnswersHelp, setDefi3Day3AnswersHelpState] = useRecoilState(defi3_Day3_Answers_Help_State);
  const [defi3Day3Result, setDefi3Day3ResultState] = useRecoilState(defi3_Day3_ResultState);
  const [defi4Day5Answers, setDefi4Day5AnswersState] = useRecoilState(defi4_Day5_Answers_State);
  const [defi4Day5Result, setDefi4Day5ResultState] = useRecoilState(defi4_Day5_ResultState);
  const [riskSituationsQuizzAnswers, setRiskSituationsQuizzAnswersState] = useRecoilState(
    riskSituationsQuizzAnswersState
  );
  const [riskSituationsQuizzResult, setRiskSituationsQuizzResultState] = useRecoilState(riskSituationsQuizzResultState);
  const [riskSituationsAnswersKeys, setRiskSituationsAnswersKeysState] = useRecoilState(
    riskSituationsAnswersKeysSelector
  );
  const [quizzDefi3Day1Answers, setQuizzDefi3Day1AnswersState] = useRecoilState(quizzDefi3Day1AnswersState);
  const [quizzDefi3Day1Result, setQuizzDefi3Day1ResultState] = useRecoilState(quizzDefi3Day1ResultState);
  const [quizzDefi3Day5Answers, setQuizzDefi3Day5AnswersState] = useRecoilState(quizzDefi3Day5AnswersState);
  const [quizzDefi3Day5Result, setQuizzDefi3Day5ResultState] = useRecoilState(quizzDefi3Day5ResultState);
  const [reevaluateQuizzAnswers, setReevaluateQuizzAnswersState] = useRecoilState(reevaluateQuizzAnswersState);
  const [reevaluateQuizzResult, setReevaluateQuizzResultState] = useRecoilState(reevaluateQuizzResultState);
  const [defi5Day2Answers, setDefi5Day2AnswersState] = useRecoilState(defi5_Day2_Answers_State);
  const [defi5Day2Result, setDefi5Day2ResultState] = useRecoilState(defi5_Day2_ResultState);
  const [quizzDefi5Day3Partie1Answers, setQuizzDefi5Day3Partie1AnswersState] = useRecoilState(
    quizzDefi5Day3partie1AnswersState
  );
  const [quizzDefi5Day3Partie1Result, setQuizzDefi5Day3Partie1ResultState] = useRecoilState(
    quizzDefi5Day3partie1ResultState
  );
  const [relifeQualityQuizzAnswers, setRelifeQualityQuizzAnswersState] = useRecoilState(relifeQualityQuizzAnswersState);
  const [relifeQualityQuizzResult, setRelifeQualityQuizzResultState] = useRecoilState(relifeQualityQuizzResultState);
  const [defi5Day4Answers, setDefi5Day4AnswersState] = useRecoilState(defi5_Day4_Answers_State);
  const [defi5Day4Result, setDefi5Day4ResultState] = useRecoilState(defi5_Day4_ResultState);
  const [defi5Day5Answers, setDefi5Day5AnswersState] = useRecoilState(defi5_Day5_Answers_State);
  const [defi5Day5Result, setDefi5Day5ResultState] = useRecoilState(defi5_Day5_ResultState);
  const [reminderGainState, setReminderGainState] = useRecoilState(reminderGain);
  const [reminderGainModeState, setReminderGainModeState] = useRecoilState(reminderGainMode);
  const [reminderGainWeekDayState, setReminderGainWeekDayState] = useRecoilState(reminderGainWeekDay);
  const [reminderGainsHasBeenSet, setReminderGainsHasBeenSetState] = useRecoilState(reminderGainsHasBeenSetState);

  const exportData = async () => {
    // Storage
    const storageData = {
      drinks,
      ownDrinksCatalog,
      isOnboardedSel,
      maxDrinksPerWeekSel,
      totalDrinksByDrinkingDaySel,
      drinksContexts,
      autoEvaluationQuizzResult,
      defineStrategy,
      currentStrategy,
      isInCravingKey,
      badgesCatalog,
      badges,
      defi2OnBoardingDone,
      defi3OnBoardingDone,
      defi4OnBoardingDone,
      defi5OnBoardingDone,
      defi2Emotion,
      daysWithGoalNoDrink,
      drinksByWeek,
      previousDrinksPerWeek,
      goals,
      goalsByWeek,
      myMotivation,
      autoEvaluationQuizzAnswers,
      autoEvaluationQuizzResult,
      userSurveyQuizzAnswers,
      betterEvaluateQuizzAnswers,
      betterEvaluateQuizzResult,
      lifeQualityQuizzAnswers,
      lifeQualityQuizzResult,
      motivationsQuizzAnswers,
      motivationsQuizzResult,
      defi3Day3AnswersDifficulties,
      defi3Day3AnswersHelp,
      defi3Day3Result,
      defi4Day5Answers,
      defi4Day5Result,
      riskSituationsQuizzAnswers,
      riskSituationsQuizzResult,
      riskSituationsAnswersKeys,
      quizzDefi3Day1Answers,
      quizzDefi3Day1Result,
      quizzDefi3Day5Answers,
      quizzDefi3Day5Result,
      reevaluateQuizzAnswers,
      reevaluateQuizzResult,
      defi5Day2Answers,
      defi5Day2Result,
      quizzDefi5Day3Partie1Answers,
      quizzDefi5Day3Partie1Result,
      relifeQualityQuizzAnswers,
      relifeQualityQuizzResult,
      defi5Day4Answers,
      defi5Day4Result,
      defi5Day5Answers,
      defi5Day5Result,
      reminderGainsHasBeenSet,
      reminderGainState,
      reminderGainModeState,
      reminderGainWeekDayState,
    };
    // DB
    const userDBData = await fetchUserData();
    const exportData = { storageData, userDBData };
    console.log(storageData, "storageData");
    const jsonExport = JSON.stringify(exportData);
    const path = `${FileSystem.documentDirectory}data.json`;
    console.log(path);
    await FileSystem.writeAsStringAsync(path, jsonExport, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log("File written");

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(path, {
        mimeType: "application/json",
        dialogTitle: "Exported Data",
        UTI: "public.json",
      });
    } else {
      console.log("Sharing is not available on this device");
    }
  };
  const importData = async () => {
    const matomoId = storage.getString("@UserIdv2");
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });
      const fileUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : undefined;
      const fileContents = await fetch(fileUri).then((response) => response.text());
      const importedData = JSON.parse(fileContents);
      const storageData = importedData.storageData;
      console.log(storageData, "storageData");
      console.log(storageData.drinks, "importedData");
      setDrinksState(storageData.drinks);
      setOwnDrinksCatalogState(storageData.ownDrinksCatalog);
      setIsOnboardedSelector(storageData.isOnboardedSel);
      setMaxDrinksPerWeekSelector(storageData.maxDrinksPerWeekSel);
      setTotalDrinksByDrinkingDaySelector(storageData.totalDrinksByDrinkingDaySel);
      setDrinksContextsState(storageData.drinksContexts);
      setAutoEvaluationQuizzResultState(storageData.autoEvaluationQuizzResult);
      setDefineStrategyState(storageData.defineStrategy);
      setCurrentStrategyState(storageData.currentStrategy);
      setIsInCravingKeyState(storageData.isInCravingKey);
      setBadgesCatalogState(storageData.badgesCatalog);
      setBadgesState(storageData.badges);
      setDefi2OnBoardingDoneState(storageData.defi2OnBoardingDone);
      setDefi3OnBoardingDoneState(storageData.defi3OnBoardingDone);
      setDefi4OnBoardingDoneState(storageData.defi4OnBoardingDone);
      setDefi5OnBoardingDoneState(storageData.defi5OnBoardingDone);
      setDefi2EmotionState(storageData.defi2Emotion);
      setDaysWithGoalNoDrinkState(storageData.daysWithGoalNoDrink);
      setDrinksByWeekState(storageData.drinksByWeek);
      setPreviousDrinksPerWeekState(storageData.previousDrinksPerWeek);
      setGoalsState(storageData.goals);
      setGoalsByWeekState(storageData.goalsByWeek);
      setMyMotivationState(storageData.myMotivation);
      setAutoEvaluationQuizzAnswersState(storageData.autoEvaluationQuizzAnswers);
      setUserSurveyQuizzAnswersState(storageData.userSurveyQuizzAnswers);
      setBetterEvaluateQuizzAnswersState(storageData.betterEvaluateQuizzAnswers);
      setBetterEvaluateQuizzResultState(storageData.betterEvaluateQuizzResult);
      setLifeQualityQuizzAnswersState(storageData.lifeQualityQuizzAnswers);
      setLifeQualityQuizzResultState(storageData.lifeQualityQuizzResult);
      setMotivationsQuizzAnswersState(storageData.motivationsQuizzAnswers);
      setMotivationsQuizzResultState(storageData.motivationsQuizzResult);
      setDefi3Day3AnswersDifficultiesState(storageData.defi3Day3AnswersDifficulties);
      setDefi3Day3AnswersHelpState(storageData.defi3Day3AnswersHelp);
      setDefi3Day3ResultState(storageData.defi3Day3Result);
      setDefi4Day5AnswersState(storageData.defi4Day5Answers);
      setDefi4Day5ResultState(storageData.defi4Day5Result);
      setRiskSituationsQuizzAnswersState(storageData.riskSituationsQuizzAnswers);
      setRiskSituationsQuizzResultState(storageData.riskSituationsQuizzResult);
      setRiskSituationsAnswersKeysState(storageData.riskSituationsAnswersKeys);
      setQuizzDefi3Day1AnswersState(storageData.quizzDefi3Day1Answers);
      setQuizzDefi3Day1ResultState(storageData.quizzDefi3Day1Result);
      setQuizzDefi3Day5AnswersState(storageData.quizzDefi3Day5Answers);
      setQuizzDefi3Day5ResultState(storageData.quizzDefi3Day5Result);
      setReevaluateQuizzAnswersState(storageData.reevaluateQuizzAnswers);
      setReevaluateQuizzResultState(storageData.reevaluateQuizzResult);
      setDefi5Day2AnswersState(storageData.defi5Day2Answers);
      setDefi5Day2ResultState(storageData.defi5Day2Result);
      setQuizzDefi5Day3Partie1AnswersState(storageData.quizzDefi5Day3Partie1Answers);
      setQuizzDefi5Day3Partie1ResultState(storageData.quizzDefi5Day3Partie1Result);
      setRelifeQualityQuizzAnswersState(storageData.relifeQualityQuizzAnswers);
      setRelifeQualityQuizzResultState(storageData.relifeQualityQuizzResult);
      setDefi5Day4AnswersState(storageData.defi5Day4Answers);
      setDefi5Day4ResultState(storageData.defi5Day4Result);
      setDefi5Day5AnswersState(storageData.defi5Day5Answers);
      setDefi5Day5ResultState(storageData.defi5Day5Result);
      setReminderGainsHasBeenSetState(storageData.reminderGainsHasBeenSet);
      setReminderGainState(storageData.reminderGainState);
      setReminderGainModeState(storageData.reminderGainModeState);
      setReminderGainWeekDayState(storageData.reminderGainWeekDayState);

      const userDBData = importedData.userDBData;

      await API.post({
        path: `/user/allData`,
        body: { matomoId, data: userDBData },
      }).then((res) => {
        if (res.ok) {
          Alert.alert("Data Imported", "Your data has been imported successfully");
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const fetchUserData = async () => {
    const matomoId = storage.getString("@UserIdv2");
    const data = await API.get({
      path: `/user/allData`,
      query: { matomoId },
    }).then((res) => {
      if (res.ok) return res.data;
    });
    return data;
  };
  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Transférer mes données vers un autre téléphone">
      <Text className="text-black text-base p-2 mb-3">
        Transférez les données de votre profil de votre ancien vers votre nouveau téléphone (incluant vos consos
        déclarées, vos activités, vos badges gagnés, ...) en suivant les 2 étapes suivantes :
      </Text>
      <View className="flex flex-col space-y-5 bg-[#FFFFFF] rounded-md p-4 border border-[#DFDFEB]">
        <Text className="text-[#4030A5] text-xl font-extrabold">Etape 1</Text>
        <Text className="text-black text-base">
          Vous êtes sur votre <Text className="font-bold underline">ancien</Text> téléphone.
        </Text>
        <Text className="text-black text-base">
          Les sous-étapes ci-dessous vont vous permettre de sauvegarder l’ensemble de vos données Oz sous la forme d’un
          fichier.
        </Text>
        <View className="flex flex-row bg-[#E6E4F3] rounded-md p-2">
          <TipIcon size={15} className="mr-1" />
          <Text className="text-[#4030A5] font-semibold flex-1">
            Veuillez lire l’ensemble des instructions ci-dessous avant de démarrer la sauvegarde.
          </Text>
        </View>
        <View className="flex flex-row rounded-md">
          <ClickIcon size={20} />
          <Text className="text-[#4030A5] font-bold flex-1">
            Cliquez sur le bouton “Sauvegarder mes données Oz” ci-dessous,
          </Text>
        </View>
        <View className="flex flex-row rounded-md mb-2">
          <FolderIcon size={20} />
          <View>
            <Text className="text-[#4030A5] font-bold mb-2 flex-1">
              Une fenêtre s’ouvre, sélectionnez une des méthodes proposées pour sauvegarder vos données Oz. Vous pouvez
              réaliser cette sauvegarde :
            </Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold">via le cloud,</Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">via une application de messagerie,</Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">via votre adresse e-mail ...</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={exportData}
          className="justify-center items-center flex-row rounded-3xl p-2 bg-[#DE285E]"
        >
          <UploadIcon size={20} className="mr-2" />
          <Text className="font-bold color-white text-center text-lg flex-1">Sauvegarder mes données Oz</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full my-8">
        <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-4" />
        <Text className="font-extrabold text-center mr-4">PUIS</Text>
        <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-2" />
      </View>
      <View className="flex flex-col space-y-5 bg-[#FFFFFF] rounded-md p-4 border border-[#DFDFEB]">
        <Text className="text-[#4030A5] text-xl font-extrabold">Etape 2</Text>
        <Text className="text-black text-base">
          Vous êtes sur votre <Text className="font-bold underline">nouveau</Text> téléphone.
        </Text>
        <Text className="text-black text-base">
          Les sous-étapes ci-dessous vont vous permettre de récupérer l’ensemble de vos données Oz.
        </Text>
        <View className="flex flex-row bg-[#E6E4F3] rounded-md p-2">
          <TipIcon size={15} className="mr-1" />
          <Text className="text-[#4030A5] font-semibold flex-1">
            Veuillez lire l’ensemble des instructions ci-dessous avant de démarrer l'importation.
          </Text>
        </View>
        <View className="flex flex-row">
          <CloudIcon size={20} />
          <View className="flex flex-1">
            <Text className="text-[#4030A5] font-bold mb-2 flex-1">
              Si vous avez sauvegardé vos données sur un cloud :
            </Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold">
                cliquez sur le bouton “Importer mes données Oz” ci-dessous,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                une fenêtre s’ouvre, sélectionnez le fichier précedemment sauvegardé depuis le même cloud et
                importez-le,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">redémarrez Oz Ensemble.</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row rounded-md mb-2 pr-4">
          <OppositeArrowsIcon size={20} />
          <View className="flex flex-1">
            <Text className="text-[#4030A5] font-bold mb-2">
              Si vous avez transféré vos données par le biais d’une app (app de transfert ou de messagerie) :
            </Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                ouvrez l’app sur laquelle se trouve les données sauvegardées,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                téléchargez le fichier contenant les données Oz dans le dossier “Download” de votre téléphone,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                cliquez sur le bouton “Importer mes données Oz” ci-dessous,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                une fenêtre s’ouvre, ouvrez le dossier “Download”, puis sélectionnez le fichier précedemment sauvegardé,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">redémarrez Oz Ensemble.</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={importData}
          className="justify-center items-center flex-row rounded-3xl p-2 bg-[#4030A5]"
        >
          <DownloadIcon size={20} className="mr-2" />
          <Text className="font-bold color-white text-center text-lg flex-1">Importer mes données Oz</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default Transfer;
