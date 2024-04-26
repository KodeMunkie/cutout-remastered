import { Line } from '../../lib/shapes/Line';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const line = new Line(xBound, yBound);

  expect(Array.isArray(line.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const line = new Line(xBound, yBound);

  const { props } = line;
  line.props = [100, 100, 200, 200];

  expect(line.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const line = new Line(xBound, yBound);
  const { svg } = line;
  const attrs = ['x1', 'y1', 'x2', 'y2'];

  expect(svg[0]).toBe('line');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const line = new Line(xBound, yBound);

  expect(() => line.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const line = new Line(xBound, yBound);

  expect(() => line.rasterize()).not.toThrow();
  expect(Array.isArray(line.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const line = new Line(xBound, yBound);
  const clone = line.clone();

  expect(line).not.toBe(clone);
  expect(line.props).toEqual(clone.props);
});
