import { useCallback } from "react";

import bezierCurve from "../utils/bezierCurve";
import { degToRad } from "../utils/degRadConversion";
import snapLineToAngle from "../utils/snapLineToAngle";

export default function useOnCanvasClick({
  newType,
  newObject,
  clearNew,
  setNewObject,
  addObject,
}) {
  const onCanvasClick = useCallback(
    ({ x, y }, event) => {
      if (!newType) {
        return;
      }

      if (newType === "line") {
        if (!newObject) {
          setNewObject({
            type: "line",
            start: [x, y],
            stop: [x, y],
          });
        } else {
          const finalLine = {
            ...newObject,
            stop: [x, y],
          };

          addObject(finalLine);
          clearNew();
        }
      } else if (newType === "snap-angle-line") {
        if (!newObject) {
          setNewObject({
            type: "line",
            start: [x, y],
            stop: [x, y],
          });
        } else {
          const finalLine = {
            ...newObject,
            stop: snapLineToAngle(newObject.start, [x, y], degToRad(15))[1],
          };

          addObject(finalLine);
          clearNew();
        }
      } else if (newType.includes("circle")) {
        if (!newObject) {
          setNewObject({
            type: newType,
            center: [x, y],
            // Some value to be updated later
            radius: 10,
          });
        } else {
          const dx = x - newObject.center[0];
          const dy = y - newObject.center[1];

          const finalCircle = {
            ...newObject,
            radius: Math.sqrt(dx * dx + dy * dy),
          };

          addObject(finalCircle);
          clearNew();
        }
      } else if (newType === "bezier-curve") {
        if (!newObject) {
          const sourcePoints = [[x, y]];

          setNewObject({
            type: "bezier-curve",
            sourcePoints,
            // Bezier curve needs at least two points but right now we only
            // have one
            points: bezierCurve([...sourcePoints, ...sourcePoints]),
          });
        } else if (event.type !== "contextmenu") {
          const sourcePoints = [...newObject.sourcePoints, [x, y]];

          const curve = {
            type: "bezier-curve",
            sourcePoints,
            points: bezierCurve(sourcePoints),
          };

          setNewObject(curve);
        } else if (event.type === "contextmenu") {
          event.preventDefault();

          const sourcePoints = [...newObject.sourcePoints, [x, y]];

          const curve = {
            type: "bezier-curve",
            sourcePoints,
            points: bezierCurve(sourcePoints),
          };

          addObject(curve);
          clearNew();
        }
      }
    },
    [newType, newObject, clearNew, setNewObject, addObject]
  );

  return onCanvasClick;
}
