//@ts-ignore
import pointInPolygon from 'robust-point-in-polygon'

/**
 * Returns the bounding box of a convex polygon
 */
export const boundingBox = (vertices: number[][], xBound: number, yBound: number) => {
  const vertexTop: number = Math.min(...vertices.map(([, y]) => y));
  const vertexBottom: number = Math.max(...vertices.map(([, y]) => y));
  const vertexLeft: number = Math.min(...vertices.map(([x]) => x));
  const vertexRight: number = Math.max(...vertices.map(([x]) => x));

  const top: number = vertexTop < 0 ? 0 : vertexTop;
  const bottom: number = vertexBottom > yBound ? yBound : vertexBottom;
  const left: number = vertexLeft < 0 ? 0 : vertexLeft;
  const right: number = vertexRight > xBound ? xBound : vertexRight;

  return { top, bottom, left, right };
};

/**
 * Rasterizes a convex polygon to scanlines
 */
export const toScanlines = (vertices: number[][], xBound: number, yBound: number): number[][] => {
  const scanlines: number[][] = [];
  const { top, left, right, bottom } = boundingBox(vertices, xBound, yBound);

  // Map points to scanlines by testing each pixel in the bounding box
  for (let y: number = top; y < bottom + 1; y += 1) {
    for (let x: number = left; x < right + 1; x += 1) {
      const inPolygon: boolean = pointInPolygon(vertices, [x, y]) < 1;

      if (inPolygon) {
        const index: number = scanlines.findIndex(scanline => scanline[0] === y);

        if (index < 0) {
          scanlines.push([y, x, x]);
        } else {
          scanlines[index][2] = x;
        }
      }
    }
  }
  return scanlines;
};
