import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/rectangle';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

export class Square extends Shape {

  private x: number;
  private y: number;
  private size: number;

  constructor(xBound: number, yBound: number) {
    super(xBound, yBound);
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

  get svg(): ShapeNameProps {
    return {
      name: 'rect',
      props: {
        x: this.x,
        y: this.y,
        width: this.size,
        height: this.size
      }
    };
  }

  clone(): Shape {
    const square: Square = new Square(this.xBound, this.yBound);
    square.props = this.props;
    return square;
  }

  mutate(): void {
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x = clampToInt(this.x + this.random(), 0, this.xBound);
        this.y = clampToInt(this.y + this.random(), 0, this.yBound);
        break;
      case 1:
        this.size = clampToInt(this.size + this.random(), 1, this.xBound - this.x);
    }
  }

  rasterize(): number[][] {
    return toScanlines(this.x, this.y, this.size, this.size, this.xBound, this.yBound);
  }
}
