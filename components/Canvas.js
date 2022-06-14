import { Fragment, useRef } from "react";

import Circle from "./Circle";
import Line from "./Line";
import ParagraphLine from "./ParagraphLine";
import { useUnit } from "./UnitContext";

export default function Canvas({
  width,
  lines,
  updateLine,
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

  return (
    <div
      ref={ref}
      style={{
        width: unit(width),
        height: unit(lines.length * baseLineSkip),
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
      {lines.map((line, i) => (
        <ParagraphLine
          key={i}
          index={i}
          lineHeight={lineHeight}
          lineSkip={lineSkip}
          left={line[0]}
          right={line[1]}
          setLeft={(left) => updateLine(i, [left, line[1]])}
          setRight={(right) => updateLine(i, [line[0], right])}
        />
      ))}
    </div>
  );
}

function renderObject(obj) {
  if (obj.type === "line") {
    return <Line start={obj.start} stop={obj.stop} />;
  } else if (obj.type === "circle") {
    return <Circle center={obj.center} radius={obj.radius} />;
  }

  throw new Error(`Unknown geometry object of type ${obj.type}`);
}
