import { Button, ButtonGroup, Stack } from "@mui/material";
import { useCallback } from "react";

export default function Toolbar({ onClick, prev, next }) {
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
        <ToolbarButton onClick={createOnClick("line")}>line</ToolbarButton>
        {/* <ToolbarButton onClick={createOnClick("circle")}>circle</ToolbarButton> */}
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
