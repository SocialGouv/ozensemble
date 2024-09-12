import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, TextInput } from "react-native";
import BackButton from "../../components/BackButton";
import { storage } from "../../services/storage";

const AccountInfo = ({ navigation }) => {
  const currentEmail = storage.getString("@User");
  const [email, setEmail] = useState(currentEmail);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    setIsEmailValid(emailRegex.test(text));
  };

  useEffect(() => {
    setIsButtonDisabled(!isEmailValid || email === currentEmail);
  }, [isEmailValid, email]);
  return (
    <View className="p-8 flex">
      <BackButton onPress={navigation.goBack} />
      <View className="flex space-y-4 mt-4">
        <Text className="text-[#4030a5] text-2xl font-bold">Mon compte</Text>
        <Text className=" text-black text-lg font-bold">E-mail</Text>
        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmailChange}
          className="bg-white rounded-md p-3 border border-gray-300"
          autoCorrect={false}
        />
        <View className="flex items-center">
          <TouchableOpacity
            disabled={isButtonDisabled}
            onPress={() => {
              navigation.navigate("CHANGE_ACCOUNT", { email: email });
            }}
            className={`mt-2 rounded-full px-6 py-2 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
          >
            <Text className="text-center text-white text-lg font-bold">Modifier mon email</Text>
          </TouchableOpacity>
        </View>
        <Text className=" text-black text-lg font-bold">Mot de passe</Text>
        <Text className="text-sm text-black">
          Pour modifier votre mot de passe,
          <TouchableOpacity onPress={() => navigation.navigate("CHANGE_PASSWORD")}>
            <Text className="text-[#4030a5] underline font-bold"> cliquez ici</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default AccountInfo;
