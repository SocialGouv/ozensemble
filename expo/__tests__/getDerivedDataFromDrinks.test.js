import { getDerivedDataFromDrinksState } from "../src/helpers/consosHelpers";
import dayjs from "dayjs";
import { NO_CONSO } from "../src/scenes/ConsoFollowUp/drinksCatalog";

jest.mock("@sentry/react-native", () => ({
  init: jest.fn(),
  ReactNavigationInstrumentation: jest.fn(),
  ReactNativeTracing: jest.fn(),
}));

describe("should return correctly handled `calendarGoalsStartOfWeek`", () => {
  const consolidatedCatalogObject = {
    drink1: { doses: 1, kcal: 150 },
    drink2: { doses: 2, kcal: 300 },
  };
  const shared_drinks = [
    { timestamp: dayjs().startOf("week").add(0, "day").toISOString(), drinkKey: NO_CONSO },
    {
      timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 1,
    },
    {
      timestamp: dayjs().startOf("week").add(2, "day").toISOString(),
      drinkKey: "drink2",
      quantity: 2,
    },
    {
      timestamp: dayjs().startOf("week").add(3, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 3,
    },
    { timestamp: dayjs().startOf("week").add(4, "day").toISOString(), drinkKey: NO_CONSO },
    { timestamp: dayjs().startOf("week").add(5, "day").toISOString(), drinkKey: NO_CONSO },
  ];

  test("should return calendarGoalsStartOfWeek: Success when goals are met ", () => {
    const drinks = [
      ...shared_drinks,
      { timestamp: dayjs().startOf("week").add(6, "day").toISOString(), drinkKey: NO_CONSO },
    ];
    const goals = [
      { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Saturday"], dosesByDrinkingDay: 2 },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 10,
        consosWeek: 8,
        drinkingDaysGoal: 5,
        drinkingDays: 3,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("should return calendarGoalsStartOfWeek: Fail when consosWeekGoal is exceeded", () => {
    const drinks = [
      ...shared_drinks,
      {
        timestamp: dayjs().startOf("week").add(6, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 4,
      },
    ];

    const goals = [
      { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Saturday"], dosesByDrinkingDay: 2 },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Fail",
        consommationMessage:
          "Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 10,
        consosWeek: 12,
        drinkingDaysGoal: 5,
        drinkingDays: 4,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("should return calendarGoalsStartOfWeek: Fail when drinkingDaysGoal is exceeded", () => {
    const drinks = [
      ...shared_drinks,
      {
        timestamp: dayjs().startOf("week").add(6, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 2,
      },
    ];

    const goals = [
      {
        dosesPerWeek: 12,
        daysWithGoalNoDrink: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        dosesByDrinkingDay: 4,
      },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Fail",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 12,
        consosWeek: 10,
        drinkingDaysGoal: 2,
        drinkingDays: 4,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("should return calendarGoalsStartOfWeek: Fail when both drinkingDaysGoal and consosWeekGoal are exceeded ", () => {
    const drinks = [
      ...shared_drinks,
      {
        timestamp: dayjs().startOf("week").add(6, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 4,
      },
    ];

    const goals = [
      {
        dosesPerWeek: 5,
        daysWithGoalNoDrink: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        dosesByDrinkingDay: 4,
      },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Fail",
        consommationMessage:
          "Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 5,
        consosWeek: 12,
        drinkingDaysGoal: 2,
        drinkingDays: 4,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("should return calendarGoalsStartOfWeek: InProgress when not all days of the week have been filled", () => {
    const drinks = shared_drinks.slice(1, 4);

    const goals = [
      {
        dosesPerWeek: 5,
        daysWithGoalNoDrink: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        dosesByDrinkingDay: 4,
      },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "InProgress",
        drinkingDayMessage:
          "Ajoutez vos consommations tous les jours de cette semaine pour accéder à son analyse, bon courage !",
        consosWeekGoal: 5,
        consosWeek: 8,
        drinkingDaysGoal: 2,
        drinkingDays: 3,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("should return calendarGoalsStartOfWeek: NoGoal when no goal has been specified", () => {
    const drinks = shared_drinks;

    const goals = [];

    const goalsByWeek = {};

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "NoGoal",
        consommationMessage:
          "Fixez vous un objectif maximum de consommations pour analyser vos résultats chaque semaine",
        consosWeek: 8,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("boundary conditions: dosesPerWeek = 1", () => {
    const drinks = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      ...Array.from({ length: 6 }).map((_, i) => ({
        timestamp: dayjs()
          .startOf("week")
          .add(i + 1, "day")
          .toISOString(),
        drinkKey: NO_CONSO,
      })),
    ];

    const goals = [
      { dosesPerWeek: 1, daysWithGoalNoDrink: ["Monday", "Saturday"], dosesByDrinkingDay: 1 },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 1,
        consosWeek: 1,
        drinkingDaysGoal: 5,
        drinkingDays: 1,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("boundary conditions: daysWithGoalNoDrink.length = 4", () => {
    const drinks_1 = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      { timestamp: dayjs().startOf("week").add(1, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(2, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(3, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(4, "day").toISOString(), drinkKey: NO_CONSO },
      {
        timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
        drinkKey: "drink2",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(6, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];
    const drinks_2 = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      { timestamp: dayjs().startOf("week").add(1, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(2, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(3, "day").toISOString(), drinkKey: NO_CONSO },
      {
        timestamp: dayjs().startOf("week").add(4, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
        drinkKey: "drink2",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(6, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];

    const goals = [
      {
        dosesPerWeek: 6,
        daysWithGoalNoDrink: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        dosesByDrinkingDay: 1,
      },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result_1 = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks_1,
      goals,
      goalsByWeek
    );
    const result_2 = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks_2,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek_1 = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 6,
        consosWeek: 4,
        drinkingDaysGoal: 3,
        drinkingDays: 3,
      },
    };
    const expectedCalendarGoalsStartOfWeek_2 = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Fail",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 6,
        consosWeek: 5,
        drinkingDaysGoal: 3,
        drinkingDays: 4,
      },
    };

    expect(result_1.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek_1);
    expect(result_2.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek_2);
  });

  test("boundary conditions: one drink in a week", () => {
    const drinks = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      ...Array.from({ length: 6 }).map((_, i) => ({
        timestamp: dayjs()
          .startOf("week")
          .add(i + 1, "day")
          .toISOString(),
        drinkKey: NO_CONSO,
      })),
    ];

    const goals = [
      { dosesPerWeek: 1, daysWithGoalNoDrink: ["Monday", "Saturday"], dosesByDrinkingDay: 1 },
    ];

    const goalsByWeek = { [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0] };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 1,
        consosWeek: 1,
        drinkingDaysGoal: 5,
        drinkingDays: 1,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });

  test("Boundary Conditions: 2 drinks in a week within goal", () => {
    const drinks = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      {
        timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      ...Array.from({ length: 5 }).map((_, i) => ({
        timestamp: dayjs()
          .startOf("week")
          .add(i + 2, "day")
          .toISOString(),
        drinkKey: NO_CONSO,
      })),
    ];
    const goals = [
      { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Saturday"], dosesByDrinkingDay: 2 },
    ];
    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const expectedCalendarGoalsStartOfWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 10,
        consosWeek: 2,
        drinkingDaysGoal: 5,
        drinkingDays: 2,
      },
    };

    expect(result.calendarGoalsStartOfWeek).toEqual(expectedCalendarGoalsStartOfWeek);
  });
});

describe("should return correctly handled `drinksByDay`", () => {
  const consolidatedCatalogObject = {
    drink1: { doses: 1, kcal: 150 },
    drink2: { doses: 2, kcal: 300 },
  };
  const goals = [
    { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Thursday"], dosesByDrinkingDay: 2 },
  ];
  const goalsByWeek = {
    [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
  };
  const shared_drinks = [
    { timestamp: dayjs().startOf("week").add(0, "day").toISOString(), drinkKey: NO_CONSO },
    {
      timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 1,
    },
    {
      timestamp: dayjs().startOf("week").add(2, "day").toISOString(),
      drinkKey: "drink2",
      quantity: 2,
    },
    {
      timestamp: dayjs().startOf("week").add(3, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 3,
    },
    {
      timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 3,
    },
    { timestamp: dayjs().startOf("week").add(6, "day").toISOString(), drinkKey: NO_CONSO },
  ];

  test("should handle multiple drinks a day", () => {
    const drinks = [
      ...shared_drinks,
      {
        timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
        drinkKey: "drink2",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 3,
      },
      {
        timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
        drinkKey: "drink2",
        quantity: 3,
      },
    ];

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedDrinksByDay = {
      [dayjs().startOf("week").add(0, "day").format("YYYY-MM-DD")]: [drinks[0]],
      [dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD")]: [drinks[1], drinks[6]],
      [dayjs().startOf("week").add(2, "day").format("YYYY-MM-DD")]: [drinks[2]],
      [dayjs().startOf("week").add(3, "day").format("YYYY-MM-DD")]: [drinks[3]],
      [dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD")]: [
        drinks[4],
        drinks[7],
        drinks[8],
      ],
      [dayjs().startOf("week").add(6, "day").format("YYYY-MM-DD")]: [drinks[5]],
    };

    expect(result.drinksByDay).toEqual(expectedDrinksByDay);
  });

  test("should handl unfilled days", () => {
    const drinks = shared_drinks.splice(1, 4);

    const goals = [
      { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Thursday"], dosesByDrinkingDay: 2 },
    ];

    const goalsByWeek = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );

    const expectedDrinksByDay = {
      [dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD")]: [drinks[0]],
      [dayjs().startOf("week").add(2, "day").format("YYYY-MM-DD")]: [drinks[1]],
      [dayjs().startOf("week").add(3, "day").format("YYYY-MM-DD")]: [drinks[2]],
      [dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD")]: [drinks[3]],
    };

    expect(result.drinksByDay).toEqual(expectedDrinksByDay);
  });
});

describe("should return correctly handled `calendarDays`", () => {
  const consolidatedCatalogObject = {
    drink1: { doses: 1, kcal: 150 },
    drink2: { doses: 2, kcal: 300 },
  };

  const goals = [
    { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Thursday"], dosesByDrinkingDay: 2 },
  ];

  const goalsByWeek = {
    [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[0],
  };
  test("No Goal and Doses", () => {
    const drinks = [{ timestamp: dayjs().toISOString(), drinkKey: "drink1", quantity: 1 }];
    const result = getDerivedDataFromDrinksState(consolidatedCatalogObject, drinks, [], {});
    const today = dayjs().format("YYYY-MM-DD");
    expect(result.calendarDays[today]).toBe("noGoalAndDoses");
  });

  test("When Goal Exists and No Doses", () => {
    const drinks = [{ timestamp: dayjs().toISOString(), drinkKey: NO_CONSO }];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const today = dayjs().format("YYYY-MM-DD");

    expect(result.calendarDays[today]).toBe("goalExistsAndNoDoses");
  });

  test("Goal Exists and Doses Within Goal", () => {
    const drinks = [{ timestamp: dayjs().toISOString(), drinkKey: "drink1", quantity: 1 }];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const today = dayjs().format("YYYY-MM-DD");
    expect(result.calendarDays[today]).toBe("goalExistsAndDosesWithinGoal");
  });

  test(" When Goal Exists but Not Respected", () => {
    const drinks = [{ timestamp: dayjs().toISOString(), drinkKey: "drink2", quantity: 3 }];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const today = dayjs().format("YYYY-MM-DD");
    expect(result.calendarDays[today]).toBe("goalExistsButNotRespected");
  });

  test("Should handle correctly for multiple Days within a Week", () => {
    const drinks = [
      {
        timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(2, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      {
        timestamp: dayjs().startOf("week").add(3, "day").toISOString(),
        drinkKey: "drink2",
        quantity: 2,
      },
      {
        timestamp: dayjs().startOf("week").add(4, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 3,
      },
    ];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const expectedCalendarDays = {
      [dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(2, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(3, "day").format("YYYY-MM-DD")]: "goalExistsButNotRespected",
      [dayjs().startOf("week").add(4, "day").format("YYYY-MM-DD")]: "goalExistsButNotRespected",
    };

    expect(result.calendarDays).toEqual(expectedCalendarDays);
  });

  test("Boundary Conditions: When drinks are outside the week boundary", () => {
    const drinks = [
      {
        timestamp: dayjs().startOf("week").add(-1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      {
        timestamp: dayjs().endOf("week").add(1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const startBoundary = dayjs().startOf("week").add(-1, "day").format("YYYY-MM-DD");
    const endBoundary = dayjs().endOf("week").add(1, "day").format("YYYY-MM-DD");
    expect(result.calendarDays[startBoundary]).toBe("goalExistsAndDosesWithinGoal");
    expect(result.calendarDays[endBoundary]).toBe("goalExistsAndDosesWithinGoal");
  });

  test("Boundary Conditions: 2 drinks in a week within goal", () => {
    const drinks = [
      { timestamp: dayjs().startOf("week").toISOString(), drinkKey: "drink1", quantity: 1 },
      {
        timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const expectedCalendarDays = {
      [dayjs().startOf("week").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
    };

    expect(result.calendarDays).toEqual(expectedCalendarDays);
  });
});

describe("should return correctly handled `abstinenceDays`", () => {
  const consolidatedCatalogObject = { drink1: { doses: 1, kcal: 150 } };

  test("should return abstinenceDays: 0 when no drinks", () => {
    const drinks = [];
    const goals = [];
    const goalsByWeek = {};

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    expect(result.abstinenceDays).toBe(0);
  });

  test("should return abstinenceDays: 0 for continuous drinking days", () => {
    const drinks = Array.from({ length: 7 }, (_, i) => ({
      timestamp: dayjs().startOf("week").add(i, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 1,
    }));
    const goals = [];
    const goalsByWeek = {};

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    expect(result.abstinenceDays).toBe(0);
  });

  test("should return correct abstinenceDays for single gap day", () => {
    const drinks = [
      { timestamp: dayjs().toISOString(), drinkKey: NO_CONSO },
      {
        timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];
    const goals = [];
    const goalsByWeek = {};
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    expect(result.abstinenceDays).toBe(1);
  });

  test("should return correct abstinenceDays for multiple gap days", () => {
    const drinks = [
      { timestamp: dayjs().startOf("week").add(0, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(1, "day").toISOString(), drinkKey: NO_CONSO },
      { timestamp: dayjs().startOf("week").add(2, "day").toISOString(), drinkKey: NO_CONSO },
      {
        timestamp: dayjs().startOf("week").add(3, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
      { timestamp: dayjs().startOf("week").add(4, "day").toISOString(), drinkKey: NO_CONSO },
      {
        timestamp: dayjs().startOf("week").add(5, "day").toISOString(),
        drinkKey: "drink1",
        quantity: 1,
      },
    ];
    const goals = [];
    const goalsByWeek = {};

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    expect(result.abstinenceDays).toBe(3);
  });
});

describe("should correctly handle Weekly Goals", () => {
  const consolidatedCatalogObject = {
    drink1: { doses: 1, kcal: 150 },
    drink2: { doses: 2, kcal: 300 },
  };
  const drinks_this_week = [
    { timestamp: dayjs().startOf("week").add(0, "day").toISOString(), drinkKey: NO_CONSO },
    {
      timestamp: dayjs().startOf("week").add(1, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 1,
    },
    {
      timestamp: dayjs().startOf("week").add(2, "day").toISOString(),
      drinkKey: "drink2",
      quantity: 2,
    },
    {
      timestamp: dayjs().startOf("week").add(3, "day").toISOString(),
      drinkKey: "drink1",
      quantity: 3,
    },
    { timestamp: dayjs().startOf("week").add(4, "day").toISOString(), drinkKey: NO_CONSO },
    { timestamp: dayjs().startOf("week").add(5, "day").toISOString(), drinkKey: NO_CONSO },
    { timestamp: dayjs().startOf("week").add(6, "day").toISOString(), drinkKey: NO_CONSO },
  ];

  const drinks_last_week = drinks_this_week.map((drink) => ({
    ...drink,
    timestamp: dayjs(drink.timestamp).add(-1, "week").toISOString(),
  }));

  test("should return correct values for a single weekly goal", () => {
    const drinks = drinks_last_week;
    const goals = [
      { dosesPerWeek: 10, daysWithGoalNoDrink: ["Monday", "Thursday"], dosesByDrinkingDay: 4 },
    ];
    const goalsByWeek = {
      [dayjs().startOf("week").add(-1, "week").format("YYYY-MM-DD")]: goals[0],
    };
    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const expectedGoals = {
      [dayjs().startOf("week").add(-1, "week").format("YYYY-MM-DD")]: {
        status: "Success",
        consommationMessage:
          "Vos consommations de cette semaine sont __dans__ votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 10,
        consosWeek: 8,
        drinkingDaysGoal: 5,
        drinkingDays: 3,
      },
    };

    const expectedcalendarDays = {
      [dayjs().startOf("week").add(-7, "day").format("YYYY-MM-DD")]: "goalExistsAndNoDoses",
      [dayjs().startOf("week").add(-6, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(-5, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(-4, "day").format("YYYY-MM-DD")]: "goalExistsAndDosesWithinGoal",
      [dayjs().startOf("week").add(-3, "day").format("YYYY-MM-DD")]: "goalExistsAndNoDoses",
      [dayjs().startOf("week").add(-2, "day").format("YYYY-MM-DD")]: "goalExistsAndNoDoses",
      [dayjs().startOf("week").add(-1, "day").format("YYYY-MM-DD")]: "goalExistsAndNoDoses",
    };
    expect(result.calendarGoalsStartOfWeek).toEqual(expectedGoals);
    expect(result.calendarDays).toEqual(expectedcalendarDays);
  });

  // TODO: what is the expected behavior in this case
  test("should return correct values for more than one goal", () => {
    const drinks = [...drinks_last_week, ...drinks_this_week];
    const goals = [
      {
        dosesPerWeek: 10,
        daysWithGoalNoDrink: ["Monday", "Thursday"],
        dosesByDrinkingDay: 2,
      },
      {
        dosesPerWeek: 5,
        daysWithGoalNoDrink: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        dosesByDrinkingDay: 4,
      },
    ];
    const goalsByWeek = {
      [dayjs().startOf("week").add(-1, "week").format("YYYY-MM-DD")]: goals[0],
      [dayjs().startOf("week").format("YYYY-MM-DD")]: goals[1],
    };

    const result = getDerivedDataFromDrinksState(
      consolidatedCatalogObject,
      drinks,
      goals,
      goalsByWeek
    );
    const expectedGoals = {
      [dayjs().startOf("week").add(-1, "week").format("YYYY-MM-DD")]: {
        status: "Fail",
        consommationMessage:
          "Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.",
        drinkingDayMessage:
          "Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.",
        consosWeekGoal: 10,
        consosWeek: 16,
        drinkingDaysGoal: 5,
        drinkingDays: 6,
      },
    };

    /* TODO: shouldn't this be the expected result?
    const const expectedGoals = {
      [dayjs().startOf('week').add(-1, 'week').format('YYYY-MM-DD')]: {
        status: 'Success',
        consommationMessage: 'Vos consommations de cette semaine sont __dans__ votre objectif fixé.',
        drinkingDayMessage: 'Vous avez __respecté le nombre de jours__ où vous vous autorisiez à boire.',
        consosWeekGoal: 10,
        consosWeek: 8,
        drinkingDaysGoal: 5,
        drinkingDays: 3
      },
      [dayjs().startOf('week').format('YYYY-MM-DD')]': {
        status: 'Fail',
        consommationMessage: 'Vos consommations de cette semaine sont __supérieures__ à votre objectif fixé.',
        drinkingDayMessage: 'Vous avez __dépassé le nombre de jours__ où vous vous autorisiez à boire.',
        consosWeekGoal: 5,
        consosWeek: 8,
        drinkingDaysGoal: 2,
        drinkingDays: 3
      }
    */
    expect(result.calendarGoalsStartOfWeek).toEqual(expectedGoals);
  });
});
