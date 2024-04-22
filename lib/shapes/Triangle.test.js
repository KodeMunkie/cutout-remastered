import { Triangle } from './Triangle.js';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const triangle = new Triangle(xBound, yBound);

  expect(Array.isArray(triangle.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const triangle = new Triangle(xBound, yBound);

  const { props } = triangle;
  triangle.props = [100, 100, 200, 200, 300, 300];

  expect(triangle.props).not.toEqual(props);
});

it('gets svg', () => {
  const xBound = 10;
  const yBound = 10;
  const triangle = new Triangle(xBound, yBound);
  const { svg } = triangle;
  const attrs = ['points'];

  expect(svg[0]).toBe('polygon');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const triangle = new Triangle(xBound, yBound);

  expect(() => triangle.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const triangle = new Triangle(xBound, yBound);

  expect(() => triangle.rasterize()).not.toThrow();
  expect(Array.isArray(triangle.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const triangle = new Triangle(xBound, yBound);
  const clone = triangle.clone();

  expect(triangle).not.toBe(clone);
  expect(triangle.props).toEqual(clone.props);
});
