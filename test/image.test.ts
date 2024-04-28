//@ts-ignore
import zeros from 'zeros';
import { create, clone, draw } from '../lib/core/image';
import { RGBA } from 'color-blend/dist/types';
import { NdArray } from 'ndarray';

it('creates an image', (): void => {
  const width: number = 10;
  const height: number = 10;
  const red: RGBA = {r:255, g:0, b:0, a:255};

  const image: NdArray = create(width, height, red);
  const r = image.get(5, 5, 0);
  const g = image.get(5, 5, 1);
  const b = image.get(5, 5, 2);
  const a = image.get(5, 5, 3);
  expect(image.shape[0]).toBe(width);
  expect(image.shape[1]).toBe(height);
  expect({ r, g,b, a }).toEqual(red);
});

it('clones an image', (): void => {
  const width: number = 10;
  const height: number = 10;
  const image: NdArray = zeros([width, height, 4]);

  const copy: NdArray = clone(image);

  expect(copy).toEqual(image);
  expect(copy).not.toBe(image);
});

it('clones an image without transparency', (): void => {
  const width: number = 10;
  const height: number = 10;
  const withoutAlpha: NdArray = zeros([width, height, 3]);
  const withAlpha: NdArray = create(width, height, {r:0, g:0, b:0, a:255});

  const copy: NdArray = clone(withoutAlpha);

  expect(copy).toEqual(withAlpha);
  expect(copy).not.toBe(withoutAlpha);
});

it('draws scanlines on an image', (): void => {
  const width: number = 10;
  const height: number = 5;
  const color: RGBA = {r:255, g:0, b:0, a:255};
  const image = zeros([width, height, 4]);
  const scanlines: number[][] = [[0, 0, 9], [1, 0, 9], [2, 0, 9], [3, 0, 9], [4, 0, 9]];

  draw(image, color, scanlines);

  for (let y: number = 0; y < height; y += 1) {
    for (let x: number = 0; x < width; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);
      const a = image.get(x, y, 3);

      expect({ r,g,b,a }).toEqual( {r:255, g:0, b:0, a:255});
    }
  }
});
