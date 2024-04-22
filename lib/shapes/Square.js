/**
 * A square
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */
import { clampToInt, randomIntInclusive } from '../util.js';
import fd from 'fdrandom';
import { toScanlines } from '../rasterizers/rectangle.js';

export class Square {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.x = randomIntInclusive(0, xBound);
    this.y = randomIntInclusive(0, yBound);
    this.size = clampToInt(randomIntInclusive(1, 30), 1, xBound - this.x);
  }

  set props([x, y, size]) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  get props() {
    return [this.x, this.y, this.size];
  }

  get svg() {
    const [x, y, size] = this.props;
    const shape = [
      'rect',
      {
        x,
        y,
        width: size,
        height: size
      }
    ];

    return shape;
  }

  clone() {
    const square = new Square(this.xBound, this.yBound);
    square.props = this.props;

    return square;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x = clampToInt(this.x + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y = clampToInt(this.y + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 1:
        this.size = clampToInt(this.size + fd.vrange(0,1,0.5) * 15, 1, this.xBound - this.x);
    }
  }

  rasterize() {
    const [x, y, size] = this.props;
    const width = size;
    const height = size;

    return toScanlines(x, y, width, height, this.xBound, this.yBound);
  }
}
