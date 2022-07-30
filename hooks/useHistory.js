import { isEqual, last } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function useHistory(value) {
  const [history, setHistory] = useState([value]);
  const [index, setIndex] = useState(0);
  const current = history[index];

  const goToPrevious = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setIndex((i) => Math.min(history.length - 1, i + 1));
  }, [history]);

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
