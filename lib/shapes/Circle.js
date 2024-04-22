/**
 * A circle
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */
import fd from 'fdrandom';
import { toScanlines } from '../rasterizers/ellipse.js';
import { clampToInt, randomIntInclusive } from '../util.js';

export class Circle {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.cx = randomIntInclusive(0, xBound);
    this.cy = randomIntInclusive(0, yBound);
    this.r = randomIntInclusive(1, 30);
  }

  set props([cx, cy, r]) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  get props() {
    return [this.cx, this.cy, this.r];
  }

  get svg() {
    const [cx, cy, r] = this.props;
    const shape = [
      'circle',
      {
        cx,
        cy,
        r
      }
    ];

    return shape;
  }

  clone() {
    const circle = new Circle(this.xBound, this.yBound);
    circle.props = this.props;

    return circle;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.cx = clampToInt(this.cx + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.cy = clampToInt(this.cy + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 1:
        this.r = clampToInt(this.r + fd.vrange(0,1,0.5) * 15, 1, this.xBound);
    }
  }

  rasterize() {
    const [cx, cy, rx] = this.props;
    const ry = rx;
    const angle = 0;

    return toScanlines(cx, cy, rx, ry, angle, this.xBound, this.yBound);
  }
}
