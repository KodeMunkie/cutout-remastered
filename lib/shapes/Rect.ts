/**
 * A rectangle
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */
//@ts-ignore
import fd from 'fdrandom';
import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/rectangle';
import { Shape } from './Shape';

export class Rect extends Shape {

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(xBound: number, yBound: number) {
    super(xBound, yBound);
    this.x = randomIntInclusive(0, xBound);
    this.y = randomIntInclusive(0, yBound);
    this.width = clampToInt(randomIntInclusive(1, 30), 1, xBound - this.x);
    this.height = clampToInt(randomIntInclusive(1, 30), 1, yBound - this.y);
  }

  set props([x, y, width, height]) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get props() {
    return [this.x, this.y, this.width, this.height];
  }

  get svg() {
    const [x, y, width, height] = this.props;
    const shape = [
      'rect',
      {
        x,
        y,
        width,
        height
      }
    ];

    return shape;
  }

  clone() {
    const rectangle = new Rect(this.xBound, this.yBound);
    rectangle.props = this.props;

    return rectangle;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x = clampToInt(this.x + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.y = clampToInt(this.y + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 1:
        this.width = clampToInt(this.width + fd.vrange(0,1,0.5) * 15, 1, this.xBound - this.x);
        this.height = clampToInt(this.height + fd.vrange(0,1,0.5) * 15, 1, this.yBound - this.y);
    }
  }

  rasterize() {
    const [x, y, width, height] = this.props;

    return toScanlines(x, y, width, height, this.xBound, this.yBound);
  }
}