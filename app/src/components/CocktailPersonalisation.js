import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { drinksState, ownDrinksCatalogState } from '../recoil/consos';
import CocktailGlass from './illustrations/drinksAndFood/CocktailGlass';
import { useRoute } from '@react-navigation/native';

const CocktailPersonalisation = ({ navigation, setQuantitySelected, quantitySelected }) => {
  const route = useRoute();
  const timestamp = route?.params?.timestamp;
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [drinkPrice, setDrinkPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [ownDrinksCatalog, setOwnDrinksCatalog] = useRecoilState(ownDrinksCatalogState);
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const saveDrink = async () => {
    const oldDrink = ownDrinksCatalog.find((drink) => drink.drinkKey === quantitySelected.name);
    if (oldDrink) {
      const keepGoing = await new Promise((resolve) => {
        Alert.alert('Vous avez déjà enregistré ce verre', 'Voulez-vous le remplacer ?', [
          {
            text: 'Annuler',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Remplacer',
            onPress: () => resolve(true),
          },
        ]);
      });
      if (!keepGoing) return;
    }
    setOwnDrinksCatalog((oldState) => {
      return [
        ...oldState,
        {
          categoryKey: 'ownCocktail',
          drinkKey: quantitySelected.name,
          displayFeed: quantitySelected.name,
          volume: quantitySelected?.volume + ' cl',
          doses: quantitySelected.doses,
          icon: CocktailGlass,
          price: Number(drinkPrice),
          kcal: quantitySelected.kCal,
          custom: true,
        },
      ];
    });
    if (quantity > 0) {
      const drinkId = uuidv4();
      setGlobalDrinksState((state) =>
        [
          ...state.filter((_drink) => _drink.id !== drinkId),
          {
            drinkKey: quantitySelected.name,
            quantity: Number(quantity),
            id: drinkId,
            isOwnDrink: true,
            timestamp,
          },
        ].filter((d) => d.quantity > 0)
      );
    }
  };
  return (
    <>
      <View className="mb-4">
        <TextStyled bold>Cocktail</TextStyled>
        {!quantitySelected?.name ? (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => navigation.navigate('ADD_COCKTAIL')}>
            <Text className="text-[#CACACD] flex">Sélectionnez un cocktail</Text>
            <ArrowDown color="#000000" size={30} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => navigation.navigate('ADD_COCKTAIL')}>
            <Text className="text-[#4030A5] flex">{quantitySelected?.name}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="mb-5">
        <TextStyled bold>Prix (€)</TextStyled>
        <TextInput
          value={drinkPrice}
          className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
          placeholder="Euros"
          keyboardType="decimal-pad"
          maxLength={5}
          onChangeText={(value) => setDrinkPrice(value)}
        />
      </View>
      <View className="flex flex-row justify-between items-center flex-wrap">
        <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
        <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
      </View>
      <View className="flex flex-row justify-center mt-14 mb-10">
        <ButtonPrimary
          content="Créer mon cocktail"
          onPress={() => {
            setQuantitySelected(null);
            navigation.goBack();
            saveDrink();
          }}
        />
      </View>
    </>
  );
};

export default CocktailPersonalisation;
