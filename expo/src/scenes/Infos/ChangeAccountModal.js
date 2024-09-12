import React, { useState, useEffect } from "react";
import { Path, Svg } from "react-native-svg";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import API from "../../services/api";
import { storage } from "../../services/storage";

const ChangeAccountModal = ({ navigation, route }) => {
  const email = route?.params?.email;

  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(password.length === 0);
  }, [password]);

  const modifyEmail = async () => {
    API.post({
      path: "/user/update",
      body: {
        password,
        email,
      },
    }).then((response) => {
      if (response.ok) {
        if (response.token) API.setToken(response.token);
        storage.set("@User", email).then(() => {
          alert("Votre adresse e-mail a bien été modifiée");
        });
      } else {
        alert("Erreur lors de la modification de l'adresse e-mail");
      }
    });
  };

  const deleteAccount = async () => {
    const user = storage.getString("@User");
    API.post({
      path: "/user/delete",
      body: {
        password,
        email: user,
      },
    }).then((response) => {
      if (response.ok) {
        storage.clearAll();
        API.setToken(null);
        navigation.popToTop();
      } else {
        alert("Erreur lors de la suppression du compte");
      }
    });
  };

  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <KeyboardAvoidingView enabled behavior={Platform.select({ ios: "padding", android: null })}>
        <View
          className="bg-white rounded-xl max-w-[90%] p-5"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"
          keyboardDismissMode="none"
        >
          <View className="h-5 flex flex-row  justify-end">
            <TouchableOpacity
              hitSlop={hitSlop(15)}
              onPress={() => {
                navigation.navigate("CRAVING", { screen: "CRAVING_STRATEGIES" });
              }}
            >
              <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  stroke="black"
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col justify-center">
            <View className="flex w-full   items-start space-y-4 flex-col">
              <Text className="text-start  text-xl  font-extrabold text-[#4030A5] ">
                {email ? "Modifier l'e-mail" : "Supprimer mon compte"}
              </Text>
              <Text className=" text-start ">
                {email
                  ? "Afin de confirmer la modification de l’adresse e-mail du compte, veuillez saisir votre mot de passe ci-dessous."
                  : "Afin de confirmer la suppression de votre compte, veuillez saisir votre mot de passe ci-dessous."}
              </Text>
              <View className="flex flex-col items-start">
                <Text className=" text-black text-lg font-semibold mb-2">Mot de passe</Text>
                <View className="bg-white rounded-md p-3 mb-4 flex flex-row items-center border border-gray-300">
                  <TextInput
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={hidePassword}
                    className="flex-1"
                  />
                  <TouchableOpacity className="absolute right-2" onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ? (
                      <MaterialCommunityIcons name="eye-outline" size={24} color="#3E309F" />
                    ) : (
                      <MaterialCommunityIcons name="eye-off-outline" size={24} color="#3E309F" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="flex mt-6 items-center">
              <TouchableOpacity
                className={`rounded-full px-5 py-2 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
                onPress={() => {
                  if (!email) {
                    console.log("delete account");
                    deleteAccount();
                    return;
                  }
                  modifyEmail();
                  navigation.goBack();
                }}
              >
                <Text className="text-center text-white text-xl font-bold">
                  {email ? "Valider" : "Confirmer la suppression"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangeAccountModal;
