import LeftTop from "./LeftTop";
import { useUnit } from "./UnitContext";

export default function Circle({ center, radius }) {
  const unit = useUnit();

  const left = center[0] - radius;
  const top = center[1] - radius;

  return (
    <LeftTop left={left} top={top}>
      <div
        style={{
          position: "relative",
          border: "1px solid red",
          borderRadius: "50%",
          width: unit(radius * 2),
          height: unit(radius * 2),
        }}
      />
    </LeftTop>
  );
}
