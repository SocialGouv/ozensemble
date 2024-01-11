import React, { useRef, useEffect, useState } from 'react';
import { Platform, Text, View, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pck from '../../../package.json';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import { logEvent } from '../../services/logEventsWithMatomo';
import Mark from './Mark';
import { storage } from '../../services/storage';
import BackButton from '../../components/BackButton';
import { sendMail } from '../../services/mail';

const formatText = (useful, feedback, contact, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Ce service vous a-t-il aidé à réduire votre consommation d'alcool : ${useful}
Pour améliorer notre application, avez-vous quelques recommandations à nous faire ? : ${feedback}
Contact: ${contact}
`;

const Super_NPSScreen = ({ navigation }) => {
  const [useful, setUseful] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');

  useEffect(() => {
    logEvent({
      category: 'SUPER_NPS',
      action: 'SUPER_NPS_OPEN',
    });
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
    const userId = storage.getString('@UserIdv2');
    setSendButton('Merci !');
    logEvent({
      category: 'SUPER_NPS',
      action: 'SUPER_NPS_SEND',
      name: 'notes-useful',
      value: useful,
    });
    await sendMail({
      subject: 'Super User NPS Addicto',
      text: formatText(useful, feedback, contact, userId),
    }).catch((err) => console.log('sendNPS err', err));

    npsSent.current = true;
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen">
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.select({ ios: 'padding', android: null })}
            keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-shrink flex-grow mx-6 mt-3"
              keyboardShouldPersistTaps="never"
              keyboardDismissMode="none">
              <BackButton content="< Retour" bold onPress={onGoBackRequested} marginTop />
              <View className="mt-2">
                <Text className="text-[#4030A5] text-xl font-bold mt-3">
                  Merci pour vos retours !{'\n'}
                  Nous lisons tous vos messages
                </Text>
              </View>
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  L'application Oz vous a-t-elle aidée à réduire votre consommation d'alcool ?
                </Text>
              </View>
              <Mark selected={useful} onPress={setUseful} bad="Pas utile du tout" good="Extrêmement utile" />
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  Pour améliorer notre application, avez-vous quelques recommandations à nous faire ?
                </Text>
              </View>
              <TextInput
                className="bg-[#f3f3f6] rounded-lg border h-24 border-[#dbdbe9] text-black mt-3 py-4 px-3"
                onChangeText={setFeedback}
                placeholder="Idées d'améliorations (facultatif)"
                value={feedback}
                multiline
                textAlignVertical="top"
                returnKeyType="next"
                placeholderTextColor="#c9c9cc"
              />
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  Échanger avec vous serait précieux pour améliorer notre service, laissez-nous votre numéro de
                  téléphone ou votre mail si vous le souhaitez.
                </Text>
              </View>
              <TextInput
                className="bg-[#f3f3f6] rounded-lg border border-[#dbdbe9] text-black mb-8 mt-3 py-4 px-3"
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
              />
              <View className="my-5 justify-center flex-row mb-36">
                <ButtonPrimary content={sendButton} disabled={!useful} onPress={sendNPS} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default Super_NPSScreen;
