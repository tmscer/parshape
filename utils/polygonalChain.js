
export function newPolygonalChain(points) {
  return {
    type: "polygonal-chain",
    sourcePoints: points,
    points,
  };
}

export function extendPolygonalChain(polyChain, [x, y]) {
  const sourcePoints = [...polyChain.sourcePoints, [x, y]];

  return newPolygonalChain(sourcePoints);
}
