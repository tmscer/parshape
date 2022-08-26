import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback } from "react";

export default function EdgeButton({ value, onChange: onChangeOuter }) {
  const onChange = useCallback(
    (_event, value) => {
      if (!value) {
        // Let's not allow no value to be set
        return;
      }

      onChangeOuter(value);
    },
    [onChangeOuter]
  );

  return (
    <ToggleButtonGroup value={value} onChange={onChange} exclusive>
      <ToggleButton value="left">Left edge</ToggleButton>
      <ToggleButton value="right">Right edge</ToggleButton>
    </ToggleButtonGroup>
  );
}
