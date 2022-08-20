import { Stack, TextField, Typography } from "@mui/material";

import findOptionById from "../utils/findOptionById";
import PageHeightField, {
  OPTIONS as PAGE_HEIGHT_OPTIONS,
} from "./PageHeightField";
import PageWidthField, {
  OPTIONS as PAGE_WIDTH_OPTIONS,
} from "./PageWidthField";

export default function Settings({ settings, onChange }) {
  const {
    numLines,
    pageWidth,
    pageWidthCustom,
    pageHeight,
    pageHeightCustom,
    baselineskip,
    lineskip,
    hoffset,
    voffset,
    hsize,
    vsize,
  } = settings;

  function createUpdate(key, valueMapper = identity) {
    return (event) => {
      const newSettings = {
        ...settings,
        [key]: valueMapper(event.target.value),
      };

      onChange(newSettings);
    };
  }

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
      <PageWidthField
        value={{ value: pageWidth, custom: Boolean(pageWidthCustom) }}
        setValue={({ value, custom }) =>
          onChange({
            ...settings,
            pageWidth: value,
            pageWidthCustom: custom,
          })
        }
        helperText="page width"
        variant="outlined"
      />
      <PageHeightField
        value={{ value: pageHeight, custom: Boolean(pageHeightCustom) }}
        setValue={({ value, custom }) =>
          onChange({
            ...settings,
            pageHeight: value,
            pageHeightCustom: custom,
          })
        }
        helperText="page height"
        variant="outlined"
      />
      <TextField
        helperText="hoffset + pdfhorigin"
        variant="outlined"
        value={hoffset}
        onChange={createUpdate("hoffset", convertToFloat)}
      />
      <TextField
        helperText="voffset + pdfvorigin"
        variant="outlined"
        value={voffset}
        onChange={createUpdate("voffset", convertToFloat)}
      />
      <TextField
        helperText="hsize"
        variant="outlined"
        value={hsize}
        onChange={createUpdate("hsize", convertToFloat)}
      />
      <TextField
        helperText="vsize"
        variant="outlined"
        value={vsize}
        onChange={createUpdate("vsize", convertToFloat)}
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
  pageWidth: findOptionById(PAGE_WIDTH_OPTIONS, "a4").value,
  pageWidthCustom: false,
  pageHeight: findOptionById(PAGE_HEIGHT_OPTIONS, "a4").value,
  pageHeightCustom: false,
  baselineskip: 12,
  lineskip: 1,
  hoffset: 72,
  voffset: 72,
  hsize: 455.24408,
  vsize: 694.24724,
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
