const { checkCurrentWeekGoal } = require("../src/utils/goals");

describe("checkCurrentWeekGoal", () => {
  test("should return goalsAreSetup as false when currentGoal is not provided", async () => {
    const result = await checkCurrentWeekGoal(null, []);
    expect(result).toEqual({
      goalsAreSetup: false,
      weekIsFilledWithConsos: false,
      status: null,
    });
  });

  test("should return weekIsFilledWithConsos as false when no days are filled", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, []);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: false,
      status: null,
    });
  });

  test("should return weekIsFilledWithConsos as false when week is not fully filled", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, [
      { drinkKey: "wine", date: "2021-01-04", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-03", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-02", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-01", quantity: 1, doses: 1 },
    ]);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: false,
      status: null,
    });
  });

  test("should return weekIsFilledWithConsos as false when week is not filled with consecutive days", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, [
      { drinkKey: "wine", date: "2021-01-07", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-06", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-05", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-03", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-02", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-01", quantity: 1, doses: 1 },
    ]);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: false,
      status: null,
    });
  });

  test("should return status as Failure when too many days with drinks", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, [
      { drinkKey: "wine", date: "2021-01-07", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-06", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-05", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-04", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-03", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-02", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-01", quantity: 1, doses: 1 },
    ]);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: true,
      status: "Failure",
    });
  });

  test("should return status as Failure when too many doses", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, [
      { drinkKey: "wine", date: "2021-01-07", quantity: 100, doses: 1 },
      { drinkKey: "wine", date: "2021-01-06", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-05", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-04", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-03", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-02", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-01", quantity: 1, doses: 1 },
    ]);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: true,
      status: "Failure",
    });
  });

  test("should return status as Success when goal is achieved", async () => {
    const result = await checkCurrentWeekGoal({ dosesPerWeek: 10, daysWithGoalNoDrink: [1, 2] }, [
      { drinkKey: "wine", date: "2021-01-07", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-06", quantity: 1, doses: 1 },
      { drinkKey: "wine", date: "2021-01-05", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-04", quantity: 1, doses: 1 },
      { drinkKey: "beer", date: "2021-01-03", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-02", quantity: 1, doses: 1 },
      { drinkKey: "no-conso", date: "2021-01-01", quantity: 1, doses: 1 },
    ]);
    expect(result).toEqual({
      goalsAreSetup: true,
      weekIsFilledWithConsos: true,
      status: "Success",
    });
  });
});
