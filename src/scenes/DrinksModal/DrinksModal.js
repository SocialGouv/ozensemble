import React, { useCallback } from 'react';
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
import DateOrTimeDisplay from './DateOrTimeDisplay';
import DrinksCategory from './DrinksCategory';
import {
  drinksCatalog,
  formatNewDrink,
  getDrinksKeysFromCatalog,
  getDrinkQuantityFromDrinks,
} from '../ConsoFollowUp/drinksCatalog';
import DatePicker from './DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import { withToast } from '../../services/toast';
import BarCodeReader from './BarCodeReader';
import {
  SafeAreaViewStyled,
  ModalContent,
  Title,
  DateAndTimeContainer,
  ButtonsContainerSafe,
  ButtonsContainer,
  MarginBottom,
  SmallMarginBottom,
} from './styles';
import NewDrinkForm from './NewDrinkForm';
import DrinkQuantitySetter from './DrinkQuantitySetter';
import DrinksHeader from './DrinksHeader';

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

const DrinksModal = ({
  date,
  drinks,
  updateDrink,
  updateModalTimestamp,
  setToast,
  setOwnDrink,
  ownDrinks,
  removeOwnDrink,
  navigation,
}) => {
  const [localDrinksState, setLocalDrinksState] = React.useState(drinks);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showBarCodeReader, setShowBarCodeReader] = React.useState(false);
  const [showNewDrinkForm, setShowNewDrinkForm] = React.useState(false);
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

  const onAddDrinkToCatalog = async (name, volume, degrees, drinkKey, quantity) => {
    setNewDrink(initDrinkState);
    setShowNewDrinkForm(false);
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

  React.useEffect(() => {
    if (isFocused) {
      setLocalDrinksState(drinks);
      BackHandler.addEventListener('hardwareBackPress', onCancelConsos);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onCancelConsos);
  }, [isFocused, onCancelConsos, drinks]);

  return (
    <SafeAreaViewStyled>
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
              category={category}
              index={index}
              drinks={localDrinksState}
              setDrinkQuantity={setDrinkQuantityRequest}
            />
          ))}
        <>
          <SmallMarginBottom />
          <ButtonsContainer>
            <ButtonPrimary
              content="Scannez une boisson"
              onPress={() => {
                setShowBarCodeReader(true);
                matomo.logConsoScanOwnOpen();
              }}
            />
          </ButtonsContainer>
          <UnderlinedButton
            content="Ajoutez manuellement"
            bold
            onPress={() => {
              setShowNewDrinkForm(true);
              matomo.logConsoAddOwnManuallyOpen();
            }}
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
      <BarCodeReader
        visible={showBarCodeReader}
        onClose={() => setShowBarCodeReader(false)}
        onAddDrink={(drinkData = initDrinkState) => {
          setShowBarCodeReader(false);
          setNewDrink(drinkData);
          setShowNewDrinkForm(true);
        }}
      />
      <NewDrinkForm
        name={newDrink.name}
        volume={newDrink.volume}
        degrees={newDrink.degrees}
        isNew={newDrink.isNew}
        code={newDrink.code}
        visible={showNewDrinkForm}
        key={showNewDrinkForm}
        onClose={() => setShowNewDrinkForm(false)}
        onValidate={onAddDrinkToCatalog}
      />
    </SafeAreaViewStyled>
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
export default compose(connect(makeStateToProps, dispatchToProps), withToast)(DrinksModal);
