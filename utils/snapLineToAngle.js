import calculateLineAngle from "./calculateLineAngle";
import roundAngle from "./roundAngle";

export default function snapLineToAngle(lineStart, lineStop, step) {
  const angle = calculateLineAngle(lineStart, lineStop);
  const roundedAngle = roundAngle(angle, step);

  const pointsDistance = distance(lineStart, lineStop);

  let xShift = pointsDistance * Math.cos(roundedAngle);
  let yShift = pointsDistance * Math.sin(roundedAngle);

  const [x1, y1] = lineStart;
  const [x2, _y2] = lineStop;

  if (x2 < x1) {
    xShift *= -1;
    yShift *= -1;
  }

  return [lineStart, [x1 + xShift, y1 + yShift]];
}

function distance([x1, y1], [x2, y2]) {
  const xDelta = x1 - x2;
  const yDelta = y1 - y2;

  return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
}
