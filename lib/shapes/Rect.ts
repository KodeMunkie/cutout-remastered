import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/rectangle';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

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

  get svg(): ShapeNameProps {
    return {
      name: 'rect',
      props: {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      }
    };
  }

  clone(): Shape {
    const rectangle: Rect = new Rect(this.xBound, this.yBound);
    rectangle.props = this.props;
    return rectangle;
  }

  mutate(): void {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x = clampToInt(this.x + this.random(), 0, this.xBound);
        this.y = clampToInt(this.y + this.random(), 0, this.yBound);
        break;
      case 1:
        this.width = clampToInt(this.width + this.random(), 1, this.xBound - this.x);
        this.height = clampToInt(this.height + this.random(), 1, this.yBound - this.y);
    }
  }

  rasterize(): number[][] {
    return toScanlines(this.x, this.y, this.width, this.height, this.xBound, this.yBound);
  }
}