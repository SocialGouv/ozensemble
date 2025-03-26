import React, { useState, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import PagerView from "react-native-pager-view";
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Platform } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import SwiperDot from "../../components/SwiperDot";
import Modal from "../../components/Modal";
import ButtonPrimary from "../../components/ButtonPrimary";

const EndOzModal = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const totalPages = 5;

  const onPressNext = () => {
    if (pagerRef.current) {
      if (currentPage === totalPages - 1) {
        navigation.goBack();
      } else {
        pagerRef.current.setPage(currentPage + 1);

        setCurrentPage(currentPage + 1);
      }
    } else {
      console.warn("Pager ref is not defined");
    }
  };
  const renderDots = () => {
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
      <View className="bg-white w-full h-full">
        <View className="h-5 flex flex-row justify-end p-3">
          <TouchableOpacity
            hitSlop={hitSlop(15)}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                stroke={currentPage === totalPages - 1 ? "black" : "white"}
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
            className="flex-1 h-full"
          >
            <View key="1">
              <StopScreen />
            </View>
            <View key="2">
              <ExportScreen />
            </View>
            <View key="3">
              <KeepGoingScreen />
            </View>
            <View key="4">
              <AlternativeScreen />
            </View>
            <View key="5">
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
                <Text className="font-bold text-white text-center text-base">
                  {currentPage === 4 ? "Terminer" : "Suivant"}
                </Text>
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
      <Text className="text-[#4030A5] font-bold text-2xl text-center">Arrêt de Oz Ensemble</Text>
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-black text-sm text-center">
        L'application Oz Ensemble va s'arrêter de fonctionner début mai 2025.
      </Text>
    </View>
  </View>
);

const ExportScreen = () => (
  <View className="flex flex-col space-y-6 justify-center px-5">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl text-center">Exportez vos données</Text>
    </View>
    <View className="flex flex-col justify-center items-center space-y-4">
      <Text className="text-black text-sm text-center">
        Rendez-vous dans le paramétrage de votre application pour sauvegarder les données de votre historique.
      </Text>
      <Text className="text-black text-sm text-center">
        Vous pourriez les réutiliser dans une application qui pourrait être compatible avec votre historique.
      </Text>
      <Text className="text-black text-sm text-center">
        Faites cette étape avant la fermeture du service début mai 2025.
      </Text>
    </View>
  </View>
);

const KeepGoingScreen = () => (
  <ScrollView className="flex flex-col space-y-6 -center px-5 mb-28">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl text-center">Continuez à suivre vos consommations</Text>
    </View>
    <View className="flex flex-col justify-center items-center space-y-4">
      <Text className="text-black text-sm text-center">
        Pour votre santé, nous vous conseillons de continuer à suivre votre consommation. Voici des exemples
        d’aplications en page suivante.
      </Text>
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-black text-sm text-center italic">La liste est non exhaustive.</Text>
    </View>
  </ScrollView>
);

