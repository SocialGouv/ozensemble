import { REHYDRATE } from 'redux-persist';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import {
  dateIsBeforeOrToday,
  dateWithoutTime,
  differenceOfDays,
  firstDateIsBeforeSecondDate,
  today,
} from '../../helpers/dateHelpers';
import { drinksCatalog, getDisplayName, mapDrinkToDose, NO_CONSO } from './drinksCatalog';

// Utils
export const followupNumberOfDays = 15;
export const maxDosesOnScreen = 50;

const removeDrinkFromDrinksAndId = (drinks, id) => drinks.filter((drink) => drink.id !== id);
const removeDrinkFromDrinksAndTimestamp = (drinks, timestamp) =>
  drinks.filter((drink) => drink.timestamp !== timestamp);

const reduceDrinksToDailyDoses = (drinks, catalog) =>
  drinks.reduce((dailyDoses, drink) => {
    const day = dateWithoutTime(drink.timestamp);
    if (dailyDoses[day]) {
      return {
        ...dailyDoses,
        [day]: dailyDoses[day] + mapDrinkToDose(drink, catalog),
      };
    }
    return {
      ...dailyDoses,
      [day]: mapDrinkToDose(drink, catalog),
    };
  }, {});

const computeHighestDailyDose = (drinks, catalog) => {
  const dailyDoses = reduceDrinksToDailyDoses(drinks, catalog);
  return Math.min(maxDosesOnScreen, Math.max(...Object.values(dailyDoses)));
};

const sortDrinksByDate = (drinks) =>
  drinks.sort((drink1, drink2) => {
    if (drink1.timestamp < drink2.timestamp) return -1;
    return 1;
  });

