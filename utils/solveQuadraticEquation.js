// Returns real solutions to equations a*x^2 + b*x + c = 0
// where a, b, c are real numbers.
export default function solveQuadraticEquation(a, b, c) {
  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return [];
  }

  if (discriminant === 0) {
    return [-b / (2 * a)];
  }

  const squareRootOfDiscriminant = Math.sqrt(discriminant);

  return [
    (-b - squareRootOfDiscriminant) / (2 * a),
    (-b + squareRootOfDiscriminant) / (2 * a),
  ].sort();
}
