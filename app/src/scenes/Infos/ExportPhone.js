import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TextInputStyled from '../../components/TextInputStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import { consolidatedCatalogObjectSelector } from '../../recoil/consos';
import { useToast } from '../../services/toast';
import { screenHeight } from '../../styles/theme';
import { getDisplayDrinksModalName, getDisplayName } from '../ConsoFollowUp/drinksCatalog';
import WrapperContainer from '../../components/WrapperContainer';
import { sendMail } from '../../services/mail';
import { P } from '../../components/Articles';
import { storage } from '../../services/storage';
import API from '../../services/api';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const ExportPhone = ({ navigation }) => {
  const exportData = async () => {
    // Storage
    const allStorage = storage.getAllKeys();
    const storageData = {};
    allStorage.forEach((key) => {
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

      const fileUri = result[0].uri;
      const fileContents = await fetch(fileUri).then((response) => response.text());
      const importedData = JSON.parse(fileContents);
      const storageData = importedData.storageData;
      const userDBData = importedData.userDBData;
      storage.clearAll();
      Object.keys(storageData).forEach((key) => {
        const value = storageData[key];
        if (typeof value === 'object') {
          storage.set(key, JSON.stringify(value));
        } else storage.set(key, value);
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
    <WrapperContainer onPressBackButton={navigation.goBack} title="Exporter mes consommations">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: null })}
        keyboardVerticalOffset={Platform.select({ ios: 250, android: 250 })}>
        <P>
          Partagez votre agenda de consommation auprès de la personne de votre choix, renseignez son adresse email
          ci-dessous{'\u00A0'}:
        </P>
        <SubContainer>
          <ButtonsContainer>
            <ButtonPrimary content="Envoyer" onPress={exportData} />
            <ButtonPrimary content="Recive" onPress={importData} />
          </ButtonsContainer>
        </SubContainer>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

const SubContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${screenHeight * 0.2}px;
  background-color: #f9f9f9;
  flex: 1;
`;

const ButtonsContainer = styled.View`
  align-items: flex-start;
  margin-vertical: 30px;
  width: 100%;
`;

export default ExportPhone;
