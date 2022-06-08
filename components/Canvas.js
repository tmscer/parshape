import { Fragment, useRef } from "react";

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

    const x = event.clientX - ref.current.offsetLeft;
    const y = event.clientY - ref.current.offsetTop;

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
  }

  throw new Error(`Unknown geometry object of type ${obj.type}`);
}
