import { Quadratic } from '../../lib/shapes/Quadratic';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const quadratic = new Quadratic(xBound, yBound);

  expect(Array.isArray(quadratic.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const quadratic = new Quadratic(xBound, yBound);

  const { props } = quadratic;
  quadratic.props = [100, 100, 200, 200, 300, 300];

  expect(quadratic.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const quadratic = new Quadratic(xBound, yBound);
  const { svg } = quadratic;
  const attrs = ['d'];

  expect(svg[0]).toBe('path');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const quadratic = new Quadratic(xBound, yBound);

  expect(() => quadratic.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const quadratic = new Quadratic(xBound, yBound);

  expect(() => quadratic.rasterize()).not.toThrow();
  expect(Array.isArray(quadratic.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const quadratic = new Quadratic(xBound, yBound);
  const clone = quadratic.clone();

  expect(quadratic).not.toBe(clone);
  expect(quadratic.props).toEqual(clone.props);
});
