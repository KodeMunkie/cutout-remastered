import { Options } from './Options';

export const DEFAULTS: Options = {
  alpha: 192,
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
  amountOfShapes: 60,
  amountOfAttempts: 4,
  steps: 1500
}