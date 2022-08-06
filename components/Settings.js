import { Stack, TextField, Typography } from "@mui/material";

import HsizeSelect from "./HsizeSelect";

export default function Settings({ settings, onChange }) {
  const { numLines, hsize, hsizeCustom, baselineskip, lineskip } = settings;

  const createUpdate =
    (key, valueMapper = identity) =>
    (event) => {
      const newSettings = {
        ...settings,
        [key]: valueMapper(event.target.value),
      };

      onChange(newSettings);
    };

  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h4">Settings</Typography>
      <TextField
        helperText="Number of lines"
        variant="outlined"
        type="number"
        value={numLines}
        onChange={createUpdate("numLines", convertToInt)}
      />
      <HsizeSelect
        value={{ value: hsize, custom: Boolean(hsizeCustom) }}
        setValue={({ value, custom }) =>
          onChange({
            ...settings,
            hsize: value,
            hsizeCustom: custom,
          })
        }
        helperText="hsize"
        variant="outlined"
      />
      <TextField
        helperText="baselineskip"
        variant="outlined"
        value={baselineskip}
        onChange={createUpdate("baselineskip", convertToFloat)}
      />
      <TextField
        helperText="lineskip"
        variant="outlined"
        value={lineskip}
        onChange={createUpdate("lineskip", convertToFloat)}
      />
    </Stack>
  );
}

Settings.DEFAULT_SETTINGS = Object.freeze({
  numLines: 10,
  hsize: 455.24408,
  hsizeCustom: false,
  baselineskip: 12,
  lineskip: 1,
});

function identity(value) {
  return value;
}

function convertToInt(value) {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  return parseInt(onlyNumbers);
}

function convertToFloat(value) {
  const onlyNumbersAndDot = value.replace(/[^0-9.]/g, "");
  return parseFloat(onlyNumbersAndDot);
}
