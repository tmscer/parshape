import { Fragment, useRef } from "react";

import Circle from "./Circle";
import Line from "./Line";
import ParagraphLine from "./ParagraphLine";
import { useUnit } from "./UnitContext";

export default function Canvas({
  settings,
  lines,
  updateLine,
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

    const x = event.clientX - left - settings.hoffset;
    const y = event.clientY - top - settings.voffset;

    callback({ x, y });
  };

  const lineHeight = settings.baselineskip - settings.lineskip;

  return (
    <div
      ref={ref}
      style={{
        width: unit(settings.pageWidth),
        height: unit(settings.pageHeight),
        paddingLeft: unit(settings.hoffset),
        paddingTop: unit(settings.voffset),
        paddingRight: unit(
          settings.pageWidth - settings.hsize - settings.hoffset
        ),
        backgroundColor: "#fbfbe2",
        cursor: pointer ? "crosshair" : undefined,
        border: "1px solid grey",
      }}
      onClick={createMouseEmitter(onClickOuter)}
      onMouseMove={createMouseEmitter(onMouseMoveOuter)}
    >
      <div style={{ position: "relative" }}>
        {objects.map((obj, i) => (
          <Fragment key={i}>{renderObject(obj)}</Fragment>
        ))}
      </div>
      <div
        style={{
          position: "relative",
          width: unit(settings.hsize),
          height: unit(settings.pageHeight - 2 * settings.voffset),
          borderLeft: "1px solid grey",
          borderRight: "1px solid grey",
        }}
      >
        {lines.map((line, i) => (
          <ParagraphLine
            key={i}
            index={i}
            lineHeight={lineHeight}
            lineSkip={settings.lineskip}
            left={line[0]}
            right={line[1]}
            setLeft={(left) => updateLine(i, [left, line[1]])}
            setRight={(right) => updateLine(i, [line[0], right])}
          />
        ))}
      </div>
    </div>
  );
}

function renderObject(obj) {
  if (obj.type === "line") {
    return <Line start={obj.start} stop={obj.stop} />;
  } else if (obj.type.includes("circle")) {
    const left = obj.type.includes("left");
    const right = !left;

    return (
      <Circle
        center={obj.center}
        radius={obj.radius}
        left={left}
        right={right}
      />
    );
  }

  throw new Error(`Unknown geometry object of type ${obj.type}`);
}
