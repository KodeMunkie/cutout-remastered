import { RotatedRect } from './RotatedRect.js';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const rotated = new RotatedRect(xBound, yBound);

  expect(Array.isArray(rotated.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const rotated = new RotatedRect(xBound, yBound);

  const { props } = rotated;
  rotated.props = [100, 100, 200, 200, 20];

  expect(rotated.props).not.toEqual(props);
});

it('gets svg', () => {
  const xBound = 10;
  const yBound = 10;
  const rotated = new RotatedRect(xBound, yBound);
  const { svg } = rotated;
  const attrs = ['x', 'y', 'width', 'height', 'transform'];

  expect(svg[0]).toBe('rect');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const rect = new RotatedRect(xBound, yBound);

  expect(() => rect.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const rotated = new RotatedRect(xBound, yBound);

  expect(() => rotated.rasterize()).not.toThrow();
  expect(Array.isArray(rotated.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const rotated = new RotatedRect(xBound, yBound);
  const clone = rotated.clone();

  expect(rotated).not.toBe(clone);
  expect(rotated.props).toEqual(clone.props);
});
