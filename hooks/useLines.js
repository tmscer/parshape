import { useEffect, useState } from "react";

import arrayOfLen from "../utils/arrayOfLen";
import calculateLineParamsFromPoints from "../utils/calculateLineParamsFromPoints";
import floatEq from "../utils/floatEq";
import { isInLineX } from "../utils/isInLine";

export default function useLines(settings) {
  const { numLines, hsize } = settings;

  const [lines, setLines] = useState(() => getNewLines([], numLines));

  useEffect(() => {
    if (lines.length === numLines) {
      return;
    }

    setLines(getNewLines(lines, numLines));
  }, [numLines, lines]);

  const updateLine = (i, line) => {
    const normalizedLine = normalizeLine(line, hsize);

    setLines((lines) => {
      return [...lines.slice(0, i), normalizedLine, ...lines.slice(i + 1)];
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

function applyLineToLeftEdge(lines, line, settings) {
  return lines.map((paragraphLine, i) => {
    // middle of the paragraph
    const height = (i + 0.5) * settings.baselineskip;

    const xpos = calculateXPosAtHeight(line, height);

    if (!isInLineX(line, xpos)) {
      return paragraphLine;
    }

    const newLeft = Math.max(paragraphLine[0], xpos);

    return [newLeft, paragraphLine[1]];
  });
}

function applyLineToRightEdge(lines, line, settings) {
  return lines.map((paragraphLine, i) => {
    // middle of the paragraph
    const height = (i + 0.5) * settings.baselineskip;

    const xpos = calculateXPosAtHeight(line, height);

    if (!isInLineX(line, xpos)) {
      return paragraphLine;
    }

    const newRight =
      settings.hsize - Math.min(settings.hsize - paragraphLine[1], xpos);

    return [paragraphLine[0], newRight];
  });
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
