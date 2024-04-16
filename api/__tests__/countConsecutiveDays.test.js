const { countConsecutiveDays } = require("../src/utils/drinks");

describe("countConsecutiveDays", () => {
  test("should return 0 if no consos", () => {
    const consos = [];
    const result = countConsecutiveDays(consos);
    expect(result).toBe(0);
  });

  test("should return 1 if only one conso", () => {
    const consos = [{ date: "2021-01-01" }];
    const result = countConsecutiveDays(consos);
    expect(result).toBe(1);
  });

  test("should return 2 if two consos on consecutive days", () => {
    const consos = [{ date: "2021-01-02" }, { date: "2021-01-01" }];
    const result = countConsecutiveDays(consos);
    expect(result).toBe(2);
  });

  test("should return 2 if two consos on consecutive days and one not consecutive day", () => {
    const consos = [{ date: "2021-01-04" }, { date: "2021-01-03" }, { date: "2021-01-01" }];
    const result = countConsecutiveDays(consos);
    expect(result).toBe(2);
  });

  test("should return 2 if two consos on consecutive days and one not consecutive day and one one same day", () => {
    const consos = [{ date: "2021-01-04" }, { date: "2021-01-04" }, { date: "2021-01-03" }, { date: "2021-01-01" }];
    const result = countConsecutiveDays(consos);
    expect(result).toBe(2);
  });
});
