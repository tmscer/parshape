import { Stack } from "@mui/material";
import { cloneDeep } from "lodash";
import { useCallback, useState } from "react";

import useEditorKeybindings from "../hooks/useEditorKeybindings";
import useHistory from "../hooks/useHistory";
import useLines from "../hooks/useLines";
import useOnCanvasClick from "../hooks/useOnCanvasClick";
import useOnCanvasMouseOver from "../hooks/useOnCanvasMouseOver";
import Canvas from "./Canvas";
import EdgeButton from "./EdgeButton";
import Parshape from "./Parshape";
import Settings from "./Settings";
import Toolbar from "./Toolbar";
import { UnitContext } from "./UnitContext";

export default function Editor() {
  const [settings, setSettings] = useState(
    cloneDeep(Settings.DEFAULT_SETTINGS)
  );

  const { lines, updateLine, applyObject, setLines } = useLines(settings);
  const [newType, setNewType] = useState(null);
  const [newObject, setNewObject] = useState(null);
  const [edge, setEdge] = useState("left");

  const setLinesFromHistory = useCallback(
    (historicalLines) => {
      setLines(historicalLines);
      setSettings((settings) => ({
        ...settings,
        numLines: historicalLines.length,
      }));
    },
    [setLines]
  );

  const {
    current: currentLines,
    goToPrevious,
    goToNext,
  } = useHistory(lines, setLinesFromHistory);

  const clearNew = useCallback(() => {
    setNewType(null);
    setNewObject(null);
  }, []);

  const onToolbarClick = useCallback((type) => {
    setNewType(type);
  }, []);

  const addObject = useCallback(
    (obj) => {
      applyObject(obj, edge, currentLines);
    },
    [applyObject, edge, currentLines]
  );

  const onCanvasClick = useOnCanvasClick({
    newType,
    newObject,
    clearNew,
    setNewObject,
    addObject,
  });
  const onCanvasMouseOver = useOnCanvasMouseOver({ newType, setNewObject });

  useEditorKeybindings({ prev: goToPrevious, next: goToNext, clearNew });

  return (
    <div>
      <Stack direction="row" gap={6} sx={{ mb: 6 }}>
        <Stack direction="column" gap={4}>
          <Stack direction="row" gap={4}>
            <Toolbar
              onClick={onToolbarClick}
              prev={goToPrevious}
              next={goToNext}
            />
            <Stack sx={{ mt: 2 }}>
              <EdgeButton value={edge} onChange={setEdge} />
            </Stack>
          </Stack>
          <UnitContext.Provider value={{ unit: "px" }}>
            <Canvas
              settings={settings}
              lines={currentLines}
              updateLine={updateLine}
              objects={newObject ? [newObject] : []}
              pointer={newType !== null}
              onClick={onCanvasClick}
              onMouseMove={onCanvasMouseOver}
            />
          </UnitContext.Provider>
        </Stack>
        <Settings settings={settings} onChange={setSettings} />
      </Stack>
      <Parshape width={settings.hsize} lines={currentLines} />
    </div>
  );
}
