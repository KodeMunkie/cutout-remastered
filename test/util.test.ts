import { randomArrayItem, randomIntInclusive, clampToInt } from '../lib/core/util';

it('picks a random array item', () => {
  const values = ['one', 'two', 'three'];
  const pick = randomArrayItem(values);

  expect(values.includes(pick)).toBe(true);
});

it('generates inclusive values between min and max', () => {
  const min = 0;
  const max = 100000;
  const number = randomIntInclusive(min, max);

  expect(number >= min && number <= max).toBe(true);
});

it('clamps values', () => {
  const min = 0;
  const max = 10;

  expect(clampToInt(-1, min, max)).toBe(0);
  expect(clampToInt(11, min, max)).toBe(10);
  expect(clampToInt(3, min, max)).toBe(3);
  expect(clampToInt(3.1238764, min, max)).toBe(3);
});
