import baboon from 'baboon-image';
import isNdarray from 'isndarray';
import isSvg from 'is-svg';
import { Cutout } from './cutout.js';

it('approximates a raster image with shapes', () => {
  const cutout = new Cutout(baboon, {
    amountOfShapes: 2,
    amountOfAttempts: 2
  });
  const start = cutout.difference;
  cutout.step().step();

  expect(cutout.difference).toBeLessThan(start);
  expect(isSvg(cutout.svg)).toBe(true);
  expect(isNdarray(cutout.image)).toBe(true);
});

it('accepts a background color', () => {
  const cutout = new Cutout(baboon, {
    amountOfShapes: 2,
    amountOfAttempts: 2,
    background: [100, 100, 255, 255]
  });
  const start = cutout.difference;
  cutout.step().step();

  expect(cutout.difference).toBeLessThan(start);
  expect(isSvg(cutout.svg)).toBe(true);
  expect(isNdarray(cutout.image)).toBe(true);
});
