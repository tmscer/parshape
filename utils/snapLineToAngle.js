import calculateLineAngle from "./calculateLineAngle";

export default function snapLineToAngle(lineStart, lineStop, step) {
  const angle = calculateLineAngle(lineStart, lineStop);
  const roundedAngle = roundedAngle(angle, step);

  const pointsDistance = distance(lineStart, lineStop);

  const snappedLineStop = [
    pointsDistance * Math.cos(roundedAngle),
    pointsDistance * Math.sin(roundedAngle),
  ];

  return [lineStart, snappedLineStop];
}

function distance([x1, y1], [x2, y2]) {
  const xDelta = x1 - x2;
  const yDelta = y1 - y2;

  return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
}
