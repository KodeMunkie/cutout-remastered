import { RGBA } from 'color-blend/dist/types';
import { Shape } from './Shape';

export class ShapeColor {
    constructor(public shape: Shape, public color: RGBA) {}
}