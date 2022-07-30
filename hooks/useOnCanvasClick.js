import { useCallback } from "react";

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
    ({ x, y }) => {
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
      } else if (newType === "fixed-angle-line") {
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
      } else if (newType === "circle") {
        if (!newObject) {
          setNewObject({
            type: "circle",
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
      }
    },
    [newType, newObject, clearNew, setNewObject, addObject]
  );

  return onCanvasClick;
}
