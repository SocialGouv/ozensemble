import { getDerivedDataFromDrinksState, sortConsosByTimestamp } from '../src/helpers/consosHelpers';
import { allowedDrinkKeys, drinksCatalogObject } from '../src/scenes/ConsoFollowUp/drinksCatalog';

const catalogObject = drinksCatalogObject;

describe('getDerivedDataFromDrinksState', () => {
  // Test with an empty drinks array
  it('should return empty objects when drinks array is empty', () => {
    // Create mock data for consolidatedCatalogObject, drinks, goals, and goalsByWeek
    // Call getDerivedDataFromDrinksState with the mock data
    // Use Jest's expect function to check if the function returns the expected result
    const drinks = [];
    const goals = [];
    const goalsByWeek = [];
    const result = getDerivedDataFromDrinksState(catalogObject, sortConsosByTimestamp(drinks), goals, goalsByWeek);

    expect(result.drinksByDay).toEqual({});
    expect(result.dailyDoses).toEqual({});
    expect(result.weeklyDoses).toEqual({});
    expect(result.monthlyDoses).toEqual({});
    expect(result.calendarDays).toEqual({});
    expect(result.calendarGoalsStartOfWeek).toEqual({});
    expect(result.weeklyKcals).toEqual({});
    expect(result.weeklyExpenses).toEqual({});
    expect(result.abstinenceDays).toEqual(0);
  });

  // Test with a single drink
  it('should return correct data for a single drink', () => {
    // Create mock data for consolidatedCatalogObject, drinks, goals, and goalsByWeek
    // Call getDerivedDataFromDrinksState with the mock data
    // Use Jest's expect function to check if the function returns the expected result
    const drinks = [
      {
        timestamp: '2021-01-01T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '1',
        quantity: 2,
      },
    ];
    const goals = [];
    const goalsByWeek = [];
    const result = getDerivedDataFromDrinksState(catalogObject, sortConsosByTimestamp(drinks), goals, goalsByWeek);
    expect(result.drinksByDay).toEqual({
      '2021-01-01': [
        {
          timestamp: '2021-01-01T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '1',
          quantity: 2,
        },
      ],
    });
    expect(result.dailyDoses).toEqual({
      '2021-01-01': 2,
    });
    expect(result.weeklyDoses).toEqual({
      '2020-12-27': 2,
    });
    expect(result.monthlyDoses).toEqual({
      '2021-01': 2,
    });
    expect(result.calendarDays).toEqual({
      '2021-01-01': 'noGoalAndDoses',
    });
    expect(result.calendarGoalsStartOfWeek).toEqual({
      '2020-12-27': {
        consommationMessage:
          'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
        consosWeek: 2,
        status: 'NoGoal',
      },
    });
    expect(result.weeklyKcals).toEqual({
      '2020-12-27': 140,
    });
    expect(result.weeklyExpenses).toEqual({
      '2020-12-27': 8,
    });
    expect(result.abstinenceDays).toEqual(0);
  });

  // Test with multiple drinks on the same day
  it('should return correct data for multiple drinks on the same day', () => {
    // Create mock data for consolidatedCatalogObject, drinks, goals, and goalsByWeek
    // Call getDerivedDataFromDrinksState with the mock data
    // Use Jest's expect function to check if the function returns the expected result
    const drinks = [
      {
        timestamp: '2021-01-01T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '1',
        quantity: 2,
      },
      {
        timestamp: '2021-01-01T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '2',
        quantity: 1,
      },
    ];
    const goals = [];
    const goalsByWeek = [];
    const result = getDerivedDataFromDrinksState(catalogObject, sortConsosByTimestamp(drinks), goals, goalsByWeek);
    expect(result.drinksByDay).toEqual({
      '2021-01-01': [
        {
          timestamp: '2021-01-01T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '1',
          quantity: 2,
        },
        {
          timestamp: '2021-01-01T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '2',
          quantity: 1,
        },
      ],
    });
    expect(result.dailyDoses).toEqual({
      '2021-01-01': 3,
    });
    expect(result.weeklyDoses).toEqual({
      '2020-12-27': 3,
    });
    expect(result.monthlyDoses).toEqual({
      '2021-01': 3,
    });
    expect(result.calendarDays).toEqual({
      '2021-01-01': 'noGoalAndDoses',
    });
    expect(result.calendarGoalsStartOfWeek).toEqual({
      '2020-12-27': {
        consommationMessage:
          'Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine',
        consosWeek: 3,
        status: 'NoGoal',
      },
    });
    expect(result.weeklyKcals).toEqual({
      '2020-12-27': 210,
    });
    expect(result.weeklyExpenses).toEqual({
      '2020-12-27': 12,
    });
    expect(result.abstinenceDays).toEqual(0);
  });

  // Test with a goal that is not reached
  it('should return correct data when a goal is not reached', () => {
    // Create mock data for consolidatedCatalogObject, drinks, goals, and goalsByWeek
    // Call getDerivedDataFromDrinksState with the mock data
    // Use Jest's expect function to check if the function returns the expected result
    const drinks = [
      {
        timestamp: '2021-01-01T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '1',
        quantity: 2,
      },
    ];
    const goals = [
      {
        date: '2020-12-27',
        daysWithGoalNoDrink: ['monday', 'tuesday'],
        dosesByDrinkingDay: 1,
        dosesPerWeek: 5, // result of (7 days - 2 days with goal no drink) * 1 dose by drinking day = 5 doses per week
      },
    ];
    const goalsByWeek = [];
    const result = getDerivedDataFromDrinksState(catalogObject, sortConsosByTimestamp(drinks), goals, goalsByWeek);
    expect(result.drinksByDay).toEqual({
      '2021-01-01': [
        {
          timestamp: '2021-01-01T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '1',
          quantity: 2,
        },
      ],
    });
    expect(result.dailyDoses).toEqual({
      '2021-01-01': 2,
    });
    expect(result.weeklyDoses).toEqual({
      '2020-12-27': 2,
    });
    expect(result.monthlyDoses).toEqual({
      '2021-01': 2,
    });
    expect(result.calendarDays).toEqual({
      '2021-01-01': 'goalExistsButNotRespected',
    });
    expect(result.calendarGoalsStartOfWeek).toEqual({
      '2020-12-27': {
        consosWeek: 2,
        consosWeekGoal: 5,
        drinkingDayMessage:
          'Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse, bon courage !',
        drinkingDays: 1,
        drinkingDaysGoal: 5,
        status: 'InProgress',
      },
    });
    expect(result.weeklyKcals).toEqual({
      '2020-12-27': 140,
    });
    expect(result.weeklyExpenses).toEqual({
      '2020-12-27': 8,
    });
    expect(result.abstinenceDays).toEqual(0);
  });

  // Test with a goal that is reached
  it('should return correct data when a goal is reached', () => {
    // Create mock data for consolidatedCatalogObject, drinks, goals, and goalsByWeek
    // Call getDerivedDataFromDrinksState with the mock data
    // Use Jest's expect function to check if the function returns the expected result
    // all days of the week should be filled with either a drink wither a no drink
    const drinks = [
      {
        timestamp: '2020-12-27T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '1',
        quantity: 1,
      },
      {
        timestamp: '2020-12-28T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.NO_CONSO,
        id: '2',
        quantity: 1,
      },
      {
        timestamp: '2020-12-29T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.NO_CONSO,
        id: '3',
        quantity: 1,
      },
      {
        timestamp: '2020-12-30T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.NO_CONSO,
        id: '4',
        quantity: 1,
      },
      {
        timestamp: '2020-12-31T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.NO_CONSO,
        id: '5',
        quantity: 1,
      },
      {
        timestamp: '2021-01-01T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.WINE_GLASS,
        id: '6',
        quantity: 1,
      },
      {
        timestamp: '2021-01-02T00:00:00.000Z',
        drinkKey: allowedDrinkKeys.NO_CONSO,
        id: '7',
        quantity: 1,
      },
    ];
    const goals = [
      {
        date: '2020-12-27',
        daysWithGoalNoDrink: ['monday', 'tuesday'],
        dosesByDrinkingDay: 1,
        dosesPerWeek: 5, // result of (7 days - 2 days with goal no drink) * 1 dose by drinking day = 5 doses per week
      },
    ];
    const goalsByWeek = [];
    const result = getDerivedDataFromDrinksState(catalogObject, sortConsosByTimestamp(drinks), goals, goalsByWeek);
    expect(result.drinksByDay).toEqual({
      '2020-12-27': [
        {
          timestamp: '2020-12-27T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '1',
          quantity: 1,
        },
      ],
      '2020-12-28': [
        {
          timestamp: '2020-12-28T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.NO_CONSO,
          id: '2',
          quantity: 1,
        },
      ],
      '2020-12-29': [
        {
          timestamp: '2020-12-29T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.NO_CONSO,
          id: '3',
          quantity: 1,
        },
      ],
      '2020-12-30': [
        {
          timestamp: '2020-12-30T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.NO_CONSO,
          id: '4',
          quantity: 1,
        },
      ],
      '2020-12-31': [
        {
          timestamp: '2020-12-31T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.NO_CONSO,
          id: '5',
          quantity: 1,
        },
      ],
      '2021-01-01': [
        {
          timestamp: '2021-01-01T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.WINE_GLASS,
          id: '6',
          quantity: 1,
        },
      ],
      '2021-01-02': [
        {
          timestamp: '2021-01-02T00:00:00.000Z',
          drinkKey: allowedDrinkKeys.NO_CONSO,
          id: '7',
          quantity: 1,
        },
      ],
    });
    expect(result.dailyDoses).toEqual({
      '2020-12-27': 1,
      '2020-12-28': 0,
      '2020-12-29': 0,
      '2020-12-30': 0,
      '2020-12-31': 0,
      '2021-01-01': 1,
      '2021-01-02': 0,
    });
    expect(result.weeklyDoses).toEqual({
      '2020-12-27': 2,
    });
    expect(result.monthlyDoses).toEqual({
      '2020-12': 1,
      '2021-01': 1,
    });
    expect(result.calendarDays).toEqual({
      '2020-12-27': 'goalExistsAndDosesWithinGoal',
      '2020-12-28': 'goalExistsAndNoDoses',
      '2020-12-29': 'goalExistsAndNoDoses',
      '2020-12-30': 'goalExistsAndNoDoses',
      '2020-12-31': 'goalExistsAndNoDoses',
      '2021-01-01': 'goalExistsAndDosesWithinGoal',
      '2021-01-02': 'goalExistsAndNoDoses',
    });
    expect(result.calendarGoalsStartOfWeek).toEqual({
      '2020-12-27': {
        consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
        consosWeek: 2,
        consosWeekGoal: 5,
        drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
        drinkingDays: 2,
        drinkingDaysGoal: 5,
        status: 'Success',
      },
    });
    expect(result.weeklyKcals).toEqual({
      '2020-12-27': 140,
    });
    expect(result.weeklyExpenses).toEqual({
      '2020-12-27': 8,
    });
    expect(result.abstinenceDays).toEqual(1);
  });
});
