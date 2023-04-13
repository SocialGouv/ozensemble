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

import ModalModification from './ModalModification';

const CocktailPersonalisation = ({ navigation, setQuantitySelected, quantitySelected }) => {
  const route = useRoute();
  const timestamp = route?.params?.timestamp;
  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [showModal, setShowModal] = useState(false);
  const [ownDrinksCatalog, setOwnDrinksCatalog] = useRecoilState(ownDrinksCatalogState);
  const drink = ownDrinksCatalog.find((catalogdrink) => catalogdrink.drinkKey === route?.params?.drinkKey);
  const drinkName = route?.params?.drinkKey ?? quantitySelected?.name;
  const [drinkPrice, setDrinkPrice] = useState(Number(drink?.price));
  const drinkVolume = quantitySelected?.volume ?? drink?.volume;
  const drinkDoses = quantitySelected?.doses ?? drink?.doses;
  const drinkKcal = quantitySelected?.kCal ?? drink?.kcal;
  const [quantity, setQuantity] = useState(0);
  const [isUpdateWanted, setIsUpdateWanted] = useState(false);
  const setGlobalDrinksState = useSetRecoilState(drinksState);

  const saveDrink = async () => {
    const oldDrink =
      drink ?? ownDrinksCatalog.find((drink) => drink.drinkKey === quantitySelected?.name && drink.isDeleted === false);
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
        return [
          ...oldState.filter((_drink) => _drink.id !== oldDrink.id),
          {
            categoryKey: 'ownCocktail',
            drinkKey: drinkName,
            displayFeed: drinkName,
            volume: drinkVolume,
            doses: drinkDoses,
            icon: 'CocktailGlass',
            price: Number(drinkPrice),
            kcal: drinkKcal,
            custom: true,
            isDeleted: false,
          },
        ];
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
      return [
        ...oldState.filter((drinkOldState) => drinkOldState.drinkKey !== drink.drinkKey),
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
          isDeleted: true,
        },
      ];
    });
  };
  return (
    <>
      <View className="mb-4">
        <TextStyled bold>Cocktail</TextStyled>
        {!quantitySelected?.name && !route?.params?.drinkKey ? (
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
            <Text className="text-[#4030A5] flex">{quantitySelected?.name ?? route?.params?.drinkKey}</Text>
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
          value={drinkPrice}
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
              setQuantitySelected(null);
              saveDrink();
              navigation.goBack();
            }}
            disabled={!drinkPrice || !drinkName}
          />
        ) : (
          <View>
            <ButtonPrimary
              content="Modifier mon cocktail"
              onPress={() => {
                setQuantitySelected(null);
                setIsUpdateWanted(true);
                setShowModal(true);
                //navigation.goBack();
              }}
              disabled={!drinkPrice || !drinkName}
            />
            <TouchableOpacity
              onPress={() => {
                setQuantitySelected(null);
                setIsUpdateWanted(false);
                setShowModal(true);
              }}>
              <Text className="text-[#4030A5] text-center underline text-base">Supprimer mon cocktail</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalModification
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
          setQuantitySelected(null);
          deleteDrink();
        }}
      />
    </>
  );
};

export default CocktailPersonalisation;
