export abstract class Shape {
  protected constructor(public xBound: number, public yBound: number){}

  abstract clone(): Shape;

  abstract mutate(): void;

  abstract rasterize(): number[][];
}