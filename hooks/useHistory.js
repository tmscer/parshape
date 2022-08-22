import { isEqual, last } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function useHistory(value, onChange = (_value) => {}) {
  const [history, setHistory] = useState([value]);
  const [index, setIndex] = useState(0);
  const current = history[index];

  const updateIndex = useCallback(
    (formula) => {
      setIndex((i) => {
        const newIndex = formula({ i, history });

        if (i !== newIndex) {
          onChange(history[newIndex]);
        }

        return newIndex;
      });
    },
    [history, onChange]
  );

  const goToPrevious = useCallback(() => {
    updateIndex(({ i }) => Math.max(0, i - 1));
  }, [updateIndex]);

  const goToNext = useCallback(() => {
    updateIndex(({ i, history }) => Math.min(history.length - 1, i + 1));
  }, [updateIndex]);

  useEffect(() => {
    if (isEqual(current, value) || isEqual(last(history), value)) {
      return;
    }

    setHistory((hist) => {
      const kept = hist.slice(0, index + 1);
      return [...kept, value];
    });
    setIndex(index + 1);
  }, [current, index, value, history]);

  return {
    current,
    goToPrevious,
    goToNext,
  };
}
