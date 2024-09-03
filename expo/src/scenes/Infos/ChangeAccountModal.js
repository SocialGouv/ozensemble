import React, { useState, useEffect } from "react";
import { Path, Svg } from "react-native-svg";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChangeAccountModal = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(password.length === 0);
  }, [password]);

  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className="flex flex-row justify-center mt-4 mb-2 mx-4">
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
          <View className="flex w-full px-2 my-8 items-center">
            <Text className="text-start  text-xl px-2 font-extrabold text-[#4030A5] ">Modifier l'e-mail</Text>
            <Text className=" text-center px-2 font-semibold">
              Afin de confirmer la modification de l’adresse e-mail du compte, veuillez saisir votre mot de passe
              ci-dessous.
            </Text>
            <Text className=" text-white text-lg font-semibold mb-2">Mot de passe</Text>
            <View className="bg-white rounded-md p-3 mb-4 flex flex-row items-center">
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
          <View className="flex mt-10 items-center">
            <TouchableOpacity
              className={`rounded-full px-6 py-3 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text className="text-center text-white text-xl font-bold">Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeAccountModal;
