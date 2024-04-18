const { checksConsecutiveDays } = require("../src/utils/drinks");

describe("checksConsecutiveDays", () => {
  test("should return false if no consos", () => {
    const consos = [];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(false);
  });

  test("should return false if only one conso", () => {
    const consos = [{ date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(false);
  });

  test("should return true if two consos on consecutive days", () => {
    const consos = [{ date: "2021-01-02" }, { date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(true);
  });

  test("should return true if two consos on consecutive days and one not consecutive day", () => {
    const consos = [{ date: "2021-01-04" }, { date: "2021-01-03" }, { date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(true);
  });

  test("should return true if two consos on consecutive days and one not consecutive day and one one same day", () => {
    const consos = [{ date: "2021-01-04" }, { date: "2021-01-04" }, { date: "2021-01-03" }, { date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(true);
  });

  test("should return true if more than two consos on consecutive days and one not consecutive day and one one same day", () => {
    const consos = [{ date: "2021-01-05" }, { date: "2021-01-04" }, { date: "2021-01-03" }, { date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(true);
  });

  test("should return true if more than two consos on consecutive days even at the end of the array", () => {
    const consos = [{ date: "2021-01-10" }, { date: "2021-01-04" }, { date: "2021-01-02" }, { date: "2021-01-01" }];
    const result = checksConsecutiveDays(2, consos);
    expect(result).toBe(true);
  });
});
