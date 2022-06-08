import LeftTop from "./LeftTop";
import { useUnit } from "./UnitContext";

export default function Line({ start: startIn, stop: stopIn }) {
  const [start, stop] = strictOrdering(startIn, stopIn);

  const unit = useUnit();
  const { angle, diagonal } = calculateAngleAndDiagonal(start, stop);

  return (
    <LeftTop left={start[0]} top={start[1]}>
      <div
        style={{
          transformOrigin: "top left",
          transform: `rotate(${angle}rad)`,
          width: unit(diagonal),
          borderWidth: "thin",
          borderColor: "blue",
          borderStyle: "solid",
        }}
      />
    </LeftTop>
  );
}

function calculateAngleAndDiagonal(pointA, pointB) {
  const dx = pointA[0] - pointB[0];
  const dy = pointA[1] - pointB[1];

  const angle = Math.atan(dy / dx);

  return {
    diagonal: Math.sqrt(dx * dx + dy * dy),
    angle: dx === 0 ? -angle : angle,
  };
}

function strictOrdering(pointA, pointB) {
  if (pointA[0] >= pointB[0]) {
    return [pointB, pointA];
  }

  return [pointA, pointB];
}
