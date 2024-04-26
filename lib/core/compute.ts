/**
 * Calculates the average color of all the pixels in an image
 */
//@ts-ignore
import { clampToInt } from './util'
import { draw } from './image';
import { RGBA } from 'color-blend/dist/types';
import { NdArray } from 'ndarray';

export const backgroundColor = (image: any): RGBA => {
  const width = image.shape[0];
  const height = image.shape[1];
  let r: number  = 0;
  let g: number  = 0;
  let b: number = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      r += image.get(x, y, 0);
      g += image.get(x, y, 1);
      b += image.get(x, y, 2);
    }
  }

  r = Math.round(r / (width * height));
  g = Math.round(g / (width * height));
  b = Math.round(b / (width * height));

  return { r, g, b, a:255};
};

/**
 * Calculates the necessary color to move current closer to target
 */
//@ts-ignore
export const scanlineColor = (target, current, scanlines, alpha) => {
  const total: number[] = [0, 0, 0];
  let pixels: number = 0;

  const f: number = (257 * 255) / alpha;
  const a: number = Math.round(f);

  //@ts-ignore
  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const t = [target.get(x, y, 0), target.get(x, y, 1), target.get(x, y, 2)];
      const c = [current.get(x, y, 0), current.get(x, y, 1), current.get(x, y, 2)];

      total[0] += (t[0] - c[0]) * a + c[0] * 257;
      total[1] += (t[1] - c[1]) * a + c[1] * 257;
      total[2] += (t[2] - c[2]) * a + c[2] * 257;

      ++pixels;
    }
  });

  const color = [
    clampToInt(Math.round(total[0] / pixels) >> 8, 0, 255),
    clampToInt(Math.round(total[1] / pixels) >> 8, 0, 255),
    clampToInt(Math.round(total[2] / pixels) >> 8, 0, 255),
    alpha
  ];
  return color;
};

/**
 * Calculates the root-mean-square error between two images
 */
//@ts-ignore
export const differenceFull = (one: NdArray, two: NdArray) => {
  const width = one.shape[0];
  const height = one.shape[1];
  let total = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const difference = [
        one.get(x, y, 0) - two.get(x, y, 0),
        one.get(x, y, 1) - two.get(x, y, 1),
        one.get(x, y, 2) - two.get(x, y, 2),
        one.get(x, y, 3) - two.get(x, y, 3)
      ];

      total += difference[0] ** 2 + difference[1] ** 2 + difference[2] ** 2 + difference[3] ** 2;
    }
  }

  return Math.sqrt(total / (width * height * 4)) / 255;
};

/**
 * Calculates the root-mean-square error between the parts of the two images within the scanlines
 */
//@ts-ignore
export const differencePartial = (target, before, after, score, scanlines) => {
  const width = target.shape[0];
  const height = target.shape[1];
  const rgbaCount = width * height * 4;
  let total = (score * 255) ** 2 * rgbaCount;

  //@ts-ignore
  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const diffBefore = [
        target.get(x, y, 0) - before.get(x, y, 0),
        target.get(x, y, 1) - before.get(x, y, 1),
        target.get(x, y, 2) - before.get(x, y, 2),
        target.get(x, y, 3) - before.get(x, y, 3)
      ];

      const diffAfter = [
        target.get(x, y, 0) - after.get(x, y, 0),
        target.get(x, y, 1) - after.get(x, y, 1),
        target.get(x, y, 2) - after.get(x, y, 2),
        target.get(x, y, 3) - after.get(x, y, 3)
      ];

      total -= diffBefore[0] ** 2 + diffBefore[1] ** 2 + diffBefore[2] ** 2 + diffBefore[3] ** 2;
      total += diffAfter[0] ** 2 + diffAfter[1] ** 2 + diffAfter[2] ** 2 + diffAfter[3] ** 2;
    }
  });

  return Math.sqrt(total / rgbaCount) / 255;
};

/**
 * Calculates a measure of the improvement adding the shape provides, lower energy is better
 */

//@ts-ignore
export const energy = (shape, alpha, target, current, buffer, score) => {
  const scanlines = shape.rasterize();
  const color = scanlineColor(target, current, scanlines, alpha);

  draw(buffer, color, scanlines);
  const result = differencePartial(target, current, buffer, score, scanlines);
  return result;
};
