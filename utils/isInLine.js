
export function isInLineX(line, x) {
  const x1 = Math.min(line.start[0], line.stop[0]);
  const x2 = Math.max(line.start[0], line.stop[0]);

  return x1 <= x && x <= x2;
}
