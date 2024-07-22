import React, { useState, useEffect } from "react";
import { Platform, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Background from "../../components/Background";
import ButtonPrimary from "../../components/ButtonPrimary";
import { myMotivationState } from "../../recoil/gains";
import BackButton from "../../components/BackButton";
import H1 from "../../components/H1";
import { useRecoilState } from "recoil";
import { logEvent } from "../../services/logEventsWithMatomo";

// just to make sure nothing goes the bad way in production, debug is always false

const MyMotivations = ({ navigation }) => {
  const [motivation, setMotivation] = useRecoilState(myMotivationState);
  const [initialMotivation, setInitialMotivation] = useState([...motivation]);

  useEffect(() => {
    setInitialMotivation([...motivation]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sendMotivation = () => {
    if (JSON.stringify(motivation) !== JSON.stringify(initialMotivation)) {
      const filteredMotivation = motivation.filter((m) => m.trim() !== "");
      logEvent({
        category: "CRAVING",
        action: "CHANGED_MY_MOTIVATIONS",
        name: filteredMotivation.length,
      });
    }
    navigation.goBack();
  };

  const handleMotivationChange = (index, value) => {
    const newMotivation = [...motivation];
    newMotivation[index] = value;
    setMotivation(newMotivation);
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen">
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.select({ ios: "padding", android: null })}
            keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-shrink flex-grow mx-6 mt-3"
              keyboardShouldPersistTaps="never"
              keyboardDismissMode="none">
              <BackButton content="< Retour" bold onPress={navigation.goBack} marginTop />
              <View className="mt-2">
                <H1>Mes motivations</H1>
              </View>
              <View className="mt-8">
                <Text className="text-[#191919] text-lg font-bold">
                  Quelles sont vos motivations ?
                </Text>
                <Text className="text-gray-500 text-base italic mb-4">
                  Décrire vos motivations à maîtriser votre consommation
                </Text>
              </View>
              {["1ère motivation", "2ème motivation", "3ème motivation"].map((title, index) => (
                <View key={index} className="mt-8">
                  <Text className="text-[#191919] text-base font-bold">{title}</Text>
                  <TextInput
                    className="bg-[#f3f3f6] rounded-lg border border-[#dbdbe9] text-black mt-2 py-4 px-3"
                    onChangeText={(value) => handleMotivationChange(index, value)}
                    placeholder={`Décrire ma motivation`}
                    value={motivation[index]}
                    multiline
                    textAlignVertical="top"
                    returnKeyType="next"
                    placeholderTextColor="#c9c9cc"
                  />
                </View>
              ))}
              <View className="justify-center flex-row pt-16">
                <ButtonPrimary
                  content={"Valider"}
                  disabled={!motivation.some((m) => m)}
                  onPress={sendMotivation}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default MyMotivations;
