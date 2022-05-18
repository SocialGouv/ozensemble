import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import ReminderIcon from '../../components/Illustrations/ReminderIcon';
import TextStyled from '../../components/TextStyled';
import TimePicker from '../../components/TimePicker';
import UnderlinedButton from '../../components/UnderlinedButton';
import { timeIsAfterNow } from '../../helpers/dateHelpers';
import CONSTANTS from '../../reference/constants';
import matomo from '../../services/matomo';
import NotificationService from '../../services/notifications';
import { defaultPadding } from '../../styles/theme';
import { storage } from '../../services/storage';

const notifReminderTitle = "C'est l'heure de votre suivi !";
const notifReminderMessage = "N'oubliez pas de remplir votre agenda Oz";

const Reminder = ({ navigation, route, storageKey = '@Reminder', children, offset = 'day', repeatTimes = 15 }) => {
  const [reminder, setReminder] = useState(null);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const getReminder = async (showAlert = true) => {
    const isRegistered = await NotificationService.checkPermission();
    const reminder = storage.getString(storageKey);
    // eslint-disable-next-line eqeqeq
    if (Boolean(reminder) && new Date(reminder) == 'Invalid Date') {
      deleteReminder();
      return;
    }
    if (!isRegistered && reminder && showAlert) showPermissionsAlert();
    if (!reminder) return;
    setReminder(new Date(reminder));
  };

  const notifHandled = useRef(false);
  const handleNotification = (notification) => {
    if (Platform.OS === 'android') {
      if (notification.title === notifReminderTitle) {
        navigation.navigate('CONSO_FOLLOW_UP');
        matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
      }
    }
    if (Platform.OS === 'ios') {
      if (notification.foreground && !notifHandled.current) {
        notifHandled.current = true;
        if (notification.message === notifReminderMessage) {
          Alert.alert(
            notifReminderTitle,
            notifReminderMessage,
            [
              {
                text: 'Suivi',
                onPress: () => {
                  navigation.navigate('CONSO_FOLLOW_UP');
                  matomo.logConsoOpen(CONSTANTS.FROM_LOCAL_NOTIFICATION);
                  notifHandled.current = false;
                },
              },
              {
                text: 'Annuler',
                style: 'cancel',
                onPress: () => {
                  notifHandled.current = false;
                },
              },
            ],
            { cancelable: true }
          );
        }
      } else {
        if (notification.message === notifReminderMessage) {
          navigation.navigate('CONSO_FOLLOW_UP');
          matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
        }
      }
    }
  };

  const notificationListener = useRef();
  useEffect(() => {
    getReminder(false);
    notificationListener.current = NotificationService.listen(handleNotification);
    return () => NotificationService.remove(notificationListener.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleNotification = async (reminder = new Date(Date.now() + 10 * 1000)) => {
    NotificationService.cancelAll();
    for (let i = timeIsAfterNow(reminder) ? 1 : 0; i <= repeatTimes; i++) {
      const fireDate = dayjs()
        .add(i, offset)
        .set('hours', reminder.getHours())
        .set('minutes', reminder.getMinutes())
        .toDate();
      NotificationService.scheduleNotification({
        date: fireDate,
        title: notifReminderTitle,
        message: notifReminderMessage,
      });
    }
  };

  const showTimePicker = async () => {
    const isRegistered = await NotificationService.checkAndAskForPermission();
    if (!isRegistered) {
      showPermissionsAlert();
      return;
    }
    setTimePickerVisible(true);
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
          onPress: deleteReminder,
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const setReminderRequest = async (newReminder) => {
    setTimePickerVisible(false);
    if (!newReminder) return;
    storage.set(storageKey, newReminder.toISOString());
    await scheduleNotification(newReminder);
    await matomo.logReminderSet(Date.parse(newReminder));
    setReminder(newReminder);
    setTimePickerVisible(false);
  };

  const deleteReminder = async () => {
    storage.delete(storageKey);
    NotificationService.cancelAll();
    setReminder(null);
    setTimePickerVisible(false);
    matomo.logReminderDelete();
  };

  return (
    <Container>
      <BackButton content="< Retour" onPress={navigation.goBack} bold />
      <ReminderIcon size={80} color="#4030a5" selected={false} />
      {children ? (
        children({ showTimePicker, reminder })
      ) : (
        <>
          <Title>
            <TextStyled color="#4030a5">
              {route?.params?.title || 'Une aide pour penser à noter vos consommations'}
            </TextStyled>
          </Title>
          <SubTitle>
            {reminder ? (
              <>
                <TextStyled color="#191919">Vous avez défini un rappel à</TextStyled>
                <TextStyled color="#4030a5">{`\n ${reminder.getLocalePureTime('fr')} \n `}</TextStyled>
                <TextStyled color="#191919">tous les jours.</TextStyled>
              </>
            ) : (
              <TextStyled color="#191919">
                Définissez un rappel quotidien sur votre téléphone pour vous rappeler
              </TextStyled>
            )}
          </SubTitle>
        </>
      )}
      <ButtonsContainer>
        <EditButton content={reminder ? 'Modifier le rappel' : 'Définir un rappel'} onPress={showTimePicker} />
        {Boolean(reminder) && <RemoveButton content="Retirer le rappel" onPress={deleteReminder} />}
        {Boolean(route?.params?.enableContinueButton) && route?.params?.onPressContinueNavigation?.length ? (
          <ButtonPrimary
            content="Continuer"
            onPress={() => navigation.navigate(...route.params.onPressContinueNavigation)}
          />
        ) : null}
      </ButtonsContainer>
      {!!timePickerVisible && <TimePicker visible={timePickerVisible} selectDate={setReminderRequest} />}
    </Container>
  );
};

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f9f9f9',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '100%',
    minHeight: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 100,
  },
})`
  background-color: #f9f9f9;
  padding-horizontal: ${defaultPadding}px;
`;

const Title = styled(H1)`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 80%;
  flex-shrink: 0;
  text-align: center;
`;

export const SubTitle = styled(H2)`
  width: 80%;
  margin-bottom: 15px;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
`;

const ButtonsContainer = styled.View`
  justify-content: space-around;
  margin-vertical: 15px;
  margin-bottom: 20%;
`;

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-left: -20px;
  margin-bottom: 30px;
`;

const EditButton = styled(UnderlinedButton)``;

const RemoveButton = styled(UnderlinedButton)`
  margin-bottom: 20px;
`;

export default Reminder;
