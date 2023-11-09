import React from 'react';
import TextStyled from '../../components/TextStyled';
import Agreement from './Agreement';
import { Image, View } from 'react-native';
import { screenWidth } from '../../styles/theme';
import Wave from '../../components/illustrations/onboarding/Wave';
import ButtonPrimary from '../../components/ButtonPrimary';

export const Screen1 = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold">
          Fixez votre objectif et ajoutez vos consommations
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
      <ButtonPrimary content={'Suivant'} AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const Screen2 = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold">
          Suivez vos consommations dans le temps
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
        <TextStyled className="text-center text-white text-2xl font-bold">
          Explorez les activités et les articles santé
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
        <TextStyled className="text-center text-white text-2xl font-bold">
          Recevez des conseils personnalisés
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/illustrations/screen4.png')}
          resizeMode="contain"
          className={`h-full w-[90%]`}
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
