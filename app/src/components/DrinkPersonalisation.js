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
import ModalUpdateSuppressionDrink from './ModalUpdateSuppressionDrink';
import API from '../services/api';
import { storage } from '../services/storage';
import AddAlcoolQuantity from '../scenes/AddDrink/AddAlcoolQuantity';

const DrinkPersonalisation = ({ updateDrinkKey, hide, quantitySelected, setQuantitySelected }) => {
  const route = useRoute();
  const timestamp = route?.params?.timestamp;

  const onSetQuantity = (q) => {
    setQuantity(q);
  };
  const [ownDrinksCatalog, setOwnDrinksCatalog] = useRecoilState(ownDrinksCatalogState);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  const [drinkName, setDrinkName] = useState(updateDrinkKey);
  const drink = !updateDrinkKey
    ? null
    : ownDrinksCatalog.find(
        (catalogdrink) =>
          catalogdrink.drinkKey === updateDrinkKey &&
          catalogdrink.isDeleted === false &&
          catalogdrink.categoryKey === 'ownDrink'
      );
  const [drinkPrice, setDrinkPrice] = useState(drink?.price ? String(drink?.price) : '');
  const [drinkAlcoolPercentage, setDrinkAlcoolPercentage] = useState(
    drink?.alcoolPercentage ? String(drink?.alcoolPercentage) : ''
  );
  const [quantity, setQuantity] = useState(1);
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const [isUpdateWanted, setIsUpdateWanted] = useState(true);
  const volumeNumber = quantitySelected?.volume ?? drink?.volume.split(' ')[0];

  const saveDrink = async () => {
    const oldDrink =
      drink ??
      ownDrinksCatalog.find(
        (catalogDrink) => catalogDrink.drinkKey === drinkName && catalogDrink.isDeleted === false
      ) ??
      ownDrinksCatalog.find(
        (catalogDrink) => catalogDrink.drinkKey === updateDrinkKey && catalogDrink.isDeleted === false
      );
    const kCal = ((drinkAlcoolPercentage * 0.8 * volumeNumber) / 10) * 7;
    const doses = Math.round((drinkAlcoolPercentage * 0.8 * volumeNumber) / 10) / 10;
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
      const drinkIcon = quantitySelected?.icon ?? oldDrink.icon;
      setOwnDrinksCatalog((oldState) => {
        return oldState.map((oldStateDrink) =>
          oldStateDrink.drinkKey === oldDrink.drinkKey
            ? {
                categoryKey: 'ownDrink',
                drinkKey: drinkName,
                displayFeed: drinkName,
                volume: volumeNumber + ' cl',
                doses: doses,
                icon: drinkIcon,
                price: Number(drinkPrice),
                alcoolPercentage: Number(drinkAlcoolPercentage),
                kcal: kCal,
                custom: true,
                isDeleted: false,
              }
            : oldStateDrink
        );
      });

      setGlobalDrinksState((oldState) => {
        return oldState.map((oldStateDrink) =>
          oldStateDrink.drinkKey === oldDrink.drinkKey ? { ...oldStateDrink, drinkKey: drinkName } : oldStateDrink
        );
      });

      const matomoId = storage.getString('@UserIdv2');
      API.post({
        path: '/consommation/update-own-conso',
        body: {
          matomoId: matomoId,
          oldDrinkKey: oldDrink.drinkKey,
          drinkKey: drinkName,
          volume: volumeNumber + ' cl',
          doses: doses,
          price: Number(drinkPrice),
          kcal: kCal,
        },
      });
      return;
    }

    const icon = quantitySelected.icon;
    setOwnDrinksCatalog((oldState) => {
      return [
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
          isDeleted: false,
        },
        ...oldState,
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
      return oldState.map((oldStateDrink) =>
        oldStateDrink.drinkKey === drinkName ? { ...oldStateDrink, isDeleted: true } : oldStateDrink
      );
    });
  };

  return (
    <>
      <View className="mb-5">
        <TextStyled bold>Nom ou marque</TextStyled>
        <TextInput
          className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
          placeholder="Bière forte, verre de vin au bar..."
          maxLength={23}
          value={drink?.drinkKey}
          onChangeText={(value) => setDrinkName(value)}
        />
        <Text className="text-xs">(23 caractères max)</Text>
      </View>
      <View className="mb-4">
        <TextStyled bold>Quantité d'alcool servie (cl)</TextStyled>
        {!quantitySelected?.volume && !drink ? (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => setShowQuantityModal(true)}>
            <Text className="text-[#CACACD] flex">Sélectionnez une quantité</Text>
            <ArrowDown color="#000000" size={30} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#f3f3f6] h-14 rounded-lg border border-[#dbdbe9] px-4 my-2 flex flex-row justify-between items-center"
            onPress={() => setShowQuantityModal(true)}>
            <Text className="text-[#4030A5] flex">{volumeNumber}</Text>
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
        {!updateDrinkKey ? (
          <ButtonPrimary
            content="Créer ma boisson"
            onPress={() => {
              hide();
              setQuantitySelected(null);
              saveDrink();
            }}
            disabled={!drinkPrice || !drinkAlcoolPercentage || !drinkName || !volumeNumber}
          />
        ) : (
          <View>
            <ButtonPrimary
              content="Mettre à jour ma boisson"
              onPress={() => {
                setIsUpdateWanted(true);
                setShowModalUpdate(true);
              }}
              disabled={!drinkPrice || !drinkAlcoolPercentage || !drinkName || !volumeNumber}
            />
            <TouchableOpacity
              key={isUpdateWanted}
              onPress={() => {
                setIsUpdateWanted(false);
                setShowModalUpdate(true);
              }}>
              <Text className="text-[#4030A5] text-center underline text-base mt-4">Supprimer ma boisson</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalUpdateSuppressionDrink
        isUpdate={isUpdateWanted}
        visible={showModalUpdate}
        onClose={() => {
          hide();
          setShowModalUpdate(false);
        }}
        onUpdate={() => {
          hide();
          setIsUpdateWanted(true);
          saveDrink();
        }}
        onDelete={() => {
          hide();
          setQuantitySelected(null);
          deleteDrink();
        }}
      />
      <AddAlcoolQuantity
        visible={showQuantityModal}
        hide={() => setShowQuantityModal(false)}
        setQuantitySelected={setQuantitySelected}
      />
    </>
  );
};

export default DrinkPersonalisation;
