export default function parseParshape(inputText, options) {
  if (!inputText) {
    throw new ParshapeParseError("empty");
  }

  const text = sanitizeText(inputText);
  const tokens = text.split(" ");

  if (!text.startsWith("\\parshape") || tokens[0] !== "\\parshape") {
    throw new ParshapeParseError("start-without-parshape");
  }

  const numLines = parseInt(tokens[1]);

  if (Number.isNaN(numLines)) {
    throw new ParshapeParseError("number-of-lines-not-integer");
  }

  // First 1 -> \parshape
  // Second 1 -> <numLines>
  const expectedNumTokens = 1 + 1 + numLines * 2;

  if (tokens.length < expectedNumTokens) {
    throw new ParshapeParseError("too-few-tokens");
  }

  const lines = [];

  for (let i = 2; i < expectedNumTokens; i += 2) {
    const [left, right] = tokens.slice(i, i + 2);

    const leftInPoints = intoPoints(left, options);
    const rightInPoints = intoPoints(right, options);

    const lineLeft = leftInPoints;
    const lineRight = options.hsize - leftInPoints - rightInPoints;

    lines.push([lineLeft, lineRight]);
  }

  return lines;
}

function sanitizeText(inputText) {
  return inputText.trim().replace(/\s+/g, " ");
}

// https://en.wikibooks.org/wiki/TeX/TeX_dimensions
const TO_PT_MULTIPLIER = {
  pt: 1,
  in: 72.27,
  pc: 12,
  bp: 72,
  cm: 72.27 / 2.54,
  mm: 72.27 / 2.54 / 10,
  dd: 1238 / 1157,
  cc: (12 * 1238) / 1157,
  sp: 1 / 65536,
};

function intoPoints(dimen, options) {
  if (dimen === "\\hsize") {
    return options.hsize;
  } else if (dimen.startsWith("\\")) {
    throw new ParshapeParseError("unknown-token");
  }

  const unit = dimen.split(/^[+-]?\d+(\.\d+)?/).reduce((_, v) => v);

  if (!unit) {
    throw new ParshapeParseError("no-unit");
  }

  const multiplier = TO_PT_MULTIPLIER[unit];

  if (!multiplier) {
    throw new ParshapeParseError(`unknown-unit-${unit}`);
  }

  const number = parseFloat(dimen.match(/^[+-]?\d+(\.\d+)?/)[0]);

  if (!Number.isFinite(number) || Number.isNaN(number)) {
    throw new ParshapeParseError("no-number");
  }

  return number * multiplier;
}

export class ParshapeParseError extends Error {
  constructor(code, line = null, column = null) {
    super(createParshapeParseErrorMessage({ code, line, column }));
    this.name = "ParshapeParseError";

    this.code = code;
    this.line = line;
    this.column = column;
  }
}

function createParshapeParseErrorMessage({ code, line, column }) {
  let message = `Error code ${code}`;

  if (line) {
    message += ` occurred on line ${line}`;
  }

  if (column) {
    message += `, column ${column}`;
  }

  return message;
}
