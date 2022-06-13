import arrayOfLen from "../utils/arrayOfLen";

import { useEffect, useState } from "react";

export default function useLines({ numLines, width }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (lines.length === numLines) {
      return;
    }

    setLines(getNewLines(lines, numLines));
  }, [numLines, lines]);

  const updateLine = (i, line) => {
    setLines((lines) => {
      return [...lines.slice(0, i), line, ...lines.slice(i + 1)];
    });
  };

  const updateLeft = (i, left) => {
    const [_, right] = lines[i];
    const normalizedLeft = Math.max(0, Math.min(left, width - right));
    updateLine(i, [normalizedLeft, right]);
  };

  const updateRight = (i, right) => {
    const [left, _] = lines[i];
    const normalizedRight = Math.max(0, Math.min(width - left, right));
    updateLine(i, [left, normalizedRight]);
  };

  return {
    lines,
    updateLine,
    updateLeft,
    updateRight,
  };
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
  return arrayOfLen(n).map(() => [0, 0])
}
