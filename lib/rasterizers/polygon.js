import pointInPolygon from 'robust-point-in-polygon'

/**
 * Returns the bounding box of a convex polygon
 */
export const boundingBox = (vertices, xBound, yBound) => {
  const vertexTop = Math.min(...vertices.map(([, y]) => y));
  const vertexBottom = Math.max(...vertices.map(([, y]) => y));
  const vertexLeft = Math.min(...vertices.map(([x]) => x));
  const vertexRight = Math.max(...vertices.map(([x]) => x));

  const top = vertexTop < 0 ? 0 : vertexTop;
  const bottom = vertexBottom > yBound ? yBound : vertexBottom;
  const left = vertexLeft < 0 ? 0 : vertexLeft;
  const right = vertexRight > xBound ? xBound : vertexRight;

  return { top, bottom, left, right };
};

/**
 * Rasterizes a convex polygon to scanlines
 */

export const toScanlines = (vertices, xBound, yBound) => {
  const scanlines = [];
  const { top, left, right, bottom } = boundingBox(vertices, xBound, yBound);

  // Map points to scanlines by testing each pixel in the bounding box
  for (let y = top; y < bottom + 1; y += 1) {
    for (let x = left; x < right + 1; x += 1) {
      const inPolygon = pointInPolygon(vertices, [x, y]) < 1;

      if (inPolygon) {
        const index = scanlines.findIndex(scanline => scanline[0] === y);

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
