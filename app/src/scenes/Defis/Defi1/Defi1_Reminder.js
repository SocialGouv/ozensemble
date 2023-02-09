import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import { openSettings } from 'react-native-permissions';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ReminderIcon from '../../../components/illustrations/ReminderIcon';
import TextStyled from '../../../components/TextStyled';
import WrapperContainer from '../../../components/WrapperContainer';
import NotificationService from '../../../services/notifications';
import UnderlinedButton from '../../../components/UnderlinedButton';
import H1 from '../../../components/H1';
import { Spacer } from '../../../components/Articles';
import NetInfo from '@react-native-community/netinfo';
import Modal from '../../../components/Modal';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { storage } from '../../../services/storage';
import API from '../../../services/api';

const Defi1_Reminder = ({ navigation, route }) => {
  const [notifErrorAlertVisible, setNotifErrorAlertVisible] = useState(false);

  const activateNotif = async () => {
    const isRegistered = await NotificationService.checkAndAskForPermission();
    if (!isRegistered) {
      showPermissionsAlert();
      return;
    }
    await saveNewUserToken();
    navigation.navigate(...route.params.onPressContinueNavigation);
  };

  const saveNewUserToken = async () => {
    if (!NotificationService.hasToken()) return;
    const matomoId = storage.getString('@UserIdv2');
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) return setNotifErrorAlertVisible(true);

    const res = await API.put({
      path: '/user',
      body: {
        pushNotifToken: NotificationService.getToken(),
        matomoId,
      },
    });

    if (!res?.ok) {
      Alert.alert(
        'Une erreur est survenue lors de la mise en place de votre rappel',
        "L'équipe technique a été prévenue et va résoudre le problème au plus vite."
      );
    }
  };

  return (
    <WrapperContainer onPressBackButton={navigation.goBack}>
      <Container>
        <TitleContainer>
          <ReminderIcon size={80} color="#4030a5" selected={false} />
          <Spacer size={20} />
          <Title>
            <TextStyled color="#4030a5" bold>
              Activez les notifications pour ne pas oublier votre défi de demain !
            </TextStyled>
          </Title>
        </TitleContainer>
        <ButtonsContainer>
          <ButtonPrimary content={'Continuer'} onPress={activateNotif} />
          <Spacer size={20} />
          <EditButton
            content={'Non, pas maintenant'}
            onPress={() => {
              navigation.navigate(...route.params.onPressContinueNavigation);
            }}
          />
        </ButtonsContainer>
        <ReminderErrorAlert visible={notifErrorAlertVisible} hide={() => setNotifErrorAlertVisible(false)} />
      </Container>
    </WrapperContainer>
  );
};

export default Defi1_Reminder;

const ReminderErrorAlert = ({ visible, hide }) => {
  return (
    <>
      <Modal visible={visible} animationType="fade" hide={hide} withBackground hideOnTouch>
        <ModalContainer>
          <ModalTitle>
            <TextStyled color="#4030a5">Ce service nécessite une connexion internet</TextStyled>
          </ModalTitle>
          <ModalContent>
            <TextStyled>Veuillez vous connecter à internet avant de définir votre rappel</TextStyled>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

const showPermissionsAlert = () => {
  Alert.alert(
    'Vous devez autoriser les notifications pour accéder à ce service',
    'Veuillez cliquer sur Réglages puis Notifications pour activer les notifications',
    [
      {
        text: 'Réglages',
        onPress: openSettings,
      },
      {
        text: 'Annuler',
        style: 'cancel',
      },
    ],
    { cancelable: true }
  );
};

const ModalContainer = styled.View`
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 15px;
`;

const ModalTitle = styled(H1)`
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 30px;
`;

const ModalContent = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const Title = styled(H1)`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 80%;
  flex-shrink: 0;
  text-align: center;
`;

const EditButton = styled(UnderlinedButton)``;

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 15,
    flexGrow: 1,
  },
})`
  height: 100%;
  padding-top: 20%;
`;

const ButtonsContainer = styled.View`
  justify-content: space-between;
  margin-top: 15px;
`;
