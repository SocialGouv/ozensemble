import React, { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import API from "../../services/api";
import { storage } from "../../services/storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  hasSentPreviousDrinksToDB,
  hasCleanConsoAndCatalog,
  hasMigrateMissingDrinkKey,
  hasMigrateFromDailyGoalToWeekly,
  sendPreviousDrinksToDB,
  cleanConsosAndCatalog,
  migrateMissingDrinkKey,
  migrateFromDailyGoalToWeekly,
} from "../../migrations";
import { reconciliateDrinksToDB, reconciliateGoalToDB } from "../../reconciliations";

const SigninScreen = ({ navigation }) => {
  const [reconciliatedDrinksToDB, setReconciliatedDrinksToDB] = useState(false);
  const [reconciliatedGoalsToDB, setReconciliatedGoalsToDB] = useState(false);

  // migrate only once if not yet done
  // TODO: clean migrations when it's time
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [_hasMigrateMissingDrinkKey, sethasMigrateMissingDrinkKey] = useState(hasMigrateMissingDrinkKey);
  const [_hasMigrateFromDailyGoalToWeekly, sethasMigrateFromDailyGoalToWeekly] = useState(
    hasMigrateFromDailyGoalToWeekly
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const signin = async () => {
    const response = await API.post({
      path: "/user/signin",
      body: {
        email: email.toLowerCase(),
        password,
      },
    });
    if (response.ok) {
      API.setToken(response.token);
      storage.set("@Token", response.token);
      if (!reconciliatedDrinksToDB) {
        await reconciliateDrinksToDB();
        setReconciliatedDrinksToDB(true);
      }
      if (!reconciliatedGoalsToDB) {
        await reconciliateGoalToDB();
        setReconciliatedGoalsToDB(true);
      }
      if (!_hasCleanConsoAndCatalog) {
        await cleanConsosAndCatalog();
        setHasCleanConsoAndCatalog(true);
      }
      if (!_hasSentPreviousDrinksToDB) {
        await sendPreviousDrinksToDB();
        setHasSentPreviousDrinksToDB(true);
      }
      if (!_hasMigrateFromDailyGoalToWeekly) {
        await migrateFromDailyGoalToWeekly();
        sethasMigrateFromDailyGoalToWeekly(true);
      }
      if (!_hasMigrateMissingDrinkKey) {
        migrateMissingDrinkKey();
        sethasMigrateMissingDrinkKey(true);
      }
      storage.set("@User", response.user.email);
      const onBoardingDone = storage.getBoolean("@OnboardingDoneWithCGU");
      if (!onBoardingDone) navigation.push("WELCOME_SWIPER");

      navigation.push("TABS");
    } else {
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust this offset as needed
    >
      <ScrollView className="flex bg-[#3E309F]">
        <View className=" px-5 justify-center space-y-8 mt-24">
          <View className="flex-1 items-center py-6 max-h-56">
            <Image source={require("../../assets/images/Icon.png")} resizeMode="contain" className="h-full w-full" />
          </View>
          <View>
            <Text className=" text-white text-lg font-semibold mb-2">E-mail</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              keyboardType="email-address"
              className="bg-white rounded-md p-3 mb-6"
            />
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
            <TouchableOpacity onPress={() => navigation.push("FORGOT_PASSWORD")}>
              <Text className=" text-white text  mb-1">Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <ButtonPrimary
              className=""
              content="Se connecter"
              disabled={email === "" || password === ""}
              AnimationEffect
              onPress={() => {
                signin();
              }}
            />
            <TouchableOpacity onPress={() => navigation.push("WELCOME")}>
              <Text className="text-center text-white font-semibold mt-4">Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;
