import { Stack } from "@mui/material";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import Canvas from "./Canvas";
import Settings, { getHsizePt } from "./Settings";
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
  {
    type: "circle",
    center: [72, 300],
    radius: 99,
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

          setObjects((objs) => [...objs, finalCircle]);
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

  const [settings, setSettings] = useState(
    cloneDeep(Settings.DEFAULT_SETTINGS)
  );

  // TODO: Remove
  useEffect(() => {
    setObjects([]);
  }, [settings]);

  return (
    <div>
      <Stack direction="row" gap={6}>
        <Stack direction="column" gap={4}>
          <Toolbar onClick={onToolbarClick} />
          <UnitContext.Provider value={{ unit: "px" }}>
            <Canvas
              width={getHsizePt(settings.hsize)}
              numLines={settings.numLines}
              lineSkip={settings.lineskip}
              baseLineSkip={settings.baselineskip}
              objects={finalObjects}
              pointer={newType !== null}
              onClick={onCanvasClick}
              onMouseMove={onCanvasMouseOver}
            />
          </UnitContext.Provider>
        </Stack>
        <Settings settings={settings} onChange={setSettings} />
      </Stack>
    </div>
  );
}
