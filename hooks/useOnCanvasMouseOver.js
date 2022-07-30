import { useCallback } from "react";

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
      } else if (newType === "fixed-angle-line") {
        setNewObject((newObj) => {
          // TODO: Update line so that `nearest angle % 15 == 0`

          return newObj;
        });
      } else if (newType === "circle") {
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
      }
    },
    [newType, setNewObject]
  );

  return onCanvasMouseOver;
}
