export default function combinationNumber(n, k) {
  if (!isInputValid(n) || !isInputValid(k)) {
    throw new Error(`Invalid input: ${n}, ${k}`);
  }

  if (n == k || k == 0) {
    return 1;
  }

  return inclusiveProductRange(k + 1, n) / inclusiveProductRange(1, n - k);
}

function inclusiveProductRange(a, b) {
  let output = 1;

  for (let i = a; i <= b; i += 1) {
    output *= i;
  }

  return output;
}

function isInputValid(n) {
  return Number.isInteger(n) && n >= 0;
}
