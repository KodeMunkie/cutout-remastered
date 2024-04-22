/**
 * Model for the optimization/fitting algorithm
 */
import { clone, create, draw } from './image.js';
import { differenceFull, differencePartial, scanlineColor } from './compute.js';
import { bestHillClimbState } from './hillclimb.js';
import { toSvg } from './svg/svgoutput.js';

export class Model {
  constructor(target, backgroundColor) {
    const width = target.shape[0];
    const height = target.shape[1];
    const current = create(width, height, backgroundColor);
    const buffer = create(width, height, backgroundColor);

    this.width = width;
    this.height = height;
    this.background = backgroundColor;
    this.target = target;
    this.current = current;
    this.buffer = buffer;
    this.score = differenceFull(target, current);
    this.results = [];
  }

  get image() {
    return this.current;
  }

  get svg() {

    // Individual shapes
    const shapes = this.results.map(({ shape, color }) => {
      const [r, g, b, a] = color;
      const { svg } = shape;

      /* istanbul ignore next */
      if (svg[0] === 'line' || svg[0] === 'path') {
        svg[1].fill = 'none';
        svg[1].stroke = `rgb(${r}, ${g}, ${b})`;
        svg[1]['stroke-opacity'] = a / 255;
      } else {
        svg[1].stroke = 'none';
        svg[1].fill = `rgb(${r}, ${g}, ${b})`;
        svg[1]['fill-opacity'] = a / 255;
      }

      return svg;
    });

    // Background color
    shapes.unshift([
      'rect',
      {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: `rgb(${this.background[0]}, ${this.background[1]}, ${this.background[2]})`
      }
    ]);

    return toSvg(shapes, this.width, this.height);
  }

  get difference() {
    return this.score;
  }

  step(shapeTypes, alpha, amountOfShapes, amountOfAttempts) {
  const state = bestHillClimbState(
      shapeTypes,
      alpha,
      amountOfShapes,
      amountOfAttempts,
      this.target,
      this.current,
      this.buffer,
      this.score
    );
    this.addShape(state.shape, state.alpha);
  }

  addShape(shape, alpha) {
    const before = clone(this.current);
    const scanlines = shape.rasterize();
    const color = scanlineColor(this.target, this.current, scanlines, alpha);

    draw(this.current, color, scanlines);

    this.score = differencePartial(this.target, before, this.current, this.score, scanlines);
    this.results.push({ shape, color });
  }
}
