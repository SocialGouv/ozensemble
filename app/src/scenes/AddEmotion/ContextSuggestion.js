import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { View, TextInput, Text, Dimensions, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pck from '../../../package.json';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextInputStyled from '../../components/TextInputStyled';
import { logEvent } from '../../services/logEventsWithMatomo';
import { storage } from '../../services/storage';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import BackButton from '../../components/BackButton';
import { sendMail } from '../../services/mail';
import API from '../../services/api';

// just to make sure nothing goes the bad way in production, debug is always false

const formatText = (context, userId, triggeredFrom) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Appelé depuis: ${triggeredFrom}
Demandez à ce qu'il soit ajouté à la liste : ${context}
`;

const NPSTimeoutMS = 1000 * 60 * 60 * 24 * 7;

const ContextSuggestion = ({ navigation, route }) => {
  const triggeredFrom = route.params?.triggeredFrom;
  const [context, setContext] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');

  useEffect(() => {
    logEvent({
      category: 'MAIL_CONTEXT',
      action: 'OTHER_OPEN',
    });
    const matomoId = storage.getString('@UserIdv2');
    API.post({
      path: '/appUserMilestone',
      body: {
        matomoId,
        appUserMilestone: '@NPSDone',
      },
    });
    storage.set('@NPSDone', 'true');
  }, []);

  const onGoBackRequested = async () => {
    backRequestHandledRef.current = true;
    if (contextSent.current) return navigation.goBack();
    navigation.goBack();
  };

  const backRequestHandledRef = useRef(null);
  const handleBeforeRemove = (e) => {
    if (backRequestHandledRef.current === true) return;
    e.preventDefault();
    onGoBackRequested();
  };

  useEffect(() => {
    const beforeRemoveListenerUnsubscribe = navigation.addListener('beforeRemove', handleBeforeRemove);
    return () => {
      beforeRemoveListenerUnsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextSent = useRef(false);
  const sendContext = async () => {
    if (contextSent.current) return;
    const userId = storage.getString('@UserIdv2');
    setSendButton('Merci !');
    logEvent({
      category: 'SUGGESTION_CONTEXT',
      action: 'CONTEXT_SENT',
    });
    await sendMail({
      subject: 'Context suggestion',
      text: formatText(context, userId, triggeredFrom),
    })
      .then((res) => res.json())
      .catch((err) => console.log('sendContext err', err));

    contextSent.current = true;
    StatusBar.setHidden(false, 'none');
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor="light-gray" barStyle="light-content" />
      <View className="bg-gray-500">
        <Text className="text-[#4030A5] self-center font-bold">Vous pensez à un autre besoin ?</Text>
        <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
          <TextInput
            className="bg-white rounded-lg border border-[#E4E4E4] mr-2 mt-2 mb-2 ml-2 py-4 px-3"
            placeholder="Context de consommation"
            keyboardType="decimal-pad"
            value={context}
            onChangeText={setContext}
          />
        </View>
        <ButtonPrimary content={sendButton} onPress={sendContext} />
      </View>
    </>
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

export default ContextSuggestion;
