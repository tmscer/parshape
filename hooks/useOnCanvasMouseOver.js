import { useCallback } from "react";

import bezierCurve from "../utils/bezierCurve";
import { degToRad } from "../utils/degRadConversion";
import snapLineToAngle from "../utils/snapLineToAngle";

export default function useOnCanvasMouseOver({ newType, setNewObject }) {
  const onCanvasMouseOver = useCallback(
    ({ x, y }) => {
      if (!newType) {
        return;
      }

      if (newType === "line") {
        setNewObject((newObj) => {
          if (!newObj) {
            return newObj;
          }

          return {
            ...newObj,
            stop: [x, y],
          };
        });
      } else if (newType === "snap-angle-line") {
        setNewObject((newObj) => {
          if (!newObj) {
            return newObj;
          }

          return {
            ...newObj,
            stop: snapLineToAngle(newObj.start, [x, y], degToRad(15))[1],
          };
        });
      } else if (newType.includes("circle")) {
        setNewObject((newObj) => {
          if (!newObj) {
            return newObj;
          }

          const dx = x - newObj.center[0];
          const dy = y - newObj.center[1];

          return {
            ...newObj,
            radius: Math.sqrt(dx * dx + dy * dy),
          };
        });
      } else if (newType === "bezier-curve") {
        setNewObject((newObj) => {
          if (!newObj) {
            return newObj;
          }

          return {
            ...newObj,
            points: bezierCurve([...newObj.sourcePoints, [x, y]]),
          };
        });
      }
    },
    [newType, setNewObject]
  );

  return onCanvasMouseOver;
}