const formatHtmlTable = (drinks, catalog) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="https://www.w3.org/1999/xhtml">
    <head>
      <title>Bilan des consommations</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
      <style>
      table { background-color: white; width: 100%; }
      td, th { border: 1px solid #ddd; text-align: center; }
      span { font-weight: bold; }
      </style>
    </head>
    <body>
      <span>Bilan des consommations</span>
      <table class="table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Quantité</th>
          </tr>
          ${sortDrinksByDate(drinks)
            .map((drink) => {
              const doses = mapDrinkToDose(drink, catalog);
              const name = getDisplayName(drink.drinkKey, drink.quantity, catalog);
              const time = new Date(drink.timestamp).getLocaleDateAndTime('fr');
              return `<tr>
                  <td>${time}</td>
                  <td>${drink.quantity} ${name} (${doses} dose${doses > 1 ? 's' : ''})</td>
                </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    </body>
  </html>
  `;
};

// Actions
const CONSO_UPDATE_DRINK = 'CONSO_UPDATE_DRINK';
const CONSO_REMOVE_DRINK = 'CONSO_REMOVE_DRINK';
const CONSO_SET_MODAL_TIMESTAMP = 'CONSO_SET_MODAL_TIMESTAMP';
const CONSO_UPDATE_MODAL_TIMESTAMP = 'CONSO_UPDATE_MODAL_TIMESTAMP';
const CONSO_SET_OWN_DRINK = 'CONSO_SET_OWN_DRINK';
const CONSO_SET_NO_DRINK = 'CONSO_SET_NO_DRINK';
const CONSO_REMOVE_OWN_DRINK = 'CONSO_REMOVE_OWN_DRINK';

// Actions creators
export const updateDrink = ({ drinkKey, quantity, id = uuidv4() }) => ({
  type: CONSO_UPDATE_DRINK,
  payload: { drinkKey, quantity, id },
});

export const removeDrink = (timestamp) => ({
  type: CONSO_REMOVE_DRINK,
  payload: { timestamp },
});

export const setModalTimestamp = (timestamp) => ({
  type: CONSO_SET_MODAL_TIMESTAMP,
  payload: { timestamp },
});

export const setNoDrink = (timestamp) => ({
  type: CONSO_SET_NO_DRINK,
  payload: { timestamp },
});

export const updateModalTimestamp = (timestamp) => ({
  type: CONSO_UPDATE_MODAL_TIMESTAMP,
  payload: { timestamp },
});

export const setOwnDrink = (formattedDrink) => ({
  type: CONSO_SET_OWN_DRINK,
  payload: formattedDrink,
});

export const removeOwnDrink = (drinkKey) => ({
  type: CONSO_REMOVE_OWN_DRINK,
  payload: drinkKey,
});

// Selectors
export const getConsoState = ({ conso }) => conso;
export const getDrinksState = createSelector(getConsoState, (conso) => conso.drinks || []);
export const getOwnDrinks = createSelector(getConsoState, (conso) => conso.ownDrinks || []);
export const getConsolidatedCatalog = createSelector(getOwnDrinks, (ownDrinks) => [...ownDrinks, ...drinksCatalog]);
export const checkIfThereIsDrinks = createSelector(getDrinksState, (drinks) => drinks.length > 0);
export const getModalTimestamp = createSelector(getConsoState, (conso) => conso.modalTimestamp);
const getStartDate = createSelector(getConsoState, (conso) => conso.startDate);
const getDays = createSelector([getDrinksState, getStartDate], (drinks, startDate) => {
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
});
export const getDaysForDiagram = createSelector(getDays, (days) =>
  days.filter((_, i) => i >= days.length - followupNumberOfDays)
);
export const getDaysForFeed = createSelector(getDays, (days) =>
  [...days].filter((date) => dateIsBeforeOrToday(date)).reverse()
);
export const getDailyDoses = createSelector([getDrinksState, getConsolidatedCatalog], reduceDrinksToDailyDoses);
export const getHighestDailyDoses = createSelector([getDrinksState, getConsolidatedCatalog], computeHighestDailyDose);
export const getDrinksPerCurrentDrinksTimestamp = createSelector(
  [getDrinksState, getModalTimestamp],
  (drinks, modalTimestamp) => drinks.filter((drink) => drink.timestamp === modalTimestamp)
);
export const getHTMLExport = createSelector([getDrinksState, getConsolidatedCatalog], (drinks, catalog) =>
  formatHtmlTable(drinks, catalog)
);
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
  ownDrinks: [],
  startDate: today(),
  modalTimestamp: today(),
  // ...fakeConsoData.partial,
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
        ].filter((d) => d.quantity > 0),
        startDate: newStartDate,
      };
    }
    case CONSO_SET_NO_DRINK: {
      const { timestamp } = action.payload;
      return {
        ...state,
        drinks: [...state.drinks, { drinkKey: NO_CONSO, quantity: 1, timestamp, id: 1654 }],
      };
    }
    case CONSO_SET_OWN_DRINK: {
      const drinks = state.ownDrinks || [];
      const drink = action.payload;
      return {
        ...state,
        ownDrinks: [...drinks.filter((d) => d.drinkKey !== drink.drinkKey), drink],
      };
    }
    case CONSO_REMOVE_OWN_DRINK: {
      return {
        ...state,
        ownDrinks: state.ownDrinks.map((d) => {
          if (d.drinkKey !== action.payload) return d;
          return {
            ...d,
            active: false,
          };
        }),
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
      const newTimestamp = action.payload.timestamp;
      const oldTimestamp = state.modalTimestamp;
      return {
        ...state,
        drinks: state.drinks.map((drink) => {
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
      const { timestamp } = action.payload;
      return {
        ...state,
        modalTimestamp: timestamp,
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
        ownDrinks: [],
        drinks: oldDrinks.reduce((newDrinks, drink, i) => {
          const prevDrinks = newDrinks.filter((_, index) => index < i);
          if (!prevDrinks.length) return [drink];
          const sameDrink = newDrinks.find((d) => checkSameDrink(d, drink));
          if (!sameDrink) return [...newDrinks, drink];
          return newDrinks.map((d) => {
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
