import { randomArrayItem, randomIntInclusive, clampToInt } from '../lib/core/util';

it('picks a random array item', (): void => {
  const values: string[] = ['one', 'two', 'three'];
  const pick: string = randomArrayItem(values);

  expect(values.includes(pick)).toBe(true);
});

it('generates inclusive values between min and max', (): void => {
  const min: number = 0;
  const max: number = 100000;
  const number: number = randomIntInclusive(min, max);

  expect(number >= min && number <= max).toBe(true);
});

it('clamps values', (): void => {
  const min: number = 0;
  const max: number = 10;

  expect(clampToInt(-1, min, max)).toBe(0);
  expect(clampToInt(11, min, max)).toBe(10);
  expect(clampToInt(3, min, max)).toBe(3);
  expect(clampToInt(3.1238764, min, max)).toBe(3);
});
