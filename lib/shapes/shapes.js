import { Circle } from './Circle.js';
import { RotatedEllipse }from './RotatedEllipse.js';
import { Ellipse } from './Ellipse.js';
import { Square } from './Square.js';
import { Rect } from './Rect.js';
import { RotatedRect } from './RotatedRect.js';
import { Triangle } from './Triangle.js';
import { Line } from './Line.js';
import { Quadratic } from './Quadratic.js';
import { Cubic } from './Cubic.js';
import { randomArrayItem } from '../util.js';

/**
 * Create a shape of the supplied type
 */

export const create = (shapeType, xBound, yBound) => {
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

export const randomShapeOf = (shapeTypes, xBound, yBound) =>
  create(randomArrayItem(shapeTypes), xBound, yBound);
