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

    // temp variables
    let startOfWeek = null;
    let goalStartOfWeek = null;
    let currentWeek = {};
    let dayWithDosesNotRespectedExists = false;

    let i = 0;
    for (const drink of drinks) {
      i++;
      console.log(`DRINK ${i}`, drink);
      const day = dayjs(drink.timestamp).format('YYYY-MM-DD');
      console.log('DAY IS', day);
      // init startOfWeek
      if (!startOfWeek) {
        startOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
        console.log('INIT START OF WEEK', startOfWeek);
      }

      // init goalStartOfWeek
      if (!goalStartOfWeek) {
        goalStartOfWeek = goalsByWeek[startOfWeek];
        console.log('INIT GOAL START OF WEEK', goalStartOfWeek);
        if (!goalStartOfWeek) {
          goalStartOfWeek = goals.at(-1);
          console.log('NO GOAL START OF WEEK, INIT AGAIN', goalStartOfWeek);
        }
        // save the first goal of the week
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }
      if (startOfWeek > day) {
        // update startOfWeek for weekly doses and goals
        startOfWeek = dayjs(day).startOf('week').format('YYYY-MM-DD');
        console.log('RESET START OF WEEK', startOfWeek);
        currentWeek = {};
        dayWithDosesNotRespectedExists = false;
        // update goalStartOfWeek
        const nextGoal = goalsByWeek[startOfWeek];
        if (nextGoal) {
          goalStartOfWeek = nextGoal;
          console.log('NEXT GOAL', goalStartOfWeek);
        }
        calendarGoalsStartOfWeek[startOfWeek] = goalStartOfWeek;
      }
      // daily drinks
      if (!drinksByDay[day]) {
        drinksByDay[day] = [];
        console.log('INIT DRINKS BY DAY');
      }
      drinksByDay[day].push(drink);

      // daily doses
      const dose = mapDrinkToDose(drink, consolidatedCatalogObject);
      console.log('DOSE', dose);
      if (!dailyDoses[day]) {
        console.log('INIT DAILY DOSES');
        dailyDoses[day] = 0;
      }
      dailyDoses[day] = dailyDoses[day] + dose;
      console.log('DAILY DOSE IS', dailyDoses[day], 'FOR DAY', day);
      // weekly doses
      if (!weeklyDoses[startOfWeek]) {
        console.log('INIT WEEKLY DOSES');
        weeklyDoses[startOfWeek] = 0;
      }
      weeklyDoses[startOfWeek] = weeklyDoses[startOfWeek] + dose;
      console.log('WEEKLY DOSE IS', weeklyDoses[startOfWeek], 'FOR START OF WEEK', startOfWeek);
      // monthly doses
      const month = day.slice(0, 'YYYY-MM'.length);
      console.log('MONTH IS', month);
      if (!monthlyDoses[month]) {
        console.log('INIT MONTHLY DOSES');
        monthlyDoses[month] = 0;
      }
      monthlyDoses[month] = monthlyDoses[month] + dose;
      console.log('MONTHLY DOSE IS', monthlyDoses[month], 'FOR MONTH', month);

      console.log('CALENDAR DAYS FIRST');
      // calendar days
      if (!goalStartOfWeek) {
        calendarDays[day] = dailyDoses[day] > 0 ? 'noGoalAndDoses' : 'noGoalAndNoDoses';
        console.log('NO GOAL YET', calendarDays[day]);
      } else {
        if (dailyDoses[day] === 0) {
          calendarDays[day] = 'goalExistsAndNoDoses';
          console.log('GOAL AND NO DOSES', calendarDays[day]);
        } else if (dailyDoses[day] > goalStartOfWeek.dosesByDrinkingDay) {
          // WARNING: the `dosesByDrinkingDay` is just an average of total drinks / authorized days
          // example: 4 units per week that I can drink in 7 days: average of 0.57 units per day
          // if I drink 2 units on monday and 2 units on tuesday, I will have 2 days `goalExistsButNotRespected`
          // although I respected my goal of 4 units per week
          calendarDays[day] = 'goalExistsButNotRespected';
          dayWithDosesNotRespectedExists = true; // for optimization purpose
          console.log(
            'DOSES EXCEED',
            calendarDays[day],
            'daily doses',
            dailyDoses[day],
            'goal dose by day',
            goalStartOfWeek.dosesByDrinkingDay
          );
        } else {
          calendarDays[day] = 'goalExistsAndDosesWithinGoal';
          console.log('DOSES WITHIN GOAL', calendarDays[day], dailyDoses[day], goalStartOfWeek.dosesByDrinkingDay);
        }
      }

      // calendar goals
      // count days in current week
      console.log('CALENDAR GOALS');
      currentWeek[day] = dailyDoses[day];
      const daysFilled = Object.keys(currentWeek).length;
      const daysWithDrinks = Object.values(currentWeek).filter((dose) => dose > 0).length;
      const daysWithNoDrink = 7 - daysWithDrinks;
      console.log({ daysFilled, daysWithDrinks, daysWithNoDrink });
      if (!goalStartOfWeek) {
        calendarGoalsStartOfWeek[startOfWeek] = {
          status: 'NoGoal',
          consommationMessage:
            'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
          consosWeek: weeklyDoses[startOfWeek],
        };
        console.log('NO GOAL YES FOR OBJECTIVE');
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
        console.log('DAYS FILLED < 7', daysFilled);
        console.log('DAY WITH DOSES NOT RESPECTED EXISTS', dayWithDosesNotRespectedExists);
        if (!!dayWithDosesNotRespectedExists) {
          const dosesAreGood = weeklyDoses[startOfWeek] <= goalStartOfWeek.dosesPerWeek;
          console.log('DOSES ARE GOOD WHILE DAYS STILL UNDER 7', dosesAreGood);
          if (dosesAreGood) {
            for (let i = 0; i < 7; i++) {
              const day = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
              console.log('CHANGING CALENDAR DAY ?', calendarDays[day]);
              if (calendarDays[day] === 'goalExistsButNotRespected') {
                calendarDays[day] = 'goalExistsAndDosesWithinGoal';
                console.log('CHANGING CALENDAR DAY !!!', calendarDays[day]);
              }
            }
          }
        }
      } else {
        console.log('DAYS FILLED IS 7', daysFilled);
        const dosesAreGood = weeklyDoses[startOfWeek] <= goalStartOfWeek.dosesPerWeek;
        const drinkDaysAreGood = daysWithNoDrink >= goalStartOfWeek.daysWithGoalNoDrink.length;
        console.log({ dosesAreGood, drinkDaysAreGood });
        if (dosesAreGood && drinkDaysAreGood) {
          console.log('DOSES ARE GOOD AND DRINK DAYS TOO');
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'Success',
            consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
            drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
            consosWeekGoal: goalStartOfWeek.dosesPerWeek,
            consosWeek: weeklyDoses[startOfWeek],
            drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
            drinkingDays: daysWithDrinks,
          };
          console.log('DAY WITH DOSES NOT RESPECTED EXISTS ?', dayWithDosesNotRespectedExists);
          if (dosesAreGood && !!dayWithDosesNotRespectedExists) {
            for (let i = 0; i < 7; i++) {
              const day = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
              console.log('CHANGING CALENDAR DAY ?', calendarDays[day]);
              if (calendarDays[day] === 'goalExistsButNotRespected') {
                calendarDays[day] = 'goalExistsAndDosesWithinGoal';
                console.log('CHANGING CALENDAR DAY !!!', calendarDays[day]);
              }
            }
          }
        }
        if (!dosesAreGood && drinkDaysAreGood) {
          console.log('DOSES ARE NO GOOD AND DRINK DAYS ARE GOOD');
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'Fail',
            consommationMessage: 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.',
            drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
            consosWeekGoal: goalStartOfWeek.dosesPerWeek,
            consosWeek: weeklyDoses[startOfWeek],
            drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
            drinkingDays: daysWithDrinks,
          };
          for (let i = 0; i < 7; i++) {
            const day = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
            if (dailyDoses[day] > goalStartOfWeek.dosesByDrinkingDay) {
              if (calendarDays[day] === 'goalExistsAndDosesWithinGoal') {
                calendarDays[day] = 'goalExistsButNotRespected';
                console.log('FIXING CALENDAR DAY', day, calendarDays[day]);
              }
            } else {
              if (calendarDays[day] === 'goalExistsButNotRespected') {
                calendarDays[day] = 'goalExistsAndDosesWithinGoal';
                console.log('FIXING CALENDAR DAY BUT SHOULDNT', day, calendarDays[day]);
              }
            }
          }
        }
        if (dosesAreGood && !drinkDaysAreGood) {
          console.log('DOSES ARE GOOD AND DRINK DAYS ARE NO GOOD');
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'Fail',
            consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
            drinkingDayMessage: 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.',
            consosWeekGoal: goalStartOfWeek.dosesPerWeek,
            consosWeek: weeklyDoses[startOfWeek],
            drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
            drinkingDays: daysWithDrinks,
          };
          console.log('DAY WITH DOSES NOT RESPECTED EXISTS ?', dayWithDosesNotRespectedExists);
          if (!!dayWithDosesNotRespectedExists) {
            for (let i = 7; i > 0; i--) {
              const day = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
              console.log('CHANGING CALENDAR DAY ?', calendarDays[day]);
              if (calendarDays[day] === 'goalExistsButNotRespected') {
                calendarDays[day] = 'goalExistsAndDosesWithinGoal';
                console.log('CHANGING CALENDAR DAY !!!', calendarDays[day]);
              }
            }
          }
        }
        if (!dosesAreGood && !drinkDaysAreGood) {
          console.log('DOSES ARE NO GOOD AND DRINK DAYS ARE NO GOOD');
          calendarGoalsStartOfWeek[startOfWeek] = {
            status: 'Fail',
            consommationMessage: 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.',
            drinkingDayMessage: 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.',
            consosWeekGoal: goalStartOfWeek.dosesPerWeek,
            consosWeek: weeklyDoses[startOfWeek],
            drinkingDaysGoal: 7 - goalStartOfWeek.daysWithGoalNoDrink.length,
            drinkingDays: daysWithDrinks,
          };
          for (let i = 0; i < 7; i++) {
            const day = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
            if (dailyDoses[day] > goalStartOfWeek.dosesByDrinkingDay) {
              if (calendarDays[day] === 'goalExistsAndDosesWithinGoal') {
                calendarDays[day] = 'goalExistsButNotRespected';
                console.log('FIXING CALENDAR DAY', day, calendarDays[day]);
              }
            } else {
              if (calendarDays[day] === 'goalExistsButNotRespected') {
                calendarDays[day] = 'goalExistsAndDosesWithinGoal';
                console.log('FIXING CALENDAR DAY BUT SHOULDNT', day, calendarDays[day]);
              }
            }
          }
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
      console.log('FINITO FOR THIS DAY');
      console.log('----------------------');
      console.log('----------------------');
      console.log('----------------------');
      console.log('----------------------');
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
    };
  },
});
