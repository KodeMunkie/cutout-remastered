import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/ellipse';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

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

  get props(): number[] {
    return [this.cx, this.cy, this.rx, this.ry];
  }

  get svg(): ShapeNameProps {
    return {
      name: 'ellipse',
      props: {
        cx: this.cx,
        cy: this.cy,
        rx: this.rx,
        ry: this.ry
      }
    }
  }

  clone(): Shape {
    const ellipse: Ellipse = new Ellipse(this.xBound, this.yBound);
    ellipse.props = this.props;
    return ellipse;
  }

  mutate(): void {
    switch (randomIntInclusive(0, 2)) {
      case 0:
        this.cx = clampToInt(this.cx + this.random(), 0, this.xBound);
        this.cy = clampToInt(this.cy + this.random(), 0, this.yBound);
        break;
      case 1:
        this.rx = clampToInt(this.rx + this.random(), 1, this.xBound);
        break;
      case 2:
        this.ry = clampToInt(this.ry + this.random(), 1, this.yBound);
    }
  }

  rasterize(): number[][] {
    return toScanlines(this.cx, this.cy, this.rx, this.ry, 0, this.xBound, this.yBound);
  }
}
