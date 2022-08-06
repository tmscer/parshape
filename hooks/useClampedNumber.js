import { clamp } from "lodash";
import { useCallback, useState } from "react";

export default function useClampedNumber(defaultValue, minValue, maxValue) {
  const clamper = useCallback(
    (value) => clamp(value, minValue, maxValue),
    [minValue, maxValue]
  );

  const [value, setValue] = useState(defaultValue);

  return [clamper(value), setValue];
}
