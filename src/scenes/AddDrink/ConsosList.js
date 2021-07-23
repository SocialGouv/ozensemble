import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { compose } from 'recompose';
import {
  getDrinksPerCurrentDrinksTimestamp,
  getModalTimestamp,
  updateDrink,
  updateModalTimestamp,
  setOwnDrink,
  removeOwnDrink,
  getOwnDrinks,
} from '../ConsoFollowUp/consoDuck';
import ButtonPrimary from '../../components/ButtonPrimary';
import UnderlinedButton from '../../components/UnderlinedButton';
import DateOrTimeDisplay from '../../components/DateOrTimeDisplay';
import DrinksCategory from '../../components/DrinksCategory';
import {
  drinksCatalog,
  formatNewDrink,
  getDrinksKeysFromCatalog,
  getDrinkQuantityFromDrinks,
} from '../ConsoFollowUp/drinksCatalog';
import DatePicker from '../../components/DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import { withToast } from '../../services/toast';
import {
  Container,
  ModalContent,
  Title,
  DateAndTimeContainer,
  ButtonsContainerSafe,
  ButtonsContainer,
  MarginBottom,
  SmallMarginBottom,
} from './styles';
import DrinkQuantitySetter from '../../components/DrinkQuantitySetter';
import DrinksHeader from '../../components/DrinksHeader';

const checkIfNoDrink = (drinks) => drinks.filter((d) => d && d.quantity > 0).length === 0;

const initDrinkState = { name: '', volume: '', degrees: '', isNew: true, code: null };

const mergeOwnDrinksKeys = (ownDrinks, localDrinksState) => {
  const ownDrinksKeys = getDrinksKeysFromCatalog(ownDrinks);
  const ownAllDrinksKeys = ownDrinks.map((d) => d.drinkKey);
  const localOwnDrinksKeys = localDrinksState
    .filter((d) => ownAllDrinksKeys.includes(d.drinkKey))
    .map((d) => d.drinkKey);
  return [...new Set([...ownDrinksKeys, ...localOwnDrinksKeys])];
};

const ConsosList = ({
  date,
  drinks,
  updateDrink,
  updateModalTimestamp,
  setToast,
  setOwnDrink,
  ownDrinks,
  removeOwnDrink,
  navigation,
  route,
}) => {
  const [localDrinksState, setLocalDrinksState] = React.useState(drinks);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [newDrink, setNewDrink] = React.useState(initDrinkState);

  const scrollRef = React.useRef(null);
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
    onClose();
    let drinkNumber = 0;
    for (let drink of localDrinksState) {
      drinkNumber++;
      updateDrink(drink);
      matomo.logConsoAdd(drink);
    }
    setLocalDrinksState([]);
    setTimeout(() => {
      setToast(drinkNumber > 1 ? 'Consommations ajoutées' : 'Consommation ajoutée');
    }, 250);
  };

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCancelConsos = useCallback(() => {
    onClose();
    setLocalDrinksState([]);
    matomo.logConsoCloseAddScreen();
    return true;
  }, [onClose]);

  const onAddDrinkToCatalog = async ({ name, volume, degrees, drinkKey, quantity }) => {
    setNewDrink(initDrinkState);
    const formattedDrink = formatNewDrink(name, volume, degrees, drinkKey);
    setOwnDrink(formattedDrink);
    setDrinkQuantityRequest(formattedDrink.drinkKey, quantity);
    setTimeout(() => {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }, 150);
  };

  const removeOwnDrinkRequest = (drinkKey) => {
    setDrinkQuantityRequest(drinkKey, 0);
    removeOwnDrink(drinkKey);
  };

  useEffect(() => {
    if (isFocused) {
      setLocalDrinksState(drinks);
      BackHandler.addEventListener('hardwareBackPress', onCancelConsos);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onCancelConsos);
  }, [isFocused, onCancelConsos, drinks]);

  useEffect(() => {
    if (route?.params?.addBarCodeDrink) {
      const newDrink = route?.params?.addBarCodeDrink;
      setNewDrink(route?.params?.addBarCodeDrink);
      navigation.setParams({ addBarCodeDrink: null });
      navigation.push('CONSO_NEW_DRINK', { init: newDrink });
    } else {
      setNewDrink(initDrinkState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.addBarCodeDrink?.timestamp]);

  useEffect(() => {
    if (route?.params?.addNewDrinkFromForm) {
      onAddDrinkToCatalog(route?.params?.addNewDrinkFromForm);
    } else {
      setNewDrink(initDrinkState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.addNewDrinkFromForm?.timestamp]);

  return (
    <Container>
      <ModalContent ref={scrollRef} disableHorizontal>
        <Title>Sélectionnez vos consommations</Title>
        <DateAndTimeContainer>
          <DateOrTimeDisplay mode="date" date={date} onPress={() => setShowDatePicker('date')} />
          <DateOrTimeDisplay mode="time" date={date} onPress={() => setShowDatePicker('time')} />
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
        <>
          <SmallMarginBottom />
          <ButtonsContainer>
            <ButtonPrimary content="Scannez une boisson" onPress={() => navigation.push('CONSO_SCAN_BAR_CODE')} />
          </ButtonsContainer>
          <UnderlinedButton
            content="Ajoutez manuellement"
            bold
            onPress={() => navigation.push('CONSO_NEW_DRINK', { init: newDrink })}
          />
        </>
        <MarginBottom />
      </ModalContent>
      <ButtonsContainerSafe>
        <ButtonsContainer>
          <ButtonPrimary content="Validez" onPress={onValidateConsos} disabled={checkIfNoDrink(localDrinksState)} />
          <UnderlinedButton content="Retour" bold onPress={onCancelConsos} />
        </ButtonsContainer>
      </ButtonsContainerSafe>
      <DatePicker
        visible={Boolean(showDatePicker)}
        mode={showDatePicker}
        initDate={date}
        selectDate={(newDate) => {
          if (newDate && showDatePicker === 'date') {
            const newDateObject = new Date(newDate);
            const oldDateObject = new Date(date);
            newDate = new Date(
              newDateObject.getFullYear(),
              newDateObject.getMonth(),
              newDateObject.getDate(),
              oldDateObject.getHours(),
              oldDateObject.getMinutes()
            );
          }
          setShowDatePicker(false);
          if (newDate) {
            updateModalTimestamp(makeSureTimestamp(newDate));
          }
        }}
      />
    </Container>
  );
};

const makeStateToProps = () => (state) => ({
  drinks: getDrinksPerCurrentDrinksTimestamp(state),
  date: getModalTimestamp(state),
  ownDrinks: getOwnDrinks(state),
});
const dispatchToProps = {
  updateDrink,
  updateModalTimestamp,
  setOwnDrink,
  removeOwnDrink,
};
export default compose(connect(makeStateToProps, dispatchToProps), withToast)(ConsosList);