const AlternativeScreen = () => {
  const [modalCompatibleVisible, setModalCompatibleVisible] = useState(false);
  return (
    <>
      <ScrollView className="flex flex-col space-y-6 -center px-5 mb-28">
        {/* <View className=" items-center py-6 max-h-32">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View> */}
        <View className="flex flex-col justify-center items-center">
          <Text className="text-[#4030A5] font-bold text-2xl text-center">Applications alternatives</Text>
        </View>
        <View className="flex flex-col justify-center items-center">
          <Text className="text-black font-light -mb-2 italic">Applications triées par ordre alphabétique</Text>
        </View>
        <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
          <View className="flex flex-row space-x-8  items-center">
            <Image source={require("../../assets/images/mydefi-logo.png")} resizeMode="contain" className="h-12 w-12" />
            <Text className="text-black font-bold">mydéfi</Text>
          </View>
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              className="justify-center space-x-1 items-center flex-row rounded-3xl px-4 py-1 mt-4 border border-[#4030A5]"
              onPress={() => {
                Linking.openURL(
                  Platform.select({
                    android: "https://play.google.com/store/apps/details?id=com.appdiction.mydefi",
                    ios: "https://apps.apple.com/fr/app/myd%C3%A9fi/id6467121693",
                  })
                );
              }}
            >
              <Text className="font-semibold text-[#4030A5] text-center text-base">Télécharger</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
          <View className="flex flex-row items-center w-full">
            <Image
              source={require("../../assets/images/option-zero-logo.png")}
              resizeMode="contain"
              className="h-12 w-12"
            />
            <View className="ml-8">
              <Text className="text-black font-bold">Option Zéro</Text>
            </View>
            {/* <TouchableOpacity
              className="flex flex-row justify-center pl-2 rounded-full ml-auto items-center"
              onPress={() => {
                setModalCompatibleVisible(true);
              }}
            >
              <Text className="text-[#4030A5] text-xs">Compatible</Text>
              <View className="flex flex-row justify-center items-center rounded-full w-6 h-6 ml-2 border border-[#4030A5]">
                <Text className="text-[#4030A5] text-xs">?</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              className="justify-center space-x-1 items-center flex-row rounded-3xl px-4 py-1 mt-4 border border-[#4030A5]"
              onPress={() => {
                Linking.openURL(
                  Platform.select({
                    android: "https://play.google.com/store/apps/details?id=com.capasscite.optionzero",
                    ios: "https://apps.apple.com/fr/app/option-z%C3%A9ro/id6742791977",
                  })
                );
              }}
            >
              <Text className="font-semibold text-[#4030A5] text-center text-base">Télécharger</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col justify-center border border-[#767676] rounded-lg p-4">
          <View className="flex flex-row space-x-8  items-center">
            <Image source={require("../../assets/images/trydry.png")} resizeMode="contain" className="h-12 w-12" />
            <Text className="text-black font-bold">Try Dry</Text>
          </View>
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              className="justify-center space-x-1 items-center flex-row rounded-3xl px-4 py-1 mt-4 border border-[#4030A5]"
              onPress={() => {
                Linking.openURL(
                  Platform.select({
                    android: "https://play.google.com/store/apps/details?id=uk.org.alcoholconcern.dryjanuary",
                    ios: "https://apps.apple.com/fr/app/try-dry-the-dry-january-app/id1441293755?l=fr-FR",
                  })
                );
              }}
            >
              <Text className="font-semibold text-[#4030A5] text-center text-base">Télécharger</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-black text-center">La liste ci-dessus est non exhaustive.</Text>
      </ScrollView>
      <Modal visible={modalCompatibleVisible} animationType="fade" withBackground hideOnTouch>
        <View className="bg-white rounded-xl m-auto w-10/12">
          <TouchableOpacity onPress={() => setModalCompatibleVisible(false)} hitSlop={hitSlop(15)}>
            <Svg fill="none" viewBox="0 0 24 24" className="absolute right-0 mb-8 h-5 w-5">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                stroke="black"
                d="M6 18L18 6M6 6l12 12"
              />
            </Svg>
          </TouchableOpacity>
          <View className="mb-4 mt-2 p-2">
            <Text className="text-base mt-4 text-center">
              L'export de vos données pourra être réimporté dans l'application compatible.
            </Text>

            <View className=" justify-around mt-6 space-y-4">
              <ButtonPrimary content="OK" onPress={() => setModalCompatibleVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const SupportScreen = () => (
  <View className="flex flex-col space-y-6 justify-center px-5">
    <View className=" items-center py-6 max-h-56">
      <Image source={require("../../assets/images/logo-oz-rond.png")} resizeMode="contain" className="h-full w-full" />
    </View>
    <View className="flex flex-col justify-center items-center">
      <Text className="text-[#4030A5] font-bold text-2xl text-center">Une question ?</Text>
    </View>
    <Text className="text-black text-sm text-center">
      Pour toute question,{"\n"}n’hesitez pas à nous contacter à l’adresse email{"\n"}
      {"\n"}ozensemble@fabrique.social.gouv.fr
    </Text>
  </View>
);

export default EndOzModal;
