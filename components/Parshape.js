import floatEq from "../utils/floatEq";

export default function Parshape({ lines, width }) {
  const parshape = createParshapeFromLines(lines, width);

  return <pre>{parshape}</pre>;
}

function createParshapeFromLines(lines, width) {
  const header = `\\parshape ${lines.length}`;

  const prependSpaces = createPrependSpaces(2);

  const body = lines
    .map((line) => serializeLine(line, width))
    .map(prependSpaces)
    .join("\n");

  return `${header}\n${body}`;
}

function serializeLine(line, width) {
  const [left, fromRight] = line.map(round);
  const length = width - left - fromRight;

  const theWholeLine = floatEq(left, 0) && floatEq(length, width);

  if (theWholeLine) {
    return "0pt \\hsize";
  }

  return `${left}pt ${length}pt`;
}

function round(num) {
  return Math.round(num * 1e5) / 1e5;
}

function createPrependSpaces(numSpaces) {
  const spaces = " ".repeat(numSpaces);

  return function prependSpaces(str) {
    return `${spaces}${str}`;
  };
}
