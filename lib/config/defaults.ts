import { Options } from './Options';

export const DEFAULTS: Options = {
  alpha: 255,
  shapeTypes: [
    'Circle',
    'Cubic',
    'RotatedEllipse',
    'Ellipse',
    'Line',
    'Quadratic',
    'Rect',
    'RotatedRect',
    'Square',
    'Triangle'
  ],
  amountOfShapes: 100,
  amountOfAttempts: 10,
  steps: 500
}