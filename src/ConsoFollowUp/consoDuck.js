import { v4 as uuidv4 } from 'uuid';
import {
  today,
  dateWithoutTime,
  firstDateIsBeforeSecondDate,
  differenceOfDays,
  dateIsBeforeOrToday,
} from '../helpers/dateHelpers';
import { drinksCatalog } from './drinksCatalog';
import { createSelector } from 'reselect';
import { REHYDRATE } from 'redux-persist';

// Utils
export const followupNumberOfDays = 15;
export const maxDosesOnScreen = 50;

const removeDrinkFromDrinksAndId = (drinks, id) => drinks.filter(drink => drink.id !== id);
const removeDrinkFromDrinksAndTimestamp = (drinks, timestamp) => drinks.filter(drink => drink.timestamp !== timestamp);

export const mapDrinkToDose = ({ drinkKey, quantity }) => {
  const drink = drinksCatalog.find(drink => drink.drinkKey === drinkKey);
  return drink.doses * quantity;
};

export const reduceDrinksToDailyDoses = drinks =>
  drinks.reduce((dailyDoses, drink) => {
    const day = dateWithoutTime(drink.timestamp);
    if (dailyDoses[day]) {
      return {
        ...dailyDoses,
        [day]: dailyDoses[day] + mapDrinkToDose(drink),
      };
    }
    return {
      ...dailyDoses,
      [day]: mapDrinkToDose(drink),
    };
  }, {});

export const computeHighestDailyDose = drinks => {
  const dailyDoses = reduceDrinksToDailyDoses(drinks);
  return Math.min(maxDosesOnScreen, Math.max(...Object.values(dailyDoses)));
};

export const getDrinksKeysFromCategory = categoryKey =>
  drinksCatalog.filter(drink => drink.categoryKey === categoryKey).map(({ drinkKey }) => drinkKey);

export const getDisplayName = (drinkKey, quantity) => {
  const drink = drinksCatalog.find(drink => drink.drinkKey === drinkKey);
  return drink.displayFeed(quantity);
};

export const getDisplayDrinksModalName = drinkKey => {
  const drink = drinksCatalog.find(drink => drink.drinkKey === drinkKey);
  return drink.displayDrinkModal;
};

export const getVolume = drinkKey => {
  const drink = drinksCatalog.find(drink => drink.drinkKey === drinkKey);
  return drink.volume;
};

export const getIcon = drinkKey => {
  const drink = drinksCatalog.find(drink => drink.drinkKey === drinkKey);
  return drink.icon;
};

// Actions
const CONSO_UPDATE_DRINK = 'CONSO_UPDATE_DRINK';
const CONSO_REMOVE_DRINK = 'CONSO_REMOVE_DRINK';
const CONSO_SET_MODAL_TIMESTAMP = 'CONSO_SET_MODAL_TIMESTAMP';
const CONSO_UPDATE_MODAL_TIMESTAMP = 'CONSO_UPDATE_MODAL_TIMESTAMP';

// Actions creators
export const updateDrink = ({ drinkKey, quantity, id = uuidv4() }) => ({
  type: CONSO_UPDATE_DRINK,
  payload: { drinkKey, quantity, id },
});

export const removeDrink = timestamp => ({
  type: CONSO_REMOVE_DRINK,
  payload: { timestamp },
});

export const setModalTimestamp = timestamp => ({
  type: CONSO_SET_MODAL_TIMESTAMP,
  payload: timestamp,
});

export const updateModalTimestamp = timestamp => ({
  type: CONSO_UPDATE_MODAL_TIMESTAMP,
  payload: timestamp,
});

// Selectors
export const getDrinksState = ({ conso: { drinks } }) => drinks;
export const checkIfThereIsDrinks = ({ conso: { drinks } }) => drinks.length > 0;
export const getModalTimestamp = ({ conso: { modalTimestamp } }) => modalTimestamp;

