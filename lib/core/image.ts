//@ts-ignore
import zeros from 'zeros';
import blend from 'color-blend';
import { RGBA } from 'color-blend/dist/types';
import { NdArray } from 'ndarray';

/**
 * Creates an image filled with a color
 */

export const create = (width: number, height: number, color: RGBA): NdArray => {
  const image: NdArray = zeros([width, height, 4]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      image.set(x, y, 0, color.r);
      image.set(x, y, 1, color.g);
      image.set(x, y, 2, color.b);
      image.set(x, y, 3, color.a);
    }
  }

  return image;
};

/**
 * Creates a duplicate image
 */

export const clone = (image: NdArray): NdArray => {
  const hasAlpha: boolean = image.shape[2] === 4;
  const width: number = image.shape[0];
  const height: number = image.shape[1];
  const result: NdArray = zeros([width, height, 4]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const r: number = image.get(x, y, 0);
      const g: number = image.get(x, y, 1);
      const b: number = image.get(x, y, 2);
      const a: number = hasAlpha ? image.get(x, y, 3) : 255;

      result.set(x, y, 0, r);
      result.set(x, y, 1, g);
      result.set(x, y, 2, b);
      result.set(x, y, 3, a);
    }
  }

  return result;
};

/**
 * Draws scanlines onto an image
 */
export const draw = (image: NdArray, color: RGBA, scanlines: number[][]): NdArray => {

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const r: number = image.get(x, y, 0);
      const g: number = image.get(x, y, 1);
      const b: number = image.get(x, y, 2);
      const a: number = image.get(x, y, 3) / 255;

      const background = { r, g, b, a };
      const result: RGBA = blend.normal(background, color);

      image.set(x, y, 0, result.r);
      image.set(x, y, 1, result.g);
      image.set(x, y, 2, result.b);
      image.set(x, y, 3, Math.round(result.a * 255));
    }
  });

  return image;
};
