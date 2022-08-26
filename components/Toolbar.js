import { Button, ButtonGroup, Stack } from "@mui/material";
import { useCallback } from "react";

export default function Toolbar({ onClick, prev, next, activeType }) {
  const createOnClick = useCallback(
    (name) => (_event) => {
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
        <ToolbarButton onClick={() => prev()}>prev</ToolbarButton>
        <ToolbarButton onClick={() => next()}>next</ToolbarButton>
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
