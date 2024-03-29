import { memo, useCallback, useRef, useState } from "react";

import crossBrowserCssProperty from "../utils/crossBrowserCssProperty";
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

  const [lastMousePos, setLastMousePos] = useState(null);

  const createMouseEmitter = useCallback(
    (callback) => (event) => {
      if (!ref) {
        throw new Error("Mouse event before knowing the ref");
      }

      const { top, left } = ref.current.getBoundingClientRect();

      const x = event.clientX - left - settings.hoffset;
      const y = event.clientY - top - settings.voffset;

      setLastMousePos([x, y]);
      callback({ x, y }, event);
    },
    [ref, settings.hoffset, settings.voffset]
  );

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
      onContextMenu={createMouseEmitter(onClickOuter)}
      onMouseMove={createMouseEmitter(onMouseMoveOuter)}
      onMouseLeave={() => setLastMousePos(null)}
    >
      <div style={{ position: "relative" }}>
        {objects.map((obj, i) => (
          <RenderObject key={i} obj={obj} />
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
        <CursorCoordinates pos={lastMousePos} settings={settings} />
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

const RenderObject = memo(_RenderObject);

function _RenderObject({ obj }) {
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
  } else if (
    obj.type.includes("polygonal-chain") ||
    obj.type === "bezier-curve"
  ) {
    const { points } = obj;

    return (
      <>
        {points.slice(1).map((point, i) => {
          const prevPoint = points[i];

          return <Line key={i} start={prevPoint} stop={point} />;
        })}
      </>
    );
  }

  throw new Error(`Unknown geometry object of type ${obj.type}`);
}

function CursorCoordinates({ pos, settings }) {
  const unit = useUnit();

  if (!pos) {
    return null;
  }

  return (
    <span
      style={{
        position: "relative",
        left: unit(-settings.hoffset + 5),
        top: unit(-settings.voffset),
        color: "#999999",
        fontSize: "1.2em",
        pointerEvents: "none",
        ...crossBrowserCssProperty("userSelect", "none"),
      }}
    >
      <tt>
        x = {Math.round(pos[0])}, y = {Math.round(pos[1])}
      </tt>
    </span>
  );
}
