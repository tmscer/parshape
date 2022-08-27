import bezierCurve from "../bezierCurve";
import floatEq from "../floatEq";

describe("bezierCurve", () => {
  test("degree = 2 bezier curve is a line", () => {
    const start = [0, 0];
    const end = [2, 1];

    const curve = bezierCurve([start, end]);

    expect(curve[0]).toStrictEqual(start);
    curve.forEach(([a, b]) => expect(a / 2).toBe(b));

    const last = curve[curve.length - 1];

    expect(floatEq(last[0], end[0], 0.025)).toBeTrue();
    expect(floatEq(last[1], end[1], 0.025)).toBeTrue();
  });

  test("degree = 3 produces an array of points", () => {
    const curve = bezierCurve([
      [10, 10],
      [200, 200],
      [0, 50],
    ]);

    curve.forEach((point) => {
      expect(point[0]).toBeNumber();
      expect(point[1]).toBeNumber();
    });
  });
});
