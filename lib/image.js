import zeros from 'zeros';
import blend from 'color-blend';

/**
 * Creates an image filled with a color
 */

export const create = (width, height, color) => {
  if (color.length !== 4) {
    throw new Error('Need a color with an alpha value');
  }

  const image = zeros([width, height, 4]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      image.set(x, y, 0, color[0]);
      image.set(x, y, 1, color[1]);
      image.set(x, y, 2, color[2]);
      image.set(x, y, 3, color[3]);
    }
  }

  return image;
};

/**
 * Creates a duplicate image
 */

export const clone = image => {
  const hasAlpha = image.shape[2] === 4;
  const width = image.shape[0];
  const height = image.shape[1];
  const result = zeros([width, height, 4]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);
      const a = hasAlpha ? image.get(x, y, 3) : 255;

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

export const draw = (image, color, scanlines) => {
  // Blend module works with objects instead of arrays
  const source = {
    r: color[0],
    g: color[1],
    b: color[2],
    a: color[3] / 255
  };

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);
      const a = image.get(x, y, 3) / 255;

      const background = { r, g, b, a };
      const result = blend.normal(background, source);

      image.set(x, y, 0, result.r);
      image.set(x, y, 1, result.g);
      image.set(x, y, 2, result.b);
      image.set(x, y, 3, Math.round(result.a * 255));
    }
  });

  return image;
};
