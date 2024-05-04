import { Options } from './Options';

export const DEFAULTS: Options = {
  alpha: 192,
  // Rotated variants are also available but something isn't quite right with them :(
  shapeTypes: [
    'Circle',
    'Cubic',
    'Ellipse',
    'Line',
    'Quadratic',
    'Rect',
    'Square',
    'Triangle'
  ],
  amountOfShapes: 40,
  amountOfAttempts: 2,
  steps: 2400,
  maxSize: 24
}