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
    console.log(storage.getBoolean('@OnboardingDoneWithCGU'), 'onboarding');
    const allStorage = storage.getAllKeys();
    console.log(allStorage, 'allStorage');
    const storageDataToExport = {};
    allStorage.forEach((key) => {
      const stringValue = storage.getString(key);
      console.log(stringValue, 'stringValue', key);
      const booleanValue = storage.getBoolean(key);
      console.log(booleanValue, 'booleanValue', key);

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
      if (value !== null) storageDataToExport[key] = value;
    });

    const jsonExport = JSON.stringify(storageDataToExport);
    console.log(jsonExport);

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
      console.log(importedData, 'importedData');
      storage.clearAll();
      Object.keys(importedData).forEach((key) => {
        const value = importedData[key];
        console.log(key, value, 'input');
        if (typeof value === 'object') {
          storage.set(key, JSON.stringify(value));
        } else storage.set(key, value);
      });
      console.log(storage.getAllKeys(), 'output');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
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

const EmailInput = styled(TextInputStyled)`
  width: 100%;
  height: 50px;
  background-color: #f3f3f6;
  border: 1px solid #dbdbe9;
  color: #4030a5;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export default ExportPhone;
