import calculateLineParamsFromPoints from "./calculateLineParamsFromPoints";

export default function calculateLineAngle([x1, y1], [x2, y2]) {
  const { a } = calculateLineParamsFromPoints([x1, y1], [x2, y2]);

  return Math.atan(a);
}
