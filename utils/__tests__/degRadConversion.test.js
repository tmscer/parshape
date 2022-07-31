import { degToRad, radToDeg } from "../degRadConversion";

const testCases = [
  {
    degs: 0,
    rads: 0,
  },
  {
    degs: 180,
    rads: Math.PI,
    radsText: "(PI)",
  },
  {
    degs: 360,
    rads: 2 * Math.PI,
    radsText: "(2*PI)",
  },
  {
    degs: 60,
    rads: Math.PI / 3,
    radsText: "(PI/3)",
  },
  {
    degs: 120,
    rads: (2 * Math.PI) / 3,
    radsText: "(2*PI/3)",
  },
  {
    degs: 270,
    rads: (3 * Math.PI) / 2,
    radsText: "(3*PI/2)",
  },
];

describe("degToRad", () => {
  testCases.forEach((testCase) => {
    test(createTestName(testCase, true), () => {
      expect(degToRad(testCase.degs)).floatToEq(testCase.rads);
    });
  });
});

describe("radToDeg", () => {
  testCases.forEach((testCase) => {
    test(createTestName(testCase, false), () => {
      expect(radToDeg(testCase.rads)).floatToEq(testCase.degs);
    });
  });
});

function createTestName(testCase, degsFirst = true) {
  const degsText = `${testCase.degsText || testCase.degs}deg`;
  const radsText = `${testCase.radsText || testCase.rads}rad`;

  if (degsFirst) {
    return `${degsText} -> ${radsText}`;
  } else {
    return `${radsText} -> ${degsText}`;
  }
}
