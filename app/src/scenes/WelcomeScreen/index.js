import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeStart from './WelcomeStart';
import WelcomeSwiper from './WelcomeSwiper';

const WelcomeStack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <WelcomeStack.Navigator initialRouteName="WELCOME_START" headerMode="none">
      <WelcomeStack.Screen name="WELCOME_START" component={WelcomeStart} />
      <WelcomeStack.Screen name="WELCOME_SWIPER" component={WelcomeSwiper} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeScreen;
