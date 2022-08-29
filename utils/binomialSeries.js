import binomialCoeffs from "./binomialCoeffs";

export default function binomialSeries(n, a, b) {
  return binomialCoeffs(n).map(
    (coeff, i) => coeff * Math.pow(a, n - i) * Math.pow(b, i)
  );
}
