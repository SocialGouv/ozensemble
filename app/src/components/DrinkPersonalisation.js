import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { drinksState } from '../recoil/consos';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';
import { ownDrinksState } from '../recoil/consos';
import { useSetRecoilState } from 'recoil';
import API from '../services/api';
import { storage } from '../services/storage';
import dayjs from 'dayjs';
import { makeSureTimestamp } from '../helpers/dateHelpers';

const DrinkPersonalisation = ({ navigation, quantitySelected, setQuantitySelected }) => {
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [drinkName, setDrinkName] = useState('');
  const [drinkPrice, setDrinkPrice] = useState(0);
  const [drinkAlcoolPercentage, setDrinkAlcoolPercentage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const setOwnDrinksCatalog = useSetRecoilState(ownDrinksState);
  const [doses, setDoses] = useState(0);
  const [kCal, setkCal] = useState(0);
  const [oldDrink, setOldDrink] = useState(null);
  const setGlobalDrinksState = useSetRecoilState(drinksState);

  const saveDrink = (name, volume, alcoolPercentage, price, icon) => {
    setOwnDrinksCatalog((oldState) => {
      setDoses(Math.round((alcoolPercentage * 0.8 * volume) / 10) / 10);
      setkCal(((alcoolPercentage * 0.8 * volume) / 10) * 7);
      setOldDrink(oldState.find((drink) => drink.drinkKey === name));
      if (oldDrink) {
        return oldState;
      } else {
        return [
          ...oldState,
          {
            categoryKey: 'ownDrink',
            drinkKey: name,
            displayFeed: name,
            volume: volume,
            doses: doses,
            icon: icon,
            price: price,
            alcoolPercentage: alcoolPercentage,
            kcal: kCal,
            custom: true,
          },
        ];
      }
    });
  };
  return (
    <View>
      <View>
        <View className="mb-5">
          <TextStyled bold>Nom ou marque</TextStyled>
          <TextInput
            className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
            placeholder="Bière forte, verre de vin au bar..."
            value={drinkName}
            onChangeText={(value) => setDrinkName(value)}
          />
          <Text className="text-xs">(30 caractères max)</Text>
        </View>
        <View className="mb-4">
          <TextStyled bold>Quantité d'alcool servie (cl)</TextStyled>
          {!quantitySelected?.volume ? (
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
              <Text className="text-[#4030A5] flex">{quantitySelected?.volume?.split(' ')[0]}</Text>
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
              onChangeText={(value) => setDrinkAlcoolPercentage(value)}
            />
          </View>
          <View className="basis-1/2 pl-2">
            <TextStyled bold>Prix (€)</TextStyled>
            <TextInput
              className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
              placeholder="Euros"
              value={drinkPrice}
              onChangeText={(value) => setDrinkPrice(value)}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center flex-wrap gap-y-6">
          <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
          <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
        </View>
        <View className="flex flex-row justify-center mt-14 mb-10 ">
          <ButtonPrimary
            content="Créer ma boisson"
            onPress={() => {
              setQuantitySelected(null);
              navigation.goBack();
              saveDrink(
                drinkName,
                quantitySelected?.volume.split(' ')[0],
                drinkAlcoolPercentage,
                drinkPrice,
                quantitySelected.icon
              );
              if (quantity > 0) {
                const matomoId = storage.getString('@UserIdv2');
                const drinkId = uuidv4();
                setGlobalDrinksState((state) =>
                  [
                    ...state.filter((_drink) => _drink.id !== drinkId),
                    {
                      drinkKey: drinkName,
                      quantity: Number(quantity),
                      id: drinkId,
                      isOwnDrink: true,
                      timestamp: makeSureTimestamp(dayjs()),
                    },
                  ].filter((d) => d.quantity > 0)
                );
                API.post({
                  path: '/consommation',
                  body: {
                    id: drinkId,
                    matomoId: matomoId,
                    name: drinkName,
                    drinkKey: drinkName,
                    quantity: Number(quantity),
                    date: makeSureTimestamp(dayjs()),
                    doses: Number(doses),
                    kcal: Number(kCal),
                    price: Number(drinkPrice),
                    volume: quantitySelected?.volume,
                  },
                });
              }
            }}
            disabled={
              drinkPrice === '' || drinkAlcoolPercentage === '' || drinkName === '' || !quantitySelected?.volume
            }
          />
        </View>
      </View>
    </View>
  );
};

export default DrinkPersonalisation;
