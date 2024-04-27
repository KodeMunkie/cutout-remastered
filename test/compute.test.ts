// @ts-ignore
import zeros from 'zeros';
import { create } from '../lib/core/image';
import { backgroundColor, scanlineColor, differenceFull, differencePartial } from '../lib/core/compute';

it('calculates background color', () => {
  const image = zeros([10, 10, 4]);
  const color = backgroundColor(image);

  expect(color).toEqual( {"a": 255, "b": 0, "g": 0, "r": 0}  );
});

it('calculates scanline color', () => {
  const target = zeros([10, 10, 4]);
  const current = zeros([10, 10, 4]);
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const alpha = 255;
  const color = scanlineColor(target, current, scanlines, alpha);

  expect(color).toEqual({r:0, g:0, b:0, a:255});
});

it('calculates the full difference between two identical images', () => {
  const one = zeros([10, 10, 4]);
  const two = zeros([10, 10, 4]);
  const difference = differenceFull(one, two);

  expect(difference).toBe(0);
});

it('calculates the partial difference between two identical images', () => {
  const target = zeros([10, 10, 4]);
  const before = zeros([10, 10, 4]);
  const after = zeros([10, 10, 4]);
  const score = 0;
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const difference = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBe(0);
});

it('calculates the full difference between two different images', () => {
  const one = zeros([10, 10, 4]);
  //@ts-ignore
  const two = create(10, 10, {r:255, g:0, b:0, a:255});
  const difference = differenceFull(one, two);

  expect(difference).toBeGreaterThan(0);
});

it('calculates the partial difference between two different images', () => {
  const target = zeros([10, 10, 4]);
  const before = zeros([10, 10, 4]);
  //@ts-ignore
  const after = create(10, 10, {r:255, g:0, b:0, a:255});
  const score = 0;
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const difference = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBeGreaterThan(0);
});
