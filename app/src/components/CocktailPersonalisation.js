import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import TextStyled from './TextStyled';
import ArrowDown from './ArrowDown';
import { QuantitySetter } from './DrinkQuantitySetter';
import ButtonPrimary from './ButtonPrimary';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { drinksState, ownDrinksCatalogState } from '../recoil/consos';
import { useRoute } from '@react-navigation/native';

import ModalUpdateSuppressionCocktail from './ModalUpdateSuppressionCocktail';
import { storage } from '../services/storage';
import API from '../services/api';

const CocktailPersonalisation = ({ navigation, setCocktailSelected, cocktailSelected }) => {
  const route = useRoute();
  const timestamp = route?.params?.timestamp;
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [showModal, setShowModal] = useState(false);
  const [ownDrinksCatalog, setOwnDrinksCatalog] = useRecoilState(ownDrinksCatalogState);
  const drink = ownDrinksCatalog.find(
    (catalogdrink) => catalogdrink.drinkKey === route?.params?.drinkKey && catalogdrink.isDeleted === false
  );
  const drinkName = cocktailSelected?.name ?? route?.params?.drinkKey;
  const [drinkPrice, setDrinkPrice] = useState(drink?.price ? String(drink?.price) : '');
  const drinkVolume = cocktailSelected?.volume ?? drink?.volume;
  const drinkDoses = cocktailSelected?.doses ?? drink?.doses;
  const drinkKcal = cocktailSelected?.kCal ?? drink?.kcal;
  const [quantity, setQuantity] = useState(0);
  const [isUpdateWanted, setIsUpdateWanted] = useState(false);
  const setGlobalDrinksState = useSetRecoilState(drinksState);

  const saveDrink = async () => {
    const oldDrink =
      drink ??
      ownDrinksCatalog.find(
        (catalogDrink) => catalogDrink.drinkKey === cocktailSelected?.name && catalogDrink.isDeleted === false
      );
    if (oldDrink) {
      if (!isUpdateWanted) {
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
        return oldState.map((drink) =>
          drink.drinkKey === oldDrink.drinkKey
            ? {
                categoryKey: 'ownCocktail',
                drinkKey: drinkName,
                displayFeed: drinkName,
                volume: drinkVolume + ' cl',
                doses: drinkDoses,
                icon: 'CocktailGlass',
                price: Number(drinkPrice),
                kcal: drinkKcal,
                custom: true,
                isDeleted: false,
              }
            : drink
        );
      });
      setGlobalDrinksState((oldState) => {
        return oldState.map((drink) =>
          drink.drinkKey === oldDrink.drinkKey ? { ...drink, drinkKey: drinkName } : drink
        );
      });
      const matomoId = storage.getString('@UserIdv2');
      await API.post({
        path: '/consommation/updateConso',
        body: {
          matomoId: matomoId,
          oldDrinkKey: oldDrink.drinkKey,
          drinkKey: drinkName,
          volume: drinkVolume + ' cl',
          doses: drinkDoses,
          price: Number(drinkPrice),
          kcal: drinkKcal,
        },
      });
      return;
    }
    setOwnDrinksCatalog((oldState) => {
      return [
        ...oldState,
        {
          categoryKey: 'ownCocktail',
          drinkKey: drinkName,
          displayFeed: drinkName,
          volume: drinkVolume + ' cl',
          doses: drinkDoses,
          icon: 'CocktailGlass',
          price: Number(drinkPrice),
          kcal: drinkKcal,
          custom: true,
          isDeleted: false,
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

  const deleteDrink = async () => {
    setOwnDrinksCatalog((oldState) => {
      return oldState.map((drink) => (drink.drinkKey == drinkName ? { ...drink, isDeleted: true } : drink));
    });
  };
  return (
    <>
      <View className="mb-4">
        <TextStyled bold>Cocktail</TextStyled>
        {!cocktailSelected?.name && !route?.params?.drinkKey ? (
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
            <Text className="text-[#4030A5] flex">{cocktailSelected?.name ?? route?.params?.drinkKey}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="mb-5">
        <TextStyled bold>Prix (€)</TextStyled>
        <TextInput
          className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
          placeholder="Euros"
          keyboardType="decimal-pad"
          maxLength={5}
          value={String(drinkPrice)}
          onChangeText={(value) => setDrinkPrice(value)}
        />
      </View>
      <View className="flex flex-row justify-between items-center flex-wrap">
        <TextStyled bold>Quantité bue aujourd'hui</TextStyled>
        <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
      </View>
      <View className="flex flex-row justify-center mt-14 mb-10">
        {!route?.params?.drinkKey ? (
          <ButtonPrimary
            content="Créer mon cocktail"
            onPress={() => {
              saveDrink();
              setCocktailSelected(null);

              navigation.goBack();
            }}
            disabled={!drinkPrice || !drinkName}
          />
        ) : (
          <View>
            <ButtonPrimary
              content="Modifier mon cocktail"
              onPress={() => {
                setIsUpdateWanted(true);
                setShowModal(true);
              }}
              disabled={!drinkPrice || !drinkName}
            />
            <TouchableOpacity
              onPress={() => {
                setIsUpdateWanted(false);
                setShowModal(true);
              }}>
              <Text className="text-[#4030A5] text-center underline text-base mt-4">Supprimer mon cocktail</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalUpdateSuppressionCocktail
        isUpdate={isUpdateWanted}
        showModal={showModal}
        onClose={() => {
          navigation.goBack();
          setShowModal(false);
        }}
        onUpdate={() => {
          navigation.goBack();
          setIsUpdateWanted(true);
          saveDrink();
        }}
        onDelete={() => {
          navigation.goBack();
          setCocktailSelected(null);
          deleteDrink();
        }}
      />
    </>
  );
};

export default CocktailPersonalisation;
