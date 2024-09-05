import React, { useState, useEffect } from "react";
import { Path, Svg } from "react-native-svg";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChangeAccountModal = ({ navigation, route }) => {
  const isChangeEmail = route?.params?.from === "changeEmail";

  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(password.length === 0);
  }, [password]);

  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <View className="bg-white rounded-xl max-w-[90%] p-5">
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
              {isChangeEmail ? "Modifier l'e-mail" : "Supprimer mon compte"}
            </Text>
            <Text className=" text-start ">
              {isChangeEmail
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
                navigation.goBack();
              }}
            >
              <Text className="text-center text-white text-xl font-bold">
                {isChangeEmail ? "Valider" : "Confirmer la suppression"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeAccountModal;
