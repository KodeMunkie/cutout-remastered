//@ts-ignore
import bezier from 'bezier';
import { deduplicateArrayOfArrays } from '../core/util';
import * as line from './line';

/**
 * Rasterizes a quadratic or cubic bezier to scanlines
 */
export const toScanlines = (vertices: number[][], xBound: number, yBound: number): number[][]  => {
  const xCoordinates: number[] = vertices.map(([x]) => x);
  const yCoordinates: number[] = vertices.map(([, y]) => y);
  const samples: number[][] = [];
  const scanlines: number[][] = [];

  // Sample the bezier at a fixed interval
  for (let i: number = 0; i < 1; i += 0.005) {
    const x: number = Math.round(bezier(xCoordinates, i));
    const y: number = Math.round(bezier(yCoordinates, i));

    samples.push([x, y]);
  }

  // Render the samples to line segments and rasterize those
  for (let i: number = 0; i + 1 < samples.length; i += 1) {
    const [x1, y1] = samples[i];
    const [x2, y2] = samples[i + 1];

    scanlines.push(...line.toScanlines(x1, y1, x2, y2, xBound, yBound));
  }

  return deduplicateArrayOfArrays(scanlines);
};
