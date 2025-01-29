import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../components/BackButton";

const DeleteAccount = ({ navigation }) => {
  return (
    <View className="p-8 flex">
      <BackButton onPress={navigation.goBack} />
      <View className="flex space-y-6 mt-4">
        <Text className="text-[#4030a5] text-2xl font-bold">Supprimer mon compte</Text>
        <Text className=" text-black ">Etes-vous certain de vouloir supprimer votre compte ?</Text>
        <Text className=" text-black font-bold">
          Attention, cette action est irréversible et va ecraser l’ensemble de vos données (ajout de consommations,
          contexte, humeur, notes, objectif, badges gagnés, etc...) .
        </Text>
        <View className="flex items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CHANGE_ACCOUNT");
            }}
            className=" rounded-full px-6 py-2 bg-[#de285e] mt-8"
          >
            <Text className="text-center text-white text-lg font-bold">Supprimer mon Compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteAccount;
