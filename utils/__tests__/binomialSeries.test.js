import binomialSeries from "../binomialSeries";

describe("binomialSeries", () => {
  test("n = 3, a = 2, b = 3", () => {
    const series = binomialSeries(3, 2, 3);

    expect(series).toStrictEqual([8, 36, 54, 27]);
  });

  test("n = 2, a = 10, b = -1", () => {
    const series = binomialSeries(2, 10, -1);

    expect(series).toStrictEqual([100, -20, 1]);
  });
});
