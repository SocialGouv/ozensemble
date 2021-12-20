import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Platform, AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationService from '../../services/notifications';
import matomo from '../../services/matomo';
import CONSTANTS from '../../reference/constants';
import Mark from './Mark';
import {
  Container,
  ScreenBgStyled,
  KeyboardAvoidingViewStyled,
  TopTitle,
  TopSubTitle,
  FeedBackStyled,
  ButtonContainer,
  CloseNPS,
  TextInputStyled,
} from './styles';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import UnderlinedButton from '../../components/UnderlinedButton';
import TextStyled from '../../components/TextStyled';
import { TIPIMAIL_API_KEY, TIPIMAIL_API_USER, TIPIMAIL_EMAIL_FROM, TIPIMAIL_EMAIL_TO } from '../../config';
import pck from '../../../package.json';

// just to make sure nothing goes the bad way in production, debug is always false

const formatText = (useful, reco, feedback, email, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Ce service vous a-t-il été utile: ${useful}
Comment pouvons-nous vous être encore plus utile: ${feedback}
Quelle est la probabilité que vous recommandiez ce service à un ami ou un proche: ${reco}
Email: ${email}
`;

const NPSTimeoutMS = __DEV__ ? 1000 * 3 : 1000 * 60 * 60 * 24 * 3;
const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);

const STORE_KEYS = {
  NPS_DONE: '@NPSDone',
  INITIAL_OPENING: '@NPSInitialOpening',
};

class NPS extends React.Component {
  state = {
    visible: false,
    useful: null,
    reco: null,
    feedback: '',
    email: '',
    sendButton: 'Envoyer',
    page: 1,
  };

  async componentDidMount() {
    if (__DEV__) {
      // this.reset(); // useful in dev mode
    }
    AppState.addEventListener('change', this.handleAppStateChange);
    this.notificationsListener = NotificationService.listen(this.handleNotification);
    this.checkNeedNPS();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    NotificationService.remove(this.notificationsListener);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.NPSKey && this.state.NPSKey) {
      this.checkNeedNPS();
    }
    if (!prevProps.forceView && this.props.forceView && !this.state.visible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ visible: true });
    }
    if (prevState.visible && !this.state.visible) {
      if (this.props.close) {
        this.props.close();
      }
      this.npsSent = false;
    }
  }

  reset = async () => {
    await AsyncStorage.removeItem(STORE_KEYS.NPS_DONE);
    await AsyncStorage.removeItem(STORE_KEYS.INITIAL_OPENING);
  };

  checkNeedNPS = async () => {
    const NPSDone = await AsyncStorage.getItem(STORE_KEYS.NPS_DONE);
    if (NPSDone) return;

    const appFirstOpening = await AsyncStorage.getItem(STORE_KEYS.INITIAL_OPENING);
    if (!appFirstOpening) {
      await AsyncStorage.setItem(STORE_KEYS.INITIAL_OPENING, new Date().toISOString());
      NotificationService.scheduleNotification({
        date: new Date(Date.now() + NPSTimeoutMS),
        title: this.props.notifTitle,
        message: this.props.notifMessage,
      });
      return;
    }
    const opening = await AsyncStorage.getItem(STORE_KEYS.INITIAL_OPENING);
    const timeForNPS = Date.now() - Date.parse(new Date(opening)) > NPSTimeoutMS;
    if (!timeForNPS) return;
    matomo.logNPSOpen();
    await AsyncStorage.setItem(STORE_KEYS.NPS_DONE, 'true');
    this.setState({ visible: true });
  };

  handleAppStateChange = (newState) => {
    if (newState === 'active') this.checkNeedNPS();
  };

  handleNotification = (notification) => {
    if (Platform.OS === 'android') {
      if (notification.title === this.props.notifTitle) {
        /* ANDROID
        can make the opening of NPS it more precise if needed
        now the app is buggy on Android : the notifcation.foreground is always === false
        but when a user clicks on a notification while the app is on foreground,
        the app swirtches in background and go back in foreground in a millisecond,
        so that NPS is launched independantly from the notification.
        */
      }
    }
    if (Platform.OS === 'ios') {
      if (notification.foreground && !this.notifHandled) {
        this.notifHandled = true;
        if (notification.message === this.props.notifMessage) {
          Alert.alert(
            this.props.notifTitle,
            this.props.notifMessage,
            [
              {
                text: 'Donner mon avis',
                onPress: () => {
                  this.setState({ visible: true });
                },
              },
              {
                text: 'Annuler',
                style: 'cancel',
                onPress: () => {
                  this.notifHandled = false;
                  AsyncStorage.setItem(STORE_KEYS.NPS_DONE, 'true');
                },
              },
            ],
            { cancelable: true }
          );
        }
      } else {
        if (notification.message === this.props.notifMessage) {
          // nothing to do, the NPS launches by itself
        }
      }
    }
    notification.finish();
  };

  setUseful = (useful) => this.setState({ useful });
  setReco = (reco) => this.setState({ reco });
  setFeedback = (feedback) => this.setState({ feedback });
  setSendButton = (sendButton) => this.setState({ sendButton });
  setEmail = (email) => this.setState({ email });

  onClose = async () => {
    const { useful, reco } = this.state;
    if (useful !== null || reco !== null) await this.sendNPS();
    this.setState({ visible: false });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  sendNPS = async () => {
    if (this.npsSent) return;
    const { useful, reco, feedback, email } = this.state;
    if (email.length && !emailFormat(email)) {
      Alert.alert('Adresse email non valide');
      return;
    }
    const { userIdLocalStorageKey } = this.props;
    const userId = await AsyncStorage.getItem(userIdLocalStorageKey);
    this.setSendButton('Merci !');
    matomo.logNPSUsefulSend(useful);
    matomo.logNPSRecoSend(reco);
    await fetch('https://api.tipimail.com/v1/messages/send', {
      method: 'POST',
      headers: {
        'X-Tipimail-ApiUser': TIPIMAIL_API_USER,
        'X-Tipimail-ApiKey': TIPIMAIL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [
          {
            address: TIPIMAIL_EMAIL_TO,
          },
        ],
        msg: {
          from: {
            address: TIPIMAIL_EMAIL_FROM,
            personalName: 'App Addicto',
          },
          subject: 'NPS Addicto',
          text: formatText(useful, reco, feedback, email, userId),
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log('sendNPS err', err));

    this.npsSent = true;
    this.setState({ visible: false, reco: null, useful: null, feedback: '' });
  };

  renderFirstPage() {
    const { feedback, email, useful, reco, sendButton } = this.state;
    return (
      <>
        <TopTitle>
          <TextStyled color="#4030a5">
            5 secondes pour nous aider{'\u00A0'}?{'\u000A'}Vos retours sont importants pour nous.
          </TextStyled>
        </TopTitle>
        <TopSubTitle>
          <TextStyled color="#191919">Ce service vous a-t-il été utile{'\u00A0'}?</TextStyled>
        </TopSubTitle>
        <Mark selected={useful} onPress={this.setUseful} bad="Pas utile du tout" good="Extrêmement utile" />
        <TopSubTitle>
          <TextStyled color="#191919">
            Comment pouvons-nous vous être encore plus utile{'\u00A0'}? Comment pouvons-nous améliorer ce service
            {'\u00A0'}?
          </TextStyled>
        </TopSubTitle>
        <FeedBackStyled
          onChangeText={this.setFeedback}
          placeholder="Idées d'améliorations (facultatif)"
          value={feedback}
          multiline
          textAlignVertical="top"
          returnKeyType="next"
        />
        <TopSubTitle>
          <TextStyled color="#191919">
            Quelle est la probabilité que vous recommandiez ce service à un ami ou un proche
            {'\u00A0'}?
          </TextStyled>
        </TopSubTitle>
        <Mark selected={reco} onPress={this.setReco} bad="Pas du tout probable" good="Très probable" />
        <TopSubTitle>
          <TextStyled color="#191919">
            Pourrions-nous vous contacter pour en discuter avec vous{'\u00A0'}? Si vous êtes d'accord, vous pouvez
            renseigner votre adresse email ci-dessous.
          </TextStyled>
        </TopSubTitle>
        <TextInputStyled
          value={email}
          ref={(r) => (this.emailInput = r)}
          placeholder="Adresse email (facultatif)"
          onChangeText={this.setEmail}
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="go"
          textContentType="emailAddress"
          onSubmitEditing={this.sendNPS}
        />
        <ButtonContainer>
          <ButtonPrimary content={sendButton} disabled={!useful || !reco} onPress={this.sendNPS} />
        </ButtonContainer>
      </>
    );
  }

  renderSecondPage() {
    const { feedback, sendButton, email } = this.state;
    return (
      <>
        <TopTitle>
          <TextStyled color="#4030a5">
            Merci !{'\u000A'}Pour améliorer notre service, avez-vous quelques recommandations à nous faire{'\u00A0'}?
          </TextStyled>
        </TopTitle>
        <TopSubTitle>
          <TextStyled color="#191919">
            Comment pouvons-nous vous être encore plus utile{'\u00A0'}? Comment pouvons-nous améliorer ce service
            {'\u00A0'}?
          </TextStyled>
        </TopSubTitle>
        <FeedBackStyled
          onChangeText={this.setFeedback}
          placeholder="Idées d'améliorations (facultatif)"
          value={feedback}
          multiline
          textAlignVertical="top"
          returnKeyType="next"
        />
        <TopSubTitle>
          <TextStyled color="#191919">
            Pourrions-nous vous contacter pour en discuter avec vous{'\u00A0'}? Si vous êtes d'accord, vous pouvez
            renseigner votre adresse email ci-dessous.
          </TextStyled>
        </TopSubTitle>
        <TextInputStyled
          value={email}
          ref={(r) => (this.emailInput = r)}
          placeholder="Adresse email (facultatif)"
          onChangeText={this.setEmail}
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="go"
          textContentType="emailAddress"
          onSubmitEditing={this.sendNPS}
        />
        <ButtonContainer>
          <ButtonPrimary disabled={sendButton === 'Merci !'} content={sendButton} onPress={this.sendNPS} />
        </ButtonContainer>
      </>
    );
  }

  render() {
    const { visible, page } = this.state;
    return (
      <Modal visible={visible} animationType="slide" onDismiss={this.onClose}>
        <SafeAreaProvider>
          <Background color="#f9f9f9">
            <Container>
              <KeyboardAvoidingViewStyled
                behavior={Platform.select({ ios: 'padding', android: null })}
                keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
                <ScreenBgStyled>
                  <CloseNPS>
                    <UnderlinedButton content="Fermer" bold onPress={this.onClose} />
                  </CloseNPS>
                  {page === 1 && this.renderFirstPage()}
                  {page === 2 && this.renderSecondPage()}
                </ScreenBgStyled>
              </KeyboardAvoidingViewStyled>
            </Container>
          </Background>
        </SafeAreaProvider>
      </Modal>
    );
  }
}

NPS.propTypes = {
  userIdLocalStorageKey: PropTypes.string.isRequired,
  notifTitle: PropTypes.string,
  notifMessage: PropTypes.string,
};

NPS.defaultProps = {
  notifTitle: 'Vos retours sont importants pour nous',
  notifMessage: 'Avez-vous quelques secondes pour donner votre avis ?',
  userIdLocalStorageKey: CONSTANTS.STORE_KEY_USER_ID,
};

export default NPS;
