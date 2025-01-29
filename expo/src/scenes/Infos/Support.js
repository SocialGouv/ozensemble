import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import BackButton from "../../components/BackButton";

const Support = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!message);
  }, [message]);
  return (
    <View className="p-8 flex">
      <BackButton onPress={navigation.goBack} />
      <View className="flex space-y-4 mt-4">
        <Text className="text-[#4030a5] text-2xl font-bold">Aide & Support</Text>
        <Text className=" text-black ">
          Pour toute demande, veuillez compléter le champ ci-dessous afin de contacter l’equipe support.
        </Text>
        <Text className=" text-black text-lg font-bold">Message</Text>
        <TextInput
          textAlignVertical="top"
          multiline
          placeholder="Rédigez votre message"
          value={message}
          onChangeText={setMessage}
          className="bg-white rounded-md p-3 border border-gray-300 h-56"
        />
        <View className="flex items-center">
          <TouchableOpacity
            // onPress={signup}
            onPress={() => navigation.navigate("EMAIL_CONFIRMATION")}
            className={`mt-2 rounded-full px-6 py-2 ${isButtonDisabled ? "bg-[#EA6C96]" : "bg-[#de285e]"}`}
            // disabled={isButtonDisabled}
          >
            <Text className="text-center text-white text-lg font-bold">Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Support;
