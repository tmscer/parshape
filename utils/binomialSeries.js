import binomialCoeffs from "./binomialCoeffs";
import range from "./range";

export default function binomialSeries(n, a, b) {
  const coeffs = binomialCoeffs(n);

  return range(0, n + 1).map(
    (i) => coeffs[i] * Math.pow(a, n - i) * Math.pow(b, i)
  );
}
