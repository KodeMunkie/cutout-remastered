//@ts-ignore
import bezier from 'bezier';
import { deduplicateArrayOfArrays } from '../core/util';
import * as line from './line';

/**
 * Rasterizes a quadratic or cubic bezier to scanlines
 */
//@ts-ignore
export const toScanlines = (vertices, xBound: number, yBound: number) => {
  //@ts-ignore
  const xCoordinates = vertices.map(([x]) => x);
  //@ts-ignore
  const yCoordinates = vertices.map(([, y]) => y);
  const samples = [];
  const scanlines = [];

  // Sample the bezier at a fixed interval
  for (let i = 0; i < 1; i += 0.005) {
    const x = Math.round(bezier(xCoordinates, i));
    const y = Math.round(bezier(yCoordinates, i));

    samples.push([x, y]);
  }

  // Render the samples to line segments and rasterize those
  for (let i = 0; i + 1 < samples.length; i += 1) {
    const [x1, y1] = samples[i];
    const [x2, y2] = samples[i + 1];

    scanlines.push(...line.toScanlines(x1, y1, x2, y2, xBound, yBound));
  }

  return deduplicateArrayOfArrays(scanlines);
};
