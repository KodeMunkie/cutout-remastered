//@ts-ignore
import baboon from 'baboon-image';
//@ts-ignore
import isNdarray from 'isndarray';
//import isSvg from 'is-svg';
import { Cutout } from '../lib/core/cutout';
import { Options } from '../lib/config/Options';
import { DEFAULTS } from '../lib/config/defaults';

it('approximates a raster image with shapes', () => {
  const cutout = new Cutout(baboon, {
    ...DEFAULTS,
    amountOfShapes: 2,
    amountOfAttempts: 2
  } as Options);
  const start = cutout.difference;
  cutout.step();

  expect(cutout.difference).toBeLessThan(start);
  //expect(isSvg(cutout.svg)).toBe(true);
  expect(isNdarray(cutout.image)).toBe(true);
});

it('accepts a background color', () => {
  const cutout = new Cutout(baboon, {
    ...DEFAULTS,
    amountOfShapes: 2,
    amountOfAttempts: 2,
    backgroundColor: {r: 100, g: 100, b: 255, a: 255}
  } as Options);
  const start = cutout.difference;
  cutout.step();

  expect(cutout.difference).toBeLessThan(start);
  //expect(isSvg(cutout.svg)).toBe(true);
  expect(isNdarray(cutout.image)).toBe(true);
});
