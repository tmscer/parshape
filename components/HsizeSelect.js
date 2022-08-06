import { useCallback } from "react";

import SelectWithCustomValue from "./SelectWithCustomValue";

export const OPTIONS = [
  {
    value: 455.24408,
    label: "a4",
  },
  {
    value: 455.24408 / Math.SQRT2,
    label: "a5",
  },
];

export default function HsizeSelect({ value, setValue: _setValue, ...props }) {
  const setValue = useCallback(
    ({ value, ...rest }) => {
      _setValue({
        ...rest,
        value: +value || 100,
      });
    },
    [_setValue]
  );

  return (
    <SelectWithCustomValue
      value={value}
      setValue={setValue}
      options={OPTIONS}
      {...props}
    />
  );
}
