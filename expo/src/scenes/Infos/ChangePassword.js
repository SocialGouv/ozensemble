import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BackButton from "../../components/BackButton";

const ChangePassword = ({ navigation }) => {
  const [formerPassword, setFormerPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDifferent, setIsDifferent] = useState(false);
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const checkPassword = (password) => {
    const checks = {
      minLength: password.length >= 12,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#\$%\^&\*]/.test(password),
    };
    setPasswordChecks(checks);
    setIsStrongPassword(Object.values(checks).every((check) => check));
    setIsMatching(password === confirmPassword);
    setIsDifferent(password !== formerPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setIsMatching(password === text);
  };

  useEffect(() => {
    if (isStrongPassword && isMatching && isDifferent) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isStrongPassword, isMatching, isDifferent]);

  const numberOfChecksPassed = Object.values(passwordChecks).filter(Boolean).length;

  return (
    <SafeAreaView className=" w-full h-full px-5">
      <KeyboardAvoidingView enabled behavior={Platform.select({ ios: "padding", android: null })}>
        <BackButton onPress={navigation.goBack} marginTop marginLeft marginBottom />

        <View className="flex px-8 space-y-8 ">
          <Text className="text-start text-[#4030A5] text-2xl font-bold">Modifier le mot de passe</Text>
          <Text className="text-black text-sm">
            Veuillez saisir votre mot de passe actuel, ainsi que votre nouveau mot de passe.
          </Text>
          <View className="flex space-y-3">
            <Text className=" text-black text-lg font-bold">Mot de passe actuel</Text>
            <View className="bg-white rounded-md p-3 flex flex-row items-center">
              <TextInput
                placeholder="Renseignez votre mot de passe actuel"
                value={formerPassword}
                onChangeText={setFormerPassword}
                secureTextEntry={hidePassword}
                className="text-black flex-1"
              />
            </View>
          </View>

          <View className="flex space-y-3">
            <Text className=" text-black text-lg font-bold">Mot de passe</Text>
            <Text className="text-black text-sm">
              doit contenir au minimum 12 caractères, 1 Majuscule, 1 chiffre, 1 caractère spécial
            </Text>
            <View className="bg-white rounded-md p-3 flex flex-row items-center">
              <TextInput
                placeholder="Renseignez le même mot de passe"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  checkPassword(text);
                }}
                secureTextEntry={hidePassword}
                className="text-black flex-1"
              />
              <TouchableOpacity className="" onPress={() => setHidePassword(!hidePassword)}>
                {hidePassword ? (
                  <MaterialCommunityIcons name="eye-outline" size={24} color="#3E309F" />
                ) : (
                  <MaterialCommunityIcons name="eye-off-outline" size={24} color="#3E309F" />
                )}
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between mt-2">
              {[...Array(5)].map((_, index) => (
                <View
                  key={index}
                  className={`h-1 flex-1 mx-0.5 rounded-xl ${
                    index < numberOfChecksPassed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          </View>
          <View className="flex space-y-3">
            <Text className=" text-black text-xl font-bold mb-1">Confirmation du mot de passe</Text>
            <View className="bg-white rounded-md p-3 flex flex-row items-center">
              <TextInput
                placeholder="Renseignez le même mot de passe"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={hidePassword}
                className="text-black flex-1"
              />
              <TouchableOpacity className="" onPress={() => setHidePassword(!hidePassword)}>
                {hidePassword ? (
                  <MaterialCommunityIcons name="eye-outline" size={24} color="#3E309F" />
                ) : (
                  <MaterialCommunityIcons name="eye-off-outline" size={24} color="#3E309F" />
                )}
              </TouchableOpacity>
            </View>
            {confirmPassword && (
              <View className="flex items-center flex-row justify-end space-x-1">
                {isMatching ? (
                  <AntDesign name="checkcircleo" size={15} color="#39CEC1" />
                ) : (
                  <Entypo name="circle-with-cross" size={15} color="#FF0000" />
                )}
                <Text className="text-black text-sm">
                  {isMatching ? "Mots de passe similaires" : "Mots de passe différents"}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex mt-10 items-center">
          <TouchableOpacity
            // onPress={signup}
            onPress={() => navigation.push("TABS")}
            className={`rounded-full px-6 py-3 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
            // disabled={isButtonDisabled}
          >
            <Text className="text-center text-white text-xl font-bold">Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;
