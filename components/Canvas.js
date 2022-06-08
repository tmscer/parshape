import { Fragment, useRef } from "react";

import Circle from "./Circle";
import Line from "./Line";
import { useUnit } from "./UnitContext";

export default function Canvas({
  size,
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

  return (
    <div
      ref={ref}
      style={{
        width: unit(size),
        height: unit(size),
        backgroundColor: "#ccc",
        position: "relative",
        cursor: pointer ? "crosshair" : undefined,
      }}
      onClick={createMouseEmitter(onClickOuter)}
      onMouseMove={createMouseEmitter(onMouseMoveOuter)}
    >
      {objects.map((obj, i) => (
        <Fragment key={i}>{renderObject(obj)}</Fragment>
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
