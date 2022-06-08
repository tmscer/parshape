import { useCallback, useEffect, useMemo, useState } from "react";

import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { UnitContext } from "./UnitContext";

const INITIAL_STATE = [
  {
    type: "line",
    start: [10, 200],
    stop: [400, 50],
  },
  {
    type: "line",
    start: [100, 200],
    stop: [100, 0],
  },
];

export default function Editor() {
  const [objects, setObjects] = useState(INITIAL_STATE);
  const [newType, setNewType] = useState(null);
  const [newObject, setNewObject] = useState(null);

  const clearNew = useCallback(() => {
    setNewType(null);
    setNewObject(null);
  }, []);

  const onToolbarClick = useCallback((type) => {
    setNewType(type);
  }, []);

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

          setObjects((objs) => [...objs, finalLine]);
          clearNew();
        }
      }
    },
    [newType, newObject, clearNew]
  );

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
      }
    },
    [newType]
  );

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") {
        clearNew();
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, [clearNew]);

  const finalObjects = useMemo(() => {
    if (!newObject) {
      return objects;
    }

    return [...objects, newObject];
  }, [objects, newObject]);

  return (
    <div>
      <Toolbar onClick={onToolbarClick} />
      <UnitContext.Provider value={{ unit: "px" }}>
        <Canvas
          size="500"
          objects={finalObjects}
          pointer={newType !== null}
          onClick={onCanvasClick}
          onMouseMove={onCanvasMouseOver}
        />
      </UnitContext.Provider>
    </div>
  );
}
