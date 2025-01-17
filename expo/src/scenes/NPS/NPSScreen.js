import React, { useRef, useEffect, useState } from "react";
import { Platform, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import pck from "../../../package.json";
import Background from "../../components/Background";
import ButtonPrimary from "../../components/ButtonPrimary";

import { logEvent } from "../../services/logEventsWithMatomo";
import NotificationService from "../../services/notifications";
import Mark from "./Mark";
import { storage } from "../../services/storage";

import BackButton from "../../components/BackButton";
import H1 from "../../components/H1";
import { sendMail } from "../../services/mail";
import useAppState from "../../services/useAppState";
import API from "../../services/api";

// just to make sure nothing goes the bad way in production, debug is always false

const formatText = (useful, feedback, contact, userId, forDefi, triggeredFrom) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Appelé depuis: ${triggeredFrom}
${forDefi ? `Défi: ${forDefi}` : ""}
${forDefi ? "Ce défi vous a-t-il été utile" : "Ce service vous a-t-il été utile"}: ${useful}
Pour améliorer notre application, avez-vous quelques recommandations à nous faire ? : ${feedback}
Contact: ${contact}
`;

const NPSTimeoutMS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const useCheckNeedNPS = (
  notifTitle = "Vos retours sont importants pour nous",
  notifMessage = "Avez-vous quelques secondes pour donner votre avis ?"
) => {
  const navigation = useNavigation();

  const checkNeedNPS = () => {
    const NPSDone = storage.getString("@NPSDone");

    if (NPSDone) {
      NotificationService.cancelAll();
      return false;
    }

    const appHasAlreadyOpenedOnce = storage.getString("@NPSInitialOpening");
    if (!appHasAlreadyOpenedOnce) {
      storage.set("@NPSInitialOpening", new Date().toISOString());
      const NPSNotificationDate = new Date(Date.now() + NPSTimeoutMS);
      NotificationService.scheduleLocalAlarm({
        date: NPSNotificationDate,
        title: notifTitle,
        message: notifMessage,
      });
      storage.set("@NPSNotificationDate", Math.round(NPSNotificationDate.getTime() / 1000) * 1000);
      return false;
    }
    const opening = storage.getString("@NPSInitialOpening");
    const timeForNPS = Date.now() - Date.parse(new Date(opening)) > NPSTimeoutMS;
    if (!timeForNPS) return;
    navigation.navigate("NPS_SCREEN", { triggeredFrom: "Automatic after 7 days" });
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
  });
};

export const useNPSNotif = (
  notifTitle = "Vos retours sont importants pour nous",
  notifMessage = "Avez-vous quelques secondes pour donner votre avis ?"
) => {
  const navigation = useNavigation();
  useEffect(() => {
    const handleNotification = (notification) => {
      console.log("handleNotification", notification);
      const NPSDone = storage.getString("@NPSDone");
      if (NPSDone) return;
      if (JSON.stringify(notification).includes(notifTitle) || JSON.stringify(notification).includes(notifMessage)) {
        navigation.navigate("NPS_SCREEN", { triggeredFrom: Platform.OS });
      } else {
        // BUG ON iOS: we can't retrieve notification title or message
        // so we use a workaround to check if the notification is the one we want
        if (notification.fireDate === storage.getNumber("@NPSNotificationDate")) {
          navigation.navigate("NPS_SCREEN", { triggeredFrom: Platform.OS });
        }
      }
      notification.finish?.();
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
  const [feedback, setFeedback] = useState("");
  const [contact, setContact] = useState("");
  const [sendButton, setSendButton] = useState("Envoyer");

  useEffect(() => {
    logEvent({
      category: "NPS",
      action: "NPS_OPEN",
    });
    const matomoId = storage.getString("@UserIdv2");
    API.post({
      path: "/appMilestone",
      body: {
        matomoId,
        appMilestone: "@NPSDone",
      },
    });
    storage.set("@NPSDone", "true");
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
    const beforeRemoveListenerUnsbscribe = navigation.addListener("beforeRemove", handleBeforeRemove);
    return () => {
      beforeRemoveListenerUnsbscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const npsSent = useRef(false);
  const sendNPS = async () => {
    if (npsSent.current) return;
    const userId = storage.getString("@UserIdv2");
    setSendButton("Merci !");
    logEvent({
      category: "NPS",
      action: "NPS_SEND",
      name: "notes-useful",
      value: useful,
    });
    logEvent({
      category: "NPS",
      action: "NPS_SEND_TRIGGERED_FROM",
      name: triggeredFrom,
    });
    if (feedback) {
      logEvent({
        category: "NPS",
        action: "NPS_SEND_FEEDBACK",
      });
    }
    await sendMail({
      subject: forDefi ? `NPS Addicto Défi ${forDefi}` : "NPS Addicto",
      text: formatText(useful, feedback, contact, userId, forDefi, triggeredFrom),
    }).catch((err) => console.log("sendNPS err", err));

    npsSent.current = true;
    // StatusBar.setHidden(false, 'none');
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      {/* <StatusBar backgroundColor="#39cec0" barStyle="light-content" /> */}
      <Background color="#f9f9f9">
        <View className="h-full w-screen">
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.select({ ios: "padding", android: null })}
            keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-shrink flex-grow mx-6 mt-3"
              keyboardShouldPersistTaps="never"
              keyboardDismissMode="none"
            >
              <BackButton content="< Retour" bold onPress={onGoBackRequested} marginTop />
              <View className="mt-2">
                <H1>
                  Contribuer à Oz Ensemble{"\n"}
                  {forDefi
                    ? "Vos retours sur cette activité nous permettront d'améliorer l'application\u00A0!"
                    : "Nous lisons tous vos messages"}
                </H1>
              </View>
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  {forDefi ? "Cette activité vous a-t-elle été utile" : "Ce service vous a-t-il été utile"}
                  {"\u00A0"}?
                </Text>
              </View>
              <Mark selected={useful} onPress={setUseful} bad="Pas utile du tout" good="Extrêmement utile" />
              <View className="mt-8">
                <Text className="text-[#191919] text-base">
                  {forDefi
                    ? "Comment pouvons-nous améliorer cette activité"
                    : "Pour améliorer notre application, avez-vous quelques recommandations à nous faire"}
                  {"\u00A0"}?
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
                // onBlur={() => StatusBar.setHidden(false, 'none')}
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

export default NPSScreen;
