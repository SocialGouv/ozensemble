import React from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Image, View, Text } from "react-native";
import Wave from "../../components/illustrations/onboarding/Wave";
import { screenWidth } from "../../styles/theme";

const WelcomeUserType = ({ navigation }) => {
  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[60%] px-5 justify-center">
        <View className="flex-1 items-center py-6 max-h-44 mt-8">
          <Image source={require("../../assets/images/Icon.png")} resizeMode="contain" className="h-full w-full" />
        </View>
        <Text className="text-center text-white text-xl font-bold mb-6">
          Etes-vous un utilisateur de l’app OZ Ensemble ?
        </Text>
        <View className="flex-1 flex justify-between items-center py-6 bg-slate-800">
          <Text className="text-center text-white text-lg bg-slate-500">
            Vous avez la possibilité de récupérer l’ensemble des données de votre application Oz Ensemble pour les
            transférer sur celle-ci. {"\n\n"}Pour commencer, cliquez sur le bouton “Importer mes données Oz” ci-dessous.{" "}
          </Text>

          <ButtonPrimary
            content="Importer mes données Oz"
            AnimationEffect
            onPress={() => {
              navigation.push("WELCOME_SWIPER_OLD_USER");
            }}
          />
        </View>
      </View>
      <View className="h-[40%] pb-12 justify-end items-center">
        <View className="absolute -bottom-0">
          <Wave size={screenWidth} />
        </View>
        <Text className="text-[#3E309F] text-lg mb-1 text-center">Vous pouvez aussi passer cette {"\n"} étape</Text>
        <ButtonPrimary
          content="Passer cette étape"
          color={"#3E309F"}
          AnimationEffect
          onPress={() => {
            navigation.push("WELCOME_SWIPER");
          }}
        />
      </View>
    </View>
  );
};

export default WelcomeUserType;
