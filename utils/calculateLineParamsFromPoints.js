import floatEq from "./floatEq";

export default function calculateLineParamsFromPoints([x1, y1], [x2, y2]) {
  const isVertical = floatEq(x1, x2);

  if (isVertical) {
    if (y1 < y2) {
      return { a: Infinity, b: y1 };
    } else {
      return { a: -Infinity, b: y2 };
    }
  }

  const a = (y2 - y1) / (x2 - x1);
  const b = y1 - a * x1;

  const b2 = y2 - a * x2;

  if (!floatEq(b, b2)) {
    throw new Error("analytical geometry formula is flawed");
  }

  return { a, b };
}
