import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import H1 from '../../components/H1';
import SwitchButtons from '../../components/SwitchButtons';
import DrinkPersonalisation from '../../components/DrinkPersonalisation';
import CocktailPersonalisation from '../../components/CocktailPersonalisation';
import { useRoute } from '@react-navigation/native';

const AddOwnDrink = ({ navigation, quantitySelected, setQuantitySelected }) => {
  const route = useRoute();

  const categoryKey = route?.params?.categoryKey;
  const [switchPosition, setSwitchPosition] = useState(categoryKey === 'ownCocktail' ? 'oui' : 'non');
  const showCocktail = switchPosition === 'oui';
  const initCocktail = categoryKey === 'ownCocktail';
  return (
    <KeyboardAvoidingView enabled behavior={Platform.select({ ios: 'padding', android: null })}>
      <View className="h-full bg-white py-10">
        <View className="bg-white rounded-xl mt-auto absolute bottom-0 w-full h-full shadow-xl shadow-[#5E5E5E]">
          <ScrollView>
            <View style={{ paddingHorizontal: defaultPaddingFontScale(), paddingTop: defaultPaddingFontScale() }}>
              <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
              <H1 className="mt-5 mb-8">Créez une nouvelle boisson</H1>
              <View className="mb-8 flex flex-row justify-between items-center">
                <Text className="font-bold text-lg">{'Est-ce un cocktail\u00A0?'}</Text>
                <SwitchButtons
                  leftContent="oui"
                  rightContent="non"
                  handleSwitchChange={setSwitchPosition}
                  initPosition={Number(!initCocktail)}
                />
              </View>
              {showCocktail ? (
                <CocktailPersonalisation
                  navigation={navigation}
                  quantitySelected={quantitySelected}
                  setQuantitySelected={setQuantitySelected}
                />
              ) : (
                <DrinkPersonalisation
                  navigation={navigation}
                  quantitySelected={quantitySelected}
                  setQuantitySelected={setQuantitySelected}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddOwnDrink;
