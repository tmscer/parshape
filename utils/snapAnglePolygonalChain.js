import { last } from "lodash";
import { degToRad } from "./degRadConversion";
import { newPolygonalChain } from "./polygonalChain";
import snapLineToAngle from "./snapLineToAngle";

export function newSnapAnglePolygonalChain(points) {
  return {
    ...newPolygonalChain(points),
    type: "snap-angle-polygonal-chain",
  }
}

export function extendSnapAnglePolygonalChain(polyChain, [x, y]) {
  const lastPoint = last(polyChain.sourcePoints);
  const newLastPoint = snapLineToAngle(lastPoint, [x, y], degToRad(15))[1];

  const sourcePoints = [...polyChain.sourcePoints, newLastPoint];

  return newSnapAnglePolygonalChain(sourcePoints);
}
