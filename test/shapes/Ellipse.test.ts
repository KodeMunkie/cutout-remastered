import { Ellipse } from '../../lib/shapes/Ellipse';

it('gets props', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new Ellipse(xBound, yBound);

  expect(Array.isArray(ellipse.props)).toBe(true);
});

it('sets props', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new Ellipse(xBound, yBound);

  const { props } = ellipse;
  ellipse.props = [100, 100, 200, 200];

  expect(ellipse.props).not.toEqual(props);
});

it('gets export', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new Ellipse(xBound, yBound);
  const { svg } = ellipse;
  const attrs = ['cx', 'cy', 'rx', 'ry'];

  expect(svg.name).toBe('ellipse');
  expect(Object.keys(svg.props)).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const ellipse = new Ellipse(xBound, yBound);

  expect(() => ellipse.mutate()).not.toThrow();
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new Ellipse(xBound, yBound);

  expect(() => ellipse.rasterize()).not.toThrow();
  expect(Array.isArray(ellipse.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const ellipse = new Ellipse(xBound, yBound);
  const clone = ellipse.clone();

  expect(ellipse).not.toBe(clone);
  expect(ellipse.props).toEqual(clone.props);
});
