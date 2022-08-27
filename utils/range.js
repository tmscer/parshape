export default function range(a, b) {
  const len = b - a;

  return [...Array(len).keys()].map((num) => num + a);
}
