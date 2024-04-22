/**
 * Returns the bounding box of a (non-rotated) rectangle
 */

export const boundingBox = (x, y, width, height, xBound, yBound) => {
  const top = y < 0 ? 0 : y;
  const bottom = y + height > yBound ? yBound : y + height;
  const left = x < 0 ? 0 : x;
  const right = x + width > xBound ? xBound : x + width;

  return { top, bottom, left, right };
};

/**
 * Rasterizes a (non-rotated) rectangle to scanlines
 */

export const toScanlines = (x, y, width, height, xBound, yBound) => {
  const scanlines = [];
  const { top, bottom, left, right } = boundingBox(x, y, width, height, xBound, yBound);

  for (let currentY = top; currentY < bottom + 1; currentY += 1) {
    scanlines.push([currentY, left, right]);
  }

  return scanlines;
};
