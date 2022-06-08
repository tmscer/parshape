import { createContext, useContext, useMemo } from "react";

export const UnitContext = createContext({ unit: "px" });

export const useUnit = () => {
  const { unit } = useContext(UnitContext);

  return useMemo(() => createUnit(unit), [unit]);
};

function createUnit(unit) {
  return (value) => `${value}${unit}`;
}
