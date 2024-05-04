import { toScanlines } from '../rasterizers/bezier';
import { clampToInt, randomIntInclusive } from '../core/util';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

export class Cubic extends Shape {

  private x1:number;
  private y1:number;
  private x2:number;
  private y2:number;
  private x3:number;
  private y3:number;
  private x4:number;
  private y4:number;

  constructor(xBound: number, yBound: number) {
    super(xBound, yBound);
    this.x1 = randomIntInclusive(0, xBound);
    this.y1 = randomIntInclusive(0, yBound);
    this.x2 = this.x1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
    this.y2 = this.y1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
    this.x3 = this.x1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
    this.y3 = this.y1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
    this.x4 = this.x1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
    this.y4 = this.y1 + randomIntInclusive(-Cubic.MAX_SIZE, Cubic.MAX_SIZE);
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

  get props(): number[] {
    return [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4];
  }

  get svg(): ShapeNameProps {
    return {
        name: 'path',
        props: {
          d: `M${this.x1},${this.y1} C${this.x2},${this.y2} ${this.x3},${this.y3} ${this.x4},${this.y4}`
        }
    };
  }

  clone(): Shape {
    const cubic: Cubic = new Cubic(this.xBound, this.yBound);
    cubic.props = this.props;
    return cubic;
  }

  mutate(): void {
    switch (randomIntInclusive(0, 3)) {
      case 0:
        this.x1 = clampToInt(this.x1 + this.random(), 0, this.xBound);
        this.y1 = clampToInt(this.y1 + this.random(), 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + this.random(), 0, this.xBound);
        this.y2 = clampToInt(this.y2 + this.random(), 0, this.yBound);
        break;
      case 2:
        this.x3 = clampToInt(this.x3 + this.random(), 0, this.xBound);
        this.y3 = clampToInt(this.y3 + this.random(), 0, this.yBound);
        break;
      case 3:
        this.x4 = clampToInt(this.x4 + this.random(), 0, this.xBound);
        this.y4 = clampToInt(this.y4 + this.random(), 0, this.yBound);
    }
  }

  rasterize(): number[][] {
    const vertices = [[this.x1, this.y1], [this.x2, this.y2], [this.x3, this.y3], [this.x4, this.y4]];
    return toScanlines(vertices, this.xBound, this.yBound);
  }
}