export const getStartDate = ({ conso: { startDate } }) => startDate;
export const getDays = ({ conso: { drinks, startDate } }) => {
  const lastDayOfDrinks = Math.max(...drinks.map(({ timestamp }) => timestamp));
  const days = [];
  const amplitudeOfRecords = differenceOfDays(startDate, lastDayOfDrinks);
  if (amplitudeOfRecords > followupNumberOfDays) {
    for (let i = 0; i < amplitudeOfRecords + 1; i++) {
      days.push(dateWithoutTime(lastDayOfDrinks, i - amplitudeOfRecords));
    }
    return days;
  }
  for (let i = 0; i < followupNumberOfDays; i++) {
    days.push(dateWithoutTime(startDate, i));
  }
  return days;
};

export const getDaysForDiagram = createSelector(
  getDays,
  days => days.filter((_, i) => i >= days.length - followupNumberOfDays)
);

export const getDaysForFeed = createSelector(
  getDays,
  days => [...days].filter(date => dateIsBeforeOrToday(date)).reverse()
);

export const getDailyDoses = ({ conso: { drinks } }) => reduceDrinksToDailyDoses(drinks);
export const getHighestDailyDoses = ({ conso: { drinks } }) => computeHighestDailyDose(drinks);
export const getDrinksPerCurrentDrinksTimestamp = ({ conso: { drinks, modalTimestamp } }) =>
  drinks.filter(drink => drink.timestamp === modalTimestamp);

// Reducer

/*
DRINK SCHEMA: {
  drinkKey: String
  timestamp: Number,
  quantity: Number
}
*/

const initialState = {
  drinks: [],
  startDate: today(),
  modalTimestamp: today(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSO_UPDATE_DRINK: {
      const { id } = action.payload;
      const newStartDate = firstDateIsBeforeSecondDate(state.modalTimestamp, state.startDate)
        ? new Date(state.modalTimestamp)
        : state.startDate;
      return {
        ...state,
        drinks: [
          ...removeDrinkFromDrinksAndId(state.drinks, id),
          { ...action.payload, timestamp: state.modalTimestamp },
        ],
        startDate: newStartDate,
      };
    }
    case CONSO_REMOVE_DRINK: {
      const { timestamp } = action.payload;
      return {
        ...state,
        drinks: removeDrinkFromDrinksAndTimestamp(state.drinks, timestamp),
      };
    }
    case CONSO_UPDATE_MODAL_TIMESTAMP: {
      const newTimestamp = action.payload;
      const oldTimestamp = state.modalTimestamp;
      return {
        ...state,
        drinks: state.drinks.map(drink => {
          if (drink.timestamp === oldTimestamp) {
            return {
              ...drink,
              timestamp: newTimestamp,
            };
          }
          return drink;
        }),
        modalTimestamp: newTimestamp,
      };
    }
    case CONSO_SET_MODAL_TIMESTAMP: {
      const newTimestamp = action.payload;
      return {
        ...state,
        modalTimestamp: newTimestamp,
      };
    }
    case REHYDRATE: {
      // if a drink type has two occurences in the same timestamp, we fusion the two drinks
      // this is to prevent any previous potential bug...
      if (!action.payload || !action.payload.conso || !action.payload.conso.drink) return state;
      const checkSameDrink = (drink1, drink2) =>
        drink1.timestamp === drink2.timestamp && drink1.drinkKey === drink2.drinkKey;

      const oldDrinks = action.payload.conso.drinks;

      return {
        ...state,
        drinks: oldDrinks.reduce((newDrinks, drink, i) => {
          const prevDrinks = newDrinks.filter((_, index) => index < i);
          if (!prevDrinks.length) return [drink];
          const sameDrink = newDrinks.find(d => checkSameDrink(d, drink));
          if (!sameDrink) return [...newDrinks, drink];
          return newDrinks.map(d => {
            if (checkSameDrink(d, drink)) {
              return {
                ...drink,
                quantity: d.quantity + drink.quantity,
              };
            }
            return d;
          });
        }, []),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
