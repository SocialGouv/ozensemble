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
import { AnswersContainer, AnswerButton, AnswerContent } from '../../components/quizz/Question';

const formatText = (useful, feedback, contact, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Ce service vous a-t-il aidé à réduire votre consommation d'alcool : ${useful}
Pour améliorer notre application, avez-vous quelques recommandations à nous faire ? : ${feedback}
Contact: ${contact}
`;

const Inactivity_NPSScreen = ({ navigation }) => {
  const [useful, setUseful] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');
  const answers = [
    { answerKey: 'OZ_HELPED', content: "Oz m'a aidé mais je n'en ai plus besoin", score: 0 },
    { answerKey: 'LAKE_FEATURES', content: 'Il manque des fonctionnalités', score: 1 },
    { answerKey: 'USING_OTHER_APP', content: 'Je préfère une autre application', score: 2 },
    { answerKey: 'OTHER', content: "Oz ne m'a pas aidé", score: 3 },
  ];

  useEffect(() => {
    logEvent({
      category: 'INACTIVITY_NPS',
      action: 'INACTIVITY_NPS_OPEN',
    });
  }, []);
  console.log('INACTIVITY_NPS');
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
      category: 'INACTIVITY_NPS',
      action: 'INACTIVITY_NPS_SEND_USEFUL',
      value: useful,
    });
    if (feedback) {
      logEvent({
        category: 'INACTIVITY_NPS',
        action: 'INACTIVITY_NPS_SEND_FEEDBACK',
      });
    }
    await sendMail({
      subject: 'Inactivity 10 days NPS Addicto',
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
                  Dites nous pourquoi vous êtes partis, ça nous aidera à améliorer l’application
                </Text>
              </View>
              <View className="mt-8">
                <Text className="text-[#191919] text-base">Pourquoi n'utilisez-vous plus Oz ?</Text>
              </View>
              <AnswersContainer>
                {answers.map(({ answerKey, content }, i) => (
                  <AnswerButton
                    key={answerKey}
                    selected={answerKey === selectedAnswerKey}
                    last={i === answers.length - 1}>
                    <AnswerContent selected={answerKey === selectedAnswerKey}>{content}</AnswerContent>
                  </AnswerButton>
                ))}
              </AnswersContainer>
              <View className="mt-8">
                <Text className="text-[#191919] text-base">Qu'est-ce qui vous aurait fait-rester ? ?</Text>
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
              <View className="my-5 justify-center flex-row mb-36">
                <ButtonPrimary content={sendButton} onPress={sendNPS} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default Inactivity_NPSScreen;
