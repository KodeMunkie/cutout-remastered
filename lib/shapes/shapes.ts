import { Circle } from './Circle';
import { RotatedEllipse }from './RotatedEllipse';
import { Ellipse } from './Ellipse';
import { Square } from './Square';
import { Rect } from './Rect';
import { RotatedRect } from './RotatedRect';
import { Triangle } from './Triangle';
import { Line } from './Line';
import { Quadratic } from './Quadratic';
import { Cubic } from './Cubic';
import { randomArrayItem } from '../core/util';
import { Shape } from './Shape';

/**
 * Create a shape of the supplied type
 */
export const create = (shapeType: string, xBound: number, yBound: number): Shape => {
  switch (shapeType.toLowerCase()) {
    case 'circle':
      return new Circle(xBound, yBound);
    case 'rotatedellipse':
      return new RotatedEllipse(xBound, yBound);
    case 'ellipse':
      return new Ellipse(xBound, yBound);
    case 'square':
      return new Square(xBound, yBound);
    case 'rect':
      return new Rect(xBound, yBound);
    case 'rotatedrect':
      return new RotatedRect(xBound, yBound);
    case 'triangle':
      return new Triangle(xBound, yBound);
    case 'line':
      return new Line(xBound, yBound);
    case 'quadratic':
      return new Quadratic(xBound, yBound);
    case 'cubic':
      return new Cubic(xBound, yBound);
    default:
      throw new Error(`${shapeType} is not a valid shape type`);
  }
};

/**
 * Creates a random shape from the types supplied
 */

export const randomShapeOf = (shapeTypes: string[], xBound: number, yBound: number): Shape =>
  create(randomArrayItem(shapeTypes), xBound, yBound);
