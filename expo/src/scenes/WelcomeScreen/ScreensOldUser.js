import React from "react";
import Agreement from "./Agreement";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { screenWidth } from "../../styles/theme";
import Wave from "../../components/illustrations/onboarding/Wave";
import ButtonPrimary from "../../components/ButtonPrimary";
import DownloadIcon from "../../components/illustrations/icons/DownloadIcon.js";
import { logEvent } from "../../services/logEventsWithMatomo";
import { storage } from "../../services/storage";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import RNRestart from "react-native-restart";
import API from "../../services/api";
import AntDesign from "@expo/vector-icons/AntDesign";

export const StepOne = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-between items-center ">
      <View className="px-5">
        <Text className="text-center text-white text-2xl font-bold">Importer les données de Oz {"\n"} Ensemble</Text>
      </View>
      <View className="flex flex-col items-start rounded-lg p-4 border border-white w-4/5 ">
        <View className="items-start bg-white rounded-lg p-2 -mt-6 mb-4 -ml-6">
          <Text className="text-[#4030A5] text-lg font-bold">Etape 1</Text>
        </View>
        <Text className=" text-white text-base mb-4">
          Sauvegardez les données de votre profil depuis votre application Oz Ensemble, de la manière suivante :
        </Text>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">1.</Text>
          <Text className="text-white text-base ">
            Ouvrez votre <Text className="font-bold">application Oz Ensemble</Text>,
          </Text>
        </View>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">2.</Text>
          <Text className="text-white text-base  flex-1">
            Allez sur la page <Text className="font-bold">“Infos”</Text> (en bas à droite dans la barre de menu),
          </Text>
        </View>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">3.</Text>
          <Text className="text-white text-base  flex-1">
            Dans la section “Mes paramètres”, allez sur
            <Text className="font-bold">“Sauvegarder les données de mon profil”</Text> ,
          </Text>
        </View>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">4.</Text>
          <Text className="text-white text-base  flex-1">
            Suivez les étapes indiquées et sauvegardez les informations de votre profil sur votre téléphone.
          </Text>
        </View>
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={0} size={screenWidth + 4} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const StepTwo = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-around items-center ">
      <View className="px-5">
        <Text className="text-center text-white text-2xl font-bold">Importer les données de Oz {"\n"} Ensemble</Text>
      </View>
      <View className="flex flex-col items-start rounded-lg p-4 border border-white w-4/5 ">
        <View className="items-start bg-white rounded-lg p-2 -mt-6 mb-4 -ml-6">
          <Text className="text-[#4030A5] text-lg font-bold">Etape 2</Text>
        </View>
        <Text className=" text-white text-base mb-4">
          Importez les données de votre profil (que vous avez précédemment sauvegardées à l’étape 1), en suivant les
          étapes suivantes :
        </Text>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">1.</Text>
          <Text className="text-white text-base ">Cliquez sur le bouton “Importer mes données Oz” ci-dessous,</Text>
        </View>
        <View className="flex flex-row space-x-2">
          <Text className="text-white text-base ">2.</Text>
          <Text className="text-white text-base  flex-1">
            Une fenêtre s’ouvre, sélectionnez le fichier nommé “export-oz-ensemble” que vous avez sauvegardé sur votre
            téléphone et importez-le.
          </Text>
        </View>
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={0} size={screenWidth + 4} />
      </View>
      <View className="flex flex-row justify-center">
        <TouchableOpacity
          onPress={() => importData(onPressNext)}
          className="justify-center space-x-1 items-center flex-row rounded-3xl bg-[#4030A5] p-3"
        >
          <DownloadIcon size={20} className="" />
          <Text className="font-bold text-white text-center text-base">Importer mes données Oz</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const Validation = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center space-y-16">
      <View className="items-center">
        <AntDesign name="checkcircleo" size={120} color="white" />
      </View>
      <View className="px-5">
        <Text className="text-center text-white text-2xl font-bold">Vos données ont été importées avec succès !</Text>
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={2} size={screenWidth} />
      </View>
      <ButtonPrimary content={"Suivant"} AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);
const importData = async (onPressNext) => {
  logEvent({ category: "TRANSFER", action: "IMPORT_DATA" });
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/json" });
    const fileUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : undefined;
    const fileContents = await fetch(fileUri).then((response) => response.text());
    const pushNotifToken = storage.getString("STORAGE_KEY_PUSH_NOTIFICATION_TOKEN");
    await overwriteData(fileContents, pushNotifToken);
    onPressNext();
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      logEvent({ category: "TRANSFER", action: "CANCEL_IMPORT_DATA", name: "DOCUMENT_PICKER_CANCEL" });
    } else {
      console.log(err);
    }
  }
};

const overwriteData = async (dataImported, pushNotifToken) => {
  try {
    if (Object.keys(dataImported).length === 0) {
      throw new Error("Imported data is empty");
    }
    storage.clearAll();
    if (pushNotifToken) {
      storage.set("STORAGE_KEY_PUSH_NOTIFICATION_TOKEN", pushNotifToken);
    }
    Object.keys(dataImported).forEach((key) => {
      const value = dataImported[key];
      if (typeof value === "object") {
        storage.set(key, JSON.stringify(value));
      } else {
        storage.set(key, value);
      }
    });

    await API.put({ path: `/user`, body: { matomoId: dataImported["@UserIdv2"], pushNotifToken } }).then((res) => {
      if (res.ok) {
        logEvent({ category: "TRANSFER", action: "IMPORT_DATA_SUCCESS" });
      } else {
        logEvent({ category: "TRANSFER", action: "IMPORT_DATA_SUCCESS", name: "PUSH_NOTIF_TOKEN_NOT_SYNC" });
      }
    });
  } catch (error) {
    Alert.alert("Une erreur est survenue lors de l'importation des données");
    logEvent({ category: "TRANSFER", action: "IMPORT_DATA_FAILURE" });
  }
};
export const ScreenAdvice = ({ onStartPress, agreed, setAgreed }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <Text className="text-center text-white text-2xl font-bold -bottom-4">Recevez des conseils personnalisés</Text>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_advice.png")}
          resizeMode="contain"
          className={"h-full w-[80%]"}
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={3} size={screenWidth} />
      </View>
      <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} className="" />
      <ButtonPrimary content={"C'est parti"} AnimationEffect onPress={onStartPress} disabled={!agreed} />
    </View>
  </View>
);
