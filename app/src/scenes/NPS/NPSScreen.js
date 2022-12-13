import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Dimensions, Alert, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pck from '../../../package.json';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import TextInputStyled from '../../components/TextInputStyled';
import { logEvent } from '../../services/logEventsWithMatomo';
import NotificationService from '../../services/notifications';
import Mark from './Mark';
import { storage } from '../../services/storage';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import BackButton from '../../components/BackButton';
import { sendMail } from '../../services/mail';
import useAppState from '../../services/useAppState';

// just to make sure nothing goes the bad way in production, debug is always false

const formatText = (useful, reco, feedback, email, phone, userId, forDefi, triggeredFrom) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Appelé depuis: ${triggeredFrom}
${forDefi ? `Défi: ${forDefi}` : ''}
${forDefi ? 'Ce défi vous a-t-il été utile' : 'Ce service vous a-t-il été utile'}: ${useful}
Comment pouvons-nous vous être encore plus utile: ${feedback}
${reco ? `Quelle est la probabilité que vous recommandiez ce service à un ami ou un proche: ${reco}` : ''}
Email: ${email}
Téléphone: ${phone}
`;

const NPSTimeoutMS = __DEV__ ? 1000 * 3 : 1000 * 60 * 60 * 24 * 3;
const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);

export const useCheckNeedNPS = (
  notifTitle = 'Vos retours sont importants pour nous',
  notifMessage = 'Avez-vous quelques secondes pour donner votre avis ?'
) => {
  const navigation = useNavigation();

  const checkNeedNPS = () => {
    const NPSDone = storage.getString('@NPSDone');

    if (NPSDone) return false;

    const appFirstOpening = storage.getString('@NPSInitialOpening');
    if (!appFirstOpening) {
      storage.set('@NPSInitialOpening', new Date().toISOString());
      NotificationService.scheduleNotification({
        date: new Date(Date.now() + NPSTimeoutMS),
        title: notifTitle,
        message: notifMessage,
      });
      return false;
    }
    const opening = storage.getString('@NPSInitialOpening');
    const timeForNPS = Date.now() - Date.parse(new Date(opening)) > NPSTimeoutMS;
    if (!timeForNPS) return;
    navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Automatic after 3 days' });
  };

  useAppState({
    isActive: checkNeedNPS,
  });

  useEffect(() => {
    // if (__DEV__) {
    //   storage.delete('@NPSDone'); // useful in dev mode
    //   storage.delete('@NPSInitialOpening'); // useful in dev mode
    // }
    checkNeedNPS();
  }, []);
};

export const useNPSNotif = (
  notifTitle = 'Vos retours sont importants pour nous',
  notifMessage = 'Avez-vous quelques secondes pour donner votre avis ?'
) => {
  const navigation = useNavigation();
  useEffect(() => {
    const handleNotification = (notification) => {
      const NPSDone = storage.getString('@NPSDone');
      if (NPSDone) return;
      if (Platform.OS === 'android') {
        if (notification.title === notifTitle) {
          navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Android notif' });
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
        if (notification.message === notifMessage) {
          navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Ios notif' });
        }
      }
      notification.finish();
    };
    const unsubscribe = NotificationService.subscribe(handleNotification);
    return unsubscribe;
  }, [notifMessage, notifTitle, navigation]);
};

const NPSScreen = ({ navigation, route }) => {
  const forDefi = route.params?.forDefi;
  const triggeredFrom = route.params?.triggeredFrom;

  const [useful, setUseful] = useState(null);
  const [reco, setReco] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');

  // componentDidUpdate(prevProps, prevState) {
  //   if (!prevProps.forceView && .props.forceView && !.state.visible) {
  //     .setState({ visible: true });
  //   }
  //   if (prevState.visible && !.state.visible) {
  //     if (.props.close) {
  //       .props.close();
  //     }
  //     .npsSent = false;
  //   }
  // }

  useEffect(() => {
    logEvent({
      category: 'NPS',
      action: 'NPS_OPEN',
    });
    storage.set('@NPSDone', 'true');
  }, []);

  const onGoBackRequested = async () => {
    backRequestHandledRef.current = true;
    if (npsSent.current) return navigation.goBack();
    if (useful !== null || reco !== null) await sendNPS();
    navigation.goBack();
  };

  const backRequestHandledRef = useRef(null);
  const handleBeforeRemove = (e) => {
    if (backRequestHandledRef.current === true) return;
    e.preventDefault();
    onGoBackRequested();
  };

  useEffect(() => {
    const beforeRemoveListenerUnsbscribe = navigation.addListener('beforeRemove', handleBeforeRemove);
    return () => {
      beforeRemoveListenerUnsbscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const npsSent = useRef(false);
  const sendNPS = async () => {
    if (npsSent.current) return;
    if (email.length && !emailFormat(email)) {
      Alert.alert('Adresse email non valide');
      return;
    }
    const userId = storage.getString('@UserIdv2');
    setSendButton('Merci !');
    logEvent({
      category: 'NPS',
      action: 'NPS_SEND',
      name: 'notes-useful',
      value: useful,
    });
    logEvent({
      category: 'NPS',
      action: 'NPS_SEND',
      name: 'notes-reco',
      value: reco,
    });
    await sendMail({
      subject: forDefi ? `NPS Addicto Défi ${forDefi}` : 'NPS Addicto',
      text: formatText(useful, reco, feedback, email, phone, userId, forDefi, triggeredFrom),
    })
      .then((res) => res.json())
      .catch((err) => console.log('sendNPS err', err));

    npsSent.current = true;
    StatusBar.setHidden(false, 'none');
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#39cec0" barStyle="light-content" />
      <Background color="#f9f9f9">
        <Container>
          <KeyboardAvoidingViewStyled
            behavior={Platform.select({ ios: 'padding', android: null })}
            keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
            <ScreenBgStyled defaultPadding>
              <BackButton content="< Retour" bold onPress={onGoBackRequested} marginTop />
              <TopTitle>
                <TextStyled color="#4030a5">
                  5 secondes pour nous aider{'\u00A0'}?{'\u000A'}
                  {forDefi
                    ? "Vos retours sur ce défi nous permettront d'améliorer l'application. Merci d'avance\u00A0!"
                    : 'Vos retours sont importants pour nous.'}
                </TextStyled>
              </TopTitle>
              <TopSubTitle>
                <TextStyled color="#191919">
                  {forDefi ? 'Ce défi vous a-t-il été utile' : 'Ce service vous a-t-il été utile'}
                  {'\u00A0'}?
                </TextStyled>
              </TopSubTitle>
              <Mark selected={useful} onPress={setUseful} bad="Pas utile du tout" good="Extrêmement utile" />
              <TopSubTitle>
                <TextStyled color="#191919">
                  {forDefi
                    ? 'Comment pouvons-nous améliorer ce défi\u00A0?'
                    : 'Comment pouvons-nous vous être encore plus utile\u00A0? Comment pouvons-nous améliorer ce service\u00A0?'}
                </TextStyled>
              </TopSubTitle>
              <FeedBackStyled
                onChangeText={setFeedback}
                placeholder="Idées d'améliorations (facultatif)"
                value={feedback}
                multiline
                textAlignVertical="top"
                returnKeyType="next"
                placeholderTextColor="#c9c9cc"
              />
              {!forDefi && (
                <>
                  <TopSubTitle>
                    <TextStyled color="#191919">
                      Quelle est la probabilité que vous recommandiez ce service à un ami ou un proche
                      {'\u00A0'}?
                    </TextStyled>
                  </TopSubTitle>
                  <Mark selected={reco} onPress={setReco} bad="Pas du tout probable" good="Très probable" />
                </>
              )}
              <TopSubTitle>
                <TextStyled color="#191919">
                  Pourrions-nous vous contacter pour en discuter avec vous{'\u00A0'}? Si vous êtes d’accord, vous pouvez
                  renseigner votre adresse email ou votre numéro de téléphone ci-dessous.
                </TextStyled>
              </TopSubTitle>
              <ContactTextInput
                value={email}
                placeholder="Adresse email (facultatif)"
                onChangeText={setEmail}
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="go"
                textContentType="emailAddress"
                onSubmitEditing={sendNPS}
                placeholderTextColor="#c9c9cc"
                onBlur={() => StatusBar.setHidden(false, 'none')}
              />
              <ContactTextInput
                value={phone}
                placeholder="Téléphone (facultatif)"
                onChangeText={setPhone}
                autoComplete="tel"
                autoCorrect={false}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                returnKeyType="send"
                onSubmitEditing={sendNPS}
                placeholderTextColor="#c9c9cc"
                onBlur={() => StatusBar.setHidden(false, 'none')}
              />
              <ButtonContainer>
                <ButtonPrimary content={sendButton} disabled={forDefi ? !useful : !useful || !reco} onPress={sendNPS} />
              </ButtonContainer>
            </ScreenBgStyled>
          </KeyboardAvoidingViewStyled>
        </Container>
      </Background>
    </SafeAreaProvider>
  );
};

const Container = styled.View`
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;

const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
  min-height: 100%;
`;

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const TopTitle = styled(H2)`
  ${commonCss}
  margin-top: 10px;
`;

const TopSubTitle = styled(H3)`
  ${commonCss}
  margin-top: 35px;
`;

const FeedBackStyled = styled(TextInputStyled)`
  width: 100%;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #dbdbe9;
  background-color: #f3f3f6;
  border-radius: 7px;
  padding: 15px;
  margin-top: 15px;
  justify-content: flex-start;
  align-items: flex-start;
  color: #4030a5;
`;

const ButtonContainer = styled.View`
  margin-vertical: 20px;
  align-items: flex-start;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  margin-left: -${defaultPaddingFontScale()}px;
  width: ${screenWidth}px;
  margin-bottom: 150px;
`;

const ContactTextInput = styled(TextInputStyled)`
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

export default NPSScreen;
