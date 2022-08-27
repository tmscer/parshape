import combinationNumber from "../combinationNumber";

describe("combinationNumber", () => {
  describe("throws", () => {
    createThrowTest("when inputs are floats", 1.2, 4.4);
    createThrowTest("when inputs are NaNs", NaN, NaN);
    createThrowTest("when inputs are less than 0", -1, -0.5);
  });

  function createThrowTest(name, n, k) {
    test(name, () => {
      const shouldThrow = () => {
        combinationNumber(n, k);
      };

      expect(shouldThrow).toThrow();
    });
  }

  describe("valid inputs", () => {
    const testCases = [
      // n, k, output
      [1, 1, 1],
      [6, 4, 15],
      [10, 3, 120],
      [5, 1, 5],
      [40, 3, 9880],
    ];

    testCases.forEach((args) => createTest(...args));

    function createTest(n, k, expectedResult) {
      test(`${n} over ${k} is ${expectedResult}`, () => {
        const actualResult = combinationNumber(n, k);

        expect(actualResult).toBe(expectedResult);
      });
    }
  });
});
