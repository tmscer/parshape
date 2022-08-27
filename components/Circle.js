import LeftTop from "./LeftTop";
import { useUnit } from "./UnitContext";

export default function Circle({ center, radius, left, right }) {
  const unit = useUnit();

  return (
    <LeftTop left={center[0] - radius} top={center[1] - radius}>
      <div
        style={{
          position: "relative",
          ...chooseBorderStyleKeys({ left, right }, "1px solid red"),
          borderRadius: "50%",
          width: unit(radius * 2),
          height: unit(radius * 2),
        }}
      />
    </LeftTop>
  );
}

function chooseBorderStyleKeys({ left, right }, value) {
  const borderStyles = {
    borderLeft: value,
    borderBottom: value,
  };

  if (left && !right) {
    return {
      ...borderStyles,
      transform: "rotate(45deg)",
    };
  }

  if (right && !left) {
    return {
      ...borderStyles,
      transform: "rotate(225deg)",
    };
  }

  return {
    border: value,
  };
}
