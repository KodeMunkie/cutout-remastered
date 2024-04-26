/**
 * Returns the bounding box of a (non-rotated) rectangle
 */

export const boundingBox = (x: number, y: number, width: number, height: number, xBound: number, yBound: number) => {
  const top: number = y < 0 ? 0 : y;
  const bottom: number = y + height > yBound ? yBound : y + height;
  const left: number = x < 0 ? 0 : x;
  const right: number = x + width > xBound ? xBound : x + width;

  return { top, bottom, left, right };
};

/**
 * Rasterizes a (non-rotated) rectangle to scanlines
 */

export const toScanlines = (x: number, y: number, width: number, height: number, xBound: number, yBound: number) => {
  const scanlines = [];
  const { top, bottom, left, right } = boundingBox(x, y, width, height, xBound, yBound);

  for (let currentY = top; currentY < bottom + 1; currentY += 1) {
    scanlines.push([currentY, left, right]);
  }

  return scanlines;
};
