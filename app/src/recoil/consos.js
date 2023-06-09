import dayjs from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';
import * as Sentry from '@sentry/react-native';
import { differenceOfDays } from '../helpers/dateHelpers';
import { drinksCatalogObject, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';
import { goalsByWeekState, goalsState } from './gains';

export const followupNumberOfDays = 7;

export const drinksState = atom({
  key: 'drinksState',
  default: getInitValueFromStorage('@Drinks', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Drinks', JSON.stringify(newValue));
        Sentry.setExtra('drinks', newValue.slice(0, 50));
      }),
  ],
});

export const ownDrinksCatalogState = atom({
  key: 'ownDrinksCatalogState',
  default: getInitValueFromStorage('@OwnDrinks', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@OwnDrinks', JSON.stringify(newValue));
        Sentry.setExtra('ownDrinksCatalog', newValue);
      }),
  ],
});

export const ownDrinksCatalogObjectSelector = selector({
  key: 'ownDrinksCatalogObjectSelector',
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
  key: 'consolidatedCatalogObjectSelector',
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
  const fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
  const numberOfDays = amplitudeOfRecords ?? differenceOfDays(fiveMonthsAgo, now);
  const days = [];
  for (let i = 0; i <= numberOfDays; i++) {
    const day = dayjs(now).add(-i, 'day');
    days.push(day.format('YYYY-MM-DD'));
  }
  return days;
};
let fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
let feedDays = getAllDatesBetweenNowAndFiveMonthsAgo();

export const feedDaysSelector = selector({
  key: 'feedDaysSelector',
  get: ({ get }) => {
    const today = dayjs().format('YYYY-MM-DD');
    if (feedDays[0] !== today) {
      fiveMonthsAgo = dayjs().add(-5, 'month').valueOf();
    }
    const allDrinks = get(drinksState);
    const drinks = allDrinks.filter(({ timestamp }) => timestamp > fiveMonthsAgo);
    const timestamps = drinks.map(({ timestamp }) => timestamp);
    const lastDayOfDrinks = Math.max(...timestamps, Date.now());
    const firstDayOfDrinks = Math.min(...timestamps, Date.now());
    const amplitudeOfRecords = differenceOfDays(firstDayOfDrinks, lastDayOfDrinks);
    const firstDay = dayjs(firstDayOfDrinks).format('YYYY-MM-DD');
    if (feedDays[0] !== today) {
      feedDays = getAllDatesBetweenNowAndFiveMonthsAgo(amplitudeOfRecords);
    }
    const filteredDays = feedDays.filter((date) => date <= today && date >= firstDay);
    return filteredDays;
  },
});

export const derivedDataFromDrinksState = selector({
  key: 'derivedDataFromDrinksState',
  get: ({ get }) => {
    // we do this selector to
    // - map only once through all drinks
    // - avoid expensive calculations with dayjs
    const consolidatedCatalogObject = get(consolidatedCatalogObjectSelector);
    // drinks are sorted by timestamps
    const drinks = get(drinksState);
    // goals are sorted by date
    const goals = get(goalsState);
    const goalsByWeek = get(goalsByWeekState);

    // derived data to return
    const drinksByDay = {};
    const dailyDoses = {};
    const weeklyDoses = {};
    const monthlyDoses = {};
    const calendarDays = {};
    const calendarGoalsStartOfWeek = {};

    // temp variables
    let startOfWeek = null;
    let goalStartOfWeek = null;
    let currentWeek = {};

    for (const drink of drinks) {
      const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
      // init startOfWeek
      if (!startOfWeek) {
        startOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
      }
      // init goalStartOfWeek
      if (!goalStartOfWeek) {
        goalStartOfWeek = goalsByWeek[startOfWeek];
        if (!goalStartOfWeek) goalStartOfWeek = goals[0];
        // save the first goal of the week
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }
      if (startOfWeek > day) {
        // update startOfWeek for weekly doses and goals
        startOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
        currentWeek = {};
        // update goalStartOfWeek
        const nextGoal = goalsByWeek[startOfWeek];
        if (nextGoal) goalStartOfWeek = nextGoal;
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }

      // daily drinks
      if (!drinksByDay[day]) drinksByDay[day] = [];
      drinksByDay[day].push(drink);

      // daily doses
      const dose = mapDrinkToDose(drink, consolidatedCatalogObject);
      if (!dailyDoses[day]) dailyDoses[day] = 0;
      dailyDoses[day] = dailyDoses[day] + dose;
      // weekly doses
      if (!weeklyDoses[startOfWeek]) weeklyDoses[startOfWeek] = 0;
      weeklyDoses[startOfWeek] = weeklyDoses[startOfWeek] + dose;
      // monthly doses
      const month = day.slice(0, 'YYYY-MM'.length);
      if (!monthlyDoses[month]) monthlyDoses[month] = 0;
      monthlyDoses[month] = monthlyDoses[month] + dose;

      // calendar days
      if (!goalStartOfWeek) {
        calendarDays[day] = dailyDoses[day] > 0 ? 'noGoalAndDoses' : 'noGoalAndNoDoses';
      } else {
        if (dailyDoses[day] === 0) {
          calendarDays[day] = 'goalExistsAndNoDoses';
        } else if (dailyDoses[day] > goalStartOfWeek.dosesByDrinkingDay) {
          calendarDays[day] = 'goalExistsButNotRespected';
        } else {
          calendarDays[day] = 'goalExistsAndDosesWithinGoal';
        }
      }

      // calendar goals
      // count days in current week
      currentWeek[day] = dailyDoses[day];
      if (day === startOfWeek) {
        const daysFilled = Object.keys(currentWeek).length;
        const daysWithNoDrink = Object.values(currentWeek).filter((dose) => dose === 0).length;
        if (!goalStartOfWeek) {
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'NoGoal',
            consommationMessage:
              'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
            consosWeek: weeklyDoses[startOfWeek],
          };
        } else if (daysFilled < 7) {
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'Ongoing',
            drinkingDayMessage:
              'Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse, bon courage !',
            consosWeekGoal: goalStartOfWeek.dosesPerWeek,
            consosWeek: weeklyDoses[startOfWeek],
            drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
            drinkingDays: daysWithNoDrink,
          };
        } else {
          const dosesAreGood = weeklyDoses[startOfWeek] <= goalStartOfWeek.dosesPerWeek;
          const drinkDaysAreGood = daysWithNoDrink >= goalStartOfWeek.daysWithGoalNoDrink.length;
          if (dosesAreGood && drinkDaysAreGood) {
            calendarGoalsStartOfWeek[startOfWeek] = {
              status: 'Success',
              consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
              drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
              consosWeekGoal: goalStartOfWeek.dosesPerWeek,
              consosWeek: weeklyDoses[startOfWeek],
              drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
              drinkingDays: daysWithNoDrink,
            };
          }
          if (!dosesAreGood && drinkDaysAreGood) {
            calendarGoalsStartOfWeek[startOfWeek] = {
              status: 'Fail',
              consommationMessage: 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.',
              drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
              consosWeekGoal: goalStartOfWeek.dosesPerWeek,
              consosWeek: weeklyDoses[startOfWeek],
              drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
              drinkingDays: daysWithNoDrink,
            };
          }
          if (dosesAreGood && !drinkDaysAreGood) {
            calendarGoalsStartOfWeek[startOfWeek] = {
              status: 'Fail',
              consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
              drinkingDayMessage: 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.',
              consosWeekGoal: goalStartOfWeek.dosesPerWeek,
              consosWeek: weeklyDoses[startOfWeek],
              drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
              drinkingDays: daysWithNoDrink,
            };
          }
          if (!dosesAreGood && !drinkDaysAreGood) {
            calendarGoalsStartOfWeek[startOfWeek] = {
              status: 'Fail',
              consommationMessage: 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.',
              drinkingDayMessage: 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.',
              consosWeekGoal: goalStartOfWeek.dosesPerWeek,
              consosWeek: weeklyDoses[startOfWeek],
              drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
              drinkingDays: daysWithNoDrink,
            };
          }
        }
      }
    }
    return { drinksByDay, dailyDoses, weeklyDoses, monthlyDoses, calendarDays, calendarGoalsStartOfWeek };
  },
});
