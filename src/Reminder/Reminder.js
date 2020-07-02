import React from 'react';
import { Alert, Linking } from 'react-native';
import styled, { withTheme } from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import CONSTANTS from '../reference/constants';
import ReminderIcon from '../components/Illustrations/ReminderIcon';
import TextStyled from '../components/TextStyled';
import H1 from '../components/H1';
import H2 from '../components/H2';
import ButtonPrimary from '../components/ButtonPrimary';
import UnderlinedButton from '../components/UnderlinedButton';
import TimePicker from './TimePicker';
import { followupNumberOfDays } from '../ConsoFollowUp/consoDuck';
import { dateWithTimeAndOffsetFromToday, timeIsAfterNow } from '../helpers/dateHelpers';
import matomo from '../matomo';
import { BackButton } from '../Contact/styles';

class Reminder extends React.Component {
  state = {
    reminder: null,
    timePickerVisible: false,
  };

  componentDidMount() {
    this.getReminder(false);
  }

  getReminder = async (showAlert = true) => {
    const isRegistered = await this.props.notificationService.checkPermission();
    const reminder = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_REMINDER);
    if (Boolean(reminder) && new Date(reminder) == 'Invalid Date') {
      this.deleteReminder();
      return;
    }
    if (!isRegistered && reminder && showAlert) this.showPermissionsAlert(this.deleteReminder);
    if (!reminder) return;
    this.setState({ reminder: new Date(reminder) });
  };

  scheduleNotification = async (reminder = new Date(Date.now() + 10 * 1000)) => {
    this.props.notificationService.cancelAll();
    for (let i = !timeIsAfterNow(reminder); i <= followupNumberOfDays; i++) {
      const fireDate = dateWithTimeAndOffsetFromToday(
        reminder.getHours(),
        reminder.getMinutes(),
        i
      );
      this.props.notificationService.scheduleNotification({
        date: fireDate,
        title: CONSTANTS.NOTIF_REMINDER_TITLE,
        message: CONSTANTS.NOTIF_REMINDER_MESSAGE,
      });
    }
  };

  showTimePicker = async () => {
    const isRegistered = await this.props.notificationService.checkPermission();
    if (!isRegistered) {
      this.showPermissionsAlert(this.deleteReminder);
      return;
    }
    this.setState({ timePickerVisible: true });
  };

  showPermissionsAlert = deleteReminder => {
    // Alert.
    Alert.alert(
      'Vous devez autoriser les notifications pour accéder à ce service',
      'Veuillez cliquer sur Réglages puis Notifications pour activer les notifications',
      [
        {
          text: 'Réglages',
          onPress: () => Linking.openURL('app-settings:'),
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

  setReminder = async reminder => {
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
    this.props.notificationService.cancelAll();
    this.setState({ reminder: null, timePickerVisible: false });
    matomo.logReminderDelete();
  };

  render() {
    const { reminder, timePickerVisible } = this.state;
    const { theme, onBackPress } = this.props;
    return (
      <Container>
        <BackButton content="< Retour" onPress={onBackPress} bold />
        <ReminderIcon size={80} color={theme.colors.title} selected={false} />
        <Title>
          <TextStyled type="title">N'oubliez plus jamais de remplir vos consommations</TextStyled>
        </Title>
        <SubTitle>
          {reminder ? (
            <React.Fragment>
              <TextStyled type="basicText">Vous avez défini un rappel à</TextStyled>
              <TextStyled type="title">{`\n ${reminder.getLocalePureTime('fr')} \n `}</TextStyled>
              <TextStyled type="basicText">tous les jours.</TextStyled>
            </React.Fragment>
          ) : (
            <TextStyled type="basicText">
              Définissez un rappel quotidien sur votre téléphone pour vous rappeler
            </TextStyled>
          )}
        </SubTitle>
        <ButtonsContainer>
          <ButtonPrimary
            content={reminder ? 'Modifier le rappel' : 'Définir un rappel'}
            onPress={this.showTimePicker}
          />
          {Boolean(reminder) && (
            <UnderlinedButton content="Retirer le rappel" bold onPress={this.deleteReminder} />
          )}
        </ButtonsContainer>
        <TimePicker visible={timePickerVisible} selectDate={this.setReminder} />
      </Container>
    );
  }
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex: 1;
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
`;

export default withTheme(Reminder);
