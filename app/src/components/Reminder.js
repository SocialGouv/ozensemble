import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, SafeAreaView } from 'react-native';
import { openSettings } from 'react-native-permissions';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as RNLocalize from 'react-native-localize';
import NetInfo from '@react-native-community/netinfo';
import ButtonPrimary from './ButtonPrimary';
import H1 from './H1';
import H2 from './H2';
import Modal from './Modal';
import ReminderIcon from './illustrations/ReminderIcon';
import TextStyled from './TextStyled';
import TimePicker from './TimePicker';
import UnderlinedButton from './UnderlinedButton';
import CONSTANTS from '../reference/constants';
import { logEvent } from '../services/logEventsWithMatomo';
import NotificationService from '../services/notifications';
import { defaultPaddingFontScale } from '../styles/theme';
import WrapperContainer from './WrapperContainer';
import API from '../services/api';
import { storage } from '../services/storage';
import { capture } from '../services/sentry';

const STORAGE_KEY_REMINDER_ID = 'STORAGE_KEY_REMINDER_ID';

const Reminder = ({
  navigation,
  route,
  reminderHasBeenSetState,
  reminderState,
  reminderModeState,
  reminderWeekDayState,
  children,
  onSetReminderConfirm,
  title,
  wrapperTitle = null,
  notifReminderTitle = "C'est l'heure de votre suivi !",
  notifReminderMessage = "N'oubliez pas de remplir votre agenda Oz",
  onlyDaily,
}) => {
  const setReminderHasBeenSet = useSetRecoilState(reminderHasBeenSetState);
  const [reminder, setReminder] = useRecoilState(reminderState);
  const [mode, setMode] = useRecoilState(reminderModeState); // 0 Sunday, 1 Monday -> 6 Saturday
  const [weekDay, setWeekDay] = useRecoilState(reminderWeekDayState); // 0 Sunday, 1 Monday -> 6 Saturday
  const [reminderSetupVisible, setReminderSetupVisible] = useState(false);
  const [reminderErrorAlertVisible, setReminderErrorAlertVisible] = useState(false);
  const getReminder = async (showAlert = true) => {
    const isRegistered = await NotificationService.checkPermission();
    if (Boolean(reminder) && !dayjs(reminder).isValid()) {
      deleteReminder();
      return;
    }
    if (!isRegistered && reminder && showAlert) showPermissionsAlert();
    if (!reminder) return;
    setReminder(dayjs(reminder));
  };

  const notifHandled = useRef(false);
  const handleNotification = (notification) => {
    if (Platform.OS === 'android') {
      if (notification.title === notifReminderTitle) {
        navigation.navigate('CONSO_FOLLOW_UP_NAVIGATOR', { screen: 'CONSO_FOLLOW_UP' });
        logEvent({
          category: 'CONSO',
          action: 'CONSO_OPEN',
          name: 'ORIGIN',
          value: CONSTANTS.FROM_BACKGROUND_NOTIFICATION,
        });
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
                  navigation.navigate('CONSO_FOLLOW_UP_NAVIGATOR', { screen: 'CONSO_FOLLOW_UP' });
                  logEvent({
                    category: 'CONSO',
                    action: 'CONSO_OPEN',
                    name: 'ORIGIN',
                    value: CONSTANTS.FROM_LOCAL_NOTIFICATION,
                  });
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
          navigation.navigate('CONSO_FOLLOW_UP_NAVIGATOR', { screen: 'CONSO_FOLLOW_UP' });
          logEvent({
            category: 'CONSO',
            action: 'CONSO_OPEN',
            name: 'ORIGIN',
            value: CONSTANTS.FROM_BACKGROUND_NOTIFICATION,
          });
        }
      }
    }
  };

  const scheduleNotification = async (reminder = new Date(Date.now() + 10 * 1000), mode = 'day', weekDay = 0) => {
    NotificationService.cancelAll();

    const weekDayName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][weekDay];

    if (!storage.getString('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN')) return;

    const existingId = storage.getString(STORAGE_KEY_REMINDER_ID);
    const matomoId = storage.getString('@UserIdv2');

    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) return setReminderErrorAlertVisible(true);
    const res = await API.put({
      path: '/reminder',
      body: {
        pushNotifToken: storage.getString('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN'),
        type: mode === 'day' ? 'Daily' : mode === 'week' ? 'Weekdays' : 'Daily',
        timezone: RNLocalize.getTimeZone(),
        timeHours: reminder.getHours(),
        timeMinutes: reminder.getMinutes(),
        daysOfWeek:
          mode === 'week'
            ? {
                [weekDayName]: true,
              }
            : undefined,
        id: existingId ?? undefined,
        calledFrom: 'Reminder',
        matomoId,
      },
    });

    if (!res?.ok) {
      capture(new Error('Reminder setup failed'), {
        extra: {
          data: {
            reminder,
            mode,
            weekDay,
            weekDayName,
            existingId,
            matomoId,
          },
          request: {
            path: '/reminder',
            body: {
              pushNotifToken: storage.getString('STORAGE_KEY_PUSH_NOTIFICATION_TOKEN'),
              type: mode === 'day' ? 'Daily' : mode === 'week' ? 'Weekdays' : 'Daily',
              timezone: RNLocalize.getTimeZone(),
              timeHours: reminder.getHours(),
              timeMinutes: reminder.getMinutes(),
              daysOfWeek:
                mode === 'week'
                  ? {
                      [weekDayName]: true,
                    }
                  : undefined,
              id: existingId ?? undefined,
              calledFrom: 'Reminder',
              matomoId,
            },
          },
          response: res,
        },
      });
      Alert.alert(
        'Une erreur est survenue lors de la mise en place de votre rappel',
        "L'équipe technique a été prévenue et va résoudre le problème au plus vite."
      );
      return false;
    }

    if (res?.ok && res?.reminder?.id) storage.set(STORAGE_KEY_REMINDER_ID, res.reminder.id);

    NotificationService.cancelAll();

    return true;
  };

  const showReminderSetup = async () => {
    const isRegistered = await NotificationService.checkAndAskForPermission();
    if (!isRegistered) {
      showPermissionsAlert();
      return;
    }
    setReminderSetupVisible(true);
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

  const setReminderRequest = async (newReminder, newMode, newWeekDay) => {
    setReminderSetupVisible(false);
    if (!dayjs(newReminder).isValid()) return;
    const ok = await scheduleNotification(newReminder, newMode, newWeekDay);
    setReminder(dayjs(newReminder));
    setMode(newMode);
    setWeekDay(newWeekDay);
    onSetReminderConfirm?.(newReminder, newMode, newWeekDay);
    setReminderSetupVisible(false);
    setReminderHasBeenSet(true);
  };

  const deleteReminder = async () => {
    NotificationService.cancelAll();
    setReminder('');
    setMode('');
    setWeekDay(0);
    setReminderSetupVisible(false);
    logEvent({
      category: 'REMINDER',
      action: 'REMINDER_DELETE',
    });
  };

  const notificationListener = useRef();
  useEffect(() => {
    getReminder(false);
    console.log('here', notificationListener);
    const test = NotificationService.subscribe(handleNotification);
    console.log('plaf', test);
    notificationListener.current = NotificationService.subscribe(handleNotification);
    console.log('there', notificationListener);
    return () => {
      NotificationService.unsubscribe(notificationListener.current);
      console.log('plop');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueButton = route?.params?.enableContinueButton && route?.params?.onPressContinueNavigation?.length > 0;
  const continueButtonOnPress = async () => {
    if (!reminder) return navigation.navigate(...route.params.onPressContinueNavigation);
    setReminderHasBeenSet(true);
    const isRegistered = await NotificationService.checkAndAskForPermission();
    if (!isRegistered) {
      showPermissionsAlert();
      return;
    }
    navigation.navigate(...route.params.onPressContinueNavigation);
  };

  return (
    <>
      <SafeAreaView className="bg-[#39CEC0]"></SafeAreaView>
      <WrapperContainer onPressBackButton={navigation.goBack} title={wrapperTitle}>
        <Container>
          <ReminderIcon size={80} color="#4030a5" selected={false} />
          {children ? (
            children({ reminder, mode, weekDay })
          ) : (
            <>
              <Title>
                <TextStyled color="#4030a5">{title || 'Une aide pour penser à noter vos consommations'}</TextStyled>
              </Title>
              <SubTitle>
                {reminder ? (
                  <>
                    <TextStyled color="#191919">Vous avez défini un rappel à</TextStyled>
                    <TextStyled color="#4030a5">{`\n \n${dayjs(reminder).format('HH:mm')} \n `}</TextStyled>
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
            {reminder ? (
              <>
                <EditButton content={'Modifier le rappel'} onPress={showReminderSetup} />
                <RemoveButton content="Désactiver le rappel" onPress={deleteReminder} />
                {continueButton && <ButtonPrimary content="Continuer" onPress={continueButtonOnPress} />}
              </>
            ) : (
              <>
                <ButtonPrimary content={'Définir un rappel'} onPress={showReminderSetup} />
                {continueButton && <EditButton content="Continuer" onPress={continueButtonOnPress} />}
              </>
            )}
          </ButtonsContainer>
          <ModeAndWeekDayChooseModal
            key={reminderSetupVisible}
            onlyDaily={onlyDaily}
            visible={reminderSetupVisible}
            hide={() => setReminderSetupVisible(false)}
            setReminderRequest={setReminderRequest}
          />
          <ReminderErrorAlert visible={reminderErrorAlertVisible} hide={() => setReminderErrorAlertVisible(false)} />
        </Container>
      </WrapperContainer>
    </>
  );
};

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 15,
    flexGrow: 1,
  },
})``;

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
  margin-top: 15px;
`;

const EditButton = styled(UnderlinedButton)``;

const RemoveButton = styled(UnderlinedButton)`
  margin-bottom: 20px;
`;

export default Reminder;

const ModeAndWeekDayChooseModal = ({ visible, hide, setReminderRequest, onlyDaily }) => {
  const [mode, setMode] = useState(onlyDaily ? 'day' : null); // 'week'
  const [weekDay, setWeekDay] = useState(null); // 0 Sunday, 1 Monday -> 6 Saturday
  const [timePickerVisible, setTimePickerVisible] = useState(onlyDaily ? visible : false);

  const onModeChoose = (newMode) => {
    if (newMode === 'week') return setMode(newMode);
    setMode(newMode);
    setTimePickerVisible(true);
  };

  const onWeekdayChoose = (newWeekDay) => {
    setWeekDay(newWeekDay);
    setTimePickerVisible(true);
  };

  const onSelectDate = (newDate) => setReminderRequest(newDate, mode, weekDay);

  return (
    <>
      <Modal visible={visible && !timePickerVisible} animationType="fade" hide={hide} withBackground hideOnTouch>
        {!mode && (
          <ModalContainer>
            <ModalTitle>
              <TextStyled color="#4030a5">Quand préférez-vous votre rappel ?</TextStyled>
            </ModalTitle>
            <ModalContent>
              <ModeSelectButton onPress={() => onModeChoose('day')}>Tous les jours</ModeSelectButton>
              <ModeSelectButton onPress={() => onModeChoose('week')}>Une fois par semaine</ModeSelectButton>
            </ModalContent>
            <ModalCancel onPress={hide}>
              <TextStyled bold>Annuler</TextStyled>
            </ModalCancel>
          </ModalContainer>
        )}
        {mode === 'week' && weekDay === null && (
          <ModalContainer>
            <ModalTitle>
              <TextStyled color="#4030a5">Quel jour ?</TextStyled>
            </ModalTitle>
            <ModalContent>
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((weekDay, index) => (
                <ModeSelectButton key={index} onPress={() => onWeekdayChoose(index % 7)}>
                  {weekDay}
                </ModeSelectButton>
              ))}
            </ModalContent>
            <ModalCancel>
              <ModalCancel onPress={hide}>
                <TextStyled bold>Annuler</TextStyled>
              </ModalCancel>
            </ModalCancel>
          </ModalContainer>
        )}
      </Modal>
      {!!timePickerVisible && <TimePicker visible={timePickerVisible} selectDate={onSelectDate} />}
    </>
  );
};

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

const ModalContainer = styled.View`
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 15px;
`;
const ModalCancel = styled(H1)`
  text-align: center;
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

const ModeSelectButton = ({ onPress, disabled, children }) => (
  <ModeSelectButtonStyled onPress={onPress} disabled={disabled}>
    <ModeSelectButtonContent color="#4030a5">{children}</ModeSelectButtonContent>
  </ModeSelectButtonStyled>
);

const qButtonSize = 40;
const ModeSelectButtonStyled = styled.TouchableOpacity`
  height: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  padding-vertical: 5px;
  padding-horizontal: 15px;
  border: 1px solid #4030a5;
  /* background: #eaeaed; */
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ModeSelectButtonContent = styled(TextStyled)`
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
  flex-shrink: 1;
`;
