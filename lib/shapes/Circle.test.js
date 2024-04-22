import { Circle } from './Circle.js';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const circle = new Circle(xBound, yBound);

  expect(Array.isArray(circle.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const circle = new Circle(xBound, yBound);

  const { props } = circle;
  circle.props = [100, 100, 200];

  expect(circle.props).not.toEqual(props);
});

it('gets svg', () => {
  const xBound = 10;
  const yBound = 10;
  const circle = new Circle(xBound, yBound);
  const { svg } = circle;
  const attrs = ['cx', 'cy', 'r'];

  expect(svg[0]).toBe('circle');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const circle = new Circle(xBound, yBound);

  expect(() => circle.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const circle = new Circle(xBound, yBound);

  expect(() => circle.rasterize()).not.toThrow();
  expect(Array.isArray(circle.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const circle = new Circle(xBound, yBound);
  const clone = circle.clone();

  expect(circle).not.toBe(clone);
  expect(circle.props).toEqual(clone.props);
});
