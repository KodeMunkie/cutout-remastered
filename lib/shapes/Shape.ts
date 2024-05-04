//@ts-ignore
import fd from 'fdrandom';
import { ShapeNameProps } from './ShapeNameProps';

export abstract class Shape {

  static MAX_SIZE: number;

  protected random(min: number = 0, max: number = Shape.MAX_SIZE): number {
    //return fd.vrange(min, max,0.5);
    //return fd.gpick(min, max, 0.25);
    return fd.gteat(min, max);
  };

  protected constructor(public xBound: number, public yBound: number){}

  abstract clone(): Shape;

  abstract mutate(): void;

  abstract rasterize(): number[][];

  abstract get svg(): ShapeNameProps;

  abstract get props(): number[];
}