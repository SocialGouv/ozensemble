import React, { useState } from 'react';
import { Platform, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pck from '../../../package.json';
import Background from '../../components/Background';
import ButtonPrimary from '../../components/ButtonPrimary';

import { logEvent } from '../../services/logEventsWithMatomo';
import { storage } from '../../services/storage';

import BackButton from '../../components/BackButton';
import { sendMail } from '../../services/mail';

const formatText = (testimony, nickName, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Témoignage : ${testimony}
pseudo: ${nickName}
`;

const OwnTestimony = ({ navigation }) => {
  const [testimony, setTestimony] = useState('');
  const [nickName, setNickName] = useState('');
  const [sendButton, setSendButton] = useState('Envoyer');

  const sendTestimony = async () => {
    const userId = storage.getString('@UserIdv2');
    setSendButton('Merci !');
    logEvent({
      category: 'TESTIMONIES',
      action: 'TESTIMONY_SEND',
    });
    await sendMail({
      subject: 'Témoignage Oz Ensemble',
      text: formatText(testimony, nickName, userId),
    }).catch((err) => console.log('sendTestimony err', err));
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      {/* <StatusBar backgroundColor="#39cec0" barStyle="light-content" /> */}
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
              <BackButton content="< Retour" bold onPress={() => navigation.navigate('HEALTH_ARTICLE')} marginTop />
              <View className="mt-2">
                <Text className="text-[#4030A5] text-xl font-bold mt-3">Témoigner sur Oz Ensemble{'\n'}</Text>
              </View>
              <View className="mt-2">
                <Text className="text-[#191919] text-base">
                  Vous souhaitez partager votre histoire et vos motivations avec les autres utilisateurs de Oz Ensemble
                  ?{'\n'}Rédigez votre témoignage, et nous le partagerons anonymement sur l’application.
                </Text>
              </View>
              <TextInput
                className="bg-[#f3f3f6] rounded-lg border h-48 border-[#dbdbe9] text-black mt-3 py-4 px-3"
                onChangeText={setTestimony}
                placeholder="Votre témoignage"
                value={testimony}
                multiline
                textAlignVertical="top"
                returnKeyType="next"
                placeholderTextColor="#c9c9cc"
              />
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  Ajoutez un pseudonyme à votre témoignage si vous le souhaitez
                </Text>
              </View>
              <TextInput
                className="bg-[#f3f3f6] rounded-lg border border-[#dbdbe9] text-black mb-8 mt-3 py-4 px-3"
                value={nickName}
                placeholder="Votre pseudo (facultatif)"
                onChangeText={setNickName}
                autoCorrect={false}
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="go"
                textContentType="nickname"
                placeholderTextColor="#c9c9cc"
              />
              <View className="my-5 justify-center flex-row mb-36">
                <ButtonPrimary content={sendButton} disabled={!testimony} onPress={sendTestimony} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default OwnTestimony;
