import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import API from "../../services/api";
import { storage } from "../../services/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    setValidEmail(emailRegex.test(text));
  };

  useEffect(() => {
    setIsButtonDisabled(!validEmail);
  }, [validEmail]);

  return (
    <SafeAreaView className="bg-[#3E309F] w-full h-full px-5">
      <KeyboardAvoidingView enabled behavior={Platform.select({ ios: "padding", android: null })}>
        <View className="flex px-10 space-y-10 mt-10 ">
          <Text className="text-start text-white text-2xl font-bold">Réinitialiser mon mot de passe</Text>

          <Text className="text-white text-sm">
            Renseignez ci-dessous l’adresse e-mail utilisée pour vous connecter à votre compte Oz.
          </Text>

          <View className="flex space-y-3">
            <Text className=" text-white text-lg font-bold">E-mail</Text>
            <TextInput
              placeholder="Renseignez votre adresse e-mail"
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
              className="bg-white rounded-md p-3"
              autoCorrect={false}
            />
          </View>
        </View>
        <View className="flex mt-10 items-center">
          <TouchableOpacity
            // onPress={signup}
            onPress={() => navigation.navigate("EMAIL_CONFIRMATION")}
            className={`rounded-full px-6 py-3 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
            disabled={isButtonDisabled}
          >
            <Text className="text-center text-white text-xl font-bold">Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
