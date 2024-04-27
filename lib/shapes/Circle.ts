import { toScanlines } from '../rasterizers/ellipse';
import { clampToInt, randomIntInclusive } from '../core/util';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

export class Circle extends Shape {

  private cx: number;
  private cy: number;
  private r: number;

  constructor(xBound:number, yBound:number) {
    super(xBound, yBound);
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

  get svg(): ShapeNameProps {
    return {
      name: 'circle',
      props:
      {
        cx: this.cx,
        cy: this.cy,
        r: this.r
      }
    };
  }

  clone(): Shape {
    const circle: Circle = new Circle(this.xBound, this.yBound);
    circle.props = this.props;
    return circle;
  }

  mutate(): void {
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.cx = clampToInt(this.cx + this.random(), 0, this.xBound);
        this.cy = clampToInt(this.cy + this.random(), 0, this.yBound);
        break;
      case 1:
        this.r = clampToInt(this.r + this.random(), 1, this.xBound);
    }
  }

  rasterize(): number[][] {
    return toScanlines(this.cx, this.cy, this.r, this.r, 0, this.xBound, this.yBound);
  }
}
