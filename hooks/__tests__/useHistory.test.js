import { act, renderHook } from "@testing-library/react";

import useHistory from "../useHistory";

describe("useHistory", () => {
  test("initial render", () => {
    const {
      result: { current: value },
    } = renderHook(useHistory, { initialProps: 1 });

    expect(value.current).toBe(1);
    expect(typeof value.goToNext).toBe("function");
    expect(typeof value.goToPrevious).toBe("function");
  });

  test("setupHistory helper works as expected", () => {
    const {
      result: { current: value },
    } = setupHistory(addOne, 10);

    expect(value.current).toBe(10);
  });

  test("going forward immediately doesn't change value", () => {
    const { result } = setupHistory(addOne, 3);

    const startingValue = result.current.current;

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.current).toBe(startingValue);
  });

  test("can go back and forth in history", () => {
    const { result } = setupHistory(addOne, 5);

    expect(result.current.current).toBe(5);

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.current).toBe(4);

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.current).toBe(3);

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.current).toBe(4);
  });

  test("going back then adding another state deletes future", () => {
    const { result, rerender } = setupHistory(addOne, 7);

    expect(result.current.current).toBe(7);

    act(() => {
      result.current.goToPrevious();
    });

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.current).toBe(5);

    act(() => {
      rerender(["hello"]);
    });

    expect(result.current.current).toBe("hello");

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.current).toBe("hello");
  });

  test("onChange callback isn't invokes on first render", () => {
    const onChange = jest.fn();
    setupHistory(addOne, 6, onChange);

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test("going back invokes callback", () => {
    const onChange = jest.fn();
    const { result } = setupHistory(addOne, 6, onChange);

    act(() => {
      result.current.goToPrevious();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  test("going forward invokes callback", () => {
    const onChange = jest.fn();
    const { result } = setupHistory(addOne, 10, onChange);

    act(() => {
      result.current.goToPrevious();
    });

    act(() => {
      result.current.goToNext();
    });

    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test("going forward when there is no more future doesn't invoke callback", () => {
    const onChange = jest.fn();
    const { result } = setupHistory(addOne, 8, onChange);

    act(() => {
      result.current.goToNext();
    });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test("going back when there is no past doesn't invoke callback", () => {
    const onChange = jest.fn();
    const { result } = setupHistory(addOne, 0, onChange);

    act(() => {
      result.current.goToPrevious();
    });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  function addOne(n) {
    return n + 1;
  }

  function setupHistory(getNthValue, iterations, onChange = undefined) {
    if (iterations < 0) {
      throw new Error("Iterations must a be number >= 0");
    }

    const hook = renderHook((args) => useHistory(...args), {
      initialProps: [getNthValue(0), onChange],
    });

    for (let n = 1; n < iterations; n += 1) {
      act(() => {
        const value = getNthValue(n);
        hook.rerender([value, onChange]);
      });
    }

    return hook;
  }
});
