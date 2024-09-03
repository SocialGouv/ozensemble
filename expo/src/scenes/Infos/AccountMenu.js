import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import HeaderBackground from "../../components/HeaderBackground";
import Export from "./Export";
import { useToggleCTA } from "../AddDrink/AddDrinkCTAButton";
import FakeData from "../../reference/mocks/FakeData";
import ArrowRight from "../../components/ArrowRight";
import Transfer from "./Transfer";
import BackButton from "../../components/BackButton";
import AccountGearIcon from "../../components/illustrations/icons/AccountGearIcon";
import AccountInfo from "./AccountInfo";
import Support from "./Support";
import DeleteAccount from "./DeleteAccount";

const AccountStack = createStackNavigator();

const Account = () => {
  useToggleCTA({ navigator: "Account" });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <AccountStack.Navigator initialRouteName="ACCOUNT_MENU" screenOptions={{ headerShown: false }}>
        <AccountStack.Screen name="ACCOUNT_MENU" component={AccountMenu} />
        <AccountStack.Screen name="ACCOUNT_INFO" component={AccountInfo} />
        <AccountStack.Screen name="SUPPORT" component={Support} />
        <AccountStack.Screen name="TRANSFER" component={Transfer} />
        <AccountStack.Screen name="DELETE" component={DeleteAccount} />
      </AccountStack.Navigator>
    </Background>
  );
};

const AccountMenu = ({ navigation }) => {
  return (
    <View className="p-8 flex">
      <BackButton onPress={navigation.goBack} />
      <View className="flex flex-row items-center space-x-3 mt-4">
        <AccountGearIcon size={25} />
        <Text className="text-[#4030a5] text-2xl font-bold">Mon compte</Text>
      </View>
      <View className=" border-[#DDDDDD] border  rounded-lg p-4 mt-8 ">
        <MenuItem
          caption={"Information du compte"}
          onPress={() => {
            navigation.push("ACCOUNT_INFO");
          }}
        />
        <View className="w-full border border-[#E8E8EA] mt-4 mb-4 border-" />

        <MenuItem
          caption={"Importer les données de Oz Ensemble"}
          onPress={() => {
            navigation.push("TRANSFER");
          }}
        />
        <View className="w-full border border-[#E8E8EA] mt-4 mb-4 border-" />
        <MenuItem caption={"Aide & Support"} onPress={() => navigation.push("SUPPORT")} />
        <View className="w-full border border-[#E8E8EA] mt-4 mb-4" />
        <MenuItem caption={"Supprimer mon compte"} onPress={() => navigation.push("DELETE")} />
      </View>
    </View>
  );
};

const MenuItem = ({ caption, onPress, disabled }) => {
  const screenWidth = Dimensions.get("window").width;
  const basis = screenWidth <= 350 ? 200 : "auto"; // reduce size of text container for screens ~ iphone SE
  return (
    <TouchableOpacity onPress={onPress} showArrow={false} disabled={disabled}>
      <View className="flex flex-row justify-between items-center ">
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-[#4030a5] font-semibold" style={{ flexBasis: basis }}>
            {caption}
          </Text>
        </View>
        <View className="flex flex-row justify-end grow">
          <ArrowRight size={15} color="#4030a5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Account;
