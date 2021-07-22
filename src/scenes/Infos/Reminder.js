import React from 'react';
import { Alert, Platform } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openSettings } from 'react-native-permissions';
import CONSTANTS from '../../reference/constants';
import ReminderIcon from '../../components/Illustrations/ReminderIcon';
import TextStyled from '../../components/TextStyled';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import ButtonPrimary from '../../components/ButtonPrimary';
import UnderlinedButton from '../../components/UnderlinedButton';
import TimePicker from '../../components/TimePicker';
import { followupNumberOfDays } from '../ConsoFollowUp/consoDuck';
import { dateWithTimeAndOffsetFromToday, timeIsAfterNow } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import NotificationService from '../../services/notifications';
import { defaultPadding } from '../../styles/theme';

class Reminder extends React.Component {
  state = {
    reminder: null,
    timePickerVisible: false,
  };

  componentDidMount() {
    this.getReminder(false);
    this.notifcationListener = NotificationService.listen(this.handleNotification);
  }

  componentWillUnmount() {
    NotificationService.remove(this.notifcationListener);
  }

  getReminder = async (showAlert = true) => {
    const isRegistered = await NotificationService.checkPermission();
    const reminder = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_REMINDER);
    if (Boolean(reminder) && new Date(reminder) == 'Invalid Date') {
      this.deleteReminder();
      return;
    }
    if (!isRegistered && reminder && showAlert) this.showPermissionsAlert();
    if (!reminder) return;
    this.setState({ reminder: new Date(reminder) });
  };

  scheduleNotification = async (reminder = new Date(Date.now() + 10 * 1000)) => {
    NotificationService.cancelAll();
    for (let i = !timeIsAfterNow(reminder); i <= followupNumberOfDays; i++) {
      const fireDate = dateWithTimeAndOffsetFromToday(reminder.getHours(), reminder.getMinutes(), i);
      NotificationService.scheduleNotification({
        date: fireDate,
        title: CONSTANTS.NOTIF_REMINDER_TITLE,
        message: CONSTANTS.NOTIF_REMINDER_MESSAGE,
      });
    }
  };

  showTimePicker = async () => {
    const isRegistered = await NotificationService.checkAndAskForPermission();
    if (!isRegistered) {
      this.showPermissionsAlert();
      return;
    }
    this.setState({ timePickerVisible: true });
  };

  showPermissionsAlert = () => {
    Alert.alert(
      'Vous devez autoriser les notifications pour accéder à ce service',
      'Veuillez cliquer sur Réglages puis Notifications pour activer les notifications',
      [
        {
          text: 'Réglages',
          onPress: () => openSettings(),
        },
        {
          text: 'Annuler',
          onPress: () => this.deleteReminder(),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  setReminder = async (reminder) => {
    if (!reminder) {
      this.setState({ timePickerVisible: false });
      return;
    }
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_REMINDER, reminder.toISOString());
    await this.scheduleNotification(reminder);
    await matomo.logReminderSet(Date.parse(reminder));
    this.setState({ reminder, timePickerVisible: false });
  };

  deleteReminder = async () => {
    await AsyncStorage.removeItem(CONSTANTS.STORE_KEY_REMINDER);
    NotificationService.cancelAll();
    this.setState({ reminder: null, timePickerVisible: false });
    matomo.logReminderDelete();
  };

  handleNotification = (notification) => {
    const { navigation } = this.props;
    if (Platform.OS === 'android') {
      if (notification.title === CONSTANTS.NOTIF_REMINDER_TITLE) {
        navigation.navigate('CONSO_FOLLOW_UP');
        matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
      }
    }
    if (Platform.OS === 'ios') {
      if (notification.foreground && !this.notifHandled) {
        this.notifHandled = true;
        if (notification.message === CONSTANTS.NOTIF_REMINDER_MESSAGE) {
          Alert.alert(
            CONSTANTS.NOTIF_REMINDER_TITLE,
            CONSTANTS.NOTIF_REMINDER_MESSAGE,
            [
              {
                text: 'Suivi',
                onPress: () => {
                  navigation.navigate('CONSO_FOLLOW_UP');
                  matomo.logConsoOpen(CONSTANTS.FROM_LOCAL_NOTIFICATION);
                  this.notifHandled = false;
                },
              },
              {
                text: 'Annuler',
                style: 'cancel',
                onPress: () => {
                  this.notifHandled = false;
                },
              },
            ],
            { cancelable: true }
          );
        }
      } else {
        if (notification.message === CONSTANTS.NOTIF_REMINDER_MESSAGE) {
          navigation.navigate('CONSO_FOLLOW_UP');
          matomo.logConsoOpen(CONSTANTS.FROM_BACKGROUND_NOTIFICATION);
        }
      }
    }
  };

  render() {
    const { reminder, timePickerVisible } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <BackButton content="< Retour" onPress={navigation.goBack} bold />
        <ReminderIcon size={80} color="#4030a5" selected={false} />
        <Title>
          <TextStyled color="#4030a5">N'oubliez plus jamais de remplir vos consommations</TextStyled>
        </Title>
        <SubTitle>
          {reminder ? (
            <React.Fragment>
              <TextStyled color="#191919">Vous avez défini un rappel à</TextStyled>
              <TextStyled color="#4030a5">{`\n ${reminder.getLocalePureTime('fr')} \n `}</TextStyled>
              <TextStyled color="#191919">tous les jours.</TextStyled>
            </React.Fragment>
          ) : (
            <TextStyled color="#191919">
              Définissez un rappel quotidien sur votre téléphone pour vous rappeler
            </TextStyled>
          )}
        </SubTitle>
        <ButtonsContainer>
          <ButtonPrimary
            content={reminder ? 'Modifier le rappel' : 'Définir un rappel'}
            onPress={this.showTimePicker}
          />
          {Boolean(reminder) && <UnderlinedButton content="Retirer le rappel" bold onPress={this.deleteReminder} />}
        </ButtonsContainer>
        <TimePicker visible={timePickerVisible} selectDate={this.setReminder} />
      </Container>
    );
  }
}

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

export default Reminder;
