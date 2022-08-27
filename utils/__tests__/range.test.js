import range from "../range";

describe("range", () => {
  test("0..5", () => {
    expect(range(0, 5)).toStrictEqual([0, 1, 2, 3, 4]);
  });

  test("5..12", () => {
    expect(range(5, 12)).toStrictEqual([5, 6, 7, 8, 9, 10, 11]);
  });

  test("-5..1", () => {
    expect(range(-5, 1)).toStrictEqual([-5, -4, -3, -2, -1, 0]);
  });
});
