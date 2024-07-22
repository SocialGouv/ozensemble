import dayjs from "dayjs";
import { atom, selector } from "recoil";
import * as Sentry from "@sentry/react-native";
import { differenceOfDays } from "../helpers/dateHelpers";
import { drinksCatalogObject } from "../scenes/ConsoFollowUp/drinksCatalog";
import { storage } from "../services/storage";
import { getInitValueFromStorage } from "./utils";
import { goalsByWeekSelector, goalsState } from "./gains";
import { getDerivedDataFromDrinksState } from "../helpers/consosHelpers";

export const drinksState = atom({
  key: "drinksState",
  default: getInitValueFromStorage("@Drinks", []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set("@Drinks", JSON.stringify(newValue));
        Sentry.setExtra("drinks", newValue.slice(0, 50));
        Sentry.setExtra(
          "all-drinks",
          newValue.map(({ drinkKey, id }) => `${drinkKey}_${id}`).join("__")
        );
      }),
  ],
});

export const ownDrinksCatalogState = atom({
  key: "ownDrinksCatalogState",
  default: getInitValueFromStorage("@OwnDrinks", []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set("@OwnDrinks", JSON.stringify(newValue));
        Sentry.setExtra("ownDrinksCatalog", newValue);
      }),
  ],
});

export const ownDrinksCatalogObjectSelector = selector({
  key: "ownDrinksCatalogObjectSelector",
  get: ({ get }) => {
    const ownDrinks = get(ownDrinksCatalogState);
    const ownDrinksCatalogObject = {};
    for (const drink of ownDrinks) {
      ownDrinksCatalogObject[drink.drinkKey] = drink;
    }
    return ownDrinksCatalogObject;
  },
});

// Selectors

export const consolidatedCatalogObjectSelector = selector({
  key: "consolidatedCatalogObjectSelector",
  get: ({ get }) => {
    const ownDrinksObject = get(ownDrinksCatalogObjectSelector);
    return { ...ownDrinksObject, ...drinksCatalogObject };
  },
});

// dayjs is slow to do .add(-5, 'month') or .add(-i, 'day')
// the function below takes +/- 500ms if 5 months amplitude
// so we calculate only once per day
const getAllDatesBetweenNowAndFiveMonthsAgo = (amplitudeOfRecords = null) => {
  const now = Date.now();
  // timestamp five month ago in ms
  const fiveMonthsAgo = dayjs().add(-5, "month").valueOf();
  const numberOfDays = amplitudeOfRecords ?? differenceOfDays(fiveMonthsAgo, now);
  const days = [];
  for (let i = 0; i <= numberOfDays; i++) {
    const day = dayjs(now).add(-i, "day");
    days.push(day.format("YYYY-MM-DD"));
  }
  return days;
};
let fiveMonthsAgo = dayjs().add(-5, "month").valueOf();
let feedDays = getAllDatesBetweenNowAndFiveMonthsAgo();

export const feedDaysSelector = selector({
  key: "feedDaysSelector",
  get: ({ get }) => {
    const today = dayjs().format("YYYY-MM-DD");
    if (feedDays[0] !== today) {
      fiveMonthsAgo = dayjs().add(-5, "month").valueOf();
    }
    const allDrinks = get(drinksState);
    const drinks = allDrinks.filter(({ timestamp }) => timestamp > fiveMonthsAgo);
    const timestamps = drinks.map(({ timestamp }) => timestamp);
    const lastDayOfDrinks = Math.max(...timestamps, Date.now());
    const firstDayOfDrinks = Math.min(...timestamps, Date.now());
    const amplitudeOfRecords = differenceOfDays(firstDayOfDrinks, lastDayOfDrinks);
    const firstDay = dayjs(firstDayOfDrinks).format("YYYY-MM-DD");
    if (feedDays[0] !== today) {
      feedDays = getAllDatesBetweenNowAndFiveMonthsAgo(amplitudeOfRecords);
    }
    const filteredDays = feedDays.filter((date) => date <= today && date >= firstDay);
    return filteredDays;
  },
});

export const derivedDataFromDrinksState = selector({
  key: "derivedDataFromDrinksState",
  get: ({ get }) => {
    // we do this selector to
    // - map only once through all drinks
    // - avoid expensive calculations with dayjs
    const consolidatedCatalogObject = get(consolidatedCatalogObjectSelector);
    // drinks are sorted by timestamps
    const drinks = get(drinksState);
    // goals are sorted by date
    const goals = get(goalsState);
    const goalsByWeek = get(goalsByWeekSelector);
    return getDerivedDataFromDrinksState(consolidatedCatalogObject, drinks, goals, goalsByWeek);
  },
});
