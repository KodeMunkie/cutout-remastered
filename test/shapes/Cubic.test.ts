import { Cubic } from '../../lib/shapes/Cubic';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const cubic = new Cubic(xBound, yBound);

  expect(Array.isArray(cubic.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const cubic = new Cubic(xBound, yBound);

  const { props } = cubic;
  cubic.props = [100, 100, 200, 200, 300, 300, 400, 400];

  expect(cubic.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const cubic = new Cubic(xBound, yBound);
  const { svg } = cubic;
  const attrs = ['d'];

  expect(svg.name).toBe('path');
  expect(Object.keys(svg.props)).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const cubic = new Cubic(xBound, yBound);

  expect(() => cubic.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const cubic = new Cubic(xBound, yBound);

  expect(() => cubic.rasterize()).not.toThrow();
  expect(Array.isArray(cubic.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const cubic = new Cubic(xBound, yBound);
  const clone = cubic.clone();

  expect(cubic).not.toBe(clone);
  expect(cubic.props).toEqual(clone.props);
});
