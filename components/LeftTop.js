import { useUnit } from "./UnitContext";

export default function LeftTop({ left, top, children }) {
  const unit = useUnit();

  return (
    <div style={{ position: "absolute", left: unit(left), top: unit(top) }}>
      {children}
    </div>
  );
}
