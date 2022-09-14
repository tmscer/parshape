import NextIcon from "@mui/icons-material/Redo";
import PrevIcon from "@mui/icons-material/Undo";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { useCallback, useState } from "react";

import LabeledCheckbox from "./LabeledCheckbox";

export default function Toolbar({ onClick, prev, next, activeType }) {
  const [multipleLines, setMultipleLines] = useState(false);

  const createOnClick = useCallback(
    (nameInput) => (_event) => {
      const name = (() => {
        if (multipleLines) {
          if (nameInput === "line") {
            return "polygonal-chain";
          } else if (nameInput === "snap-angle-line") {
            return "snap-angle-polygonal-chain";
          }
        }

        return nameInput;
      })();

      if (name === "bezier-curve" || name.includes("polygonal-chain")) {
        alert(
          "Place points using LEFT MOUSE BUTTON.\n\nPress RIGHT MOUSE BUTTON to place the last point.\n\nPress ESCAPE to cancel."
        );
      }

      onClick(name);
    },
    [onClick, multipleLines]
  );

  return (
    <Stack direction="column" gap={0}>
      <ButtonGroup
        component="ul"
        orientation="horizontal"
        sx={{ flexWrap: "wrap" }}
      >
        <ToolbarButton
          isActive={activeType === "line"}
          onClick={createOnClick("line")}
        >
          line
        </ToolbarButton>
        <ToolbarButton
          isActive={activeType === "snap-angle-line"}
          onClick={createOnClick("snap-angle-line")}
        >
          snap angle line
        </ToolbarButton>
        <LabeledCheckbox
          label="polygonal chain"
          checked={multipleLines}
          onChange={setMultipleLines}
        />
      </ButtonGroup>
      <ButtonGroup
        component="ul"
        orientation="horizontal"
        sx={{ flexWrap: "wrap", mt: 0 }}
      >
        <ToolbarButton
          isActive={activeType === "left-circle"}
          onClick={createOnClick("left-circle")}
        >
          l. circle
        </ToolbarButton>
        <ToolbarButton
          isActive={activeType === "right-circle"}
          onClick={createOnClick("right-circle")}
        >
          r. circle
        </ToolbarButton>
        <ToolbarButton
          isActive={activeType === "bezier-curve"}
          onClick={createOnClick("bezier-curve")}
        >
          bezier curve
        </ToolbarButton>
        <ToolbarButton onClick={() => prev()}>
          <PrevIcon />
        </ToolbarButton>
        <ToolbarButton onClick={() => next()}>
          <NextIcon />
        </ToolbarButton>
      </ButtonGroup>
    </Stack>
  );
}

function ToolbarButton({ children, isActive, sx = {}, ...rest }) {
  const variant = isActive ? "contained" : "outlined";

  return (
    <Button
      component="li"
      variant={variant}
      size={"medium"}
      sx={{
        padding: "8px 11px",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
