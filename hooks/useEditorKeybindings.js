import isHotkey from "is-hotkey";
import { useEffect, useMemo } from "react";

export default function useEditorKeybindings({ prev, next, clearNew }) {
  const keyListener = useMemo(
    () => createKeyListener({ prev, next, clearNew }),
    [prev, next, clearNew]
  );

  useRegisterWindowListener("keydown", keyListener);
}

function createKeyListener({ prev, next, clearNew }) {
  // object where keys are matcher functions
  // and values are callbacks to call when the matcher
  // returns `true`
  const bindings = {
    "ctrl+z": prev,
    "ctrl+y": next,
    escape: clearNew,
  };

  function doesHotkeyMatch(event, hotkey) {
    if (isHotkey(hotkey, event)) {
      const callback = bindings[hotkey];
      callback();

      return true;
    }

    return false;
  }

  return function keyListener(event) {
    if (event?.target.tagName.toLowerCase() !== "body") {
      return;
    }

    Object.keys(bindings).find((hotkey) => doesHotkeyMatch(event, hotkey));
  };
}

function useRegisterWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);

    return () => window.removeEventListener(eventType, listener);
  }, [eventType, listener]);
}
