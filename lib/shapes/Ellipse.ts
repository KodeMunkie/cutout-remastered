/**
 * An ellipse
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */
//@ts-ignore
import fd from 'fdrandom';
import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/ellipse';
import { Shape } from './Shape';

export class Ellipse extends Shape {

  private cx: number;
  private cy: number;
  private rx: number;
  private ry: number;

  constructor(xBound: number, yBound: number) {
    super(xBound, yBound);

    this.cx = randomIntInclusive(0, xBound);
    this.cy = randomIntInclusive(0, yBound);
    this.rx = randomIntInclusive(1, 30);
    this.ry = randomIntInclusive(1, 30);
  }

  set props([cx, cy, rx, ry]) {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
  }

  get props() {
    return [this.cx, this.cy, this.rx, this.ry];
  }

  get svg() {
    const [cx, cy, rx, ry] = this.props;
    const shape = [
      'ellipse',
      {
        cx,
        cy,
        rx,
        ry
      }
    ];

    return shape;
  }

  clone() {
    const ellipse = new Ellipse(this.xBound, this.yBound);
    ellipse.props = this.props;

    return ellipse;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 2)) {
      case 0:
        this.cx = clampToInt(this.cx + fd.vrange(0,1,0.5) * 15, 0, this.xBound);
        this.cy = clampToInt(this.cy + fd.vrange(0,1,0.5) * 15, 0, this.yBound);
        break;
      case 1:
        this.rx = clampToInt(this.rx + fd.vrange(0,1,0.5) * 15, 1, this.xBound);
        break;
      case 2:
        this.ry = clampToInt(this.ry + fd.vrange(0,1,0.5) * 15, 1, this.yBound);
    }
  }

  rasterize() {
    const [cx, cy, rx, ry] = this.props;
    const angle = 0;

    return toScanlines(cx, cy, rx, ry, angle, this.xBound, this.yBound);
  }
}
