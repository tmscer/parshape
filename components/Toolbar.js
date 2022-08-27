import NextIcon from "@mui/icons-material/Redo";
import PrevIcon from "@mui/icons-material/Undo";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { useCallback } from "react";

export default function Toolbar({ onClick, prev, next, activeType }) {
  const createOnClick = useCallback(
    (name) => (_event) => {
      if (name === "bezier-curve") {
        alert(
          "Place points using LEFT MOUSE BUTTON.\n\nPress RIGHT MOUSE BUTTON to place the last point.\n\nPress ESCAPE to cancel."
        );
      }

      onClick(name);
    },
    [onClick]
  );

  return (
    <Stack direction="row" gap={2}>
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
