import combinationNumber from "./combinationNumber";
import range from "./range";

export default function binomialCoeffs(row) {
  const cols = row + 1;

  return range(0, cols).map((col) => combinationNumber(row, col));
}
