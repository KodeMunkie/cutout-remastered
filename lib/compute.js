/**
 * Calculates the average color of all the pixels in an image
 */
import { clampToInt } from './util.js';
import { draw } from './image.js';

export const backgroundColor = image => {
  const color = [0, 0, 0, 255];
  const width = image.shape[0];
  const height = image.shape[1];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      color[0] += image.get(x, y, 0);
      color[1] += image.get(x, y, 1);
      color[2] += image.get(x, y, 2);
    }
  }

  color[0] = Math.round(color[0] / (width * height));
  color[1] = Math.round(color[1] / (width * height));
  color[2] = Math.round(color[2] / (width * height));

  return color;
};

/**
 * Calculates the necessary color to move current closer to target
 */

export const scanlineColor = (target, current, scanlines, alpha) => {
  const total = [0, 0, 0];
  let pixels = 0;

  const f = (257 * 255) / alpha;
  const a = Math.round(f);

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const t = [target.get(x, y, 0), target.get(x, y, 1), target.get(x, y, 2)];
      const c = [current.get(x, y, 0), current.get(x, y, 1), current.get(x, y, 2)];

      total[0] += (t[0] - c[0]) * a + c[0] * 257;
      total[1] += (t[1] - c[1]) * a + c[1] * 257;
      total[2] += (t[2] - c[2]) * a + c[2] * 257;

      pixels += 1;
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

export const differenceFull = (one, two) => {
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

  const difference = Math.sqrt(total / (width * height * 4)) / 255;
  return difference;
};

/**
 * Calculates the root-mean-square error between the parts of the two images within the scanlines
 */

export const differencePartial = (target, before, after, score, scanlines) => {
  const width = target.shape[0];
  const height = target.shape[1];
  const rgbaCount = width * height * 4;
  let total = (score * 255) ** 2 * rgbaCount;

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

  const difference = Math.sqrt(total / rgbaCount) / 255;
  return difference;
};

/**
 * Calculates a measure of the improvement adding the shape provides, lower energy is better
 */

export const energy = (shape, alpha, target, current, buffer, score) => {
  const scanlines = shape.rasterize();
  const color = scanlineColor(target, current, scanlines, alpha);

  draw(buffer, color, scanlines);
  const result = differencePartial(target, current, buffer, score, scanlines);
  return result;
};
