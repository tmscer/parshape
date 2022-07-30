export default function floatEq(a, b, tolerance = 1e-5) {
  return Math.abs(a - b) <= tolerance;
}
