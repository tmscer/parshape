import { Stack, TextField } from "@mui/material";

export default function Settings({ settings, onChange }) {
  const { numLines, hsize, baselineskip, lineskip } = settings;

  const hsizePt = getHsizePt(hsize);

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
      <TextField
        helperText="Number of lines"
        variant="outlined"
        type="number"
        value={numLines}
        onChange={createUpdate("numLines", convertToInt)}
      />
      {/* TODO: Manual PT input and predefined array of options */}
      <TextField
        helperText="hsize"
        variant="outlined"
        value={hsizePt}
        onChange={createUpdate("hsize", convertToFloat)}
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
  hsize: "a4",
  baselineskip: 12,
  lineskip: 1,
});

Settings.OPTIONS = Object.freeze({
  hsize: {
    predefined: {
      a4: 455.24408,
      // TODO: More predefined
    },
  },
});

export function getHsizePt(hsize) {
  if (typeof hsize === "string") {
    return Settings.OPTIONS.hsize.predefined[hsize];
  }

  return hsize;
}

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
