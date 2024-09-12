import React from "react";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import WrapperContainer from "../../components/WrapperContainer.js";
import { storage } from "../../services/storage.js";
import API from "../../services/api.js";
import * as DocumentPicker from "expo-document-picker";
import TipIcon from "../../components/illustrations/TipIcon.js";
import OppositeArrowsIcon from "../../components/illustrations/icons/OppositeArrowsIcon.js";
import CloudIcon from "../../components/illustrations/icons/CloudIcon.js";
import DownloadIcon from "../../components/illustrations/icons/DownloadIcon.js";
import { logEvent } from "../../services/logEventsWithMatomo.js";
import RNRestart from "react-native-restart";

const Transfer = ({ navigation }) => {
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
        Alert.alert("Félicitations, vos données ont bien été importées 🥳");
        RNRestart.restart();
      });
    } catch (error) {
      Alert.alert("Une erreur est survenue lors de l'importation des données");
      logEvent({ category: "TRANSFER", action: "IMPORT_DATA_FAILURE" });
    }
  };

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Transférer mes données vers un autre téléphone">
      <View className="flex flex-col space-y-4 bg-[#FFFFFF] rounded-md px-4 py-3 border border-[#DFDFEB]">
        <Text className="text-black text-base">
          Les sous-étapes ci-dessous vont vous permettre de récupérer l’ensemble de vos données Oz.
        </Text>
        <View className="flex flex-row bg-[#E6E4F3] rounded-md p-2">
          <TipIcon size={15} className="mr-1" />
          <Text className="text-[#4030A5] font-semibold ">
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
                importez-le.
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
                une fenêtre s’ouvre, ouvrez le dossier “Download”, puis sélectionnez le fichier précedemment sauvegardé.
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-center flex-1">
          <TouchableOpacity
            onPress={importData}
            className="justify-center space-x-1 items-center flex-row rounded-3xl bg-[#4030A5] p-2"
          >
            <DownloadIcon size={20} className="" />
            <Text className="font-bold text-white text-center text-base">Importer mes données Oz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Transfer;
