import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeStart from "./WelcomeStart";
import WelcomeSwiper from "./WelcomeSwiper";
import WelcomeUserType from "./WelcomeUserType";
import WelcomeSwiperOldUser from "./WelcomeSwiperOldUser";
import { StatusBar } from "expo-status-bar";

const WelcomeStack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#3E309F" />
      <WelcomeStack.Navigator initialRouteName="WELCOME_START" screenOptions={{ headerShown: false }}>
        <WelcomeStack.Screen name="WELCOME_START" component={WelcomeStart} />
        <WelcomeStack.Screen name="WELCOME_USER_TYPE" component={WelcomeUserType} />
        <WelcomeStack.Screen name="WELCOME_SWIPER_OLD_USER" component={WelcomeSwiperOldUser} />
        <WelcomeStack.Screen name="WELCOME_SWIPER" component={WelcomeSwiper} />
      </WelcomeStack.Navigator>
    </>
  );
};

export default WelcomeScreen;
