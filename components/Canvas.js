import { Fragment, useEffect, useRef, useState } from "react";

import Circle from "./Circle";
import Line from "./Line";
import ParagraphLine from "./ParagraphLine";
import { useUnit } from "./UnitContext";

export default function Canvas({
  width,
  numLines,
  baseLineSkip,
  lineSkip,
  objects,
  pointer,
  onClick: onClickOuter,
  onMouseMove: onMouseMoveOuter,
}) {
  const ref = useRef();

  const unit = useUnit();

  const createMouseEmitter = (callback) => (event) => {
    if (!ref) {
      throw new Error("Mouse event before knowing the ref");
    }

    const { top, left } = ref.current.getBoundingClientRect();

    const x = event.clientX - left;
    const y = event.clientY - top;

    callback({ x, y });
  };

  const lineHeight = baseLineSkip - lineSkip;

  const [lines, setLines] = useState([]);

  useEffect(() => {
    setLines(arrayOfLen(numLines).map(() => [0, 0]));
  }, [numLines]);

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

  return (
    <>
      <div
        ref={ref}
        style={{
          width: unit(width),
          height: unit(numLines * baseLineSkip),
          backgroundColor: "#f3f3f3",
          position: "relative",
          cursor: pointer ? "crosshair" : undefined,
        }}
        onClick={createMouseEmitter(onClickOuter)}
        onMouseMove={createMouseEmitter(onMouseMoveOuter)}
      >
        {objects.map((obj, i) => (
          <Fragment key={i}>{renderObject(obj)}</Fragment>
        ))}
        {arrayOfLen(numLines).map((i) => (
          <ParagraphLine
            key={i}
            index={i}
            lineHeight={lineHeight}
            lineSkip={lineSkip}
            left={lines.at(i)?.at(0) || 0}
            right={lines.at(i)?.at(1) || 0}
            setLeft={(left) => updateLeft(i, left)}
            setRight={(right) => updateRight(i, right)}
          />
        ))}
      </div>
      <pre>
        {`
\\parshape ${numLines} 
${lines
  .map(([left, right]) => {
    return `  ${left}pt ${width - left - right}pt`;
  })
  .join("\n")}            
        `}
      </pre>
    </>
  );
}

function arrayOfLen(n) {
  return [...Array(n).keys()];
}

function renderObject(obj) {
  if (obj.type === "line") {
    return <Line start={obj.start} stop={obj.stop} />;
  } else if (obj.type === "circle") {
    return <Circle center={obj.center} radius={obj.radius} />;
  }

  throw new Error(`Unknown geometry object of type ${obj.type}`);
}
