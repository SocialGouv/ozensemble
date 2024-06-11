import React from 'react';
import TextStyled from '../../components/TextStyled';
import Agreement from './Agreement';
import { Image, View } from 'react-native';
import { screenWidth } from '../../styles/theme';
import Wave from '../../components/illustrations/onboarding/Wave';
import ButtonPrimary from '../../components/ButtonPrimary';
import NotificationService from '../../services/notifications';

export const ScreenRate = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center space-y-8 px-5 pt-5">
      <TextStyled className="text-center text-white text-2xl font-semibold ">
        “ Permet de faire le point et de se fixer des objectifs simplement et sans culpabilité. ”
      </TextStyled>
      <TextStyled className="text-center text-white text-2xl font-semibold ">
        “ Application très bien pensée et indispensable si vous voulez suivre votre consommation. ”{' '}
      </TextStyled>
      <View className="flex flex-row space-x-4 justify-center">
        <Image source={require('../../assets/illustrations/laurier-gauche.png')} resizeMode="contain" className={''} />
        <View className="flex flex-col">
          <TextStyled className="text-center text-white text-3xl font-bold ">+ 50 000</TextStyled>
          <TextStyled className="text-center text-white text-2xl font-semibold ">utilisateurs satisfaits</TextStyled>
        </View>
        <Image source={require('../../assets/illustrations/laurier-droit.png')} resizeMode="contain" className={''} />
      </View>
      <View className="flex flex-col items-center space-y-2">
        <TextStyled className="text-center text-white text-3xl font-bold ">Noté 4.8</TextStyled>
        <Image source={require('../../assets/illustrations/stars-rate.png')} resizeMode="contain" className={''} />
        <TextStyled className="text-center text-white text-2xl font-bold ">sur les stores</TextStyled>
        <TextStyled className="text-center text-white text-xl font-semibold ">avec + de 1000 avis</TextStyled>
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={0} size={screenWidth + 4} />
      </View>
      <ButtonPrimary
        content="Suivant"
        AnimationEffect
        onPress={async () => {
          await NotificationService.checkAndAskForPermission();
          onPressNext();
        }}
      />
    </View>
  </View>
);
export const ScreenCalendar = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Fixez votre objectif et{'\n'}ajoutez vos consommations
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen_calendar.png')}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={1} size={screenWidth + 4} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenStats = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Suivez vos consommations{'\n'}dans le temps
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen_stats.png')}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={2} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenDefi = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Explorez les activités et{'\n'}les articles santé
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen_defi.png')}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={3} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);
export const ScreenCraving = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Surmontez un craving avec{'\n'}des activités et conseils
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen_craving.png')}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={4} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenAdvice = ({ onStartPress, agreed, setAgreed }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Recevez des conseils personnalisés
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen_advice.png')}
          resizeMode="contain"
          className={'h-full w-[80%]'}
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={5} size={screenWidth} />
      </View>
      <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} className="" />
      <ButtonPrimary content={"C'est parti"} AnimationEffect onPress={onStartPress} disabled={!agreed} />
    </View>
  </View>
);
