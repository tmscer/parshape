import parseParshape, { ParshapeParseError } from "../parseParshape";

describe("parseParshape", () => {
  const hsize = 100;
  const options = { hsize };

  test("empty string throws an error", () => {
    const tryEmptyString = () => {
      parseParshape("", options);
    };

    expect(tryEmptyString).toThrowError(new ParshapeParseError("empty"));
  });

  test("must start with \\parshape", () => {
    const tryStartWithoutParshape = () => {
      parseParshape("\\par", options);
    };
    expect(tryStartWithoutParshape).toThrowError(
      new ParshapeParseError("start-without-parshape")
    );

    const tryStartWithoutParshapeWithSpacesAtTheStart = () => {
      parseParshape("\\par", options);
    };
    expect(tryStartWithoutParshapeWithSpacesAtTheStart).toThrowError(
      new ParshapeParseError("start-without-parshape")
    );
  });

  test("there must be a number after \\parshape", () => {
    const tryNoNumberAfterParshape = () => {
      parseParshape("\\parshape xyz", options);
    };

    expect(tryNoNumberAfterParshape).toThrowError(
      new ParshapeParseError("number-of-lines-not-integer")
    );
  });

  test("cannot pass to few lines", () => {
    const tryToPassTooFewLines = () => {
      parseParshape(
        `
        \\parshape 4
          0 \\hsize
          0 \\hsize
          0 \\hsize
      `,
        options
      );
    };

    expect(tryToPassTooFewLines).toThrowError(
      new ParshapeParseError("too-few-tokens")
    );
  });

  test("valid 3 line \\parshape command", () => {
    const lines = parseParshape(
      `
      \\parshape 3 
        0pt \\hsize
        10pt 50pt
        0pt 80pt
    `,
      options
    );

    expect(lines).toStrictEqual([
      [0, 0],
      [10, 40],
      [0, 20],
    ]);
  });

  test("valid 3 line \\parshape command with some extra tokens that should be ignored", () => {
    const lines = parseParshape(
      `
      \\parshape 3 
        0pt \\hsize
        10pt 50pt
        0pt 80pt
      \\noindent \\kern 5cm
    `,
      options
    );

    expect(lines).toStrictEqual([
      [0, 0],
      [10, 40],
      [0, 20],
    ]);
  });

  test("valid 4 line \\parshape command with different units", () => {
    const lines = parseParshape(
      `
      \\parshape 4
        1cm 0.25in
        0.5bp 20mm
        10pt 4pc
        2dd 196608sp
    `,
      options
    );

    expect(lines).toMatchInlineSnapshot(`
      Array [
        Array [
          28.452755905511808,
          53.4797440944882,
        ],
        Array [
          36,
          7.094488188976385,
        ],
        Array [
          10,
          42,
        ],
        Array [
          2.140017286084702,
          94.8599827139153,
        ],
      ]
    `);
  });
});
