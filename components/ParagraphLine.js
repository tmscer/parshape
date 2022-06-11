import { useEffect, useState } from "react";

import { useUnit } from "./UnitContext";

export default function ParagraphLine({
  index,
  lineHeight,
  lineSkip,
  left,
  setLeft,
  right,
  setRight,
}) {
  const unit = useUnit();

  const onDragLeft = (offset) => {
    setLeft(left + offset);
  };

  const onDragRight = (offset) => {
    setRight(right - offset);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: unit(index * (lineHeight + lineSkip)),
        width: "100%",
        height: unit(lineHeight),
        backgroundColor: "#00000033",
        zIndex: 100,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Draggable onDrag={onDragLeft} left={left} />
        <Draggable onDrag={onDragRight} right={right} />
      </div>
    </div>
  );
}

function Draggable({ left, right, onDrag: onDragOuter, children }) {
  const isLeft = left !== undefined;
  const isRight = right !== undefined;

  const unit = useUnit();

  const [isDragged, setIsDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [x, setX] = useState(0);

  const onMouseDown = (event) => {
    setIsDragged(true);
    setStartX(event.clientX);
    setX(event.clientX);
  };

  useEffect(() => {
    if (!isDragged) {
      return;
    }

    const onMouseMove = (event) => {
      setX(event.clientX);
    };

    const onMouseUp = (event) => {
      setIsDragged(false);
      onDragOuter(event.clientX - startX);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragged, startX, onDragOuter, isLeft, isRight]);

  const actualLeft =
    isDragged && isLeft
      ? `calc(${unit(left)} + ${x}px - ${startX}px)`
      : unit(left);
  const actualRight =
    isDragged && isRight
      ? `calc(${unit(right)} - ${x}px + ${startX}px)`
      : unit(right);

  return (
    <div
      className={`slider ${left !== undefined ? "left" : "right"}`}
      onMouseDown={onMouseDown}
    >
      {children}

      <style jsx>
        {`
          .slider {
            position: absolute;
            background-color: #f3f3f3;
            cursor: ew-resize;
            opacity: 0.5;
            top: 0;
            bottom: 0;
            transition: all 0.2s;
          }

          .slider:hover {
            opacity: 1;
          }

          .left {
            left: 0;
            padding-left: ${actualLeft};
            border-right: 3px solid black;
          }

          .right {
            right: 0;
            padding-right: ${actualRight};
            border-left: 3px solid black;
          }
        `}
      </style>
    </div>
  );
}
