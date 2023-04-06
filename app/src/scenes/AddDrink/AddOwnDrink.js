import React, { useState } from 'react';

import { View, Text } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import H1 from '../../components/H1';
import SwitchButtons from '../../components/SwitchButtons';
import DrinkPersonalisation from '../../components/DrinkPersonalisation';
import CocktailPersonalisation from '../../components/CocktailPersonalisation';
import ButtonPrimary from '../../components/ButtonPrimary';
import { ScrollView } from 'react-native-gesture-handler';

const AddOwnDrink = ({ navigation }) => {
  const [switchPosition, setSwitchPosition] = useState(0);
  if (switchPosition === 0) {
    return (
      <View className="h-full bg-white py-10">
        <View className="bg-white rounded-xl mt-auto absolute bottom-0 w-full h-full shadow-xl shadow-[#5E5E5E]">
          <ScrollView>
            <View style={{ paddingHorizontal: defaultPaddingFontScale(), paddingTop: defaultPaddingFontScale() }}>
              <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
              <H1 className="mt-5 mb-8">Créez une nouvelle boisson</H1>
              <View className="mb-8 flex flex-row justify-between items-center">
                <Text className="font-bold text-lg">{'Est-ce un cocktail\u00A0?'}</Text>
                <SwitchButtons handleSwitchChange={setSwitchPosition} />
              </View>
              <DrinkPersonalisation />
            </View>
            <View className="flex flex-row justify-center mt-14 mb-10 ">
              <ButtonPrimary
                content="Créer ma boisson"
                onPress={() => {
                  // Todo: add drink to database
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View className="h-full bg-white py-10">
      <View className="bg-white rounded-xl mt-auto absolute bottom-0 w-full h-full shadow-xl shadow-[#5E5E5E]">
        <ScrollView>
          <View style={{ paddingHorizontal: defaultPaddingFontScale(), paddingTop: defaultPaddingFontScale() }}>
            <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
            <H1 className="mt-5 mb-8">Créez une nouvelle boisson</H1>
            <View className="mb-8 flex flex-row justify-between items-center">
              <Text className="font-bold text-lg">{'Est-ce un cocktail\u00A0?'}</Text>
              <SwitchButtons handleSwitchChange={setSwitchPosition} />
            </View>
            <CocktailPersonalisation navigation={navigation} />
          </View>
          <View className="flex flex-row justify-center mt-14 mb-10">
            <ButtonPrimary
              content="Créer mon cocktail"
              onPress={() => {
                // Todo: add drink to database
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddOwnDrink;
