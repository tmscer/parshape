import { useCallback } from "react";

import SelectWithCustomValue from "./SelectWithCustomValue";

export const OPTIONS = [
  {
    id: "a4",
    value: 694.24724,
    label: "a4",
  },
  {
    id: "a5",
    value: 694.24724 / Math.SQRT2,
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
