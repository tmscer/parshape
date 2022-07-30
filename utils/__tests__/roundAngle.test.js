import { degToRad, radToDeg } from "../degRadConversion";
import roundAngle from "../roundAngle";

const roundAngleDegs = (...args) => radToDeg(roundAngle(...args.map(degToRad)));

describe("roundAngle", () => {
  describe("step is 15deg", () => {
    test("passing already rounded value in doesn't change it", () => {
      const degs = roundAngleDegs(30, 15);

      expect(degs).floatToEq(30);
    });

    test("rounds to 15deg when passing in 10deg", () => {
      const degs = roundAngleDegs(10, 15);

      expect(degs).floatToEq(15);
    });

    test("rounds to 0deg when passing in 7deg", () => {
      const degs = roundAngleDegs(7, 15);

      expect(degs).floatToEq(0);
    });
  });

  describe("step is 20 deg", () => {
    test("rounds to 0deg when passing in 350deg", () => {
      const degs = roundAngleDegs(350, 20);

      expect(degs).floatToEq(0);
    });

    test("rounds to 340 deg when passing in 349.5deg", () => {
      const degs = roundAngleDegs(349.5, 20);

      expect(degs).floatToEq(340);
    });
  });
});
