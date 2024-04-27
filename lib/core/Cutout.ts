import { NdArray } from 'ndarray';
import { Options } from '../config/Options';
import { toSvg } from '../export/svg';
import { bestHillClimbState } from './hillclimb';
import { RGBA } from 'color-blend/dist/types';
import { clone, create, draw } from './image';
import { backgroundColor, differenceFull, differencePartial, scanlineColor } from './compute';
import { State } from './State';
import { Shape } from '../shapes/Shape';



/**
 * Render a raster image to a collection of shapes
 */
export class Cutout {

  private readonly width: number;
  private readonly height: number;
  private readonly background: RGBA;
  private readonly current: NdArray;
  private readonly buffer: NdArray;
  private readonly results: any[];
  private score: number;

  constructor(public target: NdArray, public options: Options) {
    // Ensure that target has transparency
    if (!(target.shape[2] === 4)) {
      target = clone(target);
    }

    // Calculate background color if it wasn't supplied
    this.background = options.backgroundColor || backgroundColor(target);
    this.width = target.shape[0];
    this.height = target.shape[1];
    this.current = create(this.width, this.height, this.background);
    this.buffer = create(this.width, this.height, this.background);
    this.score = differenceFull(target, this.current);
    this.results = [];
  }

  get image() {
    return this.current;
  }

  get svg() {
    const shapes = this.results.map(({ shape, color }) => {
      const {r, g, b, a} = color;
      const { svg } = shape;

      if (svg[0] === 'line' || svg[0] === 'path') {
        svg[1].fill = 'none';
        svg[1].stroke = `rgb(${r}, ${g}, ${b})`;
        svg[1]['stroke-opacity'] = a / 255;
      } else {
        svg[1].stroke = 'none';
        svg[1].fill = `rgb(${r}, ${g}, ${b})`;
        svg[1]['fill-opacity'] = a / 255;
      }
      return svg;
    });

    // Background color
    shapes.unshift([
      'rect',
      {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: `rgb(${this.background.r}, ${this.background.g}, ${this.background.b})`
      }
    ]);
    return toSvg(shapes, this.width, this.height);
  }

  get difference() {
    return this.score;
  }

  step() {
    const state: State = bestHillClimbState(
      this.options,
      this.target,
      this.current,
      this.buffer,
      this.score
    )!;
    this.addShape(state.shape, state.alpha);
  }

  //@ts-ignore
  addShape(shape: Shape, alpha: number): void {
    const before: NdArray = clone(this.current);
    const scanlines: number[][] = shape.rasterize();
    const color = scanlineColor(this.target, this.current, scanlines, alpha);

    draw(this.current, color, scanlines);

    this.score = differencePartial(this.target, before, this.current, this.score, scanlines);
    this.results.push({ shape, color });
  }
}