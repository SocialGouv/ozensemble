import React, { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Image, View, TextInput, TouchableOpacity, Text } from "react-native";
import Wave from "../../components/illustrations/onboarding/Wave";
import { screenWidth } from "../../styles/theme";
import API from "../../services/api";
import { storage } from "../../services/storage";
import { initMatomo } from "../../services/logEventsWithMatomo";

const SignupScreen = ({ navigation }) => {
  const matomoId = storage.getString("@UserIdv2");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    initMatomo(email, password);
    const matomoId = storage.getString("@UserIdv2");
    const response = await API.post("user/signup", {
      matomoId,
      email,
      password,
    });
    if (response.ok) {
      storage.set("@Email", email);
      storage.set("@Token", response.token);
      navigation.push("WELCOME_SWIPER");
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[10%] " />
      <View className="h-[60%] px-5 justify-center">
        <View className="flex-1 items-center py-6 max-h-56">
          <Image source={require("../../assets/images/Icon.png")} resizeMode="contain" className="h-full w-full" />
        </View>
        <View>
          <Text className=" text-white text-lg font-bold mb-8">Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="bg-white rounded-lg p-2 mb-4"
          />
          <Text className=" text-white text-lg font-bold mb-8">Mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            className="bg-white rounded-lg p-2 mb-4"
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.push("FORGOT_PASSWORD")}>
            <Text className=" text-white text-xl font-bold mb-1">Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-[30%] pb-12 justify-end items-center">
        <View className="absolute -bottom-0">
          <Wave size={screenWidth} />
        </View>
        <ButtonPrimary
          className=""
          content="Se connecter"
          AnimationEffect
          onPress={() => {
            signup();
          }}
        />
        <TouchableOpacity onPress={() => navigation.push("SIGNUP")}>
          <Text className="text-center text-white text-xl font-bold mb-1">Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
