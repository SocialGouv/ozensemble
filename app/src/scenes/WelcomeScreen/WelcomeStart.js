import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import { Image, View } from 'react-native';
import TextStyled from '../../components/TextStyled';
import Wave from '../../components/illustrations/onboarding/Wave';
import { screenWidth } from '../../styles/theme';

const WelcomeStart = ({ navigation }) => {
  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[10%] " />
      <View className="h-[60%] px-5 justify-center">
        <View>
          <TextStyled className="text-center text-white text-3xl font-bold mb-8">Bienvenue sur Oz !</TextStyled>
          <TextStyled className="text-center text-white text-xl">
            Vous avez entre les mains un outil <TextStyled className="font-bold text-white">gratuit</TextStyled> et{' '}
            <TextStyled className="font-bold text-white">anonyme</TextStyled> de suivi de consommation d’alcool
          </TextStyled>
        </View>
        <View className="flex-1 items-center py-6 max-h-56">
          <Image source={require('../../assets/images/Icon.png')} resizeMode="contain" className="h-full w-full" />
        </View>
        <View>
          <TextStyled className="text-center text-white text-xl font-bold">
            L’application des Ministères Sociaux
          </TextStyled>
        </View>
      </View>
      <View className="h-[30%] pb-12 justify-end items-center">
        <View className="absolute -bottom-0">
          <Wave size={screenWidth} />
        </View>
        <ButtonPrimary
          className=""
          content="Commencer"
          AnimationEffect
          onPress={() => {
            navigation.push('WELCOME_SWIPER');
          }}
        />
      </View>
    </View>
  );
};

export default WelcomeStart;
