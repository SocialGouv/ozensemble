import React, { useState, useRef } from "react";
import { Image, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNRestart from "react-native-restart";
import { storage } from "../../services/storage";

const EmailConfirmationScreen = ({ navigation }) => {
  const isOldUser = storage.getBoolean("@IsOldUser");
  // const isReinitialisingPassword = storage.getBoolean("@IsReinitialisingPassword");
  const isReinitialisingPassword = false;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const handleCodeChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else {
        inputRefs.current[index].blur();
      }
    } else if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <SafeAreaView className="bg-[#3E309F] w-full h-full">
      <View className="p-6">
        <View className=" items-center max-h-56">
          <Image source={require("../../assets/images/Icon.png")} resizeMode="contain" className="h-full w-full" />
        </View>
        <Text className="text-center text-white text-xl font-bold mb-6">Confirmez votre e-mail</Text>
        <View className="flex items-center space-y-10">
          <Text className="text-center text-white px-6">
            Entrez ci-dessous le code de confirmation que vous avez reçu par e-mail.
          </Text>
          <View className="flex flex-row justify-center mb-10">
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                {index === 3 && <View className="w-3" />}
                <View className="w-10 h-10 bg-white rounded-lg items-center justify-center mx-0.5">
                  <TextInput
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                    className="text-black text-xl text-center"
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </View>
              </React.Fragment>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isOldUser) RNRestart.restart();
              else if (isReinitialisingPassword) navigation.navigate("REINITIALISE_PASSWORD");
              else navigation.navigate("USER_SURVEY_START", { from: "NEW_USER" });
            }}
            className="rounded-full px-8 py-3 bg-[#DE285E]"
          >
            <Text className="text-center text-white text-xl font-bold">Valider</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert("Code renvoyé", "Un nouveau code de confirmation vous a été envoyé par e-mail.")}
          >
            <Text className="text-center text-white ">Renvoyer code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailConfirmationScreen;
