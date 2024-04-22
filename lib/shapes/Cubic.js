/**
 * A cubic bezier
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */
import { toScanlines } from '../rasterizers/bezier.js';
import { clampToInt, randomIntInclusive } from '../util.js';
import fd from 'fdrandom';

export class Cubic {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.x1 = randomIntInclusive(0, xBound);
    this.y1 = randomIntInclusive(0, yBound);
    this.x2 = this.x1 + randomIntInclusive(-15, 15);
    this.y2 = this.y1 + randomIntInclusive(-15, 15);
    this.x3 = this.x1 + randomIntInclusive(-15, 15);
    this.y3 = this.y1 + randomIntInclusive(-15, 15);
    this.x4 = this.x1 + randomIntInclusive(-15, 15);
    this.y4 = this.y1 + randomIntInclusive(-15, 15);
  }

  set props([x1, y1, x2, y2, x3, y3, x4, y4]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
  }

  get props() {
    return [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4];
  }

  get svg() {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = this.props;
    const shape = [
      'path',
      {
        d: `M${x1},${y1} C${x2},${y2} ${x3},${y3} ${x4},${y4}`
      }
    ];

    return shape;
  }

  clone() {
    const cubic = new Cubic(this.xBound, this.yBound);
    cubic.props = this.props;

    return cubic;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 3)) {
      case 0:
        this.x1 = clampToInt(this.x1 + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y1 = clampToInt(this.y1 + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y2 = clampToInt(this.y2 + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 2:
        this.x3 = clampToInt(this.x3 + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y3 = clampToInt(this.y3 + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 3:
        this.x4 = clampToInt(this.x4 + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y4 = clampToInt(this.y4 + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
    }
  }

  rasterize() {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = this.props;
    const vertices = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];

    return toScanlines(vertices, this.xBound, this.yBound);
  }
}
