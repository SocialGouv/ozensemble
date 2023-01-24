import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Alert, Dimensions, Platform, StatusBar } from 'react-native';
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

const formatText = (useful, feedback, contact, userId, forDefi, triggeredFrom) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Appelé depuis: ${triggeredFrom}
${forDefi ? `Défi: ${forDefi}` : ''}
${forDefi ? 'Ce défi vous a-t-il été utile' : 'Ce service vous a-t-il été utile'}: ${useful}
Pour améliorer notre application, avez-vous quelques recommandations à nous faire ? : ${feedback}
Contact: ${contact}
`;

const NPSTimeoutMS = 1000 * 60 * 60 * 24 * 7;
const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
const isPhoneNumber = (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);

export const useCheckNeedNPS = (
  notifTitle = 'Vos retours sont importants pour nous',
  notifMessage = 'Avez-vous quelques secondes pour donner votre avis ?'
) => {
  const navigation = useNavigation();

  const checkNeedNPS = () => {
    const NPSDone = storage.getString('@NPSDone');

    if (NPSDone) {
      NotificationService.cancelAll();
      return false;
    }

    const appFirstOpening = storage.getString('@NPSInitialOpening');
    if (!appFirstOpening) {
      storage.set('@NPSInitialOpening', new Date().toISOString());
      const NPSNotificationDate = new Date(Date.now() + NPSTimeoutMS);
      NotificationService.scheduleNotification({
        date: NPSNotificationDate,
        title: notifTitle,
        message: notifMessage,
      });
      storage.set('@NPSNotificationDate', Math.round(NPSNotificationDate.getTime() / 1000) * 1000);
      return false;
    }
    const opening = storage.getString('@NPSInitialOpening');
    const timeForNPS = Date.now() - Date.parse(new Date(opening)) > NPSTimeoutMS;
    if (!timeForNPS) return;
    navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Automatic after 7 days' });
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
      if (JSON.stringify(notification).includes(notifTitle) || JSON.stringify(notification).includes(notifMessage)) {
        navigation.navigate('NPS_SCREEN', { triggeredFrom: Platform.OS });
      } else {
        // BUG ON iOS: we can't retrieve notification title or message
        // so we use a workaround to check if the notification is the one we want
        if (notification.fireDate === storage.getNumber('@NPSNotificationDate')) {
          navigation.navigate('NPS_SCREEN', { triggeredFrom: Platform.OS });
        }
      }
      notification.finish();
    };
    const unsubscribe = NotificationService.subscribe(handleNotification);
    NotificationService.getInitNotification();
    return unsubscribe;
  }, [notifMessage, notifTitle, navigation]);
};

const NPSScreen = ({ navigation, route }) => {
  const forDefi = route.params?.forDefi;
  const triggeredFrom = route.params?.triggeredFrom;

  const [useful, setUseful] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
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
    if (useful !== null) await sendNPS();
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
    if (contact.length && !isPhoneNumber(contact) && !isEmail(contact)) {
      Alert.alert('Adresse email ou numéro de téléphone non valide');
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
    await sendMail({
      subject: forDefi ? `NPS Addicto Défi ${forDefi}` : 'NPS Addicto',
      text: formatText(useful, feedback, contact, userId, forDefi, triggeredFrom),
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
                  Contribuer à Oz Ensemble{'\n'}
                  {forDefi
                    ? "Vos retours sur ce défi nous permettront d'améliorer l'application\u00A0!"
                    : 'Nous lisons tous vos messages'}
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
                    ? 'Comment pouvons-nous améliorer ce défi'
                    : 'Pour améliorer notre application, avez-vous quelques recommandations à nous faire'}
                  {'\u00A0'}?
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
              <TopSubTitle>
                <TextStyled color="#191919">
                  Échanger avec vous serait précieux pour améliorer notre service, laissez-nous votre numéro de
                  téléphone ou votre mail si vous le souhaitez.
                </TextStyled>
              </TopSubTitle>
              <ContactTextInput
                value={contact}
                placeholder="Numéro de téléphone ou adresse mail (facultatif)"
                onChangeText={setContact}
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="go"
                textContentType="emailAddress"
                onSubmitEditing={sendNPS}
                placeholderTextColor="#c9c9cc"
                onBlur={() => StatusBar.setHidden(false, 'none')}
              />
              <ButtonContainer>
                <ButtonPrimary content={sendButton} disabled={forDefi ? !useful : !useful} onPress={sendNPS} />
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
