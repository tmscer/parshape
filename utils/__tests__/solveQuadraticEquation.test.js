import solveQuadraticEquation from "../solveQuadraticEquation";

describe("solveQuadraticEquation", () => {
  describe("discriminant > 0", () => {
    createTests([
      {
        equation: [-1, -4, -1],
        solutions: [(4 - Math.sqrt(12)) / -2, (4 + Math.sqrt(12)) / -2],
      },
      { equation: [1, 3, 0], solutions: [-3, 0] },
    ]);
  });

  describe("discriminant = 0", () => {
    createTests([
      { equation: [1, 2, 1], solutions: [-1] },
      { equation: [-1, -2, -1], solutions: [-1] },
      { equation: [-1, 2, -1], solutions: [1] },
    ]);
  });

  describe("discriminant < 0", () => {
    createTests([
      { equation: [1, 2, 2], solutions: [] },
      { equation: [10, -5, 2], solutions: [] },
    ]);
  });

  function createTests(equationsAndTheirSolutions) {
    equationsAndTheirSolutions.forEach(createTest);
  }

  function createTest({ equation: [a, b, c], solutions: expectedSolutions }) {
    const solutionsText =
      expectedSolutions.length === 0
        ? `has no solutions`
        : `solution${
            expectedSolutions.length > 1 ? "s" : ""
          } ${expectedSolutions}`;

    test(`${a}x^2 + ${b}x + ${c} has ${solutionsText}`, () => {
      const actualSolutions = solveQuadraticEquation(a, b, c);

      expect(actualSolutions).toStrictEqual(expectedSolutions);
    });
  }
});
