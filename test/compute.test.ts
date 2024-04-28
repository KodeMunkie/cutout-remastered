// @ts-ignore
import zeros from 'zeros';
import { create } from '../lib/core/image';
import { backgroundColor, scanlineColor, differenceFull, differencePartial } from '../lib/core/compute';
import { NdArray } from 'ndarray';
import { RGBA } from 'color-blend/dist/types';

it('calculates background color', (): void => {
  const image: NdArray = zeros([10, 10, 4]);
  const color: RGBA = backgroundColor(image);

  expect(color).toEqual( {"a": 255, "b": 0, "g": 0, "r": 0}  );
});

it('calculates scanline color', (): void => {
  const target: NdArray = zeros([10, 10, 4]);
  const current: NdArray = zeros([10, 10, 4]);
  const scanlines: number[][] = [[0, 0, 5], [1, 1, 3]];
  const alpha: number = 255;
  const color: RGBA = scanlineColor(target, current, scanlines, alpha);

  expect(color).toEqual({r:0, g:0, b:0, a:255});
});

it('calculates the full difference between two identical images', (): void => {
  const one: NdArray = zeros([10, 10, 4]);
  const two: NdArray = zeros([10, 10, 4]);
  const difference: number = differenceFull(one, two);

  expect(difference).toBe(0);
});

it('calculates the partial difference between two identical images', (): void => {
  const target: NdArray = zeros([10, 10, 4]);
  const before: NdArray = zeros([10, 10, 4]);
  const after: NdArray = zeros([10, 10, 4]);
  const score: number = 0;
  const scanlines: number[][] = [[0, 0, 5], [1, 1, 3]];
  const difference: number = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBe(0);
});

it('calculates the full difference between two different images', ():void => {
  const one: NdArray = zeros([10, 10, 4]);
  const two: NdArray = create(10, 10, {r:255, g:0, b:0, a:255});
  const difference: number = differenceFull(one, two);

  expect(difference).toBeGreaterThan(0);
});

it('calculates the partial difference between two different images', (): void => {
  const target: NdArray = zeros([10, 10, 4]);
  const before: NdArray = zeros([10, 10, 4]);
  const after: NdArray = create(10, 10, {r:255, g:0, b:0, a:255});
  const score: number = 0;
  const scanlines: number[][] = [[0, 0, 5], [1, 1, 3]];
  const difference: number = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBeGreaterThan(0);
});
