import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRoute } from '@react-navigation/native';
import { drinksState, ownDrinksCatalogState } from '../recoil/consos';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';
import { storage } from '../services/storage';

const DrinkPersonalisation = ({ navigation, quantitySelected, setQuantitySelected }) => {
  const route = useRoute();
  const timestamp = route?.params?.timestamp;

  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [ownDrinksCatalog, setOwnDrinksCatalog] = useRecoilState(ownDrinksCatalogState);

  const [drinkName, setDrinkName] = useState(route?.params?.drinkKey);
  const drink = ownDrinksCatalog.find((catalogdrink) => catalogdrink.drinkKey === route?.params?.drinkKey);

  const [drinkPrice, setDrinkPrice] = useState(Number(drink?.price));
  const [drinkAlcoolPercentage, setDrinkAlcoolPercentage] = useState(drink?.alcoolPercentage);
  const [quantity, setQuantity] = useState(0);
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const saveDrink = async () => {
    const volumeNumber = Number(quantitySelected?.volume);
    const doses = Math.round((drinkAlcoolPercentage * 0.8 * volumeNumber) / 10) / 10;
    const icon = quantitySelected.icon;
    const kCal = ((drinkAlcoolPercentage * 0.8 * volumeNumber) / 10) * 7;
    const oldDrink = ownDrinksCatalog.find((drink) => drink.drinkKey === drinkName);
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
          categoryKey: 'ownDrink',
          drinkKey: drinkName,
          displayFeed: drinkName,
          volume: quantitySelected?.volume + ' cl',
          doses: doses,
          icon: icon,
          price: Number(drinkPrice),
          alcoolPercentage: Number(drinkAlcoolPercentage),
          kcal: kCal,
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
            drinkKey: drinkName,
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
      <View className="mb-5">
        <TextStyled bold>Nom ou marque</TextStyled>
        <TextInput
          className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
          placeholder="Bière forte, verre de vin au bar..."
          value={drinkName}
          onChangeText={(value) => setDrinkName(value)}
        />
        <Text className="text-xs">(23 caractères max)</Text>
      </View>
      <View className="mb-4">
        <TextStyled bold>Quantité d'alcool servie (cl)</TextStyled>
        {!quantitySelected?.volume && !route?.params?.drinkKey ? (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => navigation.navigate('ADD_QUANTITY')}>
            <Text className="text-[#CACACD] flex">Sélectionnez une quantité</Text>
            <ArrowDown color="#000000" size={30} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => navigation.navigate('ADD_QUANTITY')}>
            <Text className="text-[#4030A5] flex">{quantitySelected?.volume ?? route?.params?.volumeNumber}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-row justify-between mb-8">
        <View className="basis-1/2 pr-2">
          <TextStyled bold>Degré d'alcool (%)</TextStyled>
          <TextInput
            className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
            placeholder="Degrés"
            value={drinkAlcoolPercentage}
            keyboardType="decimal-pad"
            onChangeText={(value) => setDrinkAlcoolPercentage(value)}
          />
        </View>
        <View className="basis-1/2 pl-2">
          <TextStyled bold>Prix (€)</TextStyled>
          <TextInput
            className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
            placeholder="Euros"
            value={drinkPrice}
            keyboardType="decimal-pad"
            onChangeText={(value) => setDrinkPrice(value)}
          />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center flex-wrap gap-y-6">
        <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
        <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
      </View>
      <View className="flex flex-row justify-center mt-14 mb-10 ">
        {!route?.params?.drinkKey ? (
          <ButtonPrimary
            content="Créer ma boisson"
            onPress={() => {
              setQuantitySelected(null);
              saveDrink();
              navigation.goBack();
            }}
            disabled={
              drinkPrice === '' || drinkAlcoolPercentage === '' || drinkName === '' || !quantitySelected?.volume
            }
          />
        ) : (
          <ButtonPrimary
            content="Modifier ma boisson"
            onPress={() => {
              setQuantitySelected(null);
              saveDrink();
              navigation.goBack();
            }}
            disabled={!drinkPrice || !drinkAlcoolPercentage || !drinkName || !quantitySelected?.volume}
          />
        )}
      </View>
    </>
  );
};

export default DrinkPersonalisation;
