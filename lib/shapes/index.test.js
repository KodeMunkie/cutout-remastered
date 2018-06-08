/* eslint-env jest */

const { randomShapeOf } = require('.');
const Rect = require('./Rect');

it('returns a shape', () => {
  const xBound = 10;
  const yBound = 10;
  const shape = randomShapeOf(['Rect'], xBound, yBound);

  expect(shape).toBeInstanceOf(Rect);
});

it('throws an error for invalid shape types', () => {
  const xBound = 10;
  const yBound = 10;

  expect(() => randomShapeOf(['Rhombus'], xBound, yBound)).toThrowErrorMatchingSnapshot();
});
