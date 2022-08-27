import binomialSeries from "./binomialSeries";

export default function bezierCurve(points, stepSize = 0.01) {
  if (points.length <= 1) {
    throw new Error("Number of points has to be at least 2");
  }

  const bezierPoints = [];

  for (let t = 0; t <= 1; t += stepSize) {
    const a = 1 - t;
    const b = t;

    const coeffs = binomialSeries(points.length - 1, a, b);

    const nextPoint = sumPoints(
      ...coeffs.map((coeff, i) => scalarTimesVector(coeff, points[i]))
    );

    bezierPoints.push(nextPoint);
  }

  return bezierPoints;
}

function scalarTimesVector(scalar, vector) {
  return vector.map((v) => scalar * v);
}

function sumPoints(...points) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < points.length; i += 1) {
    x += points[i][0];
    y += points[i][1];
  }

  return [x, y];
}
