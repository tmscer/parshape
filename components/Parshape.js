import { Stack, TextField } from "@mui/material";
import { useMemo, useState } from "react";

import useClampedNumber from "../hooks/useClampedNumber";
import floatEq from "../utils/floatEq";
import CopyToClipboardButton from "./CopyToClipboardButton";
import LabeledCheckbox from "./LabeledCheckbox";

const DEFAULT_ROUNDING = 3;
const MAX_ROUNDING = 5;

export default function Parshape({ lines, width }) {
  const [rounding, setRounding] = useRounding(DEFAULT_ROUNDING, MAX_ROUNDING);
  const [lastLineIsFullLine, setLastLineIsFullLine] = useState(false);

  const augmentedLines = useMemo(() => {
    if (lastLineIsFullLine) {
      return [...lines, [0, 0]];
    }

    return lines;
  }, [lines, lastLineIsFullLine]);

  const parshape = useMemo(
    () => createParshapeFromLines(augmentedLines, { width, rounding }),
    [augmentedLines, width, rounding]
  );

  return (
    <Stack direction="row" gap={4} alignItems="flex-start">
      <Stack direction="column" gap={4}>
        <CopyToClipboardButton value={parshape} />
        <LastLineIsFullLineCheckBox
          checked={lastLineIsFullLine}
          onChange={setLastLineIsFullLine}
        />
        <RoundingField
          value={rounding}
          onChange={setRounding}
          maxRounding={MAX_ROUNDING}
        />
      </Stack>
      <div style={{ width: "200px" }}>
        <pre>{parshape}</pre>
      </div>
    </Stack>
  );
}

function LastLineIsFullLineCheckBox(props) {
  return <LabeledCheckbox {...props} label="Last line is full" />;
}

function RoundingField({ value, onChange, maxRounding }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      label={`rounding (max ${maxRounding} decimals)`}
      type="number"
    />
  );
}

function createParshapeFromLines(lines, { width, rounding }) {
  const header = `\\parshape ${lines.length}`;

  const rounder = (value) => round(value, rounding);
  const prependSpaces = createPrependSpaces(2);

  const body = lines
    .map((line) => serializeLine(line, { width, rounder }))
    .map(prependSpaces)
    .join("\n");

  return `${header}\n${body}`;
}

function serializeLine(line, { width, rounder }) {
  const [left, fromRight] = line;
  const length = width - left - fromRight;

  const theWholeLine = floatEq(left, 0) && floatEq(length, width);

  if (theWholeLine) {
    return "0pt \\hsize";
  }

  return `${rounder(left)}pt ${rounder(length)}pt`;
}

function round(num, decimals) {
  const powOfTen = Math.pow(10, decimals);
  return Math.round(num * powOfTen) / powOfTen;
}

function createPrependSpaces(numSpaces) {
  const spaces = " ".repeat(numSpaces);

  return function prependSpaces(str) {
    return `${spaces}${str}`;
  };
}

function useRounding(defaultRounding, maxValue) {
  return useClampedNumber(defaultRounding, 0, maxValue);
}
