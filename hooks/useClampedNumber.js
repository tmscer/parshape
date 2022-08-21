import { clamp } from "lodash";
import { useState } from "react";

export default function useClampedNumber(defaultValue, minValue, maxValue) {
  const [value, setValue] = useState(defaultValue);

  return [clamp(value, minValue, maxValue), setValue];
}
