import React, { useState } from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import WrapperContainer from '../../components/WrapperContainer';
import { storage } from '../../services/storage';
import API from '../../services/api';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { screenWidth } from '../../styles/theme';
import TipIcon from '../../components/illustrations/TipIcon';
import ClickIcon from '../../components/illustrations/icons/ClickIcon';
import UploadIcon from '../../components/illustrations/icons/UploadIcon';
import FolderIcon from '../../components/illustrations/icons/FolderIcon';
import OppositeArrowsIcon from '../../components/illustrations/icons/OppositeArrowsIcon';
import CloudIcon from '../../components/illustrations/icons/CloudIcon';
import DownloadIcon from '../../components/illustrations/icons/DownloadIcon';

const STORAGE_KEY_REMINDER_ID = 'STORAGE_KEY_REMINDER_ID';

const Transfer = ({ navigation }) => {
  const exportData = async () => {
    // Storage
    const allStorage = storage.getAllKeys();
    const storageWithoutUser = allStorage.filter((key) => key !== '@UserIdv2');
    const storageData = {};
    storageWithoutUser.forEach((key) => {
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
      if (value !== null) storageData[key] = value;
    });
    // DB
    const userDBData = await fetchUserData();
    const exportData = { storageData, userDBData };
    const jsonExport = JSON.stringify(exportData);

    const path = `${RNFS.DocumentDirectoryPath}/data.json`;
    await RNFS.writeFile(path, jsonExport, 'utf8');

    await Share.open({
      url: `file://${path}`,
      type: 'application/json',
      title: 'Exported Data',
      message: 'Here is your exported data as JSON',
    });
  };
  const importData = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.json],
      });
      const matomoId = storage.getString('@UserIdv2');
      const notificationToken = storage.getString('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN');
      console.log(notificationToken);
      const fileUri = result[0].uri;
      const fileContents = await fetch(fileUri).then((response) => response.text());
      const importedData = JSON.parse(fileContents);
      const storageData = importedData.storageData;
      const userDBData = importedData.userDBData;
      storage.clearAll();
      storage.set('@UserIdv2', matomoId);
      storage.set('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN', notificationToken);
      console.log(notificationToken);
      Object.keys(storageData).forEach((key) => {
        const value = storageData[key];
        if (typeof value === 'object') {
          storage.set(key, JSON.stringify(value));
        } else storage.set(key, value);
      });
      await API.post({ path: `/user/allData`, body: { matomoId, data: userDBData, notificationToken } }).then((res) => {
        if (res.ok) {
          Alert.alert('Data Imported', 'Your data has been imported successfully');
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
    const matomoId = storage.getString('@UserIdv2');
    const data = await API.get({ path: `/user/allData`, query: { matomoId } }).then((res) => {
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
          <Text className="text-[#4030A5] font-semibold">
            Veuillez lire l’ensemble des instructions ci-dessous avant de démarrer la sauvegarde.
          </Text>
        </View>
        <View className="flex flex-row rounded-md">
          <ClickIcon size={20} />
          <Text className="text-[#4030A5] font-bold">
            Cliquez sur le bouton “Sauvegarder mes données Oz” ci-dessous,
          </Text>
        </View>
        <View className="flex flex-row rounded-md mb-2">
          <FolderIcon size={20} />
          <View>
            <Text className="text-[#4030A5] font-bold mb-2">
              Une fenêtre s’ouvre, sélectionnez une des méthodes proposées pour sauvegarder vos données Oz. Vous pouvez
              réaliser cette sauvegarde :
            </Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">via le cloud,</Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">via une application de messagerie,</Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">via votre adresse e-mail ...</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={exportData}
          className="justify-center items-center flex-row rounded-3xl p-2 bg-[#DE285E]">
          <UploadIcon size={20} className="mr-2" />
          <Text className="font-bold color-white text-center text-lg">Sauvegarder mes données Oz</Text>
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
          <Text className="text-[#4030A5] font-semibold">
            Veuillez lire l’ensemble des instructions ci-dessous avant de démarrer l'importation.
          </Text>
        </View>
        <View className="flex flex-row rounded-md">
          <CloudIcon size={20} />
          <View>
            <Text className="text-[#4030A5] font-bold mb-2">Si vous avez sauvegardé vos données sur un cloud :</Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                cliquez sur le bouton “Importer mes données Oz” ci-dessous,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                une fenêtre s’ouvre, sélectionnez le fichier précedemment sauvegardé depuis le même cloud et
                importez-le,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">redémarrez Oz Ensemble.</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row rounded-md mb-2 pr-4">
          <OppositeArrowsIcon size={20} />
          <View>
            <Text className="text-[#4030A5] font-bold mb-2">
              Si vous avez transféré vos données par le biais d’une app (app de transfert ou de messagerie) :
            </Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                ouvrez l’app sur laquelle se trouve les données sauvegardées,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                téléchargez le fichier contenant les données Oz dans le dossier “Download” de votre téléphone,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                cliquez sur le bouton “Importer mes données Oz” ci-dessous,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">
                une fenêtre s’ouvre, ouvrez le dossier “Download”, puis sélectionnez le fichier précedemment sauvegardé,
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Text className="text-[#4030A5] font-bold">{'\u2022'}</Text>
              <Text className="text-[#4030A5] font-bold">redémarrez Oz Ensemble.</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={importData}
          className="justify-center items-center flex-row rounded-3xl p-2 bg-[#4030A5]">
          <DownloadIcon size={20} className="mr-2" />
          <Text className="font-bold color-white text-center text-lg">Importer mes données Oz</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default Transfer;
