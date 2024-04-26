import { Square } from '../../lib/shapes/Square';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const square = new Square(xBound, yBound);

  expect(Array.isArray(square.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const square = new Square(xBound, yBound);

  const { props } = square;
  square.props = [100, 100, 200];

  expect(square.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const square = new Square(xBound, yBound);
  const { svg } = square;
  const attrs = ['x', 'y', 'width', 'height'];

  expect(svg[0]).toBe('rect');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const square = new Square(xBound, yBound);

  expect(() => square.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const square = new Square(xBound, yBound);

  expect(() => square.rasterize()).not.toThrow();
  expect(Array.isArray(square.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const square = new Square(xBound, yBound);
  const clone = square.clone();

  expect(square).not.toBe(clone);
  expect(square.props).toEqual(clone.props);
});
