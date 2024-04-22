import zeros from 'zeros';
import { create, clone, draw } from './image';

it('creates an image', () => {
  const width = 10;
  const height = 10;
  const red = [255, 0, 0, 255];

  const image = create(width, height, red);
  const r = image.get(5, 5, 0);
  const g = image.get(5, 5, 1);
  const b = image.get(5, 5, 2);
  const a = image.get(5, 5, 3);

  expect(image.shape[0]).toBe(width);
  expect(image.shape[1]).toBe(height);
  expect([r, g, b, a]).toEqual(red);
});

it('throws an error for colors without alpha', () => {
  const color = [255, 0, 0];

  expect(() => create(1, 1, color)).toThrowErrorMatchingSnapshot();
});

it('clones an image', () => {
  const width = 10;
  const height = 10;
  const image = zeros([width, height, 4]);

  const copy = clone(image);

  expect(copy).toEqual(image);
  expect(copy).not.toBe(image);
});

it('clones an image without transparency', () => {
  const width = 10;
  const height = 10;
  const withoutAlpha = zeros([width, height, 3]);
  const withAlpha = create(width, height, [0, 0, 0, 255]);

  const copy = clone(withoutAlpha);

  expect(copy).toEqual(withAlpha);
  expect(copy).not.toBe(withoutAlpha);
});

it('draws scanlines on an image', () => {
  const width = 10;
  const height = 5;
  const color = [255, 0, 0, 255];
  const image = zeros([width, height, 4]);
  const scanlines = [[0, 0, 9], [1, 0, 9], [2, 0, 9], [3, 0, 9], [4, 0, 9]];

  draw(image, color, scanlines);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);
      const a = image.get(x, y, 3);

      expect([r, g, b, a]).toEqual(color);
    }
  }
});
