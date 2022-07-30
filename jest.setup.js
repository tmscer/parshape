import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import * as matchers from "jest-extended";
expect.extend(matchers);

expect.extend({
  floatToEq(actual, expected, tolerance = 1e-5) {
    const lower = expected - tolerance;
    const higher = expected + tolerance;

    if (actual < lower || higher < actual) {
      return {
        pass: false,
        message: () =>
          `Range for float is [${lower}, ${higher}], got ${actual}`,
      };
    }

    return {
      pass: true,
      message: () => "",
    };
  },
});
