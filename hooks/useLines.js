import { useEffect, useMemo, useState } from "react";

import arrayOfLen from "../utils/arrayOfLen";
import calculateLineParamsFromPoints from "../utils/calculateLineParamsFromPoints";
import floatEq from "../utils/floatEq";
import isInLine from "../utils/isInLine";
import solveQuadraticEquation from "../utils/solveQuadraticEquation";

export default function useLines(settings) {
  const { numLines: _numLines, hsize } = settings;
  const numLines = _numLines || 1;

  const [linesUnnormalized, setLines] = useState(() =>
    getNewLines([], numLines)
  );
  const lines = useMemo(
    () => linesUnnormalized.map((line) => normalizeLine(line, hsize)),
    [linesUnnormalized, hsize]
  );

  useEffect(() => {
    if (lines.length === numLines) {
      return;
    }

    setLines(getNewLines(lines, numLines));
  }, [numLines, lines, setLines]);

  const updateLine = (i, line) => {
    setLines((lines) => {
      return [...lines.slice(0, i), line, ...lines.slice(i + 1)];
    });
  };

  const updateLeft = (i, left) => {
    const [_, right] = lines[i];
    updateLine(i, [left, right]);
  };

  const updateRight = (i, right) => {
    const [left, _] = lines[i];
    updateLine(i, [left, right]);
  };

  const applyObject = (obj, edge, usedLines = lines) => {
    if (obj.type === "line") {
      if (edge === "left") {
        return setLines(applyLineToLeftEdge(usedLines, obj, settings));
      } else if (edge === "right") {
        return setLines(applyLineToRightEdge(usedLines, obj, settings));
      }
    }

    if (obj.type === "left-circle") {
      return setLines(
        applyCircle(usedLines, { ...obj, side: "left" }, settings, edge)
      );
    } else if (obj.type === "right-circle") {
      return setLines(
        applyCircle(usedLines, { ...obj, side: "right" }, settings, edge)
      );
    }

    if (obj.type === "bezier-curve") {
      return setLines(applyBezierCurve(usedLines, obj, settings, edge));
    }

    throw new Error(
      `cannot apply object of type "${obj.type}" to the ${edge} edge`
    );
  };

  return {
    lines,
    updateLine,
    updateLeft,
    updateRight,
    applyObject,
    setLines,
  };
}

function normalizeLine(line, width) {
  const [left, right] = line;

  const normalizedLeft = Math.max(0, Math.min(left, width - right));
  const normalizedRight = Math.max(0, Math.min(width - left, right));

  return [normalizedLeft, normalizedRight];
}

function applyLineToLeftEdge(lines, line, settings, lineNumOffset = 0) {
  return lines.map((paragraphLine, i) => {
    const [xpos, ypos] = xposAndYpos(
      line,
      settings.baselineskip,
      i + lineNumOffset
    );

    if (!isInLine(line, [xpos, ypos])) {
      return paragraphLine;
    }

    const newLeft = Math.max(paragraphLine[0], xpos);

    return [newLeft, paragraphLine[1]];
  });
}

function applyLineToRightEdge(lines, line, settings, lineNumOffset = 0) {
  return lines.map((paragraphLine, i) => {
    const [xpos, ypos] = xposAndYpos(
      line,
      settings.baselineskip,
      i + lineNumOffset
    );

    if (!isInLine(line, [xpos, ypos])) {
      return paragraphLine;
    }

    const newRight =
      settings.hsize - Math.min(settings.hsize - paragraphLine[1], xpos);

    return [paragraphLine[0], newRight];
  });
}

function applyCircle(lines, circle, settings, edge) {
  const {
    center: [a, b],
    radius: r,
    side,
  } = circle;

  return lines.map((paragraphLine, lineNum) => {
    const ypos = (lineNum + 0.5) * settings.baselineskip;
    const quadraticEquation = [
      1,
      -2 * a,
      Math.pow(a, 2) - Math.pow(r, 2) + Math.pow(ypos - b, 2),
    ];
    const solutions = solveQuadraticEquation(...quadraticEquation);

    if (solutions.length === 0) {
      // paragraph line doesn't intersect with the circle
      return paragraphLine;
    }

    const chosenSolution = (side === "left" ? Math.min : Math.max)(
      ...solutions
    );

    if (edge === "left") {
      return [Math.max(chosenSolution, paragraphLine[0]), paragraphLine[1]];
    }

    if (edge === "right") {
      const newRight =
        settings.hsize -
        Math.min(settings.hsize - paragraphLine[1], chosenSolution);

      return [paragraphLine[0], newRight];
    }

    return paragraphLine;
  });
}

function applyBezierCurve(lines, curve, settings, edge) {
  const { points } = curve;

  return lines.map((paragraphLine, lineNum) => {
    let newLeft = paragraphLine[0];
    let newRight = paragraphLine[1];

    for (let i = 1; i < points.length; i += 1) {
      const line = { start: points[i - 1], stop: points[i] };

      if (edge === "left") {
        const [[left, _]] = applyLineToLeftEdge(
          [paragraphLine],
          line,
          settings,
          lineNum
        );

        newLeft = Math.max(left, newLeft);
      } else if (edge === "right") {
        const [[_, right]] = applyLineToRightEdge(
          [paragraphLine],
          line,
          settings,
          lineNum
        );

        newRight =
          settings.hsize -
          Math.min(settings.hsize - newRight, settings.hsize - right);
      }
    }

    return [newLeft, newRight];
  });
}

function xposAndYpos(line, baselineskip, lineNum) {
  // middle of the paragraph
  const ypos = (lineNum + 0.5) * baselineskip;
  const xpos = calculateXPosAtHeight(line, ypos);

  return [xpos, ypos];
}

function calculateXPosAtHeight(line, height) {
  const [x1, y1] = line.start;
  const [x2, y2] = line.stop;

  const isVertical = floatEq(x1, x2);

  if (isVertical) {
    return x1;
  }

  const isHorizontal = floatEq(y1, y2);

  if (isHorizontal) {
    return 0;
  }

  const { a, b } = calculateLineParamsFromPoints(line.start, line.stop);
  const xpos = (height - b) / a;

  return Math.round(xpos * 1e5) / 1e5;
}

function getNewLines(lines, numLines) {
  const currentLength = lines.length;

  if (currentLength >= numLines) {
    return lines.slice(0, numLines);
  }

  const numOfNewLines = numLines - currentLength;

  return [...lines, ...linesOfLength(numOfNewLines)];
}

function linesOfLength(n) {
  return arrayOfLen(n).map(() => [0, 0]);
}
