import { RotatedEllipse } from '../../lib/shapes/RotatedEllipse';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new RotatedEllipse(xBound, yBound);

  expect(Array.isArray(ellipse.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new RotatedEllipse(xBound, yBound);

  const { props } = ellipse;
  ellipse.props = [100, 100, 200, 200, 20];

  expect(ellipse.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new RotatedEllipse(xBound, yBound);
  const { svg } = ellipse;
  const attrs = ['cx', 'cy', 'rx', 'ry', 'transform'];

  expect(svg.name).toBe('ellipse');
  expect(Object.keys(svg.props)).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const rect = new RotatedEllipse(xBound, yBound);

  expect(() => rect.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new RotatedEllipse(xBound, yBound);

  expect(() => ellipse.rasterize()).not.toThrow();
  expect(Array.isArray(ellipse.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new RotatedEllipse(xBound, yBound);
  const clone = ellipse.clone();

  expect(ellipse).not.toBe(clone);
  expect(ellipse.props).toEqual(clone.props);
});
