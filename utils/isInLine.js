export function isInLineX(line, x) {
  const x1 = Math.min(line.start[0], line.stop[0]);
  const x2 = Math.max(line.start[0], line.stop[0]);

  return x1 <= x && x <= x2;
}

export function isInLineY(line, y) {
  const y1 = Math.min(line.start[1], line.stop[1]);
  const y2 = Math.max(line.start[1], line.stop[1]);

  return y1 <= y && y <= y2;
}

export default function isInLine(line, [x, y]) {
  return isInLineX(line, x) && isInLineY(line, y);
}
