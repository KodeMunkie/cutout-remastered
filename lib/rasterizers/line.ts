//@ts-ignore
import bresenham from 'bresenham';

/**
 * Rasterizes a straight line to scanlines
 */

export const toScanlines = (x1: number, y1: number, x2: number, y2: number, xBound: number, yBound: number) => {
  //@ts-ignore
  const scanlines = [];
  const points = bresenham(x1, y1, x2, y2);

  //@ts-ignore
  points.forEach(({ x, y }) => {
    if (y >= 0 && y <= yBound && x >= 0 && x <= xBound) {
      scanlines.push([y, x, x]);
    }
  });
  //@ts-ignore
  return scanlines;
};
