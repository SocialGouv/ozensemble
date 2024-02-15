import React from 'react';
import TextStyled from '../../components/TextStyled';
import Agreement from './Agreement';
import { Image, View } from 'react-native';
import { screenWidth } from '../../styles/theme';
import Wave from '../../components/illustrations/onboarding/Wave';
import ButtonPrimary from '../../components/ButtonPrimary';
import NotificationService from '../../services/notifications';

export const Screen1 = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Fixez votre objectif et{'\n'}ajoutez vos consommations
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen1.png')}
          resizeMode="contain"
          className={`h-full w-full`}
        />
      </View>
    </View>
    <View className="h-1/3 pb-[48px] justify-end items-center">
      <View className={`absolute -bottom-0`}>
        <Wave currentIndex={0} size={screenWidth + 4} />
      </View>
      <ButtonPrimary
        content={'Suivant'}
        AnimationEffect
        onPress={async () => {
          await NotificationService.checkAndAskForPermission();
          onPressNext();
        }}
      />
    </View>
  </View>
);

export const Screen2 = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Suivez vos consommations{'\n'}dans le temps
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen2.png')}
          resizeMode="contain"
          className={`h-full w-full`}
        />
      </View>
    </View>
    <View className="h-1/3 pb-[48px] justify-end items-center">
      <View className={`absolute -bottom-0`}>
        <Wave currentIndex={1} size={screenWidth} />
      </View>
      <ButtonPrimary content={'Suivant'} AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const Screen3 = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Explorez les activités et{'\n'}les articles santé
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen3.png')}
          resizeMode="contain"
          className={`h-full w-full`}
        />
      </View>
    </View>
    <View className="h-1/3 pb-[48px] justify-end items-center">
      <View className={`absolute -bottom-0`}>
        <Wave currentIndex={2} size={screenWidth} />
      </View>
      <ButtonPrimary content={'Suivant'} AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const Screen4 = ({ onStartPress, agreed, setAgreed }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Recevez des conseils personnalisés
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen4.png')}
          resizeMode="contain"
          className={`h-full w-[80%]`}
        />
      </View>
    </View>
    <View className="h-1/3 pb-[48px] justify-end items-center">
      <View className={`absolute -bottom-0`}>
        <Wave currentIndex={3} size={screenWidth} />
      </View>
      <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} className="" />
      <ButtonPrimary content={"C'est parti"} AnimationEffect onPress={onStartPress} disabled={!agreed} />
    </View>
  </View>
);
