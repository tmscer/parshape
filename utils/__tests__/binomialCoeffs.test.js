import binomialCoeffs from "../binomialCoeffs";

describe("binomialSeries", () => {
  const testCases = [
    // row, array of coefficients
    [0, [1]],
    [1, [1, 1]],
    [2, [1, 2, 1]],
    [3, [1, 3, 3, 1]],
    [4, [1, 4, 6, 4, 1]],
    [5, [1, 5, 10, 10, 5, 1]],
  ];

  testCases.forEach((args) => createTest(...args));

  function createTest(row, expectedCoeffs) {
    test(`row = ${row} produces coeffs ${expectedCoeffs}`, () => {
      const actualCoeffs = binomialCoeffs(row);

      expect(actualCoeffs).toStrictEqual(expectedCoeffs);
    });
  }
});
