import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const CUSTOM_VALUE = "__custom_value__";

export default function SelectWithCustomValue({
  value: { value, custom },
  setValue: _setValue,
  options,
  ...props
}) {
  const inputRef = useRef();
  const [focusOnCustom, setFocusOnCustom] = useState(false);

  // We cannot autofocus when we call `_setValue` in `setCustom`
  // because that changes `<TestField />`'s prop `select` which causes
  // the `<TextField />` to replace the current input -- we lose the current ref.
  // We focus after the change which also allows our parent component
  // to reject the switch to a custom value if it wants to. That means this
  // is always a controllable component.
  useEffect(() => {
    if (!inputRef.current || !focusOnCustom || !custom) {
      return;
    }

    inputRef.current.focus();
    setFocusOnCustom(false);
  }, [inputRef, focusOnCustom, custom]);

  const getLabel = useCallback(
    (value) => options.find((option) => option.value === value)?.label,
    [options]
  );

  const setCustom = useCallback(
    (value = 0) => {
      _setValue({ value, custom: true });
      setFocusOnCustom(true);
    },
    [_setValue]
  );

  const setPredefinedValue = useCallback(
    (value) => {
      _setValue({ value, label: getLabel(value), custom: false });
    },
    [getLabel, _setValue]
  );

  const setValue = useCallback(
    (e) => {
      const newValue = e.target.value;

      if (custom) {
        setCustom(newValue);
        return;
      }

      if (newValue === CUSTOM_VALUE) {
        setCustom();
        return;
      }

      setPredefinedValue(newValue);
    },
    [setCustom, setPredefinedValue, custom]
  );

  return (
    <TextField
      inputRef={inputRef}
      select={!custom}
      value={value}
      onChange={setValue}
      InputProps={{
        endAdornment: custom ? (
          <ClearCustomValue
            onClick={() => setPredefinedValue(options[0].value)}
          />
        ) : null,
        ...(props.InputProps || {}),
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      <MenuItem value={CUSTOM_VALUE}> Custom</MenuItem>
    </TextField>
  );
}

function ClearCustomValue({ onClick }) {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        <ClearIcon />
      </IconButton>
    </InputAdornment>
  );
}
