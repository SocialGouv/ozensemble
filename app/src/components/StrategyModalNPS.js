import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';
import H1 from './H1';
import TextStyled from './TextStyled';

const StrategyModalNPS = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-white rounded-t-xl mt-auto">
      <View className="p-4">
        <TouchableOpacity onPress={navigation.goBack} hitSlop={hitSlop(15)}>
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
        <View className="w-full mb-6 mt-6 flex flex-col items-center space-y-2">
          <View className="mx-2 flex flex-row items-center">
            <Image source={require('../assets/images/logo-oz-rond.png')} />
          </View>
        </View>

        <View className="mb-8 mx-4">
          <H1 className="text-center" color={'black'}>
            Vous venez d’utiliser la fonctionnalité d’aide au Craving
          </H1>
        </View>
        <Text className="text-base font-medium mb-8 mx-4 text-center">
          <TextStyled color={'#3C3C43'}>
            Nous avons besoin de vous afin d’améliorer cette fonctionnalité, afin qu’elle réponde au mieux à vos
            attentes !
          </TextStyled>
        </Text>

        <View className="items-center mb-4">
          <ButtonPrimary
            onPress={() => {
              navigation.goBack();
              navigation.navigate('NPS_SCREEN', { triggeredFrom: 'NPS Craving' });
            }}
            content={'Donner mon avis'}
          />
        </View>

        <TouchableOpacity>
          <Text className="text-indigo-600 text-center underline text-base" onPress={() => navigation.goBack()}>
            Non merci
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StrategyModalNPS;
