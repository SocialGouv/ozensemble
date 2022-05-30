import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';
import DrinksCategory from '../../components/DrinksCategory';
import {
  drinksCatalog,
  // formatNewDrink,
  getDrinksKeysFromCatalog,
  getDrinkQuantityFromDrinks,
} from '../ConsoFollowUp/drinksCatalog';
import DatePicker from '../../components/DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import { useToast } from '../../services/toast';
import {
  Container,
  ModalContent,
  Title,
  DateAndTimeContainer,
  ButtonsContainerSafe,
  ButtonsContainer,
  MarginBottom,
} from './styles';
import DrinkQuantitySetter from '../../components/DrinkQuantitySetter';
import DrinksHeader from '../../components/DrinksHeader';
import { drinksState, modalTimestampState, ownDrinksState } from '../../recoil/consos';

const checkIfNoDrink = (drinks) => drinks.filter((d) => d && d.quantity > 0).length === 0;

// const initDrinkState = { name: '', volume: '', degrees: '', isNew: true, code: null };

const mergeOwnDrinksKeys = (ownDrinks, localDrinksState) => {
  const ownDrinksKeys = getDrinksKeysFromCatalog(ownDrinks);
  const ownAllDrinksKeys = ownDrinks.map((d) => d.drinkKey);
  const localOwnDrinksKeys = localDrinksState
    .filter((d) => ownAllDrinksKeys.includes(d.drinkKey))
    .map((d) => d.drinkKey);
  return [...new Set([...ownDrinksKeys, ...localOwnDrinksKeys])];
};

const drinksPerCurrenTimestampSelector = selector({
  key: 'drinksPerCurrenTimestampSelector',
  get: ({ get }) => {
    const modalTimestamp = get(modalTimestampState);
    const drinks = get(drinksState);
    return drinks.filter((drink) => drink.timestamp === modalTimestamp);
  },
});

const ConsosList = ({ navigation }) => {
  const drinksPerCurrentaTimestamp = useRecoilValue(drinksPerCurrenTimestampSelector);
  const setDrinksState = useSetRecoilState(drinksState);
  const [localDrinksState, setLocalDrinksState] = useState(drinksPerCurrentaTimestamp);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addDrinkModalTimestamp, setAddDrinkModalTimestamp] = useRecoilState(modalTimestampState);
  const toast = useToast();

  const [ownDrinks, setOwnDrinks] = useRecoilState(ownDrinksState);

  const scrollRef = useRef(null);
  const isFocused = useIsFocused();

  const mergedOwnDrinksKeys = mergeOwnDrinksKeys(ownDrinks, localDrinksState);
  const withOwnDrinks = mergedOwnDrinksKeys.length > 0;

  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = localDrinksState.find((drink) => drink.drinkKey === drinkKey);
    if (oldDrink) {
      setLocalDrinksState([
        ...localDrinksState.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...localDrinksState.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setLocalDrinksState([
        ...localDrinksState,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
        },
      ]);
    }
  };

  const updateDrink = ({ drinkKey, quantity, id = uuidv4() }) => {
    setDrinksState((state) =>
      [
        ...state.filter((drink) => drink.id !== id),
        { drinkKey, quantity, id, timestamp: addDrinkModalTimestamp },
      ].filter((d) => d.quantity > 0)
    );
  };

  const onValidateConsos = async () => {
    onClose();
    let drinkNumber = 0;
    for (let drink of localDrinksState) {
      drinkNumber++;
      updateDrink(drink);
      matomo.logConsoAdd(drink);
    }
    setLocalDrinksState([]);
    setTimeout(() => {
      toast.show(drinkNumber > 1 ? 'Consommations ajoutées' : 'Consommation ajoutée');
    }, 250);
  };

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCancelConsos = useCallback(() => {
    navigation.goBack();
    setLocalDrinksState([]);
    matomo.logConsoCloseAddScreen();
    return true;
  }, [navigation]);

  const removeOwnDrinkRequest = (drinkKey) => {
    setDrinkQuantityRequest(drinkKey, 0);
    setOwnDrinks((ownDrinks) =>
      ownDrinks.map((d) => {
        if (d.drinkKey !== drinkKey) return d;
        return {
          ...d,
          active: false,
        };
      })
    );
  };

  const updateModalTimestamp = (newTimestamp) => {
    const oldTimestamp = addDrinkModalTimestamp;
    setDrinksState((drinks) =>
      drinks.map((drink) => {
        if (drink.timestamp === oldTimestamp) {
          return {
            ...drink,
            timestamp: newTimestamp,
          };
        }
        return drink;
      })
    );
    setAddDrinkModalTimestamp(newTimestamp);
  };

  useEffect(() => {
    if (isFocused) {
      setLocalDrinksState(drinksPerCurrentaTimestamp);
      BackHandler.addEventListener('hardwareBackPress', onCancelConsos);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onCancelConsos);
  }, [isFocused, onCancelConsos, drinksPerCurrentaTimestamp]);

  return (
    <Container>
      <ModalContent ref={scrollRef} disableHorizontal>
        <Title>Sélectionnez vos consommations</Title>
        <DateAndTimeContainer>
          <DateOrTimeDisplay mode="date" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('date')} />
          <DateOrTimeDisplay mode="time" date={addDrinkModalTimestamp} onPress={() => setShowDatePicker('time')} />
        </DateAndTimeContainer>
        {withOwnDrinks && (
          <>
            <DrinksHeader content="Mes boissons" />
            {mergedOwnDrinksKeys.map((drinkKey, index) => (
              <DrinkQuantitySetter
                oneLine
                key={drinkKey}
                drinkKey={drinkKey}
                setDrinkQuantity={setDrinkQuantityRequest}
                quantity={getDrinkQuantityFromDrinks(localDrinksState, drinkKey)}
                catalog={ownDrinks}
                index={index}
                onDelete={removeOwnDrinkRequest}
              />
            ))}
            <DrinksHeader content="Génériques" />
          </>
        )}
        {drinksCatalog
          .map(({ categoryKey }) => categoryKey)
          .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
          .map((category, index) => (
            <DrinksCategory
              key={index}
              drinksCatalog={drinksCatalog}
              category={category}
              index={index}
              drinks={localDrinksState}
              setDrinkQuantity={setDrinkQuantityRequest}
            />
          ))}
        <MarginBottom />
      </ModalContent>
      <ButtonsContainerSafe>
        <ButtonsContainer>
          <ButtonPrimary content="Valider" onPress={onValidateConsos} disabled={checkIfNoDrink(localDrinksState)} />
          <BackButton content="Retour" bold onPress={onCancelConsos} />
        </ButtonsContainer>
      </ButtonsContainerSafe>
      <DatePicker
        visible={Boolean(showDatePicker)}
        mode={showDatePicker}
        initDate={addDrinkModalTimestamp}
        selectDate={(newDate) => {
          if (newDate && showDatePicker === 'date') {
            const newDateObject = new Date(newDate);
            const oldDateObject = new Date(addDrinkModalTimestamp);
            newDate = new Date(
              newDateObject.getFullYear(),
              newDateObject.getMonth(),
              newDateObject.getDate(),
              oldDateObject.getHours(),
              oldDateObject.getMinutes()
            );
          }
          setShowDatePicker(false);
          if (newDate) updateModalTimestamp(makeSureTimestamp(newDate));
        }}
      />
    </Container>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: 0;
`;

export default ConsosList;
