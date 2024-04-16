import dayjs from 'dayjs';
import { atom, selector } from 'recoil';
import * as Sentry from '@sentry/react-native';
import { differenceOfDays } from '../helpers/dateHelpers';
import {
  drinksCatalogObject,
  mapDrinkToDose,
  mapDrinkToKcals,
  mapDrinkToPrice,
} from '../scenes/ConsoFollowUp/drinksCatalog';
import { storage } from '../services/storage';
import { getInitValueFromStorage } from './utils';
import { goalsByWeekSelector, goalsState } from './gains';

export const followupNumberOfDays = 7;

export const drinksState = atom({
  key: 'drinksState',
  default: getInitValueFromStorage('@Drinks', []),
  effects: [
    ({ onSet }) =>
      onSet((newValue) => {
        storage.set('@Drinks', JSON.stringify(newValue));
        Sentry.setExtra('drinks', newValue.slice(0, 50));
        Sentry.setExtra('all-drinks', newValue.map(({ drinkKey, id }) => `${drinkKey}_${id}`).join('__'));
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
    const goalsByWeek = get(goalsByWeekSelector);

    // derived data to return
    const drinksByDay = {};
    const dailyDoses = {};
    const weeklyDoses = {};
    const monthlyDoses = {};
    const calendarDays = {};
    const calendarGoalsStartOfWeek = {};
    const weeklyKcals = {};
    const weeklyExpenses = {};
    let abstinenceDays = 0;
    let doneDay = null;
    let firstFilledDay = null;
    let breakDay = null;
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
        if (!goalStartOfWeek) {
          goalStartOfWeek = goals.at(-1);
        }
        // save the first goal of the week
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }
      if (startOfWeek > day) {
        // update startOfWeek for weekly doses and goals
        startOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
        currentWeek = {};
        // update goalStartOfWeek
        const nextGoal = goalsByWeek[startOfWeek];
        if (nextGoal) {
          goalStartOfWeek = nextGoal;
        }
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }
      // daily drinks
      if (!drinksByDay[day]) {
        drinksByDay[day] = [];
      }
      drinksByDay[day].push(drink);

      // daily doses
      const dose = mapDrinkToDose(drink, consolidatedCatalogObject);
      if (!dailyDoses[day]) {
        dailyDoses[day] = 0;
      }
      dailyDoses[day] = dailyDoses[day] + dose;

      // abstinence days
      if (!firstFilledDay) {
        firstFilledDay = day;
      }
      // check if there is a hole between the last day and the current day
      if (!breakDay && doneDay && differenceOfDays(day, doneDay) > 1) {
        breakDay = dayjs(doneDay).add(-1, 'day').format('YYYY-MM-DD');
      }
      // check if there is drink consumption
      if (!breakDay && dose > 0) {
        breakDay = day;
      }
      // math round was added because of the hour change
      if (breakDay) {
        abstinenceDays = Math.round(differenceOfDays(firstFilledDay, breakDay));
      } else if (doneDay) {
        abstinenceDays = Math.round(differenceOfDays(firstFilledDay, day) + 1);
      } else {
        abstinenceDays = firstFilledDay ? 1 : 0;
      }
      doneDay = day;
      // weekly doses
      if (!weeklyDoses[startOfWeek]) {
        weeklyDoses[startOfWeek] = 0;
      }
      weeklyDoses[startOfWeek] = weeklyDoses[startOfWeek] + dose;
      // monthly doses
      const month = day.slice(0, 'YYYY-MM'.length);
      if (!monthlyDoses[month]) {
        monthlyDoses[month] = 0;
      }
      monthlyDoses[month] = monthlyDoses[month] + dose;

      // calendar days
      if (!goalStartOfWeek) {
        calendarDays[day] = dailyDoses[day] > 0 ? 'noGoalAndDoses' : 'noGoalAndNoDoses';
      } else {
        if (dailyDoses[day] === 0) {
          calendarDays[day] = 'goalExistsAndNoDoses';
        } else {
          // WARNING: the `dosesByDrinkingDay` is just an average of total drinks / authorized days
          // example: 4 units per week that I can drink in 7 days: average of 0.57 units per day
          // if I drink 1 unit on Monday, I'm already above the average
          // so we say: the minimum is 1 unit per day
          if (dailyDoses[day] > Math.ceil(goalStartOfWeek.dosesByDrinkingDay)) {
            calendarDays[day] = 'goalExistsButNotRespected';
          } else {
            calendarDays[day] = 'goalExistsAndDosesWithinGoal';
            // if (weeklyDoses[startOfWeek] > goalStartOfWeek.dosesPerWeek) {
            //   calendarDays[day] = 'goalExistsButNotRespected';
            // } else {
            // }
          }
        }
      }

      // calendar goals
      // count days in current week
      currentWeek[day] = dailyDoses[day];
      const daysFilled = Object.keys(currentWeek).length;
      const daysWithDrinks = Object.values(currentWeek).filter((dose) => dose > 0).length;
      const daysWithNoDrink = 7 - daysWithDrinks;
      if (!goalStartOfWeek) {
        calendarGoalsStartOfWeek[startOfWeek] = {
          status: 'NoGoal',
          consommationMessage:
            'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
          consosWeek: weeklyDoses[startOfWeek],
        };
      } else if (daysFilled < 7) {
        calendarGoalsStartOfWeek[startOfWeek] = {
          status: 'InProgress',
          drinkingDayMessage:
            'Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse, bon courage !',
          consosWeekGoal: goalStartOfWeek.dosesPerWeek,
          consosWeek: weeklyDoses[startOfWeek],
          drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
          drinkingDays: daysWithDrinks,
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
            drinkingDays: daysWithDrinks,
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
            drinkingDays: daysWithDrinks,
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
            drinkingDays: daysWithDrinks,
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
            drinkingDays: daysWithDrinks,
          };
        }
      }

      // Weekly gains
      //weekly kcals
      const kcals = mapDrinkToKcals(drink, consolidatedCatalogObject);
      if (!weeklyKcals[startOfWeek]) weeklyKcals[startOfWeek] = 0;
      weeklyKcals[startOfWeek] = weeklyKcals[startOfWeek] + kcals;
      //weekly kcals
      const expenses = mapDrinkToPrice(drink, consolidatedCatalogObject);
      if (!weeklyExpenses[startOfWeek]) weeklyExpenses[startOfWeek] = 0;
      weeklyExpenses[startOfWeek] = weeklyExpenses[startOfWeek] + expenses;
    }

    return {
      drinksByDay,
      dailyDoses,
      weeklyDoses,
      monthlyDoses,
      calendarDays,
      calendarGoalsStartOfWeek,
      weeklyKcals,
      weeklyExpenses,
      abstinenceDays,
    };
  },
});
