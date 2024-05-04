import { RGBA } from 'color-blend/dist/types';

export interface Options {
  shapeTypes: ('Circle'|'Cubic'|'RotatedEllipse'|'Ellipse'|'Line'|'Quadratic'|'Rect'|'RotatedRect'|'Square'|'Triangle')[],
  alpha: number;
  backgroundColor?: RGBA;
  amountOfShapes: number;
  amountOfAttempts: number;
  steps: number;
  maxSize: number;
}