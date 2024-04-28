/**
 * Returns the bounding box of a(n) (rotated) ellipse
 */
//@ts-ignore
import pointInEllipse from 'point-in-ellipse'
import * as polygon from './polygon';
import { rotateCorner } from '../core/util';

export const boundingBox = (cx: number, cy: number, rx: number, ry: number, angle: number, xBound:  number, yBound: number) => {
  let vertices: number[][] = [[cx - rx, cy - ry], [cx + rx, cy - ry], [cx - rx, cy + ry], [cx + rx, cy + ry]];

  if (angle !== 0) {
    vertices = vertices.map(([x, y]) => rotateCorner(x, y, cx, cy, angle));
  }

  return polygon.boundingBox(vertices, xBound, yBound);
};

/**
 * Rasterizes a(n) (rotated) ellipse to scanlines
 */
export const toScanlines = (cx: number, cy: number, rx: number, ry: number, angle: number, xBound: number, yBound: number): number[][] => {
  const scanlines: number[][] = [];
  const rotation: number = angle * (Math.PI / 180);
  const { top, left, right, bottom } = boundingBox(cx, cy, rx, ry, angle, xBound, yBound);

  for (let y: number = top; y < bottom + 1; y += 1) {
    for (let x: number = left; x < right + 1; x += 1) {
      const inEllipse = pointInEllipse(x, y, cx, cy, rx, ry, rotation);

      if (inEllipse) {
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
