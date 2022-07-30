import calculateLineAngle from "../calculateLineAngle";
import { radToDeg } from "../degRadConversion";

const calculateLineAngleDegs = (...args) =>
  radToDeg(calculateLineAngle(...args));

describe("calculateLineAngle", () => {
  test("diagonal", () => {
    const degs = calculateLineAngleDegs([0, 0], [1, 1]);

    expect(degs).floatToEq(45);
  });

  test("horizontal", () => {
    const degs = calculateLineAngleDegs([1, 1], [3, 1]);

    expect(degs).floatToEq(0);
  });

  test("vertical up", () => {
    const degs = calculateLineAngleDegs([-1, -2], [-1, 10]);

    expect(degs).floatToEq(90);
  });

  test("vertical down", () => {
    const degs = calculateLineAngleDegs([-1, 20], [-1, -3]);

    expect(degs).floatToEq(-90);
  });
});
