import React from "react";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import WrapperContainer from "../../components/WrapperContainer.js";
import { storage } from "../../services/storage.js";
import API from "../../services/api.js";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as Expo from "expo";
import * as FileSystem from "expo-file-system";
import TipIcon from "../../components/illustrations/TipIcon.js";
import ClickIcon from "../../components/illustrations/icons/ClickIcon.js";
import UploadIcon from "../../components/illustrations/icons/UploadIcon.js";
import FolderIcon from "../../components/illustrations/icons/FolderIcon.js";
import OppositeArrowsIcon from "../../components/illustrations/icons/OppositeArrowsIcon.js";
import CloudIcon from "../../components/illustrations/icons/CloudIcon.js";
import DownloadIcon from "../../components/illustrations/icons/DownloadIcon.js";
import { logEvent } from "../../services/logEventsWithMatomo.js";

const Transfer = ({ navigation }) => {
  const exportData = async () => {
    logEvent({ category: "TRANSFER", action: "EXPORT_DATA" });
    // Storage
    const allStorage = storage.getAllKeys();
    const filteredStorage = allStorage.filter((key) => !key.startsWith("STORAGE_KEY_PUSH_NOTIFICATION"));
    const toExportData = {};
    filteredStorage.forEach((key) => {
      // On vérifie si la valeur est un objet ou un boolean
      // Si c'est un objet, on le parse en JSON
      // Si c'est un boolean, on le récupère en boolean
      // Sinon, on le récupère en string
      const stringValue = storage.getString(key);
      const booleanValue = storage.getBoolean(key);
      let value;
      if (stringValue !== null && stringValue !== undefined) {
        try {
          value = JSON.parse(stringValue);
        } catch (e) {
          value = stringValue;
        }
      } else if (booleanValue !== null && booleanValue !== undefined) {
        value = booleanValue;
      } else {
        value = null;
      }

      if (value !== null) toExportData[key] = value;
    });
    const jsonExport = JSON.stringify(toExportData);
    const path = `${FileSystem.documentDirectory}export-oz-ensemble.json`;
    await FileSystem.writeAsStringAsync(path, jsonExport, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(path, {
        mimeType: "application/json",
        dialogTitle: "Données exportées",
        UTI: "public.json",
      }).then(() => {
        logEvent({ category: "TRANSFER", action: "EXPORT_DATA_SUCCESS" });
        Alert.alert("Vos données ont bien été sauvegardées.");
        storage.set("@ExportedData", true);
      });
    } else {
      console.log("Sharing is not available on this device");
    }
  };
  const importData = async () => {
    logEvent({ category: "TRANSFER", action: "IMPORT_DATA" });
    try {
      Alert.alert(
        "Attention",
        "Les données actuelles seront écrasées par les données importées. Cette opération est irréversible.",
        [
          {
            text: "Annuler",
            onPress: () => logEvent({ category: "TRANSFER", action: "CANCEL_IMPORT_DATA", name: "ALERT_CANCEL" }),
            style: "cancel",
          },
          {
            text: "Confirmer",
            onPress: async () => {
              try {
                const result = await DocumentPicker.getDocumentAsync({ type: "application/json" });
                const fileUri = result.assets && result.assets.length > 0 ? result.assets[0].uri : undefined;
                const fileContents = await fetch(fileUri).then((response) => response.text());
                const pushNotifToken = storage.getString("STORAGE_KEY_PUSH_NOTIFICATION_TOKEN");
                await handleImportData(fileContents, pushNotifToken);
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                  logEvent({ category: "TRANSFER", action: "CANCEL_IMPORT_DATA", name: "DOCUMENT_PICKER_CANCEL" });
                } else {
                  console.log(err);
                }
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleImportData = async (fileContents, pushNotifToken) => {
    const dataImported = JSON.parse(fileContents);
    const overWrittenId = storage.getString("@UserIdv2");
    const newMatomoId = dataImported["@UserIdv2"];

    if (newMatomoId === overWrittenId) {
      logEvent({ category: "TRANSFER", action: "IMPORT_DATA", name: "SAME_MATOMO_ID" });
      Alert.alert(
        "Attention, ces données sont déjà présentes sur ce téléphone",
        "Voulez-vous continuer?",
        [
          {
            text: "Annuler",
            onPress: () => logEvent({ category: "TRANSFER", action: "CANCEL_IMPORT_DATA", name: "CANCEL_SAME_ID" }),
            style: "cancel",
          },
          {
            text: "Continuer",
            onPress: async () => {
              await overwriteData(dataImported, pushNotifToken);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      await API.put({ path: `/user`, body: { matomoId: storage.getString("@UserIdv2"), isOverWritten: true } });
      await overwriteData(dataImported, pushNotifToken);
    }
  };

  const overwriteData = async (dataImported, pushNotifToken) => {
    storage.clearAll();
    storage.set("STORAGE_KEY_PUSH_NOTIFICATION_TOKEN", pushNotifToken);
    Object.keys(dataImported).forEach((key) => {
      const value = dataImported[key];
      if (typeof value === "object") {
        storage.set(key, JSON.stringify(value));
      } else {
        storage.set(key, value);
      }
    });
    const matomoId = storage.getString("@UserIdv2");
    await API.put({ path: `/user`, body: { matomoId, pushNotifToken } }).then((res) => {
      if (res.ok) {
        Alert.alert("Félicitations, vos données ont bien été importées 🥳");
        logEvent({ category: "TRANSFER", action: "IMPORT_DATA_SUCCESS" });
        Expo.reloadAppAsync();
      }
    });
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
              <Text className="text-[#4030A5] font-bold flex-1">
                cliquez sur le bouton “Importer mes données Oz” ci-dessous,
              </Text>
            </View>
            <View className="flex flex-row space-x-2 ">
              <Text className="text-[#4030A5] font-bold">{"\u2022"}</Text>
              <Text className="text-[#4030A5] font-bold flex-1">
                une fenêtre s’ouvre, sélectionnez le fichier précedemment sauvegardé depuis le même cloud et
                importez-le,
              </Text>
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
