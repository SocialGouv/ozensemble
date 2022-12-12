import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler, Platform } from 'react-native';
import { selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import DrinksCategory from '../../components/DrinksCategory';
import {
  drinksCatalog,
  // formatNewDrink,
  getDrinksKeysFromCatalog,
  getDrinkQuantityFromDrinks,
  NO_CONSO,
} from '../ConsoFollowUp/drinksCatalog';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useToast } from '../../services/toast';
import H2 from '../../components/H2';
import DrinkQuantitySetter from '../../components/DrinkQuantitySetter';
import DrinksHeader from '../../components/DrinksHeader';
import { drinksState, ownDrinksState } from '../../recoil/consos';
import { buttonHeight, defaultPaddingFontScale } from '../../styles/theme';
import DateAndTimePickers from './DateAndTimePickers';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import dayjs from 'dayjs';

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

const drinksPerCurrenTimestampSelector = selectorFamily({
  key: 'drinksPerCurrenTimestampSelector',
  get:
    ({ modalTimestamp }) =>
    ({ get }) => {
      const drinks = get(drinksState);
      return drinks.filter((drink) => drink.timestamp === modalTimestamp);
    },
});

const ConsosList = ({ navigation, route }) => {
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(() => route.params.timestamp);
  const drinksPerCurrentaTimestamp = useRecoilValue(
    drinksPerCurrenTimestampSelector({ modalTimestamp: addDrinkModalTimestamp })
  );
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const [localDrinksState, setLocalDrinksState] = useState(drinksPerCurrentaTimestamp);

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

  const onValidateConsos = async () => {
    const drinksWithTimestamps = localDrinksState.map((drink) => ({
      ...drink,
      timestamp: makeSureTimestamp(addDrinkModalTimestamp),
    }));
    onClose();
    let drinkNumber = 0;
    for (let drink of drinksWithTimestamps) {
      drinkNumber++;
      setGlobalDrinksState((state) =>
        [
          ...state.filter((_drink) => _drink.id !== drink.id),
          {
            drinkKey: drink.drinkKey,
            quantity: drink.quantity,
            id: drink.id,
            timestamp: makeSureTimestamp(addDrinkModalTimestamp),
          },
        ].filter((d) => d.quantity > 0)
      );
      logEvent({
        category: 'CONSO',
        action: 'CONSO_ADD',
        name: drink.drinkKey,
        value: Number(drink.quantity),
        dimension6: makeSureTimestamp(addDrinkModalTimestamp),
      });
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
    logEvent({
      category: 'CONSO',
      action: 'CONSO_CLOSE_CONSO_ADDSCREEN',
    });
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
        <DateAndTimePickers
          addDrinkModalTimestamp={addDrinkModalTimestamp}
          setDrinkModalTimestamp={setDrinkModalTimestamp}
        />
        <ButtonPrimaryStyled
          onPress={() => {
            logEvent({
              category: 'CONSO',
              action: 'CONSO_DRINKLESS',
              dimension6: makeSureTimestamp(addDrinkModalTimestamp),
            });
            setGlobalDrinksState((state) => [
              ...state,
              { drinkKey: NO_CONSO, quantity: 1, timestamp: makeSureTimestamp(addDrinkModalTimestamp), id: uuidv4() },
            ]);
            navigation.goBack();
          }}
          content={
            dayjs(addDrinkModalTimestamp).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
              ? "Je n'ai rien bu aujourd'hui"
              : "Je n'ai rien bu ce jour"
          }
        />
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
          <BackButton content="Retour" bold onPress={onCancelConsos} />
          <ButtonPrimary content="Valider" onPress={onValidateConsos} disabled={checkIfNoDrink(localDrinksState)} />
        </ButtonsContainer>
      </ButtonsContainerSafe>
    </Container>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: 0;
`;

const Container = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  padding-top: 20px;
`;

const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: #f9f9f9;
`;

const Title = styled(H2)`
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
  color: #4030a5;
  margin: 50px ${defaultPaddingFontScale()}px 15px;
`;

const buttonsPadding = 10;

const ButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-top-color: #eee;
  border-top-width: 1px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.flexStart ? 'flex-start' : 'space-around')};
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
`;

const MarginBottom = styled.View`
  height: ${({ small }) => buttonHeight * (small ? 0 : 2) + 2 * buttonsPadding}px;
  flex-shrink: 0;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  margin-bottom: 40px;
  align-self: center;
`;

export default ConsosList;
