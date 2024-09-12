import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import API from "../../services/api";
import { storage } from "../../services/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { reconciliateDrinksToDB, reconciliateGoalToDB } from "../../reconciliations";
import {
  hasSentPreviousDrinksToDB,
  hasCleanConsoAndCatalog,
  hasMigrateMissingDrinkKey,
  hasMigrateFromDailyGoalToWeekly,
  sendPreviousDrinksToDB,
  cleanConsosAndCatalog,
  migrateFromDailyGoalToWeekly,
  migrateMissingDrinkKey,
} from "../../migrations";

const SignupScreen = ({ navigation }) => {
  const [reconciliatedDrinksToDB, setReconciliatedDrinksToDB] = useState(false);
  const [reconciliatedGoalsToDB, setReconciliatedGoalsToDB] = useState(false);
  const [hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [hasMigrateMissingDrinkKey, sethasMigrateMissingDrinkKey] = useState(hasMigrateMissingDrinkKey);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
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
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setIsMatching(password === text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    setValidEmail(emailRegex.test(text));
  };

  const signup = async () => {
    const response = await API.post({
      path: "/user/signup",
      body: {
        email,
        password,
      },
    });
    if (response.ok) {
      storage.set("@User", response.newUser.email);
      API.setToken(response.token);
      await reconciliateDrinksToDB();
      setReconciliatedDrinksToDB(true);
      await reconciliateGoalToDB();
      setReconciliatedGoalsToDB(true);
      await cleanConsosAndCatalog();
      setHasCleanConsoAndCatalog(true);
      await sendPreviousDrinksToDB();
      setHasSentPreviousDrinksToDB(true);
      await migrateFromDailyGoalToWeekly();
      sethasMigrateFromDailyGoalToWeekly(true);
      migrateMissingDrinkKey();
      sethasMigrateMissingDrinkKey(true);
      navigation.navigate("EMAIL_CONFIRMATION");
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  useEffect(() => {
    if (isStrongPassword && isMatching && validEmail) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isStrongPassword, isMatching, validEmail]);

  const numberOfChecksPassed = Object.values(passwordChecks).filter(Boolean).length;

  return (
    <SafeAreaView className="bg-[#3E309F] w-full h-full px-5">
      <KeyboardAvoidingView enabled behavior={Platform.select({ ios: "padding", android: null })}>
        <ScrollView
          className="flex px-4 space-y-8 mt-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"
          keyboardDismissMode="none"
        >
          <View className="px-5">
            <Text className="text-center text-white text-2xl font-bold">Créer un compte</Text>
          </View>
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
          <View className="flex space-y-3">
            <Text className=" text-white text-lg font-bold">Mot de passe</Text>
            <Text className="text-white text-sm">
              doit contenir au minimum 12 caractères, 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
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
            <Text className=" text-white text-xl font-bold mb-1">Confirmation du mot de passe</Text>
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
                <Text className="text-white text-sm">
                  {isMatching ? "Mots de passe similaires" : "Mots de passe différents"}
                </Text>
              </View>
            )}
          </View>
          <View className="flex mt-10 items-center">
            <TouchableOpacity
              onPress={signup}
              className={`rounded-full px-6 py-3 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
              disabled={isButtonDisabled}
            >
              <Text className="text-center text-white text-xl font-bold">Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
