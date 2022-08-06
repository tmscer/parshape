import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import useClampedNumber from "../useClampedNumber";

describe("useClampedNumber", () => {
  describe("first render", () => {
    test("clamps on the first render", () => {
      const rendered = setupUseClampedNumber(-10, 1, 10);
      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(1);
    });

    test("doesn't change value when it is min", () => {
      const rendered = setupUseClampedNumber(2, 2, 5);
      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(2);
    });

    test("doesn't change value when it is max", () => {
      const rendered = setupUseClampedNumber(5, 2, 5);
      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(5);
    });

    test("doesn't change value when it is between min and max", () => {
      const rendered = setupUseClampedNumber(4, 2, 5);
      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(4);
    });
  });

  describe("setter", () => {
    test("clamps using min", () => {
      const rendered = setupUseClampedNumber(5, 0, 10);
      let [value, setValue] = rendered.result.current;

      act(() => {
        setValue(-1);
      });

      [value, setValue] = rendered.result.current;

      expect(value).toBe(0);
    });

    test("clamps using max", () => {
      const rendered = setupUseClampedNumber(5, 0, 10);
      let [value, setValue] = rendered.result.current;

      act(() => {
        setValue(12);
      });

      [value, setValue] = rendered.result.current;

      expect(value).toBe(10);
    });
  });

  describe("rerendering", () => {
    test("clamps value when min changes", () => {
      const rendered = setupUseClampedNumber(0, -1, 5);

      act(() => {
        rendered.rerender([0, 1, 5]);
      });

      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(1);
    });

    test("clamps value when max changes", () => {
      const rendered = setupUseClampedNumber(0, -5, 5);

      act(() => {
        rendered.rerender([0, -5, -1]);
      });

      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(-1);
    });

    test("doesn't change callback when rerendering with no prop change", () => {
      const rendered = setupUseClampedNumber(1, 0, 2);
      const [_, initialSetValue] = rendered.result.current;

      initialSetValue._testDifferentiator = 42;

      act(() => {
        rendered.rerender([1, 0, 2]);
      });

      const [value, setValue] = rendered.result.current;

      expect(value).toBe(1);
      expect(setValue._testDifferentiator).toBe(42);
    });

    test("changing default value has no effect", () => {
      const rendered = setupUseClampedNumber(1, 0, 5);

      act(() => {
        rendered.rerender([3, 0, 5]);
      });

      const [value, _setValue] = rendered.result.current;

      expect(value).toBe(1);
    });
  });

  function setupUseClampedNumber(defaultValue, minValue, maxValue) {
    return renderHook((array) => useClampedNumber(...array), {
      initialProps: [defaultValue, minValue, maxValue],
    });
  }
});
