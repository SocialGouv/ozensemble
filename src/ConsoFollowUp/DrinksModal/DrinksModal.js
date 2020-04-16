import React from 'react';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'recompose';
import { getDrinksPerCurrentDrinksTimestamp, getModalTimestamp, updateDrink, updateModalTimestamp } from '../consoDuck';
import ButtonPrimary from '../../components/ButtonPrimary';
import H2 from '../../components/H2';
import UnderlinedButton from '../../components/UnderlinedButton';
import DateOrTimeDisplay from './DateOrTimeDisplay';
import DrinksCategory from './DrinksCategory';
import { drinksCatalog } from '../drinksCatalog';
import DatePicker from './DatePicker';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../matomo';

const checkIfNoDrink = drinks => drinks.filter(d => d && d.quantity > 0).length === 0;

const DrinksModal = ({ visible, date, drinks, updateDrink, updateModalTimestamp, setShowSetDrinksModal, theme }) => {
  const [localDrinksState, setLocalDrinksState] = React.useState(drinks);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setLocalDrinksState(drinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = localDrinksState.find(drink => drink.drinkKey === drinkKey);
    if (oldDrink) {
      setLocalDrinksState([
        ...localDrinksState.filter(drink => drink.drinkKey !== drinkKey),
        {
          ...localDrinksState.find(drink => drink.drinkKey === drinkKey),
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
    for (let drink of localDrinksState) {
      updateDrink(drink);
      matomo.logConsoAdd(drink);
    }
    setLocalDrinksState([]);
    setShowSetDrinksModal(false);
  };

  const onCancelConsos = () => {
    setLocalDrinksState([]);
    setShowSetDrinksModal(false);
    matomo.logConsoCloseAddScreen();
    return true;
  };

  return (
    <ModalStyled visible={visible} transparent animationType="slide" onRequestClose={onCancelConsos}>
      <SafeAreaViewStyled>
        <ModalContent>
          <Title>Sélectionnez vos consommations</Title>
          <DateAndTimeContainer>
            <DateOrTimeDisplay mode="date" date={date} onPress={() => setShowDatePicker('date')} />
            <DateOrTimeDisplay mode="time" date={date} onPress={() => setShowDatePicker('time')} />
          </DateAndTimeContainer>
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
          <MarginBottom />
        </ModalContent>
        <ButtonsContainerSafe>
          <ButtonsContainer>
            <ButtonPrimary content="Valider" onPress={onValidateConsos} disabled={checkIfNoDrink(localDrinksState)} />
            <UnderlinedButton content="Retour" bold onPress={onCancelConsos} />
          </ButtonsContainer>
        </ButtonsContainerSafe>
        <DatePicker
          visible={Boolean(showDatePicker)}
          mode={showDatePicker}
          selectDate={newDate => {
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
      </SafeAreaViewStyled>
    </ModalStyled>
  );
};

const ModalStyled = styled.Modal``;

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex: 1;
`;

const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whiteBg};
`;

const Title = styled(H2)`
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
  color: ${({ theme }) => theme.colors.title};
  margin: 50px 30px 15px;
`;

const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const buttonsPadding = 10;

const ButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.whiteBg};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.whiteBg};
`;

const MarginBottom = styled.View`
  height: ${({ theme }) => theme.dimensions.buttonHeight + 2 * buttonsPadding}px;
`;

const makeStateToProps = () => state => ({
  drinks: getDrinksPerCurrentDrinksTimestamp(state),
  date: getModalTimestamp(state),
});
const dispatchToProps = {
  updateDrink,
  updateModalTimestamp,
};

export default compose(
  connect(
    makeStateToProps,
    dispatchToProps
  ),
  withTheme
)(DrinksModal);
