import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import H1 from '../../components/H1';
import SwitchButtons from '../../components/SwitchButtons';
import DrinkPersonalisation from '../../components/DrinkPersonalisation';
import CocktailPersonalisation from '../../components/CocktailPersonalisation';
import { ownDrinksCatalogState } from '../../recoil/consos';

const AddOwnDrink = ({ visible, hide, updateDrinkKey }) => {
  const ownDrinksCatalog = useRecoilValue(ownDrinksCatalogState);
  const drink = ownDrinksCatalog.find((catalogdrink) => catalogdrink.drinkKey === updateDrinkKey);
  const [switchPosition, setSwitchPosition] = useState(drink?.categoryKey === 'ownCocktail' ? 'oui' : 'non');
  const [quantitySelected, setQuantitySelected] = useState();
  const [cocktailSelected, setCocktailSelected] = useState();
  const showCocktail = switchPosition === 'oui';
  console.log(drink);
  const initCocktail = drink?.categoryKey === 'ownCocktail';

  return (
    <Modal visible={visible} hide={hide} animationType="sheet" presentationStyle="formSheet">
      <KeyboardAvoidingView enabled behavior={Platform.select({ ios: 'padding', android: null })}>
        <View className="h-full w-full bg-white">
          <ScrollView>
            <View className="mt-10" style={{ padding: defaultPaddingFontScale() }}>
              <BackButton content="Retour" bold onPress={hide} />
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
                  updateDrinkKey={updateDrinkKey}
                  hide={hide}
                  cocktailSelected={cocktailSelected}
                  setCocktailSelected={setCocktailSelected}
                />
              ) : (
                <DrinkPersonalisation
                  updateDrinkKey={updateDrinkKey}
                  hide={hide}
                  quantitySelected={quantitySelected}
                  setQuantitySelected={setQuantitySelected}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddOwnDrink;
