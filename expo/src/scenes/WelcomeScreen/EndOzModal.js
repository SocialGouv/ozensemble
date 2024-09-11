import React, { useState, useRef } from "react";
import { Path, Svg } from "react-native-svg";
import PagerView from "react-native-pager-view";
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Platform } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "../../services/storage";
import SwiperDot from "../../components/SwiperDot";
import Foundation from "@expo/vector-icons/Foundation";

const EndOzModal = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);

  const onStartPress = async () => {
    storage.set("@OnboardingDoneWithCGU", true);
    navigation.navigate("USER_SURVEY_START", { from: "NEW_USER" });
  };

  const onPressNext = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    } else {
      console.warn("Pager ref is not defined");
    }
  };
  const renderDots = () => {
    const totalPages = 4;
    return (
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <SwiperDot key={index} active={index === currentPage} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="bg-white rounded-xl w-[90%] h-[70%]">
        <View className="h-5 flex flex-row justify-end p-3">
          <TouchableOpacity hitSlop={hitSlop(15)} onPress={() => {}}>
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
        <View className="flex-1 relative">
          <PagerView
            ref={pagerRef}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            className="flex-1"
          >
            <View key="1">
              <StopScreen />
            </View>
            <View key="2">
              <ExportScreen />
            </View>
            <View key="3">
              <AlternativeScreen />
            </View>
            <View key="4">
              <SupportScreen />
            </View>
          </PagerView>
          <View className="absolute bottom-5 left-0 right-0 px-5">
            {renderDots()}
            <View className="flex flex-row justify-center">
              <TouchableOpacity
                onPress={onPressNext}
                className="justify-center items-center flex-row rounded-3xl bg-[#DE285E] px-6 py-3"
              >
                <Text className="font-bold text-white text-center text-base">Suivant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const StopScreen = () => (
  <View className="flex flex-col space-y-6 justify-center px-5">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl">Arrêt de Oz Ensemble</Text>
    </View>
    <Text className="text-black text-sm">
      L'application Oz Ensemble va s'arrêter de fonctionner dès le 25 Novembre 2024.
    </Text>
  </View>
);

const ExportScreen = () => (
  <View className="flex flex-col space-y-6 justify-center px-5">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl">Exportez vos données</Text>
    </View>
    <Text className="text-black text-sm">
      Rendez-vous dans le paramétrage de votre application pour sauvegarder les données de votre historique avant la
      fermeture du service.
    </Text>
  </View>
);

const AlternativeScreen = () => (
  <ScrollView className="flex flex-col space-y-6 -center px-5 mb-28">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl">Continuez à suivre vos consommations</Text>
    </View>
    <Text className="text-black text-sm">
      Pour votre santé, nous vous conseillons de continuer à suivre votre consommation (voici des exemples d’aplications
      ci-dessous).
    </Text>
    <Text className="text-black font-light -mb-2 italic">Applications triées par ordre alphabétique</Text>
    <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
      <View className="flex flex-row justify-between items-center">
        <Image source={require("../../assets/images/sobero-logo.png")} resizeMode="contain" className="h-12 w-12" />
        <Text className="text-black">Arrêter l'alcool - Sobero</Text>
        <View className=" items-center flex flex-col">
          <View className=" items-center bg-[#DE285E] rounded-full px-1.5 py-0.5">
            <Foundation name="euro" size={24} color="white" />
          </View>
          <Text className="text-[#DE285E] text-xs">Payant</Text>
        </View>
      </View>
      <View className="flex flex-row justify-center">
        <TouchableOpacity
          className="justify-center space-x-1 items-center flex-row rounded-3xl bg-[#4030A5] px-7 py-2 mt-4"
          onPress={() => Linking.openURL("https://apps.apple.com/fr/app/drinking-control-sobero/")}
        >
          <Text className="font-bold text-white text-center text-base">Télécharger</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
      <View className="flex flex-row space-x-8  items-center">
        <Image source={require("../../assets/images/mydefi-logo.png")} resizeMode="contain" className="h-12 w-12" />
        <Text className="text-black">Mydéfi</Text>
      </View>
      <View className="flex flex-row justify-center">
        <TouchableOpacity
          className="justify-center space-x-1 items-center flex-row rounded-3xl bg-[#4030A5] px-7 py-2 mt-4"
          onPress={() => {
            if (Platform.OS === "ios") {
              Linking.openURL("https://apps.apple.com/fr/app/myd%C3%A9fi/id6467121693");
            } else {
              Linking.openURL("https://play.google.com/store/apps/details?id=com.appdiction.mydefi");
            }
          }}
        >
          <Text className="font-bold text-white text-center text-base">Télécharger</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
      <View className="flex flex-row space-x-8  items-center">
        <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-12 w-12" />
        <Text className="text-black">Objectif Zen</Text>
      </View>
      <View className="flex flex-row justify-center">
        <TouchableOpacity className="justify-center space-x-1 items-center flex-row rounded-3xl bg-[#4030A5] px-7 py-2 mt-4">
          <Text className="font-bold text-white text-center text-base">Télécharger</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text className="text-black">La liste ci-dessus est non exhaustive.</Text>
  </ScrollView>
);

const SupportScreen = () => (
  <View className="flex flex-col space-y-6 justify-center px-5">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl">Une question ?</Text>
    </View>
    <Text className="text-black text-sm">
      Pour toute question, n’hesitez pas à nous contacter à l’adresse email ozensemble@fabrique.social.gouv.fr
    </Text>
  </View>
);

export default EndOzModal;
