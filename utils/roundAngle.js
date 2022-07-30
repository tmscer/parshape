export default function roundAngle(rads, step) {
  const nearestLower = Math.floor(rads / step) * step;
  const nearestHigher = nearestLower + step;

  const diffToLower = Math.abs(nearestLower - rads);
  const diffToHigher = Math.abs(nearestHigher - rads);

  if (diffToLower < diffToHigher) {
    return nearestLower;
  }

  return roundToTwoPi(nearestHigher);
}

function roundToTwoPi(rads) {
  if (Math.abs(rads - 2 * Math.PI) <= 1e-3) {
    return 0;
  }

  return rads % (2 * Math.PI);
}
