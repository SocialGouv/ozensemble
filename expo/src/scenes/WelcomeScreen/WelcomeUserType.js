import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import Wave from "../../components/illustrations/onboarding/Wave";
import { screenWidth } from "../../styles/theme";

const WelcomeUserType = ({ navigation }) => {
  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[60%] px-5 justify-center">
        <View className="p-6 mt-20">
          <View className=" items-center max-h-44 mb-10">
            <Image source={require("../../assets/images/Icon.png")} resizeMode="contain" className="h-full w-full" />
          </View>
          <Text className="text-center text-white text-xl font-bold mb-6">
            Etes-vous un utilisateur de l’app OZ Ensemble ?
          </Text>
          <View className="flex items-center space-y-10">
            <Text className="text-center text-white text-lg ">
              Importer l’ensemble de vos données pour ne pas perdre votre historique
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push("WELCOME_SWIPER_OLD_USER");
              }}
              className="rounded-full px-8 py-3 bg-[#DE285E]"
            >
              <Text className="text-center text-white text-xl font-bold">Importer mes données Oz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.push("WELCOME_SWIPER");
              }}
              className="rounded-full px-8 py-3 bg-white"
            >
              <Text className="text-center text-[#3E309F] text-lg font-bold">Passer cette étape</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[40%] pb-12 justify-end items-center">
        <View className="absolute -bottom-0">
          <Wave size={screenWidth} />
        </View>
      </View>
    </View>
  );
};

export default WelcomeUserType;
