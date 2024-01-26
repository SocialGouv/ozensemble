import React, { useRef, useEffect, useState } from 'react';
import { Platform, Text, View, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pck from '../../../package.json';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';
import { logEvent } from '../../services/logEventsWithMatomo';
import { storage } from '../../services/storage';
import BackButton from '../../components/BackButton';
import { sendMail } from '../../services/mail';

const formatText = (answer, feedback, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Pourquoi n'utilisez-vous plus Oz ? : ${answer}
Qu'est-ce qui vous aurait fait-rester ? : ${feedback}
`;

const Inactivity_NPSScreen = ({ navigation }) => {
  const [selectedAnswerKey, setSelectedAnswerKey] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');
  const answers = [
    { answerKey: 'OZ_HELPED', content: "Oz m'a aidé mais je n'en ai plus besoin", score: 0 },
    { answerKey: 'LAKE_FEATURES', content: 'Il manque des fonctionnalités', score: 1 },
    { answerKey: 'USING_OTHER_APP', content: 'Je préfère une autre application', score: 2 },
    { answerKey: 'OTHER', content: 'Autre', score: 3 },
  ];

  useEffect(() => {
    logEvent({
      category: 'INACTIVITY_NPS',
      action: 'INACTIVITY_NPS_OPEN',
    });
  }, []);
  const onGoBackRequested = async () => {
    backRequestHandledRef.current = true;
    if (npsSent.current) return navigation.goBack();
    if (selectedAnswerKey !== null) await sendNPS();
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
      action: 'INACTIVITY_NPS_SEND_ANSWER',
      value: answers.find(({ answerKey }) => answerKey === selectedAnswerKey)?.score,
    });
    if (feedback) {
      logEvent({
        category: 'INACTIVITY_NPS',
        action: 'INACTIVITY_NPS_SEND_FEEDBACK',
      });
    }
    await sendMail({
      subject: 'Inactivity 10 days NPS Addicto',
      text: formatText(answers.find(({ answerKey }) => answerKey === selectedAnswerKey)?.content, feedback, userId),
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
              className="flex-shrink flex-grow mx-8 mt-3"
              keyboardShouldPersistTaps="never"
              keyboardDismissMode="none">
              <BackButton content="< Retour" bold onPress={onGoBackRequested} marginTop />
              <View className="mt-2">
                <Text className="text-[#4030A5] text-xl font-bold mt-3">
                  Dites nous pourquoi vous êtes partis, ça nous aidera à améliorer l’application
                </Text>
              </View>
              <View className="mt-8 mb-3">
                <Text className="text-[#4030A5] font-bold text-base">Pourquoi n'utilisez-vous plus Oz ?</Text>
              </View>
              <View className="bg-[#f9f9f9] flex-shrink grow-0 pr-2 border-transparent border-solid">
                {answers.map(({ answerKey, content }, i) => (
                  <TouchableOpacity
                    className={[
                      'w-full py-3 rounded-md pl-4 justify-center my-1',
                      answerKey === selectedAnswerKey
                        ? 'bg-[#5352a3] border-[#4030a5] '
                        : 'border border-[#E4E4E4] bg-gray-100',
                    ].join(' ')}
                    key={answerKey}
                    last={i === answers.length - 1}
                    onPress={() => {
                      setSelectedAnswerKey(answerKey);
                    }}>
                    <Text
                      className={['font-medium', answerKey === selectedAnswerKey ? 'text-white' : 'text-black'].join(
                        ' '
                      )}>
                      {content}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="mt-8">
                <Text className="text-[#4030A5] font-bold text-base">Qu'est-ce qui vous aurait fait-rester ?</Text>
              </View>
              <TextInput
                className="bg-[#f3f3f6] rounded-lg border h-32 border-[#dbdbe9] text-black mt-3 py-4 px-4"
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
